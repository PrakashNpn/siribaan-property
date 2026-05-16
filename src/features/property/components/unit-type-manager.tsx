'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Trash2, Plus, X, Bed, Square, Loader2, AlertTriangle, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { unitTypeSchema, UnitTypeFormData } from '../validation'
import { UnitType } from '../types'

interface UnitTypeManagerProps {
  propertyId: string
  folderId?: string
  unitTypes: UnitType[]
  pendingUnitTypes?: UnitTypeFormData[]
  onPendingChange?: (units: UnitTypeFormData[]) => void
}

function UnitTypeForm({
  onSave,
  defaultValues,
  onCancel,
  folderId,
}: {
  onSave: (data: UnitTypeFormData) => void | Promise<void>
  defaultValues?: Partial<UnitTypeFormData>
  onCancel: () => void
  folderId: string
}) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(defaultValues?.images ?? [])
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<UnitTypeFormData>({
    resolver: zodResolver(unitTypeSchema),
    defaultValues: { parking: 1, bedrooms: 1, bathrooms: 1, images: [], ...defaultValues },
  })

  const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
  const labelCls = "text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block"

  const handleImageUpload = async (files: FileList) => {
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(`/api/upload?folder=properties/${folderId}/unit-types`, { method: 'POST', body: fd })
      if (res.ok) {
        const { url } = await res.json()
        urls.push(url)
      }
    }
    const next = [...uploadedImages, ...urls]
    setUploadedImages(next)
    setValue('images', next)
    setUploading(false)
  }

  const removeImage = (url: string) => {
    const next = uploadedImages.filter((u) => u !== url)
    setUploadedImages(next)
    setValue('images', next)
    setRemovedImages((prev) => [...prev, url])
  }

  const deleteFromStorage = (url: string) =>
    fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) }).catch(() => {})

  // On save: delete removed images from storage, then call onSave
  const handleSaveWithCleanup = (data: UnitTypeFormData) => {
    for (const url of removedImages) deleteFromStorage(url)
    return onSave({ ...data, images: uploadedImages })
  }

  // On cancel: delete only newly uploaded images (not in original defaultValues), restore nothing
  const handleCancel = () => {
    const originalImages = new Set(defaultValues?.images ?? [])
    for (const url of uploadedImages) {
      if (!originalImages.has(url)) deleteFromStorage(url)
    }
    onCancel()
  }

  return (
    <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5 space-y-4">
      {/* Name */}
      <div>
        <label className={labelCls}>Name <span className="text-red-400">*</span></label>
        <input {...register('name')} placeholder="e.g. 1BR · Type A, Studio, Penthouse" className={inputCls} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Core fields */}
      <div className="grid grid-cols-5 gap-3">
        <div>
          <label className={labelCls}>Bedrooms <span className="text-red-400">*</span></label>
          <input
            {...register('bedrooms', { valueAsNumber: true })}
            type="number" min="0" className={inputCls}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 0
              setValue('bedrooms', v)
              setValue('bathrooms', Math.max(1, v))
            }}
          />
        </div>
        <div>
          <label className={labelCls}>Bathrooms <span className="text-red-400">*</span></label>
          <input {...register('bathrooms', { valueAsNumber: true })} type="number" min="1" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Min m² <span className="text-red-400">*</span></label>
          <input {...register('areaSqmMin', { valueAsNumber: true })} type="number" min="1" step="0.01" placeholder="e.g. 32.25" className={inputCls} />
          {errors.areaSqmMin && <p className="text-red-500 text-xs mt-1">{errors.areaSqmMin.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Max m² <span className="text-gray-300 font-normal normal-case tracking-normal">optional</span></label>
          <input {...register('areaSqmMax', { valueAsNumber: true, setValueAs: v => v === '' || isNaN(v) ? null : v })} type="number" min="1" step="0.01" placeholder="e.g. 45.25" className={inputCls} />
          {errors.areaSqmMax && <p className="text-red-500 text-xs mt-1">{errors.areaSqmMax.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Parking</label>
          <input {...register('parking', { valueAsNumber: true })} type="number" min="0" className={inputCls} />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className={labelCls}>Unit Type Images</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {uploadedImages.map((url) => (
            <div key={url} className="relative w-20 h-16 rounded-xl overflow-hidden border border-blue-100 group">
              <Image src={url} alt="" fill className="object-cover" sizes="80px" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          ))}
          <label className="w-20 h-16 border-2 border-dashed border-blue-100 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#125DE5]/40 hover:bg-blue-50/30 transition-all">
            {uploading ? <Loader2 size={14} className="animate-spin text-[#125DE5]/40" /> : <UploadCloud size={14} className="text-[#125DE5]/40" />}
            <span className="text-[10px] text-gray-400 mt-1">{uploading ? 'Uploading…' : 'Add'}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) handleImageUpload(e.target.files) }} />
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          disabled={isSubmitting || uploading}
          onClick={() => handleSubmit(handleSaveWithCleanup)()}
          className="flex items-center gap-2 bg-[#125DE5] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          {isSubmitting && <Loader2 size={13} className="animate-spin" />}
          Save Unit Type
        </button>
        <button type="button" onClick={handleCancel} className="text-gray-600 hover:text-gray-900 font-semibold px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 text-sm transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}

function DeleteConfirm({ name, onConfirm, onCancel, loading }: { name: string; onConfirm: () => void; onCancel: () => void; loading: boolean }) {
  return (
    <tr>
      <td colSpan={4} className="px-5 py-4 bg-red-50/60 border-t border-red-100">
        <div className="flex items-center gap-3">
          <AlertTriangle size={15} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700 flex-1">Delete <span className="font-semibold">&ldquo;{name}&rdquo;</span>? This cannot be undone.</p>
          <button onClick={onCancel} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="flex items-center gap-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60">
            {loading && <Loader2 size={11} className="animate-spin" />} Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

function SavedUnitTypeRow({ unit, folderId }: { unit: UnitType; folderId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/unit-types/${unit.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      router.refresh()
      setConfirmDelete(false)
    } catch {
      toast.error('Failed to delete unit type. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: UnitTypeFormData) => {
    const res = await fetch(`/api/unit-types/${unit.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) {
      toast.error('Failed to save unit type. Please try again.')
      return
    }
    router.refresh()
    setEditing(false)
  }

  return (
    <>
      <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="px-5 py-3">
          <div className="flex items-center gap-2">
            {unit.images[0] && (
              <div className="w-10 h-8 rounded-lg overflow-hidden relative shrink-0">
                <Image src={unit.images[0]} alt="" fill className="object-cover" sizes="40px" />
              </div>
            )}
            <span className="text-sm font-semibold text-gray-900">{unit.name}</span>
          </div>
        </td>
        <td className="px-5 py-3 text-xs text-gray-600">
          <span className="flex items-center gap-1"><Bed size={11} className="text-[#125DE5]" /> {unit.bedrooms}BR</span>
        </td>
        <td className="px-5 py-3 text-xs text-gray-600">
          <span className="flex items-center gap-1"><Square size={11} className="text-[#125DE5]" />{unit.areaSqmMin}{unit.areaSqmMax ? ` – ${unit.areaSqmMax}` : ''} m²</span>
        </td>
        <td className="px-5 py-3">
          <div className="flex items-center justify-end gap-1">
            <button type="button" onClick={() => { setEditing(!editing); setConfirmDelete(false) }} className="p-1.5 text-gray-400 hover:text-[#125DE5] hover:bg-blue-50 rounded-lg transition-colors">
              {editing ? <X size={14} /> : <Pencil size={14} />}
            </button>
            <button type="button" onClick={() => { setConfirmDelete(!confirmDelete); setEditing(false) }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>
      {confirmDelete && <DeleteConfirm name={unit.name} onConfirm={handleDelete} onCancel={() => setConfirmDelete(false)} loading={loading} />}
      {editing && (
        <tr>
          <td colSpan={4} className="px-5 py-4 bg-gray-50/50">
            <UnitTypeForm
              defaultValues={{ name: unit.name, bedrooms: unit.bedrooms, bathrooms: unit.bathrooms, areaSqmMin: unit.areaSqmMin, areaSqmMax: unit.areaSqmMax, parking: unit.parking, images: unit.images }}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
              folderId={folderId}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export function UnitTypeManager({ propertyId, folderId: folderIdProp, unitTypes, pendingUnitTypes, onPendingChange }: UnitTypeManagerProps) {
  const folderId = folderIdProp ?? propertyId
  const router = useRouter()
  const isPending = pendingUnitTypes !== undefined && onPendingChange !== undefined
  const [showAdd, setShowAdd] = useState(false)
  const [editingPendingIndex, setEditingPendingIndex] = useState<number | null>(null)

  const handleAddPending = (data: UnitTypeFormData) => { onPendingChange!([...(pendingUnitTypes!), data]); setShowAdd(false) }
  const handleAddSaved = async (data: UnitTypeFormData) => {
    const res = await fetch(`/api/properties/${propertyId}/unit-types`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) {
      toast.error('Failed to add unit type. Please try again.')
      return
    }
    router.refresh()
    setShowAdd(false)
  }
  const handleEditPending = (index: number, data: UnitTypeFormData) => {
    const updated = [...pendingUnitTypes!]; updated[index] = data
    onPendingChange!(updated); setEditingPendingIndex(null)
  }
  const handleDeletePending = (index: number) => {
    const unit = pendingUnitTypes![index]
    unit.images?.forEach((url) =>
      fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) }).catch(() => {})
    )
    onPendingChange!(pendingUnitTypes!.filter((_, i) => i !== index))
  }

  const displayUnits = isPending ? pendingUnitTypes! : unitTypes

  return (
    <div className="space-y-4">
      {displayUnits.length > 0 && (
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Beds</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Area</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isPending ? (
                pendingUnitTypes!.map((unit, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {unit.images?.[0] && (
                          <div className="w-10 h-8 rounded-lg overflow-hidden relative shrink-0">
                            <Image src={unit.images[0]} alt="" fill className="object-cover" sizes="40px" />
                          </div>
                        )}
                        <span className="text-sm font-semibold text-gray-900">{unit.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600"><span className="flex items-center gap-1"><Bed size={11} className="text-[#125DE5]" /> {unit.bedrooms}BR</span></td>
                    <td className="px-5 py-3 text-xs text-gray-600"><span className="flex items-center gap-1"><Square size={11} className="text-[#125DE5]" />{unit.areaSqmMin}{unit.areaSqmMax ? ` – ${unit.areaSqmMax}` : ''} m²</span></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button type="button" onClick={() => setEditingPendingIndex(editingPendingIndex === i ? null : i)} className="p-1.5 text-gray-400 hover:text-[#125DE5] hover:bg-blue-50 rounded-lg transition-colors">
                          {editingPendingIndex === i ? <X size={14} /> : <Pencil size={14} />}
                        </button>
                        <button type="button" onClick={() => handleDeletePending(i)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                unitTypes.map((unit) => <SavedUnitTypeRow key={unit.id} unit={unit} folderId={folderId} />)
              )}
            </tbody>
          </table>
        </div>
      )}

      {isPending && editingPendingIndex !== null && (
        <UnitTypeForm defaultValues={pendingUnitTypes![editingPendingIndex]} onSave={(data) => handleEditPending(editingPendingIndex, data)} onCancel={() => setEditingPendingIndex(null)} folderId={folderId} />
      )}

      {displayUnits.length === 0 && !showAdd && (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">No unit types yet. Add at least one to describe the available units.</p>
        </div>
      )}

      {showAdd && <UnitTypeForm onSave={isPending ? handleAddPending : handleAddSaved} onCancel={() => setShowAdd(false)} folderId={folderId} />}

      {!showAdd && (
        <button type="button" onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-sm font-semibold text-[#125DE5] hover:opacity-70 transition-opacity">
          <Plus size={16} /> Add Unit Type
        </button>
      )}
    </div>
  )
}
