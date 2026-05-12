'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Award, Users, Shield } from 'lucide-react'
import { motion, animate, useInView } from 'framer-motion'
import { PropertyCard } from '@/features/property/components/property-card'
import { Property } from '@/features/property/types'


interface HomeClientProps {
  featured: Property[]
}

// ── Wave dividers ──────────────────────────────────────────────────────────────

function WaveUp({ fill = '#ffffff' }: { fill?: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 leading-none overflow-hidden pointer-events-none">
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-[4.5rem]">
        <path d="M0,0 L1440,0 L1440,28 Q720,52 0,28 Z" fill={fill} />
      </svg>
    </div>
  )
}

function WaveDown({ fill = '#ffffff' }: { fill?: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 leading-none overflow-hidden pointer-events-none">
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-[4.5rem]">
        <path d="M0,42 Q720,18 1440,42 L1440,70 L0,70 Z" fill={fill} />
      </svg>
    </div>
  )
}

// ── Animation helpers ──────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

const slideIn = (dir: 'left' | 'right') => ({
  initial: { opacity: 0, x: dir === 'left' ? -40 : 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

const fadeInView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

// ── Types ──────────────────────────────────────────────────────────────────────


// ── Counter stat ───────────────────────────────────────────────────────────────

function CounterStat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  const match = value.match(/^([^0-9]*)(\d+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const num = parseInt(match?.[2] ?? '0')
  const suffix = match?.[3] ?? ''

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, num, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    })
    return () => controls.stop()
  }, [inView, num])

  return (
    <motion.div
      ref={ref}
      {...fadeInView(index * 0.12)}
      className="bg-gradient-to-br from-white to-blue-100/80 rounded-xl py-3 px-2 md:py-4 md:px-3 text-center flex flex-col items-center border border-white/80 shadow-[0_4px_24px_rgba(18,93,229,0.08)] hover:shadow-[0_8px_32px_rgba(18,93,229,0.15)] transition-shadow duration-300"
    >
      <div className="w-5 h-0.5 bg-amber-400 mb-3" />
      <p className="text-3xl md:text-4xl font-bold text-[#125DE5] mb-2 tabular-nums leading-none">
        {prefix && <span className="text-2xl md:text-3xl font-bold">{prefix}</span>}
        <span style={{ fontFamily: 'var(--font-display)' }}>{display}{suffix}</span>
      </p>
      <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">{label}</p>
    </motion.div>
  )
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: '250+', label: 'Properties Listed' },
  { value: '12', label: 'Years of Excellence' },
  { value: '฿50B+', label: 'Portfolio Value' },
  { value: '500+', label: 'Families Served' },
]

const VALUE_PROPS = [
  { Icon: Award, title: 'Curated Portfolio', desc: 'Every listing is hand-selected against strict standards for location, craftsmanship, and long-term investment value.' },
  { Icon: Users, title: 'End-to-End Advisory', desc: 'From initial search to final contract, our team guides every step of your property journey.' },
  { Icon: Shield, title: 'Transparent Process', desc: 'No hidden fees, no surprises — full clarity and honest guidance at every stage of the transaction.' },
]

// ── Main export ────────────────────────────────────────────────────────────────

