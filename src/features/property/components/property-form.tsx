'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { propertySchema, PropertyFormData, PROPERTY_TYPES, PROPERTY_STATUSES, UnitTypeFormData } from '../validation'
import { Property } from '../types'
import { UnitTypeManager } from './unit-type-manager'

interface PropertyFormProps {
  property?: Property
}

const AMENITIES_OPTIONS = [
  'Private Sky Garden & Infinity Pool',
  'Professional-grade Wine Cellar',
  'En-suite Private Cinema',
  '24/7 Elite Concierge Service',
  'Smart-Home Central Integration',
  'Direct Elevator Access',
  'Private Gym & Spa',
  'Underground Parking',
  'Rooftop Terrace',
  'Smart Security System',
]

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || [])
  const [nearbyInput, setNearbyInput] = useState('')
  const [pendingUnitTypes, setPendingUnitTypes] = useState<UnitTypeFormData[]>([])

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: property ? {
      title: property.title,
      slug: property.slug,
      description: property.description,
      type: property.type as typeof PROPERTY_TYPES[number],
      status: property.status as typeof PROPERTY_STATUSES[number],
      tag: property.tag || '',
      featured: property.featured,
      location: property.location,
      address: property.address,
      nearbyPlaces: property.nearbyPlaces,
      yearBuilt: property.yearBuilt ?? undefined,
      completionDate: property.completionDate ?? undefined,
      totalFloors: property.totalFloors ?? undefined,
      totalUnits: property.totalUnits ?? undefined,
      images: property.images,
      amenities: property.amenities,
    } : {
      type: 'Condo',
      status: 'active',
      featured: false,
      images: [],
      amenities: [],
      nearbyPlaces: [],
    },
  })

  const watchedAmenities = watch('amenities') || []
  const watchedNearby = watch('nearbyPlaces') || []
  const watchedFeatured = watch('featured')

  const toggleAmenity = (amenity: string) => {
    const updated = watchedAmenities.includes(amenity)
      ? watchedAmenities.filter((a) => a !== amenity)
      : [...watchedAmenities, amenity]
    setValue('amenities', updated)
  }

  const addNearbyPlace = () => {
    const trimmed = nearbyInput.trim()
    if (!trimmed || watchedNearby.includes(trimmed)) return
    setValue('nearbyPlaces', [...watchedNearby, trimmed])
    setNearbyInput('')
  }

  const removeNearbyPlace = (place: string) => {
    setValue('nearbyPlaces', watchedNearby.filter((p) => p !== place))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const { url } = await res.json()
        urls.push(url)
      }
    }
    const updated = [...imageUrls, ...urls]
    setImageUrls(updated)
    setValue('images', updated)
    setUploading(false)
  }

  const onSubmit = async (data: PropertyFormData) => {
    const url = property ? `/api/properties/${property.id}` : '/api/properties'
    const method = property ? 'PUT' : 'POST'
    const body = property ? data : { ...data, unitTypes: pendingUnitTypes }
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      router.push('/admin/properties')
      router.refresh()
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Title */}
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input {...register('title')} placeholder="e.g. The Residences at Sukhumvit 39" className={inputClass} />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Slug */}
        <div className="md:col-span-2">
          <label className={labelClass}>Slug</label>
          <input {...register('slug')} placeholder="e.g. the-residences-sukhumvit-39" className={inputClass} />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea {...register('description')} rows={4} placeholder="Property description" className={`${inputClass} resize-none`} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label className={labelClass}>Property Type</label>
          <select {...register('type')} className={inputClass}>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={inputClass}>
            {PROPERTY_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        {/* Tag */}
        <div>
          <label className={labelClass}>Tag (optional)</label>
          <select {...register('tag')} className={inputClass}>
            <option value="">None</option>
            <option value="EXCLUSIVE">Exclusive</option>
            <option value="HOT LISTING">Hot Listing</option>
            <option value="NEW LISTING">New Listing</option>
            <option value="RIVERSIDE">Riverside</option>
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3 pt-5">
          <button
            type="button"
            onClick={() => setValue('featured', !watchedFeatured)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${watchedFeatured ? 'bg-[#125DE5]' : 'bg-gray-200'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${watchedFeatured ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
          <label className="text-sm font-medium text-gray-700">Featured on homepage</label>
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Location / Area</label>
          <input {...register('location')} placeholder="e.g. Sukhumvit, Bangkok" className={inputClass} />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>Full Address</label>
          <input {...register('address')} placeholder="Full address for map" className={inputClass} />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        {/* Year Built */}
        <div>
          <label className={labelClass}>Year Built (optional)</label>
          <input {...register('yearBuilt', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} type="number" placeholder="e.g. 2018" className={inputClass} />
        </div>

        {/* Completion Date */}
        <div>
          <label className={labelClass}>Completion Date (optional)</label>
          <input {...register('completionDate')} placeholder="e.g. Q4 2026" className={inputClass} />
        </div>

        {/* Total Floors */}
        <div>
          <label className={labelClass}>Total Floors (optional)</label>
          <input {...register('totalFloors', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="1" className={inputClass} />
        </div>

        {/* Total Units */}
        <div>
          <label className={labelClass}>Total Units (optional)</label>
          <input {...register('totalUnits', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="1" className={inputClass} />
        </div>

        {/* Land Area */}
        <div>
          <label className={labelClass}>Land Area (sqm) (optional)</label>
          <input {...register('landAreaSqm', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="0" step="0.1" placeholder="For houses and villas" className={inputClass} />
        </div>
      </div>

      {/* Nearby Places */}
      <div>
        <label className={labelClass}>Nearby Places (BTS, MRT, Schools...)</label>
        <div className="flex gap-2 mb-2">
          <input
            value={nearbyInput}
            onChange={(e) => setNearbyInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNearbyPlace() } }}
            placeholder="e.g. BTS Phrom Phong (200m)"
            className={inputClass}
          />
          <button type="button" onClick={addNearbyPlace} className="px-4 py-2 bg-[#125DE5] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">
            Add
          </button>
        </div>
        {watchedNearby.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {watchedNearby.map((place) => (
              <span key={place} className="flex items-center gap-1.5 bg-blue-50 text-[#125DE5] text-xs font-medium px-3 py-1.5 rounded-full">
                {place}
                <button type="button" onClick={() => removeNearbyPlace(place)} className="hover:text-red-500 transition-colors">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      <div>
        <label className={labelClass}>Images</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="cursor-pointer">
            <p className="text-sm text-gray-500">{uploading ? 'Uploading...' : 'Click to upload images'}</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
          </label>
        </div>
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const updated = imageUrls.filter((_, idx) => idx !== i)
                    setImageUrls(updated)
                    setValue('images', updated)
                  }}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div>
        <label className={labelClass}>Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES_OPTIONS.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`text-left text-sm px-4 py-2.5 rounded-xl border transition-colors ${
                watchedAmenities.includes(amenity)
                  ? 'border-[#125DE5] bg-blue-50 text-[#125DE5]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Types — only on create, edit page handles them separately */}
      {!property && (
        <div className="border-t border-gray-100 pt-6">
          <div className="mb-4">
            <p className="text-sm font-bold text-gray-900">Unit Types</p>
            <p className="text-xs text-gray-400 mt-0.5">Add the unit types available in this property before saving.</p>
          </div>
          <UnitTypeManager
            propertyId=""
            unitTypes={[]}
            pendingUnitTypes={pendingUnitTypes}
            onPendingChange={setPendingUnitTypes}
          />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="bg-[#125DE5] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
        >
          {isSubmitting ? 'Saving...' : property ? 'Update Property' : 'Create Property'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
