import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Plus, Pencil, Eye, Building2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { formatPrice } from '@/lib/utils'
import { DeletePropertyButton } from './delete-button'
import { FeaturedToggle } from './featured-toggle'
import { AdminFilters } from './admin-filters'

export const dynamic = 'force-dynamic'

interface SearchParams { search?: string; status?: string; type?: string; sort?: string; page?: string }

const TYPE_COLORS: Record<string, string> = {
  Villa:     'bg-amber-50 text-amber-700 border-amber-100',
  Condo:     'bg-blue-50 text-[#125DE5] border-blue-100',
  House:     'bg-emerald-50 text-emerald-700 border-emerald-100',
  Townhouse: 'bg-purple-50 text-purple-700 border-purple-100',
  Apartment: 'bg-indigo-50 text-indigo-700 border-indigo-100',
}

export default async function AdminPropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page ?? '1'))
  const { properties, total, totalPages } = await propertyService.getAllAdmin(
    { search: sp.search, status: sp.status, type: sp.type, sort: sp.sort },
    { page, pageSize: 20 }
  )

  const activeCount = properties.filter((p) => p.status === 'active').length
  const featuredCount = properties.filter((p) => p.featured).length

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#125DE5] mb-1 flex items-center gap-2">
            <span className="w-5 h-px bg-[#125DE5] inline-block" />
            Portfolio
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Properties</h1>
          <div className="w-8 h-0.5 bg-amber-400 mt-2 mb-2" />
          <p className="text-sm text-gray-400">
            {total} {sp.search || sp.status || sp.type ? 'results' : 'total'}
            {!sp.search && !sp.status && !sp.type && (
              <> &middot; {activeCount} active &middot; {featuredCount} featured</>
            )}
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="bg-[#125DE5] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 shadow-[0_4px_16px_rgba(18,93,229,0.3)] hover:shadow-[0_4px_20px_rgba(18,93,229,0.4)] mt-1"
        >
          <Plus size={16} /> Add Property
        </Link>
      </div>

      {/* Filters */}
      <Suspense>
        <AdminFilters
          search={sp.search ?? ''}
          status={sp.status ?? 'all'}
          type={sp.type ?? 'all'}
          sort={sp.sort ?? 'newest'}
        />
      </Suspense>

      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-blue-50 p-16 text-center shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          <Building2 size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 mb-4 text-sm">No properties found.</p>
          <Link href="/admin/properties/new" className="text-[#125DE5] text-sm font-semibold">
            Add your first property →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          {/* Table header — desktop only */}
          <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_0.7fr_auto] items-center bg-[#F5F7FF] border-b border-blue-50 px-5 py-3 gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Property</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Location</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Starting Price</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Status</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 text-right pr-1">Actions</p>
          </div>

          {/* Rows */}
          <div className="divide-y divide-blue-50/80">
            {properties.map((property) => {
              const startingPrice = property.startingPrice ?? null
              const typeCls = TYPE_COLORS[property.type] ?? 'bg-gray-50 text-gray-600 border-gray-100'

              return (
                <div key={property.id} className="group hover:bg-blue-50/30 transition-colors duration-150">

                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_0.7fr_auto] items-center px-5 py-4 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-12 bg-gray-100 rounded-xl overflow-hidden relative shrink-0 flex items-center justify-center shadow-sm">
                        {property.images[0] ? (
                          <Image src={property.images[0]} alt="" fill sizes="56px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <Building2 size={16} className="text-gray-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate leading-snug">{property.title}</p>
                        <span className={`inline-flex items-center mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeCls}`}>{property.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin size={11} className="text-gray-300 shrink-0" />
                      <span className="text-sm text-gray-500 truncate">{property.location}</span>
                    </div>
                    <div>
                      {startingPrice !== null ? (
                        <><p className="text-[10px] text-gray-400 uppercase tracking-wide">From</p><p className="text-sm font-bold text-gray-900">฿{formatPrice(startingPrice)}</p></>
                      ) : <span className="text-sm text-gray-300">—</span>}
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${property.status === 'active' ? 'text-emerald-600' : 'text-gray-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${property.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                        {property.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center divide-x divide-blue-50 border border-blue-100 rounded-xl overflow-hidden bg-white shadow-[0_1px_4px_rgba(18,93,229,0.06)]">
                      <FeaturedToggle id={property.id} featured={property.featured} />
                      <Link href={`/properties/${property.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors" title="View on site"><Eye size={14} /></Link>
                      <Link href={`/admin/properties/${property.id}/edit`} className="p-2 text-gray-400 hover:text-[#125DE5] hover:bg-blue-50 transition-colors" title="Edit"><Pencil size={14} /></Link>
                      <DeletePropertyButton id={property.id} title={property.title} />
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="md:hidden flex items-start gap-3 px-4 py-4">
                    <div className="w-16 h-14 bg-gray-100 rounded-xl overflow-hidden relative shrink-0">
                      {property.images[0] ? (
                        <Image src={property.images[0]} alt="" fill sizes="64px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Building2 size={16} className="text-gray-300" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900 leading-snug truncate">{property.title}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold shrink-0 ${property.status === 'active' ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${property.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                          {property.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeCls}`}>{property.type}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={10} />{property.location}</span>
                      </div>
                      {startingPrice !== null && (
                        <p className="text-sm font-bold text-gray-900 mt-1">฿{formatPrice(startingPrice)}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <FeaturedToggle id={property.id} featured={property.featured} />
                        <Link href={`/properties/${property.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg transition-colors"><Eye size={13} /></Link>
                        <Link href={`/admin/properties/${property.id}/edit`} className="p-1.5 text-gray-400 hover:text-[#125DE5] border border-gray-200 rounded-lg transition-colors"><Pencil size={13} /></Link>
                        <DeletePropertyButton id={property.id} title={property.title} />
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-gray-400">Page {page} of {totalPages}</p>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={{ query: { ...sp, page: page - 1 } }}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#125DE5] border border-gray-200 hover:border-[#125DE5] px-3 py-2 rounded-xl transition-colors"
              >
                <ChevronLeft size={13} /> Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={{ query: { ...sp, page: page + 1 } }}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#125DE5] border border-gray-200 hover:border-[#125DE5] px-3 py-2 rounded-xl transition-colors"
              >
                Next <ChevronRight size={13} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
