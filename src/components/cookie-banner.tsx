'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, ChevronDown, ChevronUp, Check } from 'lucide-react'

const CONSENT_KEY = 'spg_cookie_consent'
const CONSENT_VERSION = '1'

type ConsentState = {
  version: string
  analytics: boolean
  preferences: boolean
  timestamp: string
}

function loadConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function saveConsent(analytics: boolean, preferences: boolean) {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    analytics,
    preferences,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [preferencesEnabled, setPreferencesEnabled] = useState(false)

  useEffect(() => {
    const consent = loadConsent()
    if (!consent) setVisible(true)
  }, [])

  const acceptAll = () => {
    saveConsent(true, true)
    setVisible(false)
  }

  const rejectAll = () => {
    saveConsent(false, false)
    setVisible(false)
  }

  const saveCustom = () => {
    saveConsent(analyticsEnabled, preferencesEnabled)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-5 z-[100] w-[340px] max-w-[calc(100vw-2.5rem)]"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          {/* Liquid glass shell */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_16px_64px_rgba(7,22,64,0.22),0_2px_16px_rgba(18,93,229,0.12)] border border-white/20">

            {/* Frosted glass base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b6e]/55 via-[#0B2A6B]/50 to-[#071640]/60 backdrop-blur-2xl" />

            {/* Liquid orbs */}
            <div className="absolute -top-10 -right-8 w-36 h-36 rounded-full bg-[#125DE5] blur-2xl opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 -left-6 w-28 h-28 rounded-full bg-blue-400 blur-2xl opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-indigo-400 blur-xl opacity-20 pointer-events-none" />

            {/* Shimmer line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10">

              {/* Header */}
              <div className="px-5 pt-5 pb-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie size={15} className="text-blue-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <p id="cookie-title" className="text-white text-sm font-semibold leading-snug">
                    We value your privacy
                  </p>
                  <p className="text-blue-200/70 text-[10px] uppercase tracking-widest mt-0.5">Cookie Preferences</p>
                </div>
                <button
                  onClick={rejectAll}
                  className="text-white/40 hover:text-white/80 transition-colors mt-0.5"
                  aria-label="Reject all and close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-5 h-px bg-white/10" />

              {/* Body */}
              <div className="px-5 py-4">
                <p id="cookie-desc" className="text-blue-100/80 text-[11px] leading-relaxed mb-4">
                  We use cookies to enhance your experience and analyse traffic. Under Thailand&apos;s{' '}
                  <abbr title="Personal Data Protection Act B.E. 2562" className="no-underline">PDPA</abbr>,
                  non-essential cookies require your consent.{' '}
                  <Link href="/privacy-policy#cookies" className="text-blue-300 underline underline-offset-2 hover:text-white transition-colors">
                    Learn more
                  </Link>
                </p>

                {/* Always-on chip */}
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 mb-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/90 text-[11px] font-semibold">Essential Cookies</p>
                    <p className="text-blue-200/50 text-[10px] leading-snug">Required for the site to function.</p>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">Always on</span>
                </div>

                {/* Expandable preferences */}
                <button
                  onClick={() => setExpanded((e) => !e)}
                  className="w-full flex items-center gap-1.5 text-blue-300 text-[11px] font-medium py-1 hover:text-white transition-colors"
                >
                  {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {expanded ? 'Hide' : 'Manage'} preferences
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-2 pb-1">
                        <ToggleRow
                          label="Analytics"
                          desc="Understand how visitors use the site."
                          checked={analyticsEnabled}
                          onChange={setAnalyticsEnabled}
                        />
                        <ToggleRow
                          label="Preferences"
                          desc="Remember your settings across visits."
                          checked={preferencesEnabled}
                          onChange={setPreferencesEnabled}
                        />
                      </div>
                      <button
                        onClick={saveCustom}
                        className="mt-2.5 w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[11px] font-semibold py-2 rounded-xl transition-colors"
                      >
                        Save preferences
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons */}
              <div className="px-5 pb-5 flex gap-2">
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-white/8 hover:bg-white/15 border border-white/15 text-white/70 hover:text-white text-[11px] font-semibold py-2.5 rounded-xl transition-all duration-200"
                >
                  Reject
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-[#125DE5] hover:bg-blue-500 text-white text-[11px] font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-900/40"
                >
                  Accept All
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string
  desc: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  const id = label.replace(/\s+/g, '-').toLowerCase()
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="text-white/85 text-[11px] font-semibold cursor-pointer">{label}</label>
        <p className="text-blue-200/50 text-[10px] leading-snug mt-0.5">{desc}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
          checked ? 'bg-[#125DE5]' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
