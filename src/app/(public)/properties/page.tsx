import Image from 'next/image'
import { Suspense } from 'react'
import { propertyService } from '@/features/property/server/property.service'
import { PropertyCard } from '@/features/property/components/property-card'
import { PropertyFilters } from '@/features/property/components/property-filters'

export const dynamic = 'force-dynamic'

interface SearchParams {
  location?: string
  priceRange?: string
  type?: string
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const [minPrice, maxPrice] = sp.priceRange ? sp.priceRange.split('-').map(Number) : [undefined, undefined]

  const properties = await propertyService.getAll({
    location: sp.location,
    minPrice,
    maxPrice,
    type: sp.type,
  })

  return (
    <>
      {/* HERO */}
      <section className="relative h-72 flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
            alt="Properties"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-8">
          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 max-w-xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Unveiling the Pinnacle<br />of Bangkok Living</h1>
            <p className="text-gray-500 text-sm">A curated portfolio of Bangkok&apos;s most prestigious residences, where architectural innovation meets timeless elegance.</p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* FILTER BAR */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gray-300 inline-block" />
              Explore Properties
            </p>
            <Suspense>
              <PropertyFilters />
            </Suspense>
          </div>

          {/* RESULT COUNT */}
          {properties.length > 0 && (
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{properties.length}</span> {properties.length === 1 ? 'property' : 'properties'}
              </p>
            </div>
          )}

          {/* GRID */}
          {properties.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium mb-2">No properties found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
