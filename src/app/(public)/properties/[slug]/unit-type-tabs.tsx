'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Bed, Bath, Square, Car } from 'lucide-react'
import { UnitType } from '@/features/property/types'

function ImageSlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No images</p>
      </div>
    )
  }

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
        <Image
          key={current}
          src={images[current]}
          alt={`${name} image ${current + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${i === current ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
          {current + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${i === current ? 'ring-2 ring-[#125DE5] ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function UnitTypeTabs({ unitTypes }: { unitTypes: UnitType[] }) {
  const [active, setActive] = useState(0)

  if (unitTypes.length === 0) return null

  const unit = unitTypes[active]

  const stats = [
    { icon: <Bed size={13} />, label: `${unit.bedrooms} ${unit.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}` },
    { icon: <Bath size={13} />, label: `${unit.bathrooms} ${unit.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}` },
    { icon: <Square size={13} />, label: `${unit.areaSqmMin}${unit.areaSqmMax ? ` – ${unit.areaSqmMax}` : ''} m²` },
    ...(unit.parking > 0 ? [{ icon: <Car size={13} />, label: `${unit.parking} Parking` }] : []),
  ]

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.06)] overflow-hidden">
      <div className="flex flex-col sm:flex-row">

        {/* Vertical side tabs */}
        <div className="flex flex-row sm:flex-col sm:w-44 border-b sm:border-b-0 sm:border-r border-gray-100/80 shrink-0 overflow-x-auto sm:overflow-x-visible">
          {unitTypes.map((u, i) => (
            <button
              key={u.id}
              onClick={() => setActive(i)}
              className={`relative flex items-center gap-2 px-4 py-3.5 sm:py-4 text-sm font-semibold text-left whitespace-nowrap sm:whitespace-normal transition-colors duration-150 shrink-0 sm:w-full ${
                i === active
                  ? 'text-[#125DE5] bg-blue-50/60'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50/60'
              }`}
            >
              {/* Active indicator — bottom on mobile, left on desktop */}
              {i === active && (
                <span className="absolute bottom-0 left-0 sm:bottom-auto sm:top-0 sm:left-0 sm:h-full h-0.5 sm:w-0.5 right-0 sm:right-auto bg-[#125DE5] rounded-full" />
              )}
              <span className="text-[10px] font-bold text-[#125DE5]/40 shrink-0 hidden sm:block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="leading-snug">{u.name}</span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 min-w-0 p-5 gap-5">
          {/* Name + stats */}
          <div>
            <h3 className="text-base font-bold text-[#125DE5] mb-4 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
              {unit.name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {stats.map((s, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <span className="text-[#125DE5]">{s.icon}</span>
                    {s.label}
                  </span>
                  {i < stats.length - 1 && <span className="text-gray-300">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Image slider */}
          <ImageSlider images={unit.images} name={unit.name} />
        </div>

      </div>
    </div>
  )
}
