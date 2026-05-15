import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import Anthropic from '@anthropic-ai/sdk'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse: (buf: Buffer) => Promise<{ text: string }> = require('pdf-parse')

export const runtime = 'nodejs'
export const maxDuration = 60

export interface AIExtractedData {
  title: string
  description: string
  type: 'Condo' | 'Villa' | 'House' | 'Townhouse' | 'Apartment'
  developer: string | null
  listingType: 'Sale' | 'Rent' | 'Sale & Rent' | null
  projectStatus: 'Completed' | 'Ready to Move' | 'Under Construction' | null
  startingPrice: number | null
  location: string
  address: string
  nearbyPlaces: string[]
  amenities: string[]
  totalFloors: number | null
  totalUnits: number | null
  yearBuilt: number | null
  unitTypes: Array<{
    name: string
    bedrooms: number
    bathrooms: number
    areaSqmMin: number
    parking: number
  }>
}

function extractDriveFileId(url: string): string | null {
  const match =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

function cleanText(raw: string): string {
  return raw
    .split('\n')
    .filter(line => {
      const stripped = line.trim()
      if (!stripped) return false
      const nonSpace = stripped.replace(/\s/g, '')
      if (nonSpace.length === 0) return false
      const asciiCount = (nonSpace.match(/[\x20-\x7E]/g) || []).length
      return asciiCount / nonSpace.length > 0.6
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

async function aiExtract(text: string): Promise<AIExtractedData | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const client = new Anthropic({ apiKey })

  const prompt = `You are extracting structured data from a real estate property brochure PDF. The text below was extracted from the PDF and may contain garbled characters from OCR — ignore those, focus on the readable English content.

Extract the following fields and return ONLY valid JSON (no markdown, no explanation):

{
  "title": "Full property name",
  "description": "2-4 paragraph English description of the property. Write in a clean, professional tone. Use the brochure content but clean it up — no garbled text, no Thai characters.",
  "type": "One of: Condo, Villa, House, Townhouse, Apartment",
  "developer": "Developer or brand name (e.g. 'Charn Issara Development') or null if not found",
  "listingType": "One of: Sale, Rent, Sale & Rent — infer from context (e.g. 'for sale', 'for rent', 'buy or rent'). Default to Sale if unclear.",
  "projectStatus": "One of: Completed, Ready to Move, Under Construction — infer from context (e.g. 'ready to move in', 'completion 2026', 'now complete'). null if not determinable.",
  "startingPrice": "Lowest price mentioned as a number in THB (e.g. 3500000). Convert shorthand: '3.5M' → 3500000, '850K' → 850000. null if no price found.",
  "location": "Short location string, e.g. 'Sathorn, Bangkok'",
  "address": "Full street address if available, otherwise best available",
  "nearbyPlaces": ["list", "of", "nearby", "places", "mentioned"],
  "amenities": ["list", "of", "amenities", "and", "facilities"],
  "totalFloors": number or null,
  "totalUnits": number or null,
  "yearBuilt": number or null,
  "unitTypes": [
    {
      "name": "Unit type code and description, e.g. 'A1 – 1BR'",
      "bedrooms": number,
      "bathrooms": number (estimate 1 per bedroom if not stated),
      "areaSqmMin": number (use smallest area if range given),
      "parking": 1
    }
  ]
}

Rules:
- unitTypes: list each unique unit type once (deduplicate by code). Use the smallest area as areaSqmMin if a range is given.
- amenities: extract from facilities sections (pool, gym, lobby, parking, gardens, etc.)
- nearbyPlaces: extract specific place names mentioned (malls, roads, landmarks, restaurants)
- description: English only, 2-4 paragraphs, clean prose
- startingPrice: must be a plain integer in THB, not a string — null if no price found
- If a field cannot be determined, use null for numbers or [] for arrays

PDF TEXT:
${text.slice(0, 24000)}`

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = msg.content[0]
  if (content.type !== 'text') return null

  try {
    const jsonText = content.text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
    return JSON.parse(jsonText) as AIExtractedData
  } catch {
    console.error('AI response parse error:', content.text.slice(0, 200))
    return null
  }
}

async function processBuffer(buffer: Buffer): Promise<NextResponse> {
  const data = await pdfParse(buffer)
  const raw = data.text
  const text = cleanText(raw)

  const aiData = await aiExtract(raw)

  return NextResponse.json({ text, aiData })
}

export async function POST(req: NextRequest) {
  const authed = await getAdminSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // ── Option A: Google Drive URL ─────────────────────────────────────────
  const driveUrl = formData.get('driveUrl')
  if (driveUrl && typeof driveUrl === 'string' && driveUrl.trim()) {
    const fileId = extractDriveFileId(driveUrl.trim())
    if (!fileId) {
      return NextResponse.json({ error: 'Could not extract a file ID from that Google Drive link. Make sure you paste the sharing URL.' }, { status: 400 })
    }
    try {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
      const response = await fetch(downloadUrl)
      if (!response.ok) {
        return NextResponse.json({ error: 'Could not download the file. Make sure the file is shared as "Anyone with the link can view".' }, { status: 400 })
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      return await processBuffer(buffer)
    } catch (err) {
      console.error('Drive PDF extraction error:', err)
      return NextResponse.json({ error: 'Failed to read the PDF from Google Drive.' }, { status: 500 })
    }
  }

  // ── Option B: Direct file upload ───────────────────────────────────────
  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Provide a PDF file or a Google Drive link.' }, { status: 400 })
  }
  if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
    return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 400 })
  }
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    return await processBuffer(buffer)
  } catch (err) {
    console.error('PDF extraction error:', err)
    return NextResponse.json({ error: 'Failed to extract text from PDF.' }, { status: 500 })
  }
}
