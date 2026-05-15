'use client'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './admin-sidebar'

export function AdminLayoutClient({
  children,
  unreadInquiries,
}: {
  children: React.ReactNode
  unreadInquiries: number
}) {
  const pathname = usePathname()
  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex min-h-screen bg-[#F5F7FF]">
      <AdminSidebar unreadInquiries={unreadInquiries} />
      <div className="flex-1 min-w-0 md:ml-60">
        <main className="pt-14 md:pt-0">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
