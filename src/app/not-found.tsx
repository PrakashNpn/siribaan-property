import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-blue-50 relative overflow-hidden flex flex-col">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-300 blur-3xl opacity-[0.08]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.05]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center py-24">

        {/* Logo */}
        <div className="w-14 h-14 relative mb-8">
          <Image src="/logo-symbol.png" alt="Siribaan Logo" fill sizes="56px" className="object-contain" />
        </div>

        {/* Glass card */}
        <div className="relative w-full max-w-lg rounded-3xl border border-white/70 overflow-hidden shadow-[0_24px_80px_rgba(18,93,229,0.15),_0_4px_24px_rgba(18,93,229,0.08)] px-8 py-12">
          <div className="absolute inset-0 backdrop-blur-2xl bg-white/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-white/50 to-indigo-100/40" />
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#125DE5] blur-3xl opacity-[0.15] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#125DE5] mb-4">
              404 — Page Not Found
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.1] mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              This Page Has<br />
              <span className="italic text-[#125DE5]">Left the Building</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
              The page you&apos;re looking for may have moved or no longer exists. Let us guide you back to Bangkok&apos;s finest residences.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link
                href="/"
                className="bg-[#125DE5] hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm shadow-lg shadow-blue-500/25"
              >
                Back to Home
              </Link>
              <Link
                href="/properties"
                className="border border-[#125DE5]/40 hover:border-[#125DE5] hover:bg-[#125DE5]/5 text-[#125DE5] font-semibold px-7 py-3 rounded-full transition-all text-sm"
              >
                View Properties
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
