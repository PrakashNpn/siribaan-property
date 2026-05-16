'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Loader2, UploadCloud, X, ChevronDown, Plus, FileText } from 'lucide-react'
import { SortableImageGrid } from './sortable-image-grid'
import { propertySchema, PropertyFormData, PROPERTY_TYPES, PROPERTY_STATUSES, LISTING_TYPES, PROJECT_STATUSES, UnitTypeFormData } from '../validation'
import { Property } from '../types'
import { UnitTypeManager } from './unit-type-manager'

interface PropertyFormProps {
  property?: Property
}

type PendingImage =
  | { type: 'file'; file: File; preview: string }
  | { type: 'url'; url: string }

const AMENITIES_PRESETS = [
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

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="border-t border-gray-100 pt-6 mb-5">
      <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
  )
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [fallbackFolderId] = useState(() => crypto.randomUUID())
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<PendingImage[]>(
    (property?.images || []).map((url) => ({ type: 'url' as const, url }))
  )
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const [imageError, setImageError] = useState<string | null>(null)
  const [nearbyInput, setNearbyInput] = useState('')
  const [customAmenityInput, setCustomAmenityInput] = useState('')
  const [pendingUnitTypes, setPendingUnitTypes] = useState<UnitTypeFormData[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [resolvingMap, setResolvingMap] = useState(false)

  const [pdfOpen, setPdfOpen] = useState(false)
  const [pdfText, setPdfText] = useState<string | null>(null)
  const [pdfAiData, setPdfAiData] = useState<{
    title?: string; description?: string; type?: string
    developer?: string | null; listingType?: string | null; projectStatus?: string | null; startingPrice?: number | null
    location?: string; address?: string
    nearbyPlaces?: string[]; amenities?: string[]; totalFloors?: number | null; totalUnits?: number | null; yearBuilt?: number | null
    unitTypes?: Array<{ name: string; bedrooms: number; bathrooms: number; areaSqmMin: number; areaSqmMax?: number | null; parking: number }>
  } | null>(null)
  const [pdfApplied, setPdfApplied] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const [driveUrl, setDriveUrl] = useState('')

  const extractPdf = async (fd: FormData) => {
    setPdfError(null)
    setPdfText(null)
    setPdfAiData(null)
    setPdfApplied(false)
    setPdfLoading(true)
    try {
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to extract PDF.')
      setPdfText(json.text ?? null)
      if (json.aiData) setPdfAiData(json.aiData)
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : 'Failed to extract PDF.')
    } finally {
      setPdfLoading(false)
    }
  }

  const applyAiData = () => {
    if (!pdfAiData) return
    if (pdfAiData.title) setValue('title', pdfAiData.title)
    if (pdfAiData.description) setValue('description', pdfAiData.description)
    if (pdfAiData.type && ['Condo','Villa','House','Townhouse','Apartment'].includes(pdfAiData.type))
      setValue('type', pdfAiData.type as typeof PROPERTY_TYPES[number])
    if (pdfAiData.developer) setValue('developer', pdfAiData.developer)
    if (pdfAiData.listingType && ['Sale','Rent','Sale & Rent'].includes(pdfAiData.listingType))
      setValue('listingType', pdfAiData.listingType as typeof LISTING_TYPES[number])
    if (pdfAiData.projectStatus && ['Completed','Ready to Move','Under Construction'].includes(pdfAiData.projectStatus))
      setValue('projectStatus', pdfAiData.projectStatus as typeof PROJECT_STATUSES[number])
    if (pdfAiData.startingPrice) setValue('startingPrice', pdfAiData.startingPrice)
    if (pdfAiData.location) setValue('location', pdfAiData.location)
    if (pdfAiData.address) setValue('address', pdfAiData.address)
    if (pdfAiData.nearbyPlaces?.length) setValue('nearbyPlaces', pdfAiData.nearbyPlaces)
    if (pdfAiData.amenities?.length) setValue('amenities', pdfAiData.amenities)
    if (pdfAiData.totalFloors) setValue('totalFloors', pdfAiData.totalFloors)
    if (pdfAiData.totalUnits) setValue('totalUnits', pdfAiData.totalUnits)
    if (pdfAiData.yearBuilt) setValue('yearBuilt', pdfAiData.yearBuilt)
    if (pdfAiData.unitTypes?.length) {
      setPendingUnitTypes(pdfAiData.unitTypes.map(u => ({
        name: u.name,
        bedrooms: u.bedrooms,
        bathrooms: u.bathrooms ?? Math.max(1, u.bedrooms),
        areaSqmMin: u.areaSqmMin,
        areaSqmMax: u.areaSqmMax ?? null,
        parking: u.parking ?? 1,
        images: [],
      })))
    }
    setPdfApplied(true)
  }

  const handlePdfUpload = (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    extractPdf(fd)
  }

  const handleDriveUrl = () => {
    if (!driveUrl.trim()) return
    const fd = new FormData()
    fd.append('driveUrl', driveUrl.trim())
    extractPdf(fd)
  }

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
      developer: property.developer || '',
      listingType: (property.listingType || 'Sale') as typeof LISTING_TYPES[number],
      projectStatus: (property.projectStatus || undefined) as typeof PROJECT_STATUSES[number] | undefined,
      startingPrice: property.startingPrice ?? undefined,
      location: property.location,
      address: property.address,
      mapUrl: property.mapUrl || '',
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
      listingType: 'Sale',
      featured: false,
      images: [],
      amenities: [],
      nearbyPlaces: [],
    },
  })

  const watchedTitle = watch('title')
  const watchedSlug = watch('slug')
  const watchedAmenities = watch('amenities') || []
  const watchedNearby = watch('nearbyPlaces') || []
  const watchedFeatured = watch('featured')

  const folderId = (() => {
    if (property?.images?.[0]) {
      const match = property.images[0].match(/\/properties\/([^/]+)\/images\//)
      if (match) return match[1]
    }
    if (property) return property.id
    return watchedSlug || fallbackFolderId
  })()

  // Auto-generate slug only for new properties
  useEffect(() => {
    if (!property && watchedTitle) setValue('slug', slugify(watchedTitle))
  }, [watchedTitle, property, setValue])

  const toggleAmenity = (amenity: string) => {
    const updated = watchedAmenities.includes(amenity)
      ? watchedAmenities.filter((a) => a !== amenity)
      : [...watchedAmenities, amenity]
    setValue('amenities', updated)
  }

  const addCustomAmenity = () => {
    const trimmed = customAmenityInput.trim()
    if (!trimmed || watchedAmenities.includes(trimmed)) return
    setValue('amenities', [...watchedAmenities, trimmed])
    setCustomAmenityInput('')
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setImageError(null)
    const newItems: PendingImage[] = Array.from(files).map((file) => ({
      type: 'file' as const,
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newItems])
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    const item = images[index]
    if (item.type === 'file') {
      URL.revokeObjectURL(item.preview)
    } else {
      setRemovedImages((prev) => [...prev, item.url])
    }
    setImages((prev) => prev.filter((_, i) => i !== index))
  }


  const uploadPendingImages = async (): Promise<string[]> => {
    const results: string[] = []
    const updated: PendingImage[] = []
    let failCount = 0
    for (const item of images) {
      if (item.type === 'url') {
        results.push(item.url)
        updated.push(item)
      } else {
        try {
          const formData = new FormData()
          formData.append('file', item.file)
          const res = await fetch(`/api/upload?folder=properties/${folderId}/images`, { method: 'POST', body: formData })
          if (res.ok) {
            const { url } = await res.json()
            results.push(url)
            updated.push({ type: 'url', url })
          } else {
            failCount++
          }
        } catch {
          failCount++
        }
      }
    }
    setImages(updated)
    if (failCount > 0) {
      toast.error(`${failCount} image${failCount > 1 ? 's' : ''} failed to upload. Please try again.`)
    }
    return results
  }

  const onSubmit = async (data: PropertyFormData) => {
    setSubmitError(null)

    if (images.length === 0) {
      setImageError('Please add at least one image.')
      document.getElementById('image-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }


    try {
      setUploading(true)
      const uploadedUrls = await uploadPendingImages()
      setUploading(false)
      data.images = uploadedUrls
      setValue('images', uploadedUrls)

      const url = property ? `/api/properties/${property.id}` : '/api/properties'
      const method = property ? 'PUT' : 'POST'
      const body = property ? data : { ...data, unitTypes: pendingUnitTypes }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        if (json.error?.fieldErrors) {
          const fields = Object.entries(json.error.fieldErrors as Record<string, string[]>)
            .map(([f, msgs]) => `${f}: ${msgs[0]}`).join(', ')
          throw new Error(`Validation failed — ${fields}`)
        }
        throw new Error(json.message || `Server error ${res.status}`)
      }
      // Purge deferred-removed images from storage only after a confirmed save
      if (removedImages.length > 0) {
        removedImages.forEach((url) => {
          fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) })
            .catch(console.error)
        })
        setRemovedImages([])
      }
      toast.success(property ? 'Property updated successfully.' : 'Property created successfully.')
      router.push('/admin/properties')
      router.refresh()
    } catch (err) {
      setUploading(false)
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* ── PDF REFERENCE PANEL (new properties only) ──────────────────── */}
      {!property && (
        <div className="rounded-2xl border border-blue-100 overflow-hidden">
          {/* Toggle bar */}
          <button
            type="button"
            onClick={() => setPdfOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-[#F5F7FF] hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#125DE5]">
              <FileText size={15} />
              PDF Reference — paste your brochure for quick copy
            </div>
            <ChevronDown size={15} className={`text-[#125DE5] transition-transform ${pdfOpen ? 'rotate-180' : ''}`} />
          </button>

          {pdfOpen && (
            <div className="px-5 py-4 bg-white border-t border-blue-50 space-y-3">
              {/* Input area — shown until text is loaded */}
              {!pdfText && !pdfLoading && (
                <div className="space-y-3">
                  {/* Primary: Google Drive URL */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Google Drive Link</p>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={driveUrl}
                        onChange={(e) => setDriveUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleDriveUrl() } }}
                        placeholder="https://drive.google.com/file/d/…/view"
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
                      />
                      <button
                        type="button"
                        onClick={handleDriveUrl}
                        disabled={!driveUrl.trim()}
                        className="px-4 py-2.5 bg-[#125DE5] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                      >
                        Extract
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400">File must be shared as &ldquo;Anyone with the link can view&rdquo;</p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[11px] text-gray-400 font-medium">or upload directly</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Secondary: File upload */}
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-blue-100 rounded-xl py-4 cursor-pointer hover:border-[#125DE5]/40 hover:bg-blue-50/30 transition-all">
                    <UploadCloud size={16} className="text-[#125DE5]/40" />
                    <span className="text-sm text-gray-500">Click to upload PDF</span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePdfUpload(f) }}
                    />
                  </label>
                </div>
              )}

              {/* Loading */}
              {pdfLoading && (
                <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400">
                  <Loader2 size={16} className="animate-spin text-[#125DE5]" />
                  Extracting text… this may take a moment for large files
                </div>
              )}

              {/* Error */}
              {pdfError && (
                <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <p className="text-xs text-red-600">{pdfError}</p>
                  <button type="button" onClick={() => setPdfError(null)} className="text-red-400 hover:text-red-600">
                    <X size={13} />
                  </button>
                </div>
              )}

              {/* AI results */}
              {(pdfText || pdfAiData) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      {pdfAiData ? 'Ready to apply' : 'Extracted (no API key — add ANTHROPIC_API_KEY to .env.local)'}
                    </p>
                    <button
                      type="button"
                      onClick={() => { setPdfText(null); setPdfAiData(null); setPdfApplied(false); setPdfError(null) }}
                      className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                    >
                      <X size={11} /> Clear
                    </button>
                  </div>

                  {pdfAiData && (
                    <>
                      {/* Preview card */}
                      <div className="bg-[#F5F7FF] border border-blue-50 rounded-xl divide-y divide-blue-50 text-sm">
                        {pdfAiData.title && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Title</span>
                            <span className="text-gray-700 font-semibold">{pdfAiData.title}</span>
                          </div>
                        )}
                        {pdfAiData.type && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Type</span>
                            <span className="text-gray-700">{pdfAiData.type}</span>
                          </div>
                        )}
                        {pdfAiData.location && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Location</span>
                            <span className="text-gray-700">{pdfAiData.location}</span>
                          </div>
                        )}
                        {pdfAiData.address && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Address</span>
                            <span className="text-gray-700">{pdfAiData.address}</span>
                          </div>
                        )}
                        {(pdfAiData.totalFloors || pdfAiData.totalUnits) && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Stats</span>
                            <span className="text-gray-700">
                              {[pdfAiData.totalFloors && `${pdfAiData.totalFloors} floors`, pdfAiData.totalUnits && `${pdfAiData.totalUnits} units`].filter(Boolean).join(' · ')}
                            </span>
                          </div>
                        )}
                        {pdfAiData.amenities && pdfAiData.amenities.length > 0 && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Amenities</span>
                            <span className="text-gray-700">{pdfAiData.amenities.length} items detected</span>
                          </div>
                        )}
                        {pdfAiData.unitTypes && pdfAiData.unitTypes.length > 0 && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Unit Types</span>
                            <div className="flex flex-wrap gap-1.5">
                              {pdfAiData.unitTypes.map((u, i) => (
                                <span key={i} className="text-xs bg-white border border-blue-100 rounded-lg px-2 py-0.5 text-gray-600">
                                  {u.name} · {u.areaSqmMin}{u.areaSqmMax ? ` – ${u.areaSqmMax}` : ''} m²
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {pdfAiData.description && (
                          <div className="px-4 py-3 flex gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-24 pt-0.5 shrink-0">Description</span>
                            <span className="text-gray-500 text-xs line-clamp-3">{pdfAiData.description}</span>
                          </div>
                        )}
                      </div>

                      {pdfApplied ? (
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-700 font-semibold">
                          ✓ Applied to form — scroll down to review and fill in any missing fields.
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={applyAiData}
                          className="w-full bg-[#125DE5] hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition shadow-[0_4px_16px_rgba(18,93,229,0.25)] hover:shadow-[0_4px_20px_rgba(18,93,229,0.35)]"
                        >
                          Apply All Fields to Form
                        </button>
                      )}
                      <p className="text-[11px] text-amber-600 text-center">Review the filled fields and set Starting Price before saving.</p>
                    </>
                  )}

                  {/* Fallback: raw text if no AI */}
                  {!pdfAiData && pdfText && (
                    <div className="h-52 overflow-y-auto bg-[#F5F7FF] border border-blue-50 rounded-xl p-4">
                      <pre className="whitespace-pre-wrap text-xs text-gray-600 leading-relaxed font-sans">{pdfText}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── BASIC INFO ─────────────────────────────────────────────────── */}
      <SectionHeader title="Basic Information" />

      <div>
        <label className={labelClass}>Title <span className="text-red-400">*</span></label>
        <input {...register('title')} placeholder="e.g. The Residences at Sukhumvit 39" className={inputClass} />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <input type="hidden" {...register('slug')} />

      <div>
        <label className={labelClass}>Description <span className="text-red-400">*</span></label>
        <textarea
          {...register('description')}
          rows={6}
          placeholder="Describe the property…"
          className={`${inputClass} resize-y min-h-[120px]`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Property Type</label>
          <select {...register('type')} className={inputClass}>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={inputClass}>
            {PROPERTY_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
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

        <div>
          <label className={labelClass}>Listing Type</label>
          <select {...register('listingType')} className={inputClass}>
            {LISTING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Project Status (optional)</label>
          <select {...register('projectStatus')} className={inputClass}>
            <option value="">— Select —</option>
            {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Developer (optional)</label>
          <input {...register('developer')} placeholder="e.g. Sansiri, Origin, SC Asset" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Starting Price ฿ (optional)</label>
          <input
            {...register('startingPrice', { setValueAs: (v) => v === '' ? null : Number(v) })}
            type="number"
            min="0"
            step="1000"
            placeholder="e.g. 3500000"
            className={inputClass}
          />
          {errors.startingPrice && <p className="text-red-500 text-xs mt-1">{errors.startingPrice.message}</p>}
        </div>
      </div>

      {/* Featured toggle — full-width row */}
      <div className="flex items-center gap-3 py-1">
        <button
          type="button"
          onClick={() => setValue('featured', !watchedFeatured)}
          className={`relative w-11 h-6 rounded-full overflow-hidden transition-colors duration-200 shrink-0 ${watchedFeatured ? 'bg-[#125DE5]' : 'bg-gray-200'}`}
        >
          <span className={`absolute left-0 top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${watchedFeatured ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
        </button>
        <div>
          <p className="text-sm font-medium text-gray-700">Featured on homepage</p>
          <p className="text-xs text-gray-400">Shows in the Featured Residences section</p>
        </div>
      </div>

      {/* ── LOCATION ───────────────────────────────────────────────────── */}
      <SectionHeader title="Location" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Area / District <span className="text-red-400">*</span></label>
          <input {...register('location')} placeholder="e.g. Sukhumvit, Bangkok" className={inputClass} />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Full Address <span className="text-red-400">*</span></label>
          <input {...register('address')} placeholder="e.g. 1 Chan Rd, Thung Maha Mek, Sathorn, Bangkok 10120" className={inputClass} />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Google Maps Link</label>
          <div className="relative">
            <input
              {...register('mapUrl')}
              placeholder="Paste any Google Maps link — short or full URL"
              className={inputClass}
              onBlur={async (e) => {
                const val = e.target.value.trim()
                if (!val) return
                if (val.includes('maps.app.goo.gl') || !val.includes('@')) {
                  setResolvingMap(true)
                  try {
                    const res = await fetch('/api/resolve-map-url', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ url: val }),
                    })
                    if (res.ok) {
                      const { resolved } = await res.json()
                      if (resolved && resolved !== val) setValue('mapUrl', resolved)
                    }
                  } finally {
                    setResolvingMap(false)
                  }
                }
              }}
            />
            {resolvingMap && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400">Resolving…</span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Paste any Google Maps link — short share links are resolved automatically.</p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Nearby Places (BTS, MRT, schools…)</label>
        <div className="flex gap-2 mb-2">
          <input
            value={nearbyInput}
            onChange={(e) => setNearbyInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNearbyPlace() } }}
            placeholder="e.g. BTS Phrom Phong (200m) — press Enter to add"
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
                <button type="button" onClick={() => removeNearbyPlace(place)} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── IMAGES ─────────────────────────────────────────────────────── */}
      <div id="image-section">
        <SectionHeader title="Images" />
      </div>

      <div>
        <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" id="image-upload" />
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${imageError ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/40'}`}
        >
          <UploadCloud size={24} className={`mb-2 ${imageError ? 'text-red-400' : 'text-gray-400'}`} />
          <p className="text-sm text-gray-500 font-medium">Click to select images</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG — up to 10 MB each · uploaded when you save</p>
        </label>
        {imageError && <p className="text-red-500 text-xs mt-1.5">{imageError}</p>}

        {images.length > 0 && (
          <SortableImageGrid
            images={images}
            onChange={setImages}
            onRemove={removeImage}
          />
        )}
      </div>

      {/* ── AMENITIES ──────────────────────────────────────────────────── */}
      <SectionHeader title="Amenities" />

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES_PRESETS.map((amenity) => (
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

        {/* Custom amenities added by user */}
        {watchedAmenities.filter(a => !AMENITIES_PRESETS.includes(a)).map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <span className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-[#125DE5] bg-blue-50 text-[#125DE5]">
              {amenity}
            </span>
            <button
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Add custom amenity */}
        <div className="flex gap-2">
          <input
            value={customAmenityInput}
            onChange={(e) => setCustomAmenityInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomAmenity() } }}
            placeholder="Add custom amenity…"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors shrink-0"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* ── UNIT TYPES (create only) ────────────────────────────────────── */}
      {!property && (
        <>
          <div id="unit-types-section">
          <SectionHeader title="Unit Types" desc="Add at least one unit type so buyers can see pricing and availability." />
          </div>
          <UnitTypeManager
            propertyId=""
            folderId={folderId}
            unitTypes={[]}
            pendingUnitTypes={pendingUnitTypes}
            onPendingChange={setPendingUnitTypes}
          />
        </>
      )}

      {/* ── OPTIONAL DETAILS ───────────────────────────────────────────── */}
      <SectionHeader title="Optional Details" desc="Leave blank anything you don't have — these can be added later." />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Year Built</label>
          <input {...register('yearBuilt', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" placeholder="e.g. 2020" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Est. Completion</label>
          <input {...register('completionDate')} placeholder="e.g. Q4 2026" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Total Floors</label>
          <input {...register('totalFloors', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="1" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Total Units</label>
          <input {...register('totalUnits', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="1" className={inputClass} />
        </div>
      </div>

      {/* ── SUBMIT ─────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
        {submitError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            <span className="font-semibold shrink-0">Error:</span>
            <span>{submitError}</span>
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="flex items-center gap-2 bg-[#125DE5] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-xl transition-colors text-sm"
          >
            {(isSubmitting || uploading) && <Loader2 size={15} className="animate-spin" />}
            {uploading ? 'Uploading images…' : isSubmitting ? 'Saving…' : property ? 'Update Property' : 'Create Property'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 font-semibold px-6 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
