'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Landmark, Home, ChevronDown, Check, Loader2 } from 'lucide-react'
import { useTopLoader } from 'nextjs-toploader'

const PRICE_OPTIONS = [
  { label: 'Any Price', value: '' },
  { label: 'Under ฿5M', value: '0-5000000' },
  { label: '฿5M – ฿10M', value: '5000000-10000000' },
  { label: '฿10M – ฿20M', value: '10000000-20000000' },
  { label: '฿20M+', value: '20000000-999999999' },
]

const TYPE_OPTIONS = [
  { label: 'All Types', value: '' },
  { label: 'Condo', value: 'Condo' },
  { label: 'House', value: 'House' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Townhouse', value: 'Townhouse' },
  { label: 'Apartment', value: 'Apartment' },
]

function CustomDropdown({
  options,
  value,
  onChange,
  triggerRef,
}: {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value) ?? options[0]

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full" onClick={e => e.stopPropagation()}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-sm text-gray-800 font-medium bg-transparent outline-none"
      >
        <span className={value === '' ? 'text-gray-400' : 'text-gray-800'}>{selected.label}</span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/95 rounded-2xl shadow-2xl border border-white/80 py-2 z-50 overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-slate-100/60 pointer-events-none" />
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`relative w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150
                ${opt.value === value
                  ? 'text-blue-600 font-semibold bg-blue-50/80'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
                }`}
            >
              {opt.label}
              {opt.value === value && <Check size={12} className="text-blue-600 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const topLoader = useTopLoader()
  const priceDropdownRef = useRef<HTMLButtonElement>(null)
  const typeDropdownRef = useRef<HTMLButtonElement>(null)

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '')
  const [type, setType] = useState(searchParams.get('type') || '')

  useEffect(() => {
    setLocation(searchParams.get('location') || '')
    setPriceRange(searchParams.get('priceRange') || '')
    setType(searchParams.get('type') || '')
    setIsLoading(false)
  }, [searchParams])

  useEffect(() => {
    if (!isLoading) return
    const id = setTimeout(() => setIsLoading(false), 5000)
    return () => clearTimeout(id)
  }, [isLoading])

  const buildParams = (overrides: { location?: string; priceRange?: string; type?: string }) => {
    const merged = { location, priceRange, type, ...overrides }
    const params = new URLSearchParams()
    if (merged.location) params.set('location', merged.location)
    if (merged.priceRange) params.set('priceRange', merged.priceRange)
    if (merged.type) params.set('type', merged.type)
    return params.toString()
  }

  const handleSearch = () => {
    const query = buildParams({})
    const newUrl = `/properties${query ? `?${query}` : ''}`
    const currentUrl = window.location.pathname + window.location.search.replace(/^\?$/, '')
    if (newUrl === currentUrl) return
    topLoader.start()
    setIsLoading(true)
    router.push(newUrl)
  }

  const handlePriceChange = (v: string) => {
    setPriceRange(v)
    topLoader.start()
    setIsLoading(true)
    router.push(`/properties?${buildParams({ priceRange: v })}`)
  }

  const handleTypeChange = (v: string) => {
    setType(v)
    topLoader.start()
    setIsLoading(true)
    router.push(`/properties?${buildParams({ type: v })}`)
  }

  return (
    <div className={`md:bg-white/95 md:rounded-2xl md:shadow-md md:border md:border-white/60 md:p-3 p-2 flex flex-col md:flex-row gap-2 items-stretch md:items-center transition-opacity duration-200 ${isLoading ? 'opacity-70' : ''}`}>
      {/* Location */}
      <div className="flex-1 basis-0 flex items-center gap-3 bg-gradient-to-br from-gray-100 to-slate-200/90 border border-white/80 shadow-inner rounded-2xl px-3 py-1.5">
        <MapPin size={15} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Location</p>
          <input
            type="text"
            placeholder="Sukhumvit, Bangkok"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full text-sm text-gray-800 font-medium outline-none placeholder:text-gray-400 bg-transparent"
          />
        </div>
      </div>

      {/* Price Range */}
      <div onClick={(e) => { if ((e.target as Element).closest('button') !== priceDropdownRef.current) priceDropdownRef.current?.click() }} className="flex-1 basis-0 flex items-center gap-3 bg-gradient-to-br from-gray-100 to-slate-200/90 border border-white/80 shadow-inner rounded-2xl px-3 py-2 cursor-pointer">
        <Landmark size={15} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Price Range</p>
          <CustomDropdown options={PRICE_OPTIONS} value={priceRange} onChange={handlePriceChange} triggerRef={priceDropdownRef} />
        </div>
      </div>

      {/* Property Type */}
      <div onClick={(e) => { if ((e.target as Element).closest('button') !== typeDropdownRef.current) typeDropdownRef.current?.click() }} className="flex-1 basis-0 flex items-center gap-3 bg-gradient-to-br from-gray-100 to-slate-200/90 border border-white/80 shadow-inner rounded-2xl px-3 py-2 cursor-pointer">
        <Home size={15} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Property Type</p>
          <CustomDropdown options={TYPE_OPTIONS} value={type} onChange={handleTypeChange} triggerRef={typeDropdownRef} />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white p-3.5 rounded-2xl transition-colors shrink-0 flex items-center justify-center gap-2 md:w-auto w-full h-14 md:h-auto"
      >
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        <span className="md:hidden text-sm font-semibold">{isLoading ? 'Searching...' : 'Search'}</span>
      </button>
    </div>
  )
}
