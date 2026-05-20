import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0d2b6e] via-[#0B2A6B] to-[#071640] overflow-hidden">
      {/* Subtle blue orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#125DE5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-[#125DE5]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#125DE5]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-10 md:pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10 md:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 relative">
                <Image src="/logo-symbol-transparent.png" alt="Siribaan Logo" fill sizes="36px" className="object-contain" />
              </div>
              <span className="font-bold text-sm text-white uppercase tracking-wider leading-tight">
                Siribaan<br />
                <span className="text-white">Property</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Redefining luxury real estate through innovation, transparency, and an unwavering appreciation for architecture.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61573484701811" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#125DE5] hover:border-[#125DE5] text-white/50 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/siribaanproperty" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#125DE5] hover:border-[#125DE5] text-white/50 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/66910062564" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#125DE5] hover:border-[#125DE5] text-white/50 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about#contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/properties" className="text-sm text-white/50 hover:text-white transition-colors">Our Properties</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-5">Contact</h4>
            <div className="text-sm text-white/50 space-y-2 leading-relaxed">
              <p>8th Floor, Room No. 828,</p>
              <p>1840 Sukhumvit Rd, Phra Khanong Tai,</p>
              <p>Bangkok 10260</p>
              <a href="tel:+66910062564" className="flex items-center gap-2 pt-1 hover:text-white transition-colors">
                <Phone size={13} className="shrink-0 text-[#125DE5]" />
                091 006 2564
              </a>
              <a href="mailto:info@siribaanproperty.com" className="flex items-center gap-2 hover:text-white transition-colors break-all">
                <Mail size={13} className="shrink-0 text-[#125DE5]" />
                info@siribaanproperty.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 text-center">
          <p className="text-xs text-white/30">© 2026 Siribaan Property Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
