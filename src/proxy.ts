import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'spg_admin_session'

async function verifyToken(signed: string, secret: string): Promise<boolean> {
  const lastDot = signed.lastIndexOf('.')
  if (lastDot === -1) return false
  const value = signed.slice(0, lastDot)
  const mac = signed.slice(lastDot + 1)

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const sigBytes = Uint8Array.from(
    mac.match(/.{1,2}/g)!.map((b) => parseInt(b, 16))
  )
  const dataBytes = new TextEncoder().encode(value)

  return crypto.subtle.verify('HMAC', key, sigBytes, dataBytes)
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!token || !sessionSecret || !(await verifyToken(token, sessionSecret))) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
