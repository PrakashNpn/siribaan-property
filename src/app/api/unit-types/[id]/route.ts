import { NextRequest, NextResponse } from 'next/server'
import { propertyService } from '@/features/property/server/property.service'
import { unitTypeSchema } from '@/features/property/validation'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdminSession } from '@/lib/admin-auth'

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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await requireAdminSession()
  if (unauth) return unauth

  const { id } = await params
  const body = await request.json()
  const parsed = unitTypeSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  // Delete removed images from storage
  if (parsed.data.images) {
    try {
      const current = await propertyService.getUnitTypeById(id)
      if (current) {
        const newSet = new Set(parsed.data.images)
        const removed = current.images.filter((url) => !newSet.has(url))
        await deleteStorageUrls(removed)
      }
    } catch { /* storage cleanup failure should not block the update */ }
  }

  try {
    const unitType = await propertyService.updateUnitType(id, parsed.data)
    return NextResponse.json(unitType)
  } catch {
    return NextResponse.json({ message: 'Failed to update unit type.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await requireAdminSession()
  if (unauth) return unauth

  const { id } = await params

  // Clean up storage before deleting from DB
  try {
    const current = await propertyService.getUnitTypeById(id)
    if (current?.images.length) {
      await deleteStorageUrls(current.images)
    }
  } catch { /* storage cleanup failure should not block the delete */ }

  await propertyService.deleteUnitType(id)
  return NextResponse.json({ success: true })
}
