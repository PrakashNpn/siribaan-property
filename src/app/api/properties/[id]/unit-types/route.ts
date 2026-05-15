import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { unitTypeSchema } from '@/features/property/validation'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const parsed = unitTypeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  try {
    const unitType = await propertyService.createUnitType(id, parsed.data)
    return NextResponse.json(unitType, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Failed to create unit type.' }, { status: 500 })
  }
}
