import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'spg_admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET
  if (!s) throw new Error('ADMIN_SESSION_SECRET is not set')
  return s
}

export function signToken(value: string): string {
  const mac = createHmac('sha256', secret()).update(value).digest('hex')
  return `${value}.${mac}`
}

export function verifyToken(signed: string): boolean {
  const lastDot = signed.lastIndexOf('.')
  if (lastDot === -1) return false
  const value = signed.slice(0, lastDot)
  const expected = signToken(value)
  try {
    return timingSafeEqual(Buffer.from(signed), Buffer.from(expected))
  } catch {
    return false
  }
}

export function checkPassword(input: string): boolean {
  const stored = process.env.ADMIN_PASSWORD
  if (!stored) return false
  try {
    return timingSafeEqual(Buffer.from(input), Buffer.from(stored))
  } catch {
    return false
  }
}

export async function createAdminSession() {
  const token = signToken(`admin.${Date.now()}`)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}
