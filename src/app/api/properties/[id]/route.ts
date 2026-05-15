import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { propertySchema } from '@/features/property/validation'
import { supabaseAdmin } from '@/lib/supabase'
import { resolveShortMapUrl } from '@/lib/utils'

const BUCKET = 'property-images'

function extractStoragePath(publicUrl: string): string | null {
  const marker = `/object/public/${BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return decodeURIComponent(publicUrl.slice(idx + marker.length))
}

async function deleteStorageUrls(urls: string[]) {
  const paths = urls.map(extractStoragePath).filter(Boolean) as string[]
  if (paths.length > 0) {
    await supabaseAdmin.storage.from(BUCKET).remove(paths)
  }
}

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

  // Resolve short Google Maps URLs before saving
  if (parsed.data.mapUrl) {
    parsed.data.mapUrl = await resolveShortMapUrl(parsed.data.mapUrl)
  }

  // Delete removed images from storage
  if (parsed.data.images) {
    try {
      const current = await propertyService.getById(id)
      if (current) {
        const newSet = new Set(parsed.data.images)
        const removed = current.images.filter((url) => !newSet.has(url))
        await deleteStorageUrls(removed)
      }
    } catch { /* storage cleanup failure should not block the update */ }
  }

  try {
    const property = await propertyService.update(id, parsed.data)
    return NextResponse.json(property)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : ''
    if (msg.includes('Unique constraint') && msg.includes('slug')) {
      return NextResponse.json({ message: 'A property with this title already exists. Please use a different title.' }, { status: 409 })
    }
    return NextResponse.json({ message: 'Failed to update property.' }, { status: 500 })
  }
}

async function deleteFolder(folder: string) {
  const { data } = await supabaseAdmin.storage.from(BUCKET).list(folder)
  if (data?.length) {
    const paths = data.map((f) => `${folder}/${f.name}`)
    await supabaseAdmin.storage.from(BUCKET).remove(paths)
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await Promise.all([
      deleteFolder(`properties/${id}/images`),
      deleteFolder(`properties/${id}/unit-types`),
    ])
  } catch { /* storage cleanup failure should not block the delete */ }
  await propertyService.delete(id)
  return NextResponse.json({ success: true })
}
