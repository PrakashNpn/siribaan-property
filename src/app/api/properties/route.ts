import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { propertySchema, unitTypeSchema } from '@/features/property/validation'
import { resolveShortMapUrl } from '@/lib/utils'
import { z } from 'zod'

const createPropertySchema = propertySchema.extend({
  unitTypes: z.array(unitTypeSchema).optional(),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location') || undefined
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
  const type = searchParams.get('type') || undefined
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined
  const pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined

  const result = await propertyService.getAll({ location, minPrice, maxPrice, type }, { page, pageSize })
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = createPropertySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const { unitTypes, ...propertyData } = parsed.data
  if (propertyData.mapUrl) {
    propertyData.mapUrl = await resolveShortMapUrl(propertyData.mapUrl)
  }
  try {
    const property = await propertyService.createWithUnitTypes(propertyData, unitTypes ?? [])
    return NextResponse.json(property, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[POST /api/properties]', msg)
    if (msg.includes('Unique constraint') && msg.includes('slug')) {
      return NextResponse.json({ message: 'A property with this title already exists. Please use a different title.' }, { status: 409 })
    }
    return NextResponse.json({ message: 'Failed to create property.', detail: msg }, { status: 500 })
  }
}
