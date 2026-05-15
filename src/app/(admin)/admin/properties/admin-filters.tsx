'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Search, X, ChevronDown, ArrowUpDown } from 'lucide-react'
import { PROPERTY_TYPES } from '@/features/property/validation'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  ...PROPERTY_TYPES.map((t) => ({ value: t, label: t })),
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'title-asc', label: 'Name: A → Z' },
]

function PremiumSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  icon?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = value && value !== 'all' && value !== 'newest'
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium border transition-all duration-200 whitespace-nowrap cursor-pointer ${
          isActive
            ? 'bg-blue-50 border-[#125DE5] text-[#125DE5] shadow-[0_0_0_3px_rgba(18,93,229,0.08)]'
            : 'bg-white border-blue-100 text-gray-600 hover:border-[#125DE5]/40 hover:text-[#125DE5] hover:bg-blue-50/40 shadow-[0_2px_8px_rgba(18,93,229,0.05)]'
        }`}
      >
        {icon && <span className="opacity-60">{icon}</span>}
        <span>{selected?.label ?? options[0]?.label}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-blue-100 rounded-2xl shadow-[0_8px_32px_rgba(18,93,229,0.13)] overflow-hidden min-w-[168px] py-1.5">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                opt.value === value
                  ? 'bg-blue-50 text-[#125DE5] font-semibold'
                  : 'text-gray-700 hover:bg-blue-50/50 hover:text-[#125DE5]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function AdminFilters({
  search,
  status,
  type,
  sort,
}: {
  search: string
  status: string
  type: string
  sort?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(search)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const push = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all' && value !== 'newest') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => push('search', searchValue), 350)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchValue])

  const hasFilters =
    search || (status && status !== 'all') || (type && type !== 'all') || (sort && sort !== 'newest')

  const clearAll = () => {
    setSearchValue('')
    router.push(pathname)
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#125DE5]/50 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search properties…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-white border border-blue-100 rounded-full pl-10 pr-9 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#125DE5] focus:ring-2 focus:ring-[#125DE5]/10 shadow-[0_2px_8px_rgba(18,93,229,0.05)] transition-all duration-200"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#125DE5] transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-blue-100 hidden sm:block" />

      {/* Status filter */}
      <PremiumSelect
        value={status || 'all'}
        onChange={(v) => push('status', v)}
        options={STATUS_OPTIONS}
      />

      {/* Type filter */}
      <PremiumSelect
        value={type || 'all'}
        onChange={(v) => push('type', v)}
        options={TYPE_OPTIONS}
      />

      {/* Sort */}
      <PremiumSelect
        value={sort || 'newest'}
        onChange={(v) => push('sort', v)}
        options={SORT_OPTIONS}
        icon={<ArrowUpDown size={13} />}
      />

      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200"
        >
          <X size={13} />
          Clear
        </button>
      )}
    </div>
  )
}
