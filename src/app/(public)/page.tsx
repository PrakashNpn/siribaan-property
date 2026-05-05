import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featured = await propertyService.getFeatured(4)

  return (
    <>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt="Bangkok skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">The Pinnacle of Bangkok Luxury</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-xl mb-6">
            The Pinnacle of<br />Bangkok Luxury
          </h1>
          <p className="text-gray-200 text-base max-w-md mb-8 leading-relaxed">
            Curating Thailand&apos;s most prestigious residences with architectural excellence. Discover an elite collection of Bangkok&apos;s finest masterpieces.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/properties" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm">
              View Properties
            </Link>
            <Link href="/contact" className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm border border-white/30">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-blue-900 rounded-2xl overflow-hidden aspect-[4/5] relative">
                <Image
                  src="https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80"
                  alt="Siribaan"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="w-10 h-10 mb-2">
                      <svg viewBox="0 0 100 100" fill="#60A5FA">
                        <path d="M50 5 L90 35 L90 30 L50 5 L10 30 L10 35 Z"/>
                        <path d="M50 15 C35 25 20 45 20 65 C20 80 35 90 50 90 C65 90 80 80 80 65 C80 45 65 25 50 15 Z M50 80 C38 80 30 73 30 65 C30 50 40 35 50 25 C60 35 70 50 70 65 C70 73 62 80 50 80 Z"/>
                      </svg>
                    </div>
                    <p className="text-white text-sm font-bold">SIRIBAAN</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Redefining High-End Real Estate<br />
                <span className="text-blue-600">in South East Asia.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Experience a seamless blend of heritage and high-end innovation. Siribaan Property Group curates the most exclusive residences across Phrom Phong, Sathorn, and the Riverside, where liquid minimalism meets the pinnacle of luxury living.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every property in our portfolio undergoes a rigorous selection process, ensuring it meets our exacting standards for location, craftsmanship, and long-term investment value.
              </p>
              <ul className="space-y-3">
                {['Certified Luxury Specialists', 'Exclusive Off-Market Portfolio', 'Global Network & Recognition'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                    <CheckCircle size={18} className="text-blue-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Residences</h2>
              <p className="text-gray-500 text-sm mt-1">The current highlights of our curated portfolio.</p>
            </div>
            <Link href="/properties" className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All Properties <ArrowRight size={16} />
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No properties yet. Add some from the admin panel.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Large featured card */}
              {featured[0] && (
                <div className="lg:col-span-2 lg:row-span-2">
                  <Link href={`/properties/${featured[0].id}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-80 lg:h-96 overflow-hidden">
                      {featured[0].images[0] ? (
                        <Image src={featured[0].images[0]} alt={featured[0].title} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {featured[0].tag && (
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase">{featured[0].tag}</span>
                          <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase">{featured[0].type}</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-2xl font-bold mb-1">{featured[0].title}</h3>
                        <p className="text-gray-300 text-sm mb-2">฿{formatPrice(featured[0].price)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Side cards */}
              {featured.slice(1, 3).map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    {property.images[0] ? (
                      <Image src={property.images[0]} alt={property.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm">{property.title}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{property.location}</p>
                    <p className="text-blue-600 font-bold mt-2">฿{formatPrice(property.price)}</p>
                  </div>
                </Link>
              ))}

              {/* Investment highlight */}
              {featured[3] && (
                <div className="bg-blue-900 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-3">Investment Opportunity</p>
                    <h3 className="text-white text-xl font-bold mb-2">{featured[3].title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      An exclusive high-floor residence offering unobstructed metropolitan views.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Link href={`/properties/${featured[3].id}`} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                      Enquire
                    </Link>
                    <span className="text-blue-300 text-xs">Limited availability</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
          alt="Bangkok night"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Begin Your Luxurious Journey.</h2>
          <p className="text-blue-200 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Experience a seamless blend of heritage and high-end innovation. Siribaan Property Group curates Bangkok&apos;s most exclusive residences.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="bg-white hover:bg-gray-50 text-blue-900 font-semibold px-8 py-3.5 rounded-full transition-colors text-sm">
              Schedule a Viewing
            </Link>
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm border border-blue-500">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
