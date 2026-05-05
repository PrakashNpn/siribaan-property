import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <div className="w-16 h-16 relative mb-6">
        <Image src="/logo/logo.png" alt="Siribaan Logo" fill sizes="64px" className="object-contain" />
      </div>
      <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">404 — Page Not Found</p>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        This Page Has<br />Left the Building
      </h1>
      <p className="text-gray-500 text-base max-w-md mb-10 leading-relaxed">
        The page you&apos;re looking for may have moved or no longer exists. Let us guide you back to Bangkok&apos;s finest residences.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/properties"
          className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
        >
          View Properties
        </Link>
      </div>
    </div>
  )
}
