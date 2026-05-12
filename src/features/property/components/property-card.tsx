'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { Property } from '../types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const startingPrice = property.unitTypes.length > 0
    ? Math.min(...property.unitTypes.map((u) => u.priceMin))
    : null

  const bedroomOptions = [...new Set(property.unitTypes.map((u) => u.bedrooms))].sort((a, b) => a - b)
  const bathroomOptions = [...new Set(property.unitTypes.map((u) => u.bathrooms))].sort((a, b) => a - b)

  const formatRange = (values: number[], suffix = '') => {
    if (values.length === 0) return '—'
    if (values.length === 1) return `${values[0]}${suffix}`
    return `${values[0]}–${values[values.length - 1]}${suffix}`
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link href={`/properties/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden shrink-0">
          {property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

        <div className="p-4 flex flex-col flex-1">
          <h3
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-1.5 leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-400 mb-4">
            <MapPin size={13} className="shrink-0" />
            <span className="text-xs">{property.location}</span>
          </div>

          {property.unitTypes.length > 0 && (
            <div className="border-t border-gray-100 pt-4 flex gap-5 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Bed size={13} className="text-[#125DE5]" /> {formatRange(bedroomOptions)} BR
              </span>
              <span className="flex items-center gap-1.5">
                <Bath size={13} className="text-[#125DE5]" /> {formatRange(bathroomOptions)} Bath
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto">
            <div>
              {startingPrice !== null ? (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Starting from</p>
                  <p className="text-[#125DE5] font-bold text-base">฿{formatPrice(startingPrice)}</p>
                </>
              ) : (
                <p className="text-gray-400 text-sm">Price on request</p>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#125DE5] group-hover:gap-2 transition-all duration-200">
              View Details <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