export function HomeClient({ featured }: HomeClientProps) {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[88vh] min-h-[640px] overflow-hidden">

        {/* Pure white base — desktop */}
        <div className="hidden lg:block absolute inset-0 z-0 bg-white" />
        {/* Brand-blue orb — top-left */}
        <div className="hidden lg:block absolute z-0 -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1] pointer-events-none" />
        {/* Indigo orb — bottom-right of left panel */}
        <div className="hidden lg:block absolute z-0 bottom-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-400 blur-3xl opacity-[0.15] pointer-events-none" />
        {/* Brand-blue orb — bottom-right, glows in uncovered area below photo clip */}
        <div className="hidden lg:block absolute z-0 bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.12] pointer-events-none" />
        {/* Subtle blue tint on right half base */}
        <div className="hidden lg:block absolute inset-0 z-0 bg-gradient-to-l from-blue-50/40 via-transparent to-transparent pointer-events-none" />

        {/*
          Desktop photo panel — blue outer div + inner photo creates the framed look.
          Outer blue div: starts at 48% from left, has large border-bottom-left-radius.
          Inner photo: inset 70px from left + bottom of outer, revealing blue on left edge + bottom curve.
          No SVG needed — pure CSS border-radius achieves the reference design.
        */}
        {/*
          Two-layer approach: blue div (wider clip) behind photo div (narrower clip).
          Gap between clips = the visible blue border.

          SVG bezier clip-paths (objectBoundingBox coords 0–1):
          Elbow at ~65% from left. Border: 30px diagonal (2.5% gap), 30px horizontal (3.7% gap).
          Photo: diagonal 0.35→0.65, cubic bezier C(0.67,0.87)(0.66,0.83) to horizontal at y=0.87
          Blue:  diagonal 0.325→0.625, cubic bezier C(0.66,0.907)(0.64,0.843) to horizontal at y=0.907
        */}
        {/* SVG clip-path definitions — zero-size, no visual output */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="hidden lg:block"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'visible' }}
        >
          <defs>
            <clipPath id="spg-blue-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1,0 L 1,0.895 L 0.57,0.895 C 0.49,0.895 0.47,0.843 0.45,0.80 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Photo — starts at 33.3% so object-cover fills only the visible panel */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute top-0 right-0 bottom-0 z-[1] overflow-hidden"
          style={{ left: '33.3%', clipPath: 'url(#spg-blue-clip)' }}
        >
          <Image
            src="/hero.png"
            alt="Luxury residence"
            fill
            className=""
            priority
            sizes="60vw"
          />
        </motion.div>

        {/* Blue border strip — SVG fill drawn on top of the photo edge */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 z-[2] w-full h-full pointer-events-none"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          <path
            d="M 0.333,0 L 0.35,0 L 0.65,0.80 C 0.66,0.83 0.67,0.87 0.71,0.87 L 1,0.87 L 1,0.895 L 0.71,0.895 C 0.66,0.895 0.648,0.843 0.633,0.80 Z"
            fill="#125DE5"
          />
        </motion.svg>

        {/* Mobile: full-bleed background */}
        <div className="lg:hidden absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Luxury residence"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-900/78" />
        </div>

        {/* Hero content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="md:max-w-[58%] lg:max-w-[38%]">

              <motion.p
                {...fadeUp(0)}
                className="text-blue-600 text-xs font-bold uppercase tracking-[0.25em] mb-4 md:mb-6 lg:mb-8"
              >
                Premier Real Estate Authority
              </motion.p>

              {/* 4-line alternating headline */}
              <div className="mb-6 md:mb-8">
                <motion.p
                  {...fadeUp(0.1)}
                  className="text-3xl sm:text-4xl lg:text-[3rem] font-black text-white lg:bg-gradient-to-br lg:from-slate-700 lg:to-blue-700 lg:bg-clip-text lg:text-transparent leading-none tracking-tight"
                >
                  DISCOVER YOUR
                </motion.p>
                <motion.p
                  {...fadeUp(0.2)}
                  className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold italic text-white lg:text-gray-900 leading-[1.08]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Perfect Residence
                </motion.p>
                <motion.p
                  {...fadeUp(0.3)}
                  className="text-3xl sm:text-4xl lg:text-[3rem] font-black text-white lg:bg-gradient-to-br lg:from-slate-700 lg:to-blue-700 lg:bg-clip-text lg:text-transparent leading-none tracking-tight pt-1"
                >
                  WHERE LUXURY
                </motion.p>
                <motion.p
                  {...fadeUp(0.4)}
                  className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold italic text-blue-300 lg:text-blue-600 leading-[1.08]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Finds Its Home
                </motion.p>
              </div>

              {/* Blue accent rule */}
              <motion.div {...fadeUp(0.45)} className="w-12 h-0.5 bg-blue-500 mb-5 md:mb-6" />

              <motion.p
                {...fadeUp(0.5)}
                className="text-gray-300 lg:text-gray-500 text-sm mb-7 md:mb-8 leading-relaxed max-w-sm sm:max-w-md lg:max-w-xl"
              >
                Where architectural brilliance meets refined living. We present exceptional residences to discerning buyers who appreciate the difference between a house and a home.
              </motion.p>

              <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/properties"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  View Properties
                </Link>
                <Link
                  href="/about#contact"
                  className="bg-white/15 hover:bg-white/25 backdrop-blur text-white lg:bg-transparent lg:hover:bg-blue-50 lg:text-blue-900 font-semibold px-7 py-3.5 rounded-full transition-colors text-sm border border-white/30 lg:border-blue-900/25"
                >
                  Book Consultation
                </Link>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                {...fadeUp(0.8)}
                className="hidden lg:flex items-center gap-3 mt-14"
              >
                <motion.div
                  className="w-px h-10 bg-blue-900/25 origin-top"
                  animate={{ scaleY: [1, 0.35, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                />
                <span className="text-blue-900/40 text-xs uppercase tracking-[0.2em]">
                  Scroll to explore
                </span>
              </motion.div>

            </div>
          </div>
        </div>

      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
      <section className="relative py-10 md:py-14 overflow-hidden bg-gradient-to-b from-[#0d2b6e] via-[#0B2A6B] to-[#071640] -mt-1">
        <WaveUp />
        {/* Orb — top-left */}
        {/* <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none" /> */}
        {/* Orb — bottom-right */}
        {/* <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-indigo-500 rounded-full blur-3xl opacity-10 pointer-events-none" /> */}

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid py-6 grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s, i) => (
              <CounterStat key={s.label} value={s.value} label={s.label} index={i} />
            ))}
          </div>
        </div>
        <WaveDown />
      </section>

      {/* ── ABOUT SPLIT ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.08] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[420px] h-[420px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Left: image fills column, no padding */}
          <motion.div {...slideIn('left')} className="relative min-h-[360px] lg:min-h-0">
            <Image
              src="/about-siribaan.png"
              alt="Siribaan luxury living"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Right: content with its own padding */}
          <motion.div {...slideIn('right')} className="flex flex-col justify-center py-20 px-8 lg:px-12 xl:px-16">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-blue-600 inline-block" />
              About Siribaan
            </p>
            <h2
              className="text-4xl md:text-5xl font-semibold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Redefining High-End<br />
              <span className="italic text-blue-600">Real Estate in Asia.</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">
              Experience a seamless blend of heritage and high-end innovation. Siribaan Property Group curates the most exclusive residences across Asia's most sought-after addresses — where architectural brilliance meets the pinnacle of luxury living.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm">
              Every property in our portfolio undergoes a rigorous selection process, ensuring it meets our exacting standards for location, craftsmanship, and long-term investment value.
            </p>

            <div className="space-y-5 mb-8">
              {VALUE_PROPS.map(({ Icon, title, desc }, i) => (
                <motion.div key={title} {...fadeInView(i * 0.1)} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">{title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all">
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </motion.div>

          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ───────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 bg-gray-50 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="mb-10">
            <motion.div {...fadeInView(0)}>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-blue-600 inline-block" />
                Our Portfolio
              </p>
              <h2
                className="text-4xl font-semibold text-gray-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Featured Residences
              </h2>
              <div className="w-12 h-0.5 bg-amber-400 mt-3 mb-3" />
              <p className="text-gray-400 text-sm">The current highlights of our curated portfolio.</p>
            </motion.div>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-sm">Add properties from the admin panel to see them here.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              }}
            >
              {featured.slice(0, 6).map((property) => (
                <motion.div
                  key={property.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div {...fadeInView(0.2)} className="mt-12 text-center">
            <Link href="/properties" className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 text-sm">
              View All Properties <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInView(0)}
            className="relative rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(7,22,64,0.25)] border border-white/5"
            style={{ background: 'linear-gradient(135deg, #0C3BAF 0%, #0A2E8A 50%, #071E6B 100%)' }}
          >
            {/* Animated liquid orbs */}
            <motion.div
              className="absolute w-[550px] h-[550px] rounded-full blur-3xl opacity-[0.45] pointer-events-none"
              style={{ background: '#125DE5', top: '-30%', left: '-10%' }}
              animate={{ x: [-60, 40, -80], y: [-40, 80, -20] }}
              transition={{ duration: 13, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.35] pointer-events-none"
              style={{ background: '#3B82F6', bottom: '-25%', right: '-8%' }}
              animate={{ x: [60, -80, 60], y: [40, -60, 50] }}
              transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 }}
            />
            <motion.div
              className="absolute w-[320px] h-[320px] rounded-full blur-3xl opacity-[0.25] pointer-events-none"
              style={{ background: '#60A5FA', top: '20%', right: '15%' }}
              animate={{ x: [-30, 70, -20], y: [50, -40, 60] }}
              transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 3 }}
            />

            {/* Content */}
            <div className="relative z-10 py-12 px-8 md:px-16 text-center">
              <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.25em] mb-5">
                Start Your Journey
              </p>
              <h2
                className="text-5xl md:text-6xl font-semibold italic text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Begin Your Luxurious Journey.
              </h2>
              <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-6" />
              <p className="text-blue-200 text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Your next chapter begins with a conversation. Let our advisors guide you to the residence that reflects your vision, lifestyle, and ambitions.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/about#contact" className="bg-white hover:bg-gray-50 text-blue-900 font-semibold px-8 py-3.5 rounded-full transition-colors duration-300 text-sm">
                  Schedule a Viewing
                </Link>
                <Link href="/about#contact" className="border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
