'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Landmark, Home, ChevronDown, Check } from 'lucide-react'

const PRICE_OPTIONS = [
  { label: 'Any Price', value: '' },
  { label: 'Under ฿50M', value: '0-50000000' },
  { label: '฿50M – ฿100M', value: '50000000-100000000' },
  { label: '฿100M – ฿200M', value: '100000000-200000000' },
  { label: '฿200M+', value: '200000000-999999999' },
]

const TYPE_OPTIONS = [
  { label: 'All Types', value: '' },
  { label: 'For Sale', value: 'For Sale' },
  { label: 'For Rent', value: 'For Rent' },
]

function CustomDropdown({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
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
    <div ref={ref} className="relative w-full">
      <button
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

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '')
  const [type, setType] = useState(searchParams.get('type') || '')

  useEffect(() => {
    setLocation(searchParams.get('location') || '')
    setPriceRange(searchParams.get('priceRange') || '')
    setType(searchParams.get('type') || '')
  }, [searchParams])

  const buildParams = (overrides: { location?: string; priceRange?: string; type?: string }) => {
    const merged = { location, priceRange, type, ...overrides }
    const params = new URLSearchParams()
    if (merged.location) params.set('location', merged.location)
    if (merged.priceRange) params.set('priceRange', merged.priceRange)
    if (merged.type) params.set('type', merged.type)
    return params.toString()
  }

  const handleSearch = () => {
    router.push(`/properties?${buildParams({})}`)
  }

  const handlePriceChange = (v: string) => {
    setPriceRange(v)
    router.push(`/properties?${buildParams({ priceRange: v })}`)
  }

  const handleTypeChange = (v: string) => {
    setType(v)
    router.push(`/properties?${buildParams({ type: v })}`)
  }

  return (
    <div className="md:bg-white/95 md:rounded-2xl md:shadow-md md:border md:border-white/60 md:p-3 p-2 flex flex-col md:flex-row gap-2 items-stretch md:items-center">
      {/* Location */}
      <div className="flex-1 basis-0 flex items-center gap-3 bg-gradient-to-br from-gray-100 to-slate-200/90 border border-white/80 shadow-inner rounded-2xl px-3 py-3">
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
      <div className="flex-1 basis-0 flex items-center gap-3 bg-gradient-to-br from-gray-100 to-slate-200/90 border border-white/80 shadow-inner rounded-2xl px-5 py-4">
        <Landmark size={15} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Price Range</p>
          <CustomDropdown options={PRICE_OPTIONS} value={priceRange} onChange={handlePriceChange} />
        </div>
      </div>

      {/* Listing Type */}
      <div className="flex-1 basis-0 flex items-center gap-3 bg-gradient-to-br from-gray-100 to-slate-200/90 border border-white/80 shadow-inner rounded-2xl px-5 py-4">
        <Home size={15} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Listing Type</p>
          <CustomDropdown options={TYPE_OPTIONS} value={type} onChange={handleTypeChange} />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-2xl transition-colors shrink-0 flex items-center justify-center gap-2 md:w-auto w-full h-14 md:h-auto"
      >
        <Search size={18} />
        <span className="md:hidden text-sm font-semibold">Search</span>
      </button>
    </div>
  )
}
