'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
]

interface PropertyGalleryProps {
  images: string[]
  alt: string
  tag?: string | null
}

function Lightbox({
  images,
  initialIndex,
  onClose,
  title,
}: {
  images: string[]
  initialIndex: number
  onClose: () => void
  title: string
}) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(1)

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  const progress = ((index + 1) / images.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col"
      onClick={onClose}
    >
      {/* Liquid background — blurred page + brand orbs */}
      <div className="absolute inset-0 bg-blue-50/10 backdrop-blur-md" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.12] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-white blur-3xl opacity-[0.15] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white blur-3xl opacity-[0.15] pointer-events-none" />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#125DE5]/15 z-20">
        <motion.div
          className="h-full bg-[#125DE5]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Inner content — scales up on open */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex flex-col h-full z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-[#125DE5]/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#125DE5]" />
            <p className="text-[#125DE5]/70 text-xs font-medium tracking-widest uppercase">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
          </div>
          <p className="text-gray-700 text-sm font-medium absolute left-1/2 -translate-x-1/2 truncate max-w-xs md:max-w-md text-center">{title}</p>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/60 border border-white/80 hover:bg-[#125DE5] hover:border-[#125DE5] flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Main image */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0, scale: 1.03 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0, scale: 0.97 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex items-center justify-center px-20 py-6"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-[#125DE5]/10">
                <Image
                  src={images[index]}
                  alt={`Photo ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 border border-white/80 hover:bg-[#125DE5] hover:border-[#125DE5] flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 z-10 shadow-sm group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              </button>
              <button
                onClick={next}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 border border-white/80 hover:bg-[#125DE5] hover:border-[#125DE5] flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 z-10 shadow-sm group"
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="shrink-0 border-t border-[#125DE5]/10 bg-white/30 backdrop-blur-sm px-6 py-4">
            <div className="flex gap-2.5 overflow-x-auto justify-center">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  className={`shrink-0 relative rounded-xl overflow-hidden transition-all duration-200 ${
                    i === index
                      ? 'ring-2 ring-[#125DE5] ring-offset-2 ring-offset-transparent opacity-100 scale-105 shadow-lg shadow-[#125DE5]/20'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                  style={{ width: '72px', height: '52px' }}
                >
                  <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function PropertyGallery({ images, alt, tag }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Pad with placeholders only for display — lightbox uses real images only
  const displayImages = [
    images[0] ?? PLACEHOLDERS[0],
    images[1] ?? PLACEHOLDERS[1],
    images[2] ?? PLACEHOLDERS[2],
    images[3] ?? PLACEHOLDERS[3],
  ]
  const lightboxImages = images.length > 0 ? images : PLACEHOLDERS
  const photoCount = images.length > 0 ? images.length : PLACEHOLDERS.length

  const openLightbox = (i: number) => {
    setLightboxIndex(Math.min(i, lightboxImages.length - 1))
    setLightboxOpen(true)
  }

  const mainImage = displayImages[0]
  const topRight = displayImages[1]
  const bottomRight1 = displayImages[2]
  const bottomRight2 = displayImages[3]

  return (
    <>
      <div className="bg-blue-50 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* MOBILE layout: main image + 3 thumbnails row */}
          <div className="md:hidden flex flex-col gap-2 h-[55vh]">
            <div
              className="relative flex-[3] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={mainImage}
                alt={alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {tag && (
                <span className="absolute top-3 left-3 bg-[#125DE5] text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide z-10">
                  {tag}
                </span>
              )}
            </div>
            <div className="flex gap-2 flex-[1]">
              {[topRight, bottomRight1, bottomRight2].map((src, i) => (
                <div
                  key={i}
                  className="relative flex-1 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(i + 1)}
                >
                  <Image src={src} alt={`${alt} ${i + 2}`} fill sizes="33vw" className="object-cover" />
                  {i === 2 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        <Images size={12} /> {photoCount}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP layout: left big | right [top wide + bottom 2 small] */}
          <div className="hidden md:grid md:grid-cols-[55fr_45fr] gap-2 h-[62vh]">

            {/* LEFT — main large image */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={mainImage}
                alt={alt}
                fill
                sizes="55vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-[#125DE5]/0 group-hover:bg-[#125DE5]/5 transition-colors duration-300" />
              {tag && (
                <span className="absolute top-4 left-4 bg-[#125DE5] text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide z-10">
                  {tag}
                </span>
              )}
            </div>

            {/* RIGHT — top wide + bottom 2 small */}
            <div className="grid grid-rows-[3fr_2fr] gap-2">

              {/* Top right — wide image */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(1)}
              >
                <Image
                  src={topRight}
                  alt={`${alt} 2`}
                  fill
                  sizes="45vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#125DE5]/0 group-hover:bg-[#125DE5]/5 transition-colors duration-300" />
              </div>

              {/* Bottom right — 2 small images */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(2)}
                >
                  <Image
                    src={bottomRight1}
                    alt={`${alt} 3`}
                    fill
                    sizes="22vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#125DE5]/0 group-hover:bg-[#125DE5]/5 transition-colors duration-300" />
                </div>

                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(3)}
                >
                  <Image
                    src={bottomRight2}
                    alt={`${alt} 4`}
                    fill
                    sizes="22vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(0) }}
                    className="absolute inset-0 flex items-end justify-end p-3 z-10"
                  >
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg hover:bg-white transition-colors">
                      <Images size={13} className="text-[#125DE5]" />
                      View all {photoCount} photos
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            title={alt}
          />
        )}
      </AnimatePresence>
    </>
  )
}
