'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function PropertyDetailError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="relative bg-blue-50 min-h-[70vh] flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-indigo-300 blur-3xl opacity-[0.07]" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="relative rounded-2xl border border-white/70 overflow-hidden shadow-[0_8px_40px_rgba(18,93,229,0.12)] px-8 py-12">
          <div className="absolute inset-0 backdrop-blur-xl bg-white/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/40 to-indigo-50/30" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] mb-3">Unable to Load</p>
            <h2
              className="text-2xl font-semibold text-gray-900 mb-3 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Property Details Could<br />
              <span className="italic text-[#125DE5]">Not Be Loaded</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              We had trouble fetching this property. Please try again or explore other listings.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={reset}
                className="bg-[#125DE5] hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm shadow-md shadow-blue-500/20"
              >
                Try Again
              </button>
              <Link
                href="/properties"
                className="border border-[#125DE5]/40 hover:border-[#125DE5] hover:bg-[#125DE5]/5 text-[#125DE5] font-semibold px-6 py-2.5 rounded-full transition-all text-sm"
              >
                All Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
