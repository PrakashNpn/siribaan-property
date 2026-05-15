import { prisma, withRetry } from '@/lib/prisma'
import { AdminLayoutClient } from './layout-client'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const unreadInquiries = await withRetry(() =>
    prisma.inquiry.count({ where: { read: false } })
  ).catch(() => 0)

  return (
    <AdminLayoutClient unreadInquiries={unreadInquiries}>
      {children}
    </AdminLayoutClient>
  )
}
