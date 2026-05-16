import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import Anthropic, { toFile } from '@anthropic-ai/sdk'
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
    areaSqmMax: number | null
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

const EXTRACT_PROMPT = `You are extracting structured data from a real estate property brochure. The brochure may be in Thai, English, or both — read all visible text and images carefully.

Return ONLY valid JSON (no markdown, no explanation):

{
  "title": "Full property name",
  "description": "2-4 paragraph English description of the property. Write in a clean, professional tone based on the brochure content.",
  "type": "One of: Condo, Villa, House, Townhouse, Apartment",
  "developer": "Developer or brand name or null if not found",
  "listingType": "One of: Sale, Rent, Sale & Rent — infer from context. Default to Sale if unclear.",
  "projectStatus": "One of: Completed, Ready to Move, Under Construction — infer from context. null if not determinable.",
  "startingPrice": "Lowest price as a plain integer in THB (e.g. 3500000). Convert shorthand: '3.5M' → 3500000, '850K' → 850000. null if no price found.",
  "location": "Short location string, e.g. 'Sathorn, Bangkok'",
  "address": "Full street address if available, otherwise best available",
  "nearbyPlaces": ["Place Name - 200 m", "Another Place - 1.2 km", "Place with no distance"],
  "amenities": ["list", "of", "amenities", "and", "facilities"],
  "totalFloors": number or null,
  "totalUnits": number or null,
  "yearBuilt": number or null,
  "unitTypes": [
    {
      "name": "Unit type name/code, e.g. '1 Bedroom Type A'",
      "bedrooms": number,
      "bathrooms": number (estimate 1 per bedroom if not stated),
      "areaSqmMin": number (minimum area in sqm),
      "areaSqmMax": number or null (maximum area in sqm if a range is given, otherwise null),
      "parking": 1
    }
  ]
}

Rules:
- unitTypes: list each unique unit type once. If a range like "33–45 sqm" is given, set areaSqmMin to the smaller and areaSqmMax to the larger. If only one size, set areaSqmMax to null.
- amenities: extract from facilities sections (pool, gym, lobby, parking, gardens, etc.)
- nearbyPlaces: include distance if shown. Format as "Place Name - 200 m" or "Place Name - 1.2 km". If no distance, just use the place name.
- description: English only, 2-4 paragraphs, clean prose
- startingPrice: plain integer in THB — null if no price found
- If a field cannot be determined, use null for numbers or [] for arrays`

async function aiExtract(pdfBuffer: Buffer): Promise<AIExtractedData | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const client = new Anthropic({ apiKey })

  const BETAS: ['files-api-2025-04-14', 'pdfs-2024-09-25'] = ['files-api-2025-04-14', 'pdfs-2024-09-25']

  // Upload PDF via Files API (multipart) to avoid base64 payload size limits
  const uploaded = await client.beta.files.upload(
    { file: await toFile(pdfBuffer, 'document.pdf', { type: 'application/pdf' }) },
    { headers: { 'anthropic-beta': BETAS.join(',') } },
  )

  try {
    const msg = await client.beta.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      betas: BETAS,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'document',
            source: { type: 'file', file_id: uploaded.id },
          },
          { type: 'text', text: EXTRACT_PROMPT },
        ],
      }],
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
  } finally {
    // Delete the uploaded file from Anthropic storage after extraction
    client.beta.files.delete(uploaded.id).catch(() => {})
  }
}

async function processBuffer(buffer: Buffer): Promise<NextResponse> {
  // Extract text preview — may be empty for image-based PDFs, that's fine
  let text = ''
  try {
    const data = await pdfParse(buffer)
    text = cleanText(data.text)
  } catch { /* image-based PDF — no text layer */ }

  // Send PDF binary directly to Claude so it can read both text and images
  let aiData = null
  try {
    aiData = await aiExtract(buffer)
  } catch (err) {
    console.error('AI extraction error:', err)
  }

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
      // Try the newer usercontent domain first (handles large files better),
      // then fall back to the legacy uc endpoint.
      const candidates = [
        `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
        `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`,
      ]

      let buffer: Buffer | null = null
      for (const url of candidates) {
        const response = await fetch(url)
        const ct = response.headers.get('content-type') ?? ''
        if (response.ok && !ct.includes('text/html')) {
          buffer = Buffer.from(await response.arrayBuffer())
          break
        }
      }

      if (!buffer) {
        return NextResponse.json({
          error: 'Could not download this file from Google Drive. Download the PDF to your computer and upload it directly instead.',
        }, { status: 400 })
      }

      return await processBuffer(buffer)
    } catch (err) {
      console.error('Drive PDF extraction error:', err)
      return NextResponse.json({ error: `Drive download failed: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 })
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
