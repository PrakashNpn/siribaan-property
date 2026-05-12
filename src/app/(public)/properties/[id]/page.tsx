export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Car, CheckCircle, ExternalLink, ArrowRight, ChevronRight, Building2, Layers, CalendarDays, Home, TreePine } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { InquiryForm } from '@/features/inquiry/components/inquiry-form'
import { PropertyCard } from '@/features/property/components/property-card'
import { PropertyGallery } from '@/components/property-gallery'
import { MapEmbed } from '@/components/map-embed'
import { formatPrice } from '@/lib/utils'
import { AnimateIn, AnimateInView } from '@/components/animate-in'
import { propertyJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const property = await propertyService.getById(id)
  if (!property) return {}
  return {
    title: property.title,
    description: property.description.slice(0, 155),
    alternates: { canonical: `/properties/${id}` },
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

  const startingPrice = property.unitTypes.length > 0
    ? Math.min(...property.unitTypes.map((u) => u.priceMin))
    : null

  const bedroomSet = [...new Set(property.unitTypes.map(u => u.bedrooms))].sort((a, b) => a - b)
  const bathroomSet = [...new Set(property.unitTypes.map(u => u.bathrooms))].sort((a, b) => a - b)
  const areaMin = property.unitTypes.length > 0 ? Math.min(...property.unitTypes.map(u => u.areaSqmMin)) : null
  const areaMax = property.unitTypes.length > 0 ? Math.max(...property.unitTypes.map(u => u.areaSqmMax ?? u.areaSqmMin)) : null

  const formatRange = (values: number[], suffix = '') => {
    if (values.length === 0) return '—'
    if (values.length === 1) return `${values[0]}${suffix}`
    return `${values[0]}–${values[values.length - 1]}${suffix}`
  }

  const BASE = 'https://siribaanproperty.com'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd(property)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE },
              { name: 'Properties', url: `${BASE}/properties` },
              { name: property.title, url: `${BASE}/properties/${property.id}` },
            ])
          ),
        }}
      />
      {/* BREADCRUMB */}
      <AnimateIn delay={0} direction="none" duration={0.4}>
        <div className="bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
              <Link href="/" className="hover:text-[#125DE5] transition-colors">Home</Link>
              <ChevronRight size={13} />
              <Link href="/properties" className="hover:text-[#125DE5] transition-colors">Properties</Link>
              <ChevronRight size={13} />
              <span className="text-gray-600 font-medium truncate max-w-[200px] sm:max-w-xs">{property.title}</span>
            </nav>
          </div>
        </div>
      </AnimateIn>

      {/* PHOTO GALLERY */}
      <AnimateIn delay={0.1} direction="none" duration={0.6}>
        <PropertyGallery
          images={property.images}
          alt={property.title}
          tag={property.tag}
        />
      </AnimateIn>

      {/* CONTENT */}
      <section className="pt-6 pb-12 md:py-12 bg-blue-50 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.04]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

            {/* LEFT MAIN */}
            <AnimateIn delay={0.2} direction="left" className="lg:col-span-2">
              <div className="space-y-10 md:space-y-14">

                {/* Title + Price */}
                <div>
                  <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                    <MapPin size={14} className="text-[#125DE5] shrink-0" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#125DE5] mb-5 leading-tight"
                  >
                    {property.title}
                  </h1>

                  {/* Stat pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5">
                    {bedroomSet.length > 0 && (
                      <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_2px_16px_rgba(18,93,229,0.07)]">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0">
                          <Bed size={13} className="text-[#125DE5]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">{formatRange(bedroomSet)}</p>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-none">Bedrooms</p>
                        </div>
                      </div>
                    )}
                    {bathroomSet.length > 0 && (
                      <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_2px_16px_rgba(18,93,229,0.07)]">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0">
                          <Bath size={13} className="text-[#125DE5]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">{formatRange(bathroomSet)}</p>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-none">Bathrooms</p>
                        </div>
                      </div>
                    )}
                    {areaMin !== null && (
                      <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_2px_16px_rgba(18,93,229,0.07)]">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0">
                          <Square size={13} className="text-[#125DE5]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">
                            {areaMin === areaMax ? `${areaMin}` : `${areaMin}–${areaMax}`} m²
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-none">Floor Area</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_2px_16px_rgba(18,93,229,0.07)]">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0">
                        <Home size={13} className="text-[#125DE5]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">{property.type}</p>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-none">Property Type</p>
                      </div>
                    </div>
                    {startingPrice !== null && areaMin !== null && (
                      <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_2px_16px_rgba(18,93,229,0.07)]">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#125DE5] text-xs font-bold">฿</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">
                            ฿{formatPrice(Math.round(startingPrice / areaMin))}/m²
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-none">From Price/m²</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {startingPrice !== null && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Starting from</p>
                      <p className="text-2xl sm:text-3xl font-bold text-[#125DE5]">฿{formatPrice(startingPrice)}</p>
                    </div>
                  )}
                </div>

                {/* Overview */}
                <AnimateInView delay={0} direction="up">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#125DE5] mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-[#125DE5] inline-block" />
                      Property Overview
                    </h2>
                    <div className="space-y-4 mb-6">
                      {property.description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed text-sm sm:text-base">{para}</p>
                      ))}
                    </div>

                    {/* Property details grid */}
                    {(property.totalFloors || property.totalUnits || property.yearBuilt || property.completionDate || property.landAreaSqm) && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                        {property.totalFloors && (
                          <div className="bg-white/60 border border-white/80 rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
                            <Layers size={14} className="text-[#125DE5] shrink-0" />
                            <div>
                              <p className="text-gray-900 text-sm font-semibold">{property.totalFloors}</p>
                              <p className="text-gray-400 text-[10px] uppercase tracking-wide">Floors</p>
                            </div>
                          </div>
                        )}
                        {property.totalUnits && (
                          <div className="bg-white/60 border border-white/80 rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
                            <Building2 size={14} className="text-[#125DE5] shrink-0" />
                            <div>
                              <p className="text-gray-900 text-sm font-semibold">{property.totalUnits}</p>
                              <p className="text-gray-400 text-[10px] uppercase tracking-wide">Units</p>
                            </div>
                          </div>
                        )}
                        {property.yearBuilt && (
                          <div className="bg-white/60 border border-white/80 rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
                            <CalendarDays size={14} className="text-[#125DE5] shrink-0" />
                            <div>
                              <p className="text-gray-900 text-sm font-semibold">{property.yearBuilt}</p>
                              <p className="text-gray-400 text-[10px] uppercase tracking-wide">Year Built</p>
                            </div>
                          </div>
                        )}
                        {property.completionDate && (
                          <div className="bg-white/60 border border-white/80 rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
                            <CalendarDays size={14} className="text-[#125DE5] shrink-0" />
                            <div>
                              <p className="text-gray-900 text-sm font-semibold">{property.completionDate}</p>
                              <p className="text-gray-400 text-[10px] uppercase tracking-wide">Completion</p>
                            </div>
                          </div>
                        )}
                        {property.landAreaSqm && (
                          <div className="bg-white/60 border border-white/80 rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
                            <TreePine size={14} className="text-[#125DE5] shrink-0" />
                            <div>
                              <p className="text-gray-900 text-sm font-semibold">{property.landAreaSqm} m²</p>
                              <p className="text-gray-400 text-[10px] uppercase tracking-wide">Land Area</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </AnimateInView>

                {/* Unit Types */}
                {property.unitTypes.length > 0 && (
                  <AnimateInView delay={0} direction="up">
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-widest text-[#125DE5] mb-4 flex items-center gap-2">
                        <span className="w-6 h-px bg-[#125DE5] inline-block" />
                        Available Unit Types
                      </h2>
                      <div className="space-y-3">
                        {property.unitTypes.map((unit, i) => (
                          <div
                            key={unit.id}
                            className="bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.06)] overflow-hidden"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:divide-x divide-gray-100/80">
                              {/* Identity */}
                              <div className="flex items-center gap-4 pl-0 pr-4 sm:pr-6 py-4 sm:py-5 sm:min-w-[180px]">
                                <div className="w-1 self-stretch bg-[#125DE5] rounded-r-full shrink-0" />
                                <span className="text-3xl sm:text-4xl font-bold text-gray-200 leading-none select-none shrink-0">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 leading-snug">{unit.name}</p>
                                  {unit.parking > 0 && (
                                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                                      <Car size={10} /> {unit.parking} parking
                                    </p>
                                  )}
                                  {unit.floorMin && (
                                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                                      <Layers size={10} /> Fl. {unit.floorMax && unit.floorMax !== unit.floorMin ? `${unit.floorMin}–${unit.floorMax}` : unit.floorMin}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Stats chips */}
                              <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-5 flex-1 flex-wrap border-t border-gray-100/80 sm:border-t-0">
                                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/60 rounded-xl px-3 py-2">
                                  <Bed size={12} className="text-[#125DE5]" />
                                  <span className="text-xs font-bold text-gray-800">{unit.bedrooms}</span>
                                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">Bed</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/60 rounded-xl px-3 py-2">
                                  <Bath size={12} className="text-[#125DE5]" />
                                  <span className="text-xs font-bold text-gray-800">{unit.bathrooms}</span>
                                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">Bath</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/60 rounded-xl px-3 py-2">
                                  <Square size={12} className="text-[#125DE5]" />
                                  <span className="text-xs font-bold text-gray-800">
                                    {unit.areaSqmMax && unit.areaSqmMax !== unit.areaSqmMin
                                      ? `${unit.areaSqmMin}–${unit.areaSqmMax}`
                                      : unit.areaSqmMin}
                                  </span>
                                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">m²</span>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="px-4 sm:px-6 py-3 sm:py-5 sm:text-right sm:min-w-[160px] sm:shrink-0 border-t border-gray-100/80 sm:border-t-0">
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">From</p>
                                <p className="text-lg font-bold text-[#125DE5] leading-tight">฿{formatPrice(unit.priceMin)}</p>
                                {unit.priceMax && (
                                  <p className="text-[10px] text-gray-400 mt-1.5">up to ฿{formatPrice(unit.priceMax)}</p>
                                )}
                                <div className="mt-2 pt-2 border-t border-gray-100">
                                  <p className="text-[10px] text-gray-400">฿{formatPrice(Math.round(unit.priceMin / unit.areaSqmMin))}/m²</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimateInView>
                )}

                {/* Amenities */}
                {property.amenities.length > 0 && (
                  <AnimateInView delay={0} direction="up">
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-widest text-[#125DE5] mb-4 flex items-center gap-2">
                        <span className="w-6 h-px bg-[#125DE5] inline-block" />
                        Facilities
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {property.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-3 sm:gap-4 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3.5 border border-blue-100/70 shadow-[0_2px_12px_rgba(18,93,229,0.05)]">
                            <div className="w-8 h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0">
                              <CheckCircle size={15} className="text-[#125DE5]" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimateInView>
                )}

                {/* Location */}
                <AnimateInView delay={0} direction="up">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#125DE5] mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-[#125DE5] inline-block" />
                      Neighbourhood &amp; Access
                    </h2>

                    {property.nearbyPlaces.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Nearby</p>
                        <div className="flex flex-wrap gap-2">
                          {property.nearbyPlaces.map((place) => (
                            <span key={place} className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-blue-100/70 text-gray-600 text-xs font-medium px-3.5 py-2 rounded-full shadow-[0_2px_12px_rgba(18,93,229,0.06)]">
                              <MapPin size={10} className="text-[#125DE5]" />
                              {place}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <MapEmbed address={property.address} height="h-64 sm:h-80" />

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4 bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl px-4 sm:px-5 py-4 shadow-[0_2px_12px_rgba(18,93,229,0.05)]">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#125DE5]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin size={14} className="text-[#125DE5]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{property.location}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{property.address}</p>
                        </div>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#125DE5] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                      >
                        Open in Maps <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </AnimateInView>

              </div>
            </AnimateIn>

            {/* RIGHT STICKY FORM */}
            <AnimateIn delay={0.3} direction="right" className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl shadow-xl shadow-blue-200/40 border border-blue-100/60">
                <div className="relative bg-gradient-to-br from-[#0d4fd4] to-[#125DE5] px-6 pt-6 pb-6 overflow-hidden rounded-t-2xl">
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-blue-200 text-[10px] uppercase tracking-widest mb-2">Private Consultation</p>
                    <h3 className="text-lg font-semibold text-white mb-4 leading-snug">Schedule a Viewing</h3>
                    {startingPrice !== null && (
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                        <p className="text-blue-200 text-[10px] uppercase tracking-widest mb-0.5">Starting from</p>
                        <p className="text-white text-xl font-bold">฿{formatPrice(startingPrice)}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-b-2xl">
                  <InquiryForm propertyId={property.id} variant="sidebar" />
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* RECOMMENDED */}
      {recommended.length > 0 && (
        <AnimateInView delay={0} direction="up">
          <section className="py-16 bg-blue-50 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.08] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.08] pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-wrap justify-between items-end gap-3 mb-10">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#125DE5] flex items-center gap-2">
                  <span className="w-6 h-px bg-[#125DE5] inline-block" />
                  Recommended for You
                </h2>
                <Link href="/properties" className="text-[#125DE5] text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity">
                  View Portfolio <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                {recommended.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          </section>
        </AnimateInView>
      )}
    </>
  )
}
