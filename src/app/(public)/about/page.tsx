import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Award, Globe, Users, ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { InquiryForm } from '@/features/inquiry/components/inquiry-form'
import { MapEmbed } from '@/components/map-embed'
import { AnimateIn, AnimateInView } from '@/components/animate-in'
import { organizationJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Siribaan Property Group — Bangkok\'s leading luxury real estate specialists with a curated portfolio of exclusive residences across Sukhumvit, Riverside, and Thonglor.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Siribaan Property Group',
    description: 'Learn about Siribaan Property Group — Bangkok\'s leading luxury real estate specialists with a curated portfolio of exclusive residences across Sukhumvit, Riverside, and Thonglor.',
    images: [{ url: '/og-about.jpg', width: 1200, height: 630, alt: 'Siribaan Property Group team and office' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Siribaan Property Group',
    description: 'Learn about Siribaan Property Group — Bangkok\'s leading luxury real estate specialists.',
    images: ['/og-about.jpg'],
  },
}

const OFFICE_ADDRESS = '1840 Sukhumvit Rd, Phra Khanong Tai, Bangkok 10260'

const stats = [
  { value: '250+', label: 'Properties Listed' },
  { value: '12', label: 'Years of Excellence' },
  { value: '฿50B+', label: 'Portfolio Value' },
  { value: '500+', label: 'Families Served' },
]

const values = [
  {
    icon: Award,
    title: 'Certified Expertise',
    description: 'Our advisors hold international real estate certifications and deep knowledge of Bangkok\'s luxury market dynamics.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connected to a worldwide network of ultra-high-net-worth investors, developers, and real estate institutions.',
  },
  {
    icon: Users,
    title: 'Client-First Philosophy',
    description: 'Every engagement is bespoke. We listen first, then curate — ensuring each client finds their perfect residence.',
  },
  {
    icon: CheckCircle,
    title: 'Rigorous Selection',
    description: 'Every property in our portfolio passes a strict vetting process for location, craftsmanship, and investment value.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* HERO — contained image + overlapping liquid card */}
      <section className="relative bg-blue-50 pt-6 md:pt-10 pb-0">

        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.08]" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

          {/* Contained hero image */}
          <AnimateIn delay={0} duration={0.7} direction="none">
            <div className="relative h-[48vh] md:h-[55vh] rounded-3xl overflow-hidden">
              <Image
                src="/siriban-about-hero.png"
                alt="Siribaan Property Group"
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover object-right-bottom"
                priority
              />
              <div className="absolute inset-0 bg-[#125DE5]/10" />
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-blue-50/70" />

              {/* Eyebrow */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] flex items-center gap-2">
                  <span className="w-6 h-px bg-[#125DE5]" />
                  Our Story
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Overlapping liquid card — narrower, centered */}
          <AnimateIn delay={0.2} duration={0.7} direction="up" className="relative -mt-24 md:-mt-40 z-10 pb-10 md:pb-16 flex justify-center">
            <div className="relative w-full max-w-4xl rounded-3xl shadow-[0_24px_80px_rgba(18,93,229,0.22),_0_4px_24px_rgba(18,93,229,0.10)] border border-white/70 overflow-hidden">

              {/* Layer 1 — backdrop blur */}
              <div className="absolute inset-0 backdrop-blur-2xl bg-white/50" />
              {/* Layer 2 — colored gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white/60 to-indigo-100/50" />
              {/* Layer 3 — orbs */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#125DE5] blur-3xl opacity-[0.22] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-500 blur-3xl opacity-[0.16] pointer-events-none" />
              <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-52 h-52 rounded-full bg-blue-400 blur-3xl opacity-[0.10] pointer-events-none" />
              {/* Layer 4 — top shimmer highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

              {/* Card content */}
              <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">

                {/* Eyebrow */}
                <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] flex items-center gap-2 mb-5">
                  <span className="w-6 h-px bg-[#125DE5]" />
                  Siribaan Property Group
                </p>

                {/* Heading + body side by side */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-6 md:gap-8 items-center mb-8">

                  <h1
                    className="text-3xl md:text-4xl xl:text-[2.75rem] font-semibold leading-[1.12] text-gray-900"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Where Excellence<br />
                    Meets <span className="italic text-[#125DE5]">Extraordinary</span><br />
                    Living
                  </h1>

                  {/* Divider */}
                  <div className="hidden md:block w-px self-stretch bg-[#125DE5]/15" />

                  {/* Right */}
                  <div className="flex flex-col gap-5">
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Where architectural excellence meets uncompromising service — curating extraordinary residences for those who demand the finest in every detail.
                    </p>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                      <Link
                        href="/properties"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#125DE5] hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-blue-500/25"
                      >
                        View Properties <ArrowRight size={13} />
                      </Link>
                      <a
                        href="#contact"
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-[#125DE5]/40 hover:border-[#125DE5] hover:bg-[#125DE5]/5 text-[#125DE5] font-semibold px-4 py-2.5 rounded-full text-sm transition-all"
                      >
                        Get in Touch
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#125DE5]/12">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p
                        className="text-xl md:text-2xl font-semibold text-[#125DE5] leading-none mb-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* MISSION — bento grid */}
      <section className="relative bg-blue-50 py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.06]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-300 blur-3xl opacity-[0.07]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 space-y-4">

          {/* Top row — text card + photo card */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* Large text card */}
            <AnimateInView delay={0} direction="left" className="lg:col-span-3">
              <div className="bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] p-8 md:p-10 flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] flex items-center gap-2 mb-6">
                    <span className="w-6 h-px bg-[#125DE5]" />
                    Our Mission
                  </p>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-gray-900 mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Connecting Discerning<br />
                    Clients with <span className="italic text-[#125DE5]">Exceptional</span><br />
                    Homes
                  </h2>
                  <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg">
                    Established to bridge the gap between the world&apos;s most exceptional residences and the clients who deserve them — we operate at the intersection of heritage and innovation, curating properties that stand as architectural masterpieces and sound long-term investments.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 bg-[#125DE5] hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm shadow-lg shadow-blue-500/20"
                  >
                    View Properties <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </AnimateInView>

            {/* Photo card */}
            <AnimateInView delay={0.15} direction="right" className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[340px] lg:min-h-full">
                <Image
                  src="/about-siribaans.png"
                  alt="Siribaan Property"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#125DE5]/10" />
              </div>
            </AnimateInView>

          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="relative bg-blue-50 py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-300 blur-3xl opacity-[0.08]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

          {/* Header */}
          <AnimateInView delay={0} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] flex items-center justify-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#125DE5]" />
              What Sets Us Apart
              <span className="w-6 h-px bg-[#125DE5]" />
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The <span className="italic text-[#125DE5]">Siribaan</span> Standard
            </h2>
          </AnimateInView>

          {/* 2×2 premium liquid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, description }, index) => (
              <AnimateInView key={title} delay={index * 0.1} direction="up">
                <div className="relative rounded-2xl shadow-[0_8px_40px_rgba(18,93,229,0.18),_0_2px_12px_rgba(18,93,229,0.08)] border border-white/70 overflow-hidden p-5 md:p-7 flex gap-4 md:gap-5">
                  {/* Layer 1 — backdrop blur */}
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/70" />
                  {/* Layer 2 — gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/40 to-indigo-50/30" />
                  {/* Layer 3 — orbs */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#125DE5] blur-2xl opacity-[0.08] pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-400 blur-2xl opacity-[0.06] pointer-events-none" />
                  {/* Layer 4 — shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="w-12 h-12 rounded-2xl bg-[#125DE5]/15 border border-[#125DE5]/20 flex items-center justify-center shrink-0 relative z-10">
                    <Icon size={20} className="text-[#125DE5]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative bg-blue-50 py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-300 blur-3xl opacity-[0.07]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

          {/* Header */}
          <AnimateInView delay={0} className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#125DE5]" />
              Get in Touch
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Let&apos;s Find Your <span className="italic text-[#125DE5]">Perfect Home</span>
            </h2>
          </AnimateInView>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* FORM — liquid glass */}
            <AnimateInView delay={0.1} direction="left">
              <div className="relative rounded-2xl shadow-[0_8px_40px_rgba(18,93,229,0.18),_0_2px_12px_rgba(18,93,229,0.08)] border border-white/70 overflow-hidden p-5 sm:p-8">
                <div className="absolute inset-0 backdrop-blur-xl bg-white/70" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/40 to-indigo-50/30" />
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#125DE5] blur-2xl opacity-[0.08] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Send an Inquiry</h3>
                  <p className="text-gray-400 text-sm mb-6">We typically respond within 2 business hours.</p>
                  <InquiryForm variant="contact" />
                </div>
              </div>
            </AnimateInView>

            {/* INFO CARDS */}
            <AnimateInView delay={0.2} direction="right">
              <div className="space-y-4">

                {/* Office */}
                <div className="relative rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] border border-white/70 overflow-hidden p-6 flex items-start gap-4">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/70" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/30 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                  <div className="w-10 h-10 rounded-xl bg-[#125DE5]/10 border border-[#125DE5]/20 flex items-center justify-center shrink-0 relative z-10">
                    <MapPin size={18} className="text-[#125DE5]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-gray-900 text-base mb-1">Our Office</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      8th Floor, Room No. 828,<br />
                      1840 Sukhumvit Rd, Phra Khanong Tai,<br />
                      Bangkok 10260
                    </p>
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] border border-white/70 overflow-hidden p-6 flex items-start gap-4">
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/70" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/30 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                    <div className="w-10 h-10 rounded-xl bg-[#125DE5]/10 border border-[#125DE5]/20 flex items-center justify-center shrink-0 relative z-10">
                      <Phone size={18} className="text-[#125DE5]" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-gray-900 text-base mb-1">Direct Line</h3>
                      <a href="tel:+66910062564" className="text-gray-800 font-semibold text-sm hover:text-[#125DE5] transition-colors">
                        091 006 2564
                      </a>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={11} className="text-gray-400" />
                        <p className="text-gray-400 text-xs">9 AM – 6 PM (ICT)</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] border border-white/70 overflow-hidden p-6 flex items-start gap-4">
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/70" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/30 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                    <div className="w-10 h-10 rounded-xl bg-[#125DE5]/10 border border-[#125DE5]/20 flex items-center justify-center shrink-0 relative z-10">
                      <Mail size={18} className="text-[#125DE5]" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-gray-900 text-base mb-1">Email</h3>
                      <a href="mailto:info@siribaanproperty.com" className="text-gray-800 font-semibold text-sm hover:text-[#125DE5] transition-colors break-all">
                        info@siribaanproperty.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Brand CTA card — curved ribbon shape */}
                <div
                  className="relative h-[120px] sm:h-[110px] md:h-[100px]"
                  style={{ filter: 'drop-shadow(0 8px 28px rgba(18,93,229,0.30))' }}
                >
                  <svg
                    viewBox="0 0 500 110"
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="rbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d4fd4" />
                        <stop offset="100%" stopColor="#125DE5" />
                      </linearGradient>
                      <linearGradient id="rbFold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#082fa8" />
                        <stop offset="100%" stopColor="#0a3bbf" />
                      </linearGradient>
                    </defs>
                    <polygon points="0,18 45,0 32,38" fill="url(#rbFold)" />
                    <polygon points="0,92 45,110 32,72" fill="url(#rbFold)" />
                    <polygon points="500,18 455,0 468,38" fill="url(#rbFold)" />
                    <polygon points="500,92 455,110 468,72" fill="url(#rbFold)" />
                    <path
                      d="M 45,0 Q 270,10 455,4 Q 478,8 500,18 Q 478,36 468,55 Q 478,74 500,92 Q 478,102 455,110 Q 270,100 45,110 Q 18,102 0,92 Q 22,74 32,55 Q 22,36 0,18 Q 18,8 45,0 Z"
                      fill="url(#rbGrad)"
                    />
                    <path
                      d="M 45,0 Q 270,10 455,4 Q 468,6 480,12 Q 468,16 455,14 Q 270,22 45,14 Q 25,10 8,12 Q 18,6 45,0 Z"
                      fill="white"
                      opacity="0.08"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-14 md:px-16">
                    <h3 className="font-bold text-sm sm:text-base text-white mb-1 sm:mb-1.5">Begin Your Journey</h3>
                    <p className="text-blue-100 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">
                      Every extraordinary home starts with a conversation. Our advisors are ready to guide you toward the residence you deserve.
                    </p>
                  </div>
                </div>

              </div>
            </AnimateInView>
          </div>

          {/* MAP */}
          <AnimateInView delay={0.1} className="mt-6">
            <MapEmbed address={OFFICE_ADDRESS} height="h-80" />
          </AnimateInView>

        </div>
      </section>
    </>
  )
}
