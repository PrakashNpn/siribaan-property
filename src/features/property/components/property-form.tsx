'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { propertySchema, PropertyFormData } from '../validation'
import { Property } from '../types'

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

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: property ? {
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      areaSqm: property.areaSqm,
      parking: property.parking,
      type: property.type as 'For Sale' | 'For Rent',
      status: property.status as 'active' | 'sold' | 'rented',
      tag: property.tag || '',
      images: property.images,
      amenities: property.amenities,
    } : {
      type: 'For Sale',
      status: 'active',
      images: [],
      amenities: [],
    },
  })

  const watchedAmenities = watch('amenities') || []

  const toggleAmenity = (amenity: string) => {
    const current = watchedAmenities
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity]
    setValue('amenities', updated)
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
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input {...register('title')} placeholder="Property title" className={inputClass} />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea {...register('description')} rows={4} placeholder="Property description" className={`${inputClass} resize-none`} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Price (฿)</label>
          <input {...register('price', { valueAsNumber: true })} type="number" placeholder="145000000" className={inputClass} />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input {...register('location')} placeholder="Sukhumvit, Bangkok" className={inputClass} />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <input {...register('address')} placeholder="Full address" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Bedrooms</label>
          <input {...register('bedrooms', { valueAsNumber: true })} type="number" min="0" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Bathrooms</label>
          <input {...register('bathrooms', { valueAsNumber: true })} type="number" min="0" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Area (sqm)</label>
          <input {...register('areaSqm', { valueAsNumber: true })} type="number" min="0" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Parking</label>
          <input {...register('parking', { valueAsNumber: true })} type="number" min="0" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Type</label>
          <select {...register('type')} className={inputClass}>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={inputClass}>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>

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
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
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
