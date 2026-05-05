import Image from 'next/image'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <Image src="/logo/logo.png" alt="Siribaan Logo" fill sizes="32px" className="object-contain" />
            </div>
            <span className="font-bold text-gray-900">Siribaan Admin</span>
          </div>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">← View Site</a>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
