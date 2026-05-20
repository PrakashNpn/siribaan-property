'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Images } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { Lightbox } from '@/components/lightbox'

interface PropertyGalleryProps {
  images: string[]
  alt: string
  tag?: string | null
}


function ViewAllButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      className="absolute inset-0 flex items-end justify-end p-3 z-10"
    >
      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg hover:bg-white transition-colors">
        <Images size={13} className="text-[#125DE5]" />
        View all {count} photos
      </span>
    </button>
  )
}

export function PropertyGallery({ images, alt, tag }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const count = images.length

  const openLightbox = (i: number) => {
    setLightboxIndex(Math.min(i, count - 1))
    setLightboxOpen(true)
  }

  if (count === 0) return null

  const [img0, img1, img2, img3] = images

  return (
    <>
      <div className="bg-blue-50 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* MOBILE layout */}
          <div className="md:hidden flex flex-col gap-2 h-[55vh]">
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ flex: count > 1 ? 3 : 1 }}
              onClick={() => openLightbox(0)}
            >
              <Image src={img0} alt={alt} fill sizes="calc(100vw - 32px)" className="object-cover" priority loading="eager" />
              {tag && (
                <span className="absolute top-3 left-3 bg-[#125DE5] text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide z-10">
                  {tag}
                </span>
              )}
              {count === 1 && <ViewAllButton count={count} onClick={() => openLightbox(0)} />}
            </div>
            {count > 1 && (
              <div className="flex gap-2 flex-[1]">
                {images.slice(1, 4).map((src, i) => {
                  const isLast = i === Math.min(count - 2, 2)
                  return (
                    <div
                      key={i}
                      className="relative flex-1 rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(i + 1)}
                    >
                      <Image src={src} alt={`${alt} ${i + 2}`} fill sizes="33vw" className="object-cover" />
                      {isLast && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold flex items-center gap-1">
                            <Images size={12} /> {count}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* DESKTOP layout */}
          <div className={`hidden md:grid gap-2 h-[62vh] ${count > 1 ? 'md:grid-cols-[55fr_45fr]' : ''}`}>

            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={img0}
                alt={alt}
                fill
                sizes={count > 1 ? '55vw' : 'calc(100vw - 48px)'}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-[#125DE5]/0 group-hover:bg-[#125DE5]/5 transition-colors duration-300" />
              {tag && (
                <span className="absolute top-4 left-4 bg-[#125DE5] text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide z-10">
                  {tag}
                </span>
              )}
              {count === 1 && <ViewAllButton count={count} onClick={() => openLightbox(0)} />}
            </div>

            {/* Right column */}
            {count > 1 && (
              <div className={`grid gap-2 ${count > 2 ? 'grid-rows-[3fr_2fr]' : ''}`}>

                {/* Top right */}
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(1)}
                >
                  <Image
                    src={img1}
                    alt={`${alt} 2`}
                    fill
                    sizes="45vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#125DE5]/0 group-hover:bg-[#125DE5]/5 transition-colors duration-300" />
                  {count === 2 && <ViewAllButton count={count} onClick={() => openLightbox(0)} />}
                </div>

                {/* Bottom row */}
                {count > 2 && (
                  <div className={`grid gap-2 ${count > 3 ? 'grid-cols-2' : ''}`}>
                    <div
                      className="relative rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(2)}
                    >
                      <Image
                        src={img2}
                        alt={`${alt} 3`}
                        fill
                        sizes="22vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#125DE5]/0 group-hover:bg-[#125DE5]/5 transition-colors duration-300" />
                      {count === 3 && <ViewAllButton count={count} onClick={() => openLightbox(0)} />}
                    </div>

                    {count > 3 && (
                      <div
                        className="relative rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => openLightbox(3)}
                      >
                        <Image
                          src={img3}
                          alt={`${alt} 4`}
                          fill
                          sizes="22vw"
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        <ViewAllButton count={count} onClick={() => openLightbox(0)} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            title={alt}
          />
        )}
      </AnimatePresence>
    </>
  )
}
