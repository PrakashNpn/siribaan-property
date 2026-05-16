import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL environment variable is not set')
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const TRANSIENT_CODES = ['EAI_AGAIN', 'ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED']

function isTransient(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return TRANSIENT_CODES.some((code) => msg.includes(code))
}

export async function withRetry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 300): Promise<T> {
  let last: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      last = err
      if (!isTransient(err) || i === attempts - 1) throw err
      await new Promise((r) => setTimeout(r, delayMs * (i + 1)))
    }
  }
  throw last
}
