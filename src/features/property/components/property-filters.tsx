'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, DollarSign, Home } from 'lucide-react'

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '')
  const [type, setType] = useState(searchParams.get('type') || '')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (priceRange) params.set('priceRange', priceRange)
    if (type) params.set('type', type)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
        <MapPin size={16} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Location</p>
          <input
            type="text"
            placeholder="Sukhumvit, Bangkok"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
        <DollarSign size={16} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Price Range</p>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full text-sm text-gray-700 outline-none bg-transparent"
          >
            <option value="">Any Price</option>
            <option value="0-50000000">Under ฿50M</option>
            <option value="50000000-100000000">฿50M - ฿100M</option>
            <option value="100000000-200000000">฿100M - ฿200M</option>
            <option value="200000000-999999999">฿200M+</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
        <Home size={16} className="text-blue-600 shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Listing Type</p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full text-sm text-gray-700 outline-none bg-transparent"
          >
            <option value="">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-xl transition-colors shrink-0"
      >
        <Search size={18} />
      </button>
    </div>
  )
}
