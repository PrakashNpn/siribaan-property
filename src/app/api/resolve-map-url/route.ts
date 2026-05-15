import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { url } = await request.json()
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  }

  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    const resolved = response.url
    return NextResponse.json({ resolved })
  } catch {
    return NextResponse.json({ error: 'Failed to resolve URL' }, { status: 500 })
  }
}
