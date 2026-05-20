'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useAnimation } from 'framer-motion'

export function Lightbox({
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
  const [isZoomed, setIsZoomed] = useState(false)

  const scale = useMotionValue(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const controls = useAnimation()

  const resetZoom = useCallback(() => {
    controls.start({ scale: 1, x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } })
    scale.set(1)
    x.set(0)
    y.set(0)
    setIsZoomed(false)
  }, [controls, scale, x, y])

  const prev = useCallback(() => {
    if (isZoomed) return
    setDirection(-1)
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length, isZoomed])

  const next = useCallback(() => {
    if (isZoomed) return
    setDirection(1)
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length, isZoomed])

  useEffect(() => {
    resetZoom()
  }, [index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (isZoomed) resetZoom(); else onClose() }
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next, isZoomed, resetZoom])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const currentScale = scale.get()
    const delta = -e.deltaY * 0.004
    const newScale = Math.min(4, Math.max(1, currentScale + delta))
    scale.set(newScale)
    setIsZoomed(newScale > 1.05)
    if (newScale <= 1) { x.set(0); y.set(0); setIsZoomed(false) }
  }, [scale, x, y])

  const handleDoubleClick = useCallback(() => {
    if (isZoomed) {
      resetZoom()
    } else {
      controls.start({ scale: 2, x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } })
      scale.set(2)
      setIsZoomed(true)
    }
  }, [isZoomed, resetZoom, controls, scale])

  const progress = ((index + 1) / images.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col"
      onClick={!isZoomed ? onClose : undefined}
    >
      <div className="absolute inset-0 bg-blue-50/90 backdrop-blur-md" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.12] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-white blur-3xl opacity-[0.15] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white blur-3xl opacity-[0.15] pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#125DE5]/15 z-20">
        <motion.div
          className="h-full bg-[#125DE5]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex flex-col h-full z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-[#125DE5]/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#125DE5]" />
            <p className="text-[#125DE5]/70 text-xs font-medium tracking-widest uppercase">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
          </div>
          <p className="text-gray-700 text-sm font-medium absolute left-1/2 -translate-x-1/2 truncate max-w-xs md:max-w-md text-center">{title}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={isZoomed ? resetZoom : handleDoubleClick}
              className="w-9 h-9 rounded-full bg-white/60 border border-white/80 hover:bg-[#125DE5] hover:border-[#125DE5] flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 shadow-sm"
              title={isZoomed ? 'Reset zoom' : 'Zoom in'}
            >
              {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/60 border border-white/80 hover:bg-[#125DE5] hover:border-[#125DE5] flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 shadow-sm"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image area */}
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
              <motion.div
                animate={controls}
                style={{ scale, x, y, cursor: isZoomed ? 'grab' : 'zoom-in' }}
                drag={isZoomed}
                dragMomentum={false}
                dragElastic={0.05}
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-[#125DE5]/10 select-none"
                whileDrag={{ cursor: 'grabbing' }}
              >
                <Image
                  src={images[index]}
                  alt={`Photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, calc(100vw - 160px)"
                  className="object-contain pointer-events-none"
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && !isZoomed && (
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

          {/* Zoom hint */}
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none"
            >
              Double-click or press Esc to reset zoom
            </motion.div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="shrink-0 border-t border-[#125DE5]/10 bg-white/30 backdrop-blur-sm px-6 py-4">
            <div className="flex gap-2.5 overflow-x-auto justify-center p-2">
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
                  <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="72px" />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
