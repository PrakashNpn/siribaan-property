import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/admin-auth'

const ALLOWED_HOSTS = ['maps.app.goo.gl', 'maps.google.com', 'www.google.com', 'goo.gl']

function isAllowedMapUrl(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url)
    return protocol === 'https:' && ALLOWED_HOSTS.some((h) => hostname === h)
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const unauth = await requireAdminSession()
  if (unauth) return unauth

  const { url } = await request.json()
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  }

  if (!isAllowedMapUrl(url)) {
    return NextResponse.json({ error: 'URL must be a Google Maps link' }, { status: 400 })
  }

  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    const resolved = response.url
    return NextResponse.json({ resolved })
  } catch {
    return NextResponse.json({ error: 'Failed to resolve URL' }, { status: 500 })
  }
}
