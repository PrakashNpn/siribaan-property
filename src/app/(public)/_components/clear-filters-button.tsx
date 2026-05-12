'use client'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export function ClearFiltersButton() {
  const searchParams = useSearchParams()
  const hasFilters = !!(
    searchParams.get('location') ||
    searchParams.get('priceRange') ||
    searchParams.get('type')
  )

  if (!hasFilters) return null

  return (
    <Link
      href="/properties"
      className="flex items-center gap-1 text-xs font-medium text-[#125DE5] hover:opacity-70 transition-opacity duration-200"
    >
      <X size={12} />
      Clear filters
    </Link>
  )
}
