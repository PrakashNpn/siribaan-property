import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { propertySchema } from '@/features/property/validation'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await propertyService.getById(id)
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(property)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const parsed = propertySchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const property = await propertyService.update(id, parsed.data)
  return NextResponse.json(property)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await propertyService.delete(id)
  return NextResponse.json({ success: true })
}
