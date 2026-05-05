export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Car, CheckCircle, ExternalLink, ArrowRight, ChevronRight } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { InquiryForm } from '@/features/inquiry/components/inquiry-form'
import { PropertyCard } from '@/features/property/components/property-card'
import { ImageCarousel } from '@/components/image-carousel'
import { MapEmbed } from '@/components/map-embed'
import { formatPrice } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const property = await propertyService.getById(id)
  if (!property) return {}
  return {
    title: `${property.title} | Siribaan Property Group`,
    description: property.description.slice(0, 155),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 155),
      images: property.images[0] ? [{ url: property.images[0], width: 1200, height: 630 }] : [],
      type: 'website',
    },
  }
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [property, recommended] = await Promise.all([
    propertyService.getById(id),
    propertyService.getRecommended(id, 3),
  ])

  if (!property) notFound()

  return (
    <>
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link href="/properties" className="hover:text-gray-600 transition-colors">Properties</Link>
          <ChevronRight size={13} />
          <span className="text-gray-700 font-medium truncate max-w-xs">{property.title}</span>
        </nav>
      </div>

      {/* HERO CAROUSEL */}
      <ImageCarousel
        images={property.images}
        alt={property.title}
        tag={property.tag}
        location={property.location}
      />

      {/* CONTENT */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT MAIN */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title */}
              <div>
                <div className="flex items-center gap-1.5 text-gray-500 mb-2">
                  <MapPin size={14} />
                  <span className="text-sm">{property.address}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <p className="text-4xl font-bold text-blue-600">฿{formatPrice(property.price)}</p>
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Overview</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                    { icon: Square, label: 'Area', value: `${property.areaSqm} sqm` },
                    { icon: Car, label: 'Parking', value: property.parking },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                      <Icon size={20} className="text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-900 font-semibold text-sm">{value}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Exclusive Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2.5 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-blue-600 shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
                <MapEmbed address={property.address} height="h-64" />
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{property.location}</p>
                    <p className="text-xs text-gray-400">{property.address}</p>
                  </div>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline">
                    Open in Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT STICKY FORM */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Schedule a Private Viewing</h3>
                <p className="text-gray-500 text-sm mb-6">Our consultants are available for exclusive property tours.</p>
                <InquiryForm propertyId={property.id} variant="sidebar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDED */}
      {recommended.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Similar Exclusives</p>
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
              </div>
              <Link href="/properties" className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                View Portfolio <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
