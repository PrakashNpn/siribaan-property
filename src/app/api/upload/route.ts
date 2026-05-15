import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get('folder')?.replace(/^\/|\/$/g, '') || 'general'

  const formData = await request.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const safeName = file.name.replace(/\s/g, '-')
  const fileName = `${folder}/${Date.now()}-${safeName}`

  const { data, error } = await supabaseAdmin.storage
    .from('property-images')
    .upload(fileName, buffer, { contentType: file.type })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('property-images')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}

export async function DELETE(request: NextRequest) {
  const { url } = await request.json()
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  }

  // Extract the storage path from the public URL
  const match = url.match(/\/object\/public\/property-images\/(.+)$/)
  if (!match) return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })

  const path = decodeURIComponent(match[1])
  const { error } = await supabaseAdmin.storage.from('property-images').remove([path])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
