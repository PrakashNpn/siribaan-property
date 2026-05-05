'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { Property } from '../types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/properties/${property.id}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden">
          {property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          {property.tag && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {property.tag}
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-base mb-1 leading-snug">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin size={13} />
            <span className="text-xs">{property.location}</span>
          </div>

          <div className="flex gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Bed size={13} /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={13} /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Square size={13} /> {property.areaSqm} m²
            </span>
          </div>

          <p className="text-blue-600 font-bold text-base">฿{formatPrice(property.price)}</p>
        </div>
      </Link>
    </motion.div>
  )
}
