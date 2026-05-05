import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 relative">
                <Image src="/logo/logo.png" alt="Siribaan Logo" fill sizes="36px" className="object-contain" />
              </div>
              <span className="font-bold text-sm text-blue-600 uppercase tracking-wider leading-tight">
                Siribaan<br />Property Group
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Redefining luxury real estate in Bangkok through innovation, transparency, and architectural appreciation.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="https://facebook.com/siribaanproperty" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-500 transition-colors group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/siribaanproperty" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-500 transition-colors group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/66910062564" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-500 transition-colors group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Properties</h4>
            <ul className="space-y-3">
              {['Sukhumvit Residences', 'Riverside Penthouses', 'Thonglor Estates', 'New Developments'].map((item) => (
                <li key={item}>
                  <Link href="/properties" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h4>
            <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
              <p>8th Floor, Room 828, 1840</p>
              <p>Sukhumvit Rd, Bangkok.</p>
              <p>T: <a href="tel:+66910062564" className="hover:text-blue-600 transition-colors">091 006 2564</a></p>
              <p>E: <a href="mailto:concierge@siribaan.com" className="hover:text-blue-600 transition-colors">concierge@siribaan.com</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">© 2024 Siribaan Property Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
