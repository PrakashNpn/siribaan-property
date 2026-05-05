import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { propertySchema } from '@/features/property/validation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location') || undefined
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
  const type = searchParams.get('type') || undefined

  const properties = await propertyService.getAll({ location, minPrice, maxPrice, type })
  return NextResponse.json(properties)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = propertySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const property = await propertyService.create(parsed.data)
  return NextResponse.json(property, { status: 201 })
}
