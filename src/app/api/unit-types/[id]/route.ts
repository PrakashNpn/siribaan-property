import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { unitTypeSchema } from '@/features/property/validation'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const parsed = unitTypeSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const unitType = await propertyService.updateUnitType(id, parsed.data)
  return NextResponse.json(unitType)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await propertyService.deleteUnitType(id)
  return NextResponse.json({ success: true })
}
