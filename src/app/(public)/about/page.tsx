import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Award, Globe, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Siribaan Property Group',
  description: 'Learn about Siribaan Property Group — Bangkok\'s leading luxury real estate specialists with a curated portfolio of exclusive residences across Sukhumvit, Riverside, and Thonglor.',
}

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '฿2B+', label: 'Properties Sold' },
  { value: '500+', label: 'Happy Clients' },
  { value: '50+', label: 'Exclusive Listings' },
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
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="Bangkok skyline"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
            Redefining Luxury<br />Real Estate in<br />
            <span className="text-blue-400">South East Asia</span>
          </h1>
          <p className="text-gray-200 text-base max-w-md leading-relaxed">
            Founded with a vision to elevate the property experience, Siribaan Property Group has become Bangkok&apos;s most trusted name in exclusive real estate.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Connecting Discerning Clients<br />with Exceptional Homes
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Siribaan Property Group was established to bridge the gap between Bangkok&apos;s most exceptional residences and the clients who deserve them. We operate at the intersection of heritage and innovation — curating properties that stand as architectural masterpieces and sound long-term investments.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                From sky-high penthouses with panoramic Chao Phraya views to tranquil riverside estates, our portfolio represents the pinnacle of Bangkok luxury living. We serve Bangkok&apos;s elite, expatriate community, and international investors seeking a foothold in one of Asia&apos;s most dynamic property markets.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                View Our Portfolio <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                  alt="Luxury Bangkok property"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
                <p className="text-2xl font-bold text-blue-600">฿145M+</p>
                <p className="text-gray-500 text-xs mt-0.5">Average Listing Value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">What Sets Us Apart</p>
            <h2 className="text-4xl font-bold text-gray-900">The Siribaan Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex gap-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-10">
            Our advisors are available for private consultations. Let us guide you to the perfect residence in Bangkok&apos;s most prestigious districts.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Book a Consultation
            </Link>
            <Link
              href="/properties"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
