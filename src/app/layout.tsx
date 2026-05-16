import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader'
import { organizationJsonLd } from '@/lib/jsonld'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const BASE = 'https://siribaanproperty.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Siribaan Property Group | Bangkok Luxury Real Estate',
    template: '%s | Siribaan Property Group',
  },
  description: 'Premium luxury real estate in Bangkok. Discover exclusive properties in Sukhumvit, Riverside, and Thonglor.',
  openGraph: {
    siteName: 'Siribaan Property Group',
    type: 'website',
    locale: 'en_US',
    url: BASE,
    title: 'Siribaan Property Group | Bangkok Luxury Real Estate',
    description: 'Premium luxury real estate in Bangkok. Discover exclusive properties in Sukhumvit, Riverside, and Thonglor.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Siribaan Property Group — Bangkok Luxury Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siribaan Property Group | Bangkok Luxury Real Estate',
    description: 'Premium luxury real estate in Bangkok. Discover exclusive properties in Sukhumvit, Riverside, and Thonglor.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${cormorant.variable} ${inter.className}`}>
        <NextTopLoader color="#125DE5" height={3} showSpinner={false} easing="ease" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
