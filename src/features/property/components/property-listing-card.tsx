'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square, Home, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { Property } from '../types'

interface PropertyListingCardProps {
  property: Property
}

export function PropertyListingCard({ property }: PropertyListingCardProps) {
  const startingPrice = property.unitTypes.length > 0
    ? Math.min(...property.unitTypes.map((u) => u.priceMin))
    : null

  const bedroomOptions = [...new Set(property.unitTypes.map((u) => u.bedrooms))].sort((a, b) => a - b)
  const bathroomOptions = [...new Set(property.unitTypes.map((u) => u.bathrooms))].sort((a, b) => a - b)
  const areaMin = property.unitTypes.length > 0 ? Math.min(...property.unitTypes.map(u => u.areaSqmMin)) : null
  const areaMax = property.unitTypes.length > 0 ? Math.max(...property.unitTypes.map(u => u.areaSqmMax ?? u.areaSqmMin)) : null

  const formatRange = (values: number[]) => {
    if (values.length === 0) return '—'
    if (values.length === 1) return `${values[0]}`
    return `${values[0]}–${values[values.length - 1]}`
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/properties/${property.id}`}
        className="group flex flex-col sm:flex-row bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] overflow-hidden hover:shadow-[0_4px_24px_rgba(18,93,229,0.13)] transition-shadow duration-300 sm:h-48"
      >
        {/* Image — full width on mobile, fixed sidebar on sm+ */}
        <div className="relative h-48 sm:h-auto sm:w-60 shrink-0">
          {property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          {property.tag && (
            <span className="absolute top-3 left-3 bg-[#125DE5] text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {property.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
          <h3 className="text-base font-bold text-[#125DE5] leading-snug mb-1 truncate">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-400 mb-3">
            <MapPin size={11} className="shrink-0 text-[#125DE5]" />
            <span className="text-xs">{property.location}</span>
          </div>

          {/* Stat chips */}
          {property.unitTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {bedroomOptions.length > 0 && (
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100/60 rounded-lg px-2.5 py-1">
                  <Bed size={10} className="text-[#125DE5]" />
                  <span className="text-[11px] font-bold text-gray-800">{formatRange(bedroomOptions)}</span>
                  <span className="text-[10px] text-gray-400 uppercase">Bed</span>
                </div>
              )}
              {bathroomOptions.length > 0 && (
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100/60 rounded-lg px-2.5 py-1">
                  <Bath size={10} className="text-[#125DE5]" />
                  <span className="text-[11px] font-bold text-gray-800">{formatRange(bathroomOptions)}</span>
                  <span className="text-[10px] text-gray-400 uppercase">Bath</span>
                </div>
              )}
              {areaMin !== null && (
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100/60 rounded-lg px-2.5 py-1">
                  <Square size={10} className="text-[#125DE5]" />
                  <span className="text-[11px] font-bold text-gray-800">
                    {areaMin === areaMax ? `${areaMin}` : `${areaMin}–${areaMax}`}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase">m²</span>
                </div>
              )}
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-100/60 rounded-lg px-2.5 py-1">
                <Home size={10} className="text-[#125DE5]" />
                <span className="text-[11px] font-bold text-gray-800">{property.type}</span>
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-end justify-between mt-auto">
            <div>
              {startingPrice !== null ? (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Starting from</p>
                  <p className="text-[#125DE5] font-bold text-sm">฿{formatPrice(startingPrice)}</p>
                </>
              ) : (
                <p className="text-gray-400 text-xs">Price on request</p>
              )}
            </div>
            <span className="flex items-center gap-1.5 bg-[#125DE5] text-white text-xs font-semibold px-3.5 py-2 rounded-xl group-hover:bg-blue-700 transition-colors shrink-0">
              View Details <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
