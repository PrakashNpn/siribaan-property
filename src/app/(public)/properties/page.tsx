import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { PropertyListingCard } from '@/features/property/components/property-listing-card'
import { PropertyFilters } from '@/features/property/components/property-filters'
import { ClearFiltersButton } from '../_components/clear-filters-button'
import { InquiryForm } from '@/features/inquiry/components/inquiry-form'
import { FadeIn, FadeUp, SlideRight, StaggerCard } from './_components/listing-animations'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse our curated portfolio of luxury properties in Bangkok — Sukhumvit, Riverside, Thonglor, and beyond.',
  alternates: { canonical: '/properties' },
  openGraph: {
    title: 'Luxury Properties in Bangkok | Siribaan Property Group',
    description: 'Browse our curated portfolio of luxury properties in Bangkok — Sukhumvit, Riverside, Thonglor, and beyond.',
    images: [{ url: '/og-properties.jpg', width: 1200, height: 630, alt: 'Bangkok luxury property listings' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Properties in Bangkok | Siribaan Property Group',
    description: 'Browse our curated portfolio of luxury properties in Bangkok — Sukhumvit, Riverside, Thonglor, and beyond.',
    images: ['/og-properties.jpg'],
  },
}

interface SearchParams {
  location?: string
  priceRange?: string
  type?: string
  page?: string
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const [minPrice, maxPrice] = sp.priceRange ? sp.priceRange.split('-').map(Number) : [undefined, undefined]
  const page = Math.max(1, parseInt(sp.page ?? '1', 10))

  const { properties, total, totalPages } = await propertyService.getAll(
    { location: sp.location, minPrice, maxPrice, type: sp.type },
    { page, pageSize: 9 }
  )

  const buildUrl = (p: number) => {
    const params = new URLSearchParams()
    if (sp.location) params.set('location', sp.location)
    if (sp.priceRange) params.set('priceRange', sp.priceRange)
    if (sp.type) params.set('type', sp.type)
    params.set('page', String(p))
    return `/properties?${params.toString()}`
  }

  return (
    <section className="relative bg-blue-50 pt-6 md:pt-10 pb-16">
      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

        {/* HERO IMAGE */}
        <FadeIn delay={0}>
          <div className="relative h-[240px] md:h-[300px] rounded-3xl overflow-hidden mb-10">
            <Image
              src="/property-hero-2.png"
              alt="Luxury Bangkok properties"
              fill
              className="object-cover object-center"
              priority
              loading="eager"
              sizes="(max-width: 768px) calc(100vw - 32px), min(calc(100vw - 48px), 1232px)"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-blue-50/20 to-transparent" />
            <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12">
              <div className="bg-white/5 backdrop-blur-[2px] rounded-3xl p-5 md:p-8 max-w-sm md:max-w-lg shadow-xl border border-white/10">
                <h1
                  className="text-2xl md:text-4xl font-semibold text-blue-600 mb-2 md:mb-3 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Unveiling the Pinnacle<br />of Bangkok Living
                </h1>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">A curated portfolio of Bangkok&apos;s most prestigious residences, where architectural innovation meets timeless elegance.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* FILTER BAR */}
        <FadeUp delay={0.15}>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#125DE5] mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-[#125DE5] inline-block" />
              Explore Properties
            </p>
            <Suspense>
              <PropertyFilters />
            </Suspense>
          </div>
        </FadeUp>

        {/* RESULT COUNT */}
        <FadeUp delay={0.22}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-7 min-h-[20px]">
            {total > 0 ? (
              <p className="text-sm text-gray-400 tracking-wide">
                Showing <span className="font-semibold text-gray-700">{properties.length}</span> of <span className="font-semibold text-gray-700">{total}</span> {total === 1 ? 'property' : 'properties'}
              </p>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-4">
              {totalPages > 1 && (
                <p className="text-sm text-gray-400">Page {page} of {totalPages}</p>
              )}
              <Suspense>
                <ClearFiltersButton />
              </Suspense>
            </div>
          </div>
        </FadeUp>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — property list + pagination */}
          <div className="lg:col-span-2">
            {properties.length === 0 ? (
              <FadeUp delay={0.3}>
                <div className="text-center py-24 text-gray-400">
                  <p className="text-lg font-medium mb-2">No properties found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              </FadeUp>
            ) : (
              <div className="space-y-4">
                {properties.map((property, index) => (
                  <StaggerCard key={property.id} index={index}>
                    <PropertyListingCard property={property} />
                  </StaggerCard>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <FadeUp delay={0.1}>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                  <Link
                    href={buildUrl(page - 1)}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 ${
                      page <= 1
                        ? 'border-gray-200 text-gray-300 pointer-events-none'
                        : 'border-gray-200 text-gray-500 hover:border-[#125DE5] hover:text-[#125DE5] bg-white shadow-sm'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={buildUrl(p)}
                      className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        p === page
                          ? 'bg-[#125DE5] text-white shadow-lg shadow-blue-500/30'
                          : 'bg-white border border-gray-200 text-gray-500 hover:border-[#125DE5] hover:text-[#125DE5] shadow-sm'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  <Link
                    href={buildUrl(page + 1)}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 ${
                      page >= totalPages
                        ? 'border-gray-200 text-gray-300 pointer-events-none'
                        : 'border-gray-200 text-gray-500 hover:border-[#125DE5] hover:text-[#125DE5] bg-white shadow-sm'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </FadeUp>
            )}
          </div>

          {/* RIGHT — sticky CTA */}
          <SlideRight delay={0.3}>
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl shadow-xl shadow-blue-200/40 border border-blue-100/60">
                <div className="relative bg-gradient-to-br from-[#0d4fd4] to-[#125DE5] px-6 py-6 overflow-hidden rounded-t-2xl">
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-blue-200 text-[10px] uppercase tracking-widest mb-2">Private Consultation</p>
                    <h3 className="text-lg font-semibold text-white mb-1 leading-snug">Find Your Perfect Property</h3>
                    <p className="text-blue-200 text-xs leading-relaxed">Our consultants are ready to help you discover the right home.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-b-2xl">
                  <InquiryForm variant="sidebar" />
                </div>
              </div>
            </div>
          </SlideRight>

        </div>
      </div>
    </section>
  )
}
