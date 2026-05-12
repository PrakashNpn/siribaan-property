'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Trash2, Plus, X, Bed, Bath, Square, Car } from 'lucide-react'
import { unitTypeSchema, UnitTypeFormData } from '../validation'
import { UnitType } from '../types'
import { formatPrice } from '@/lib/utils'

interface UnitTypeManagerProps {
  propertyId: string
  unitTypes: UnitType[]
  // pending mode (create flow) — no API calls, just local state
  pendingUnitTypes?: UnitTypeFormData[]
  onPendingChange?: (units: UnitTypeFormData[]) => void
}

function UnitTypeForm({
  onSave,
  defaultValues,
  onCancel,
}: {
  onSave: (data: UnitTypeFormData) => void
  defaultValues?: Partial<UnitTypeFormData>
  onCancel: () => void
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UnitTypeFormData>({
    resolver: zodResolver(unitTypeSchema),
    defaultValues: defaultValues ?? { parking: 1, bedrooms: 1, bathrooms: 1 },
  })

  const inputClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block"

  return (
    <form onSubmit={handleSubmit((data) => { onSave(data) })} className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Unit Type Name</label>
          <input {...register('name')} placeholder="e.g. Studio, 1 Bedroom, Penthouse" className={inputClass} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
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
          <label className={labelClass}>Area Min (m²)</label>
          <input {...register('areaSqmMin', { valueAsNumber: true })} type="number" min="0" step="0.5" className={inputClass} />
          {errors.areaSqmMin && <p className="text-red-500 text-xs mt-1">{errors.areaSqmMin.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Area Max (m²) — optional</label>
          <input {...register('areaSqmMax', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="0" step="0.5" placeholder="Leave blank if fixed" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price Min (฿)</label>
          <input {...register('priceMin', { valueAsNumber: true })} type="number" min="0" className={inputClass} />
          {errors.priceMin && <p className="text-red-500 text-xs mt-1">{errors.priceMin.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Price Max (฿) — optional</label>
          <input {...register('priceMax', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="0" placeholder="Leave blank if fixed" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Parking Bays</label>
          <input {...register('parking', { valueAsNumber: true })} type="number" min="0" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Floor Min — optional</label>
          <input {...register('floorMin', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="1" placeholder="e.g. 10" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Floor Max — optional</label>
          <input {...register('floorMax', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="1" placeholder="e.g. 35" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Units Available — optional</label>
          <input {...register('available', { setValueAs: (v) => v === '' ? null : Number(v) })} type="number" min="0" placeholder="Leave blank if unknown" className={inputClass} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={isSubmitting} className="bg-[#125DE5] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          Save Unit Type
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600 hover:text-gray-900 font-semibold px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 text-sm transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

function SavedUnitTypeRow({
  unit,
  onEdit,
  onDelete,
}: {
  unit: UnitType
  onEdit: () => void
  onDelete: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this unit type?')) return
    setLoading(true)
    await fetch(`/api/unit-types/${unit.id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  const handleSave = async (data: UnitTypeFormData) => {
    await fetch(`/api/unit-types/${unit.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    router.refresh()
    setEditing(false)
  }

  return (
    <>
      <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="px-5 py-3 text-sm font-semibold text-gray-900">{unit.name}</td>
        <td className="px-5 py-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
            <Bed size={11} className="text-[#125DE5]" /> {unit.bedrooms}
            <span className="text-gray-300">/</span>
            <Bath size={11} className="text-[#125DE5]" /> {unit.bathrooms}
          </span>
        </td>
        <td className="px-5 py-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Square size={11} className="text-[#125DE5]" />
            {unit.areaSqmMax && unit.areaSqmMax !== unit.areaSqmMin ? `${unit.areaSqmMin}–${unit.areaSqmMax}` : unit.areaSqmMin}
          </span>
        </td>
        <td className="px-5 py-3">
          <p className="text-sm font-semibold text-[#125DE5]">฿{formatPrice(unit.priceMin)}</p>
          {unit.priceMax && <p className="text-[10px] text-gray-400">up to ฿{formatPrice(unit.priceMax)}</p>}
        </td>
        <td className="px-5 py-3">
          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
            <Car size={11} className="text-[#125DE5]" /> {unit.parking}
          </span>
        </td>
        <td className="px-5 py-3">
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => setEditing(!editing)} className="p-1.5 text-gray-400 hover:text-[#125DE5] hover:bg-blue-50 rounded-lg transition-colors">
              {editing ? <X size={14} /> : <Pencil size={14} />}
            </button>
            <button onClick={handleDelete} disabled={loading} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>
      {editing && (
        <tr>
          <td colSpan={6} className="px-5 py-4 bg-gray-50/50">
            <UnitTypeForm
              defaultValues={{
                name: unit.name, bedrooms: unit.bedrooms, bathrooms: unit.bathrooms,
                areaSqmMin: unit.areaSqmMin, areaSqmMax: unit.areaSqmMax ?? undefined,
                priceMin: unit.priceMin, priceMax: unit.priceMax ?? undefined,
                parking: unit.parking, floorMin: unit.floorMin ?? undefined,
                floorMax: unit.floorMax ?? undefined, available: unit.available ?? undefined,
              }}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export function UnitTypeManager({ propertyId, unitTypes, pendingUnitTypes, onPendingChange }: UnitTypeManagerProps) {
  const isPending = pendingUnitTypes !== undefined && onPendingChange !== undefined
  const [showAdd, setShowAdd] = useState(false)
  const [editingPendingIndex, setEditingPendingIndex] = useState<number | null>(null)

  const handleAddPending = (data: UnitTypeFormData) => {
    onPendingChange!([...(pendingUnitTypes!), data])
    setShowAdd(false)
  }

  const handleEditPending = (index: number, data: UnitTypeFormData) => {
    const updated = [...pendingUnitTypes!]
    updated[index] = data
    onPendingChange!(updated)
    setEditingPendingIndex(null)
  }

  const handleDeletePending = (index: number) => {
    onPendingChange!(pendingUnitTypes!.filter((_, i) => i !== index))
  }

  const allEmpty = isPending ? pendingUnitTypes!.length === 0 : unitTypes.length === 0

  return (
    <div className="space-y-4">
      {/* Saved unit types (edit mode) */}
      {!isPending && unitTypes.length > 0 && (
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Beds / Baths</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Area (m²)</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Price (฿)</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Parking</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {unitTypes.map((unit) => (
                <SavedUnitTypeRow key={unit.id} unit={unit} onEdit={() => {}} onDelete={() => {}} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pending unit types (create mode) */}
      {isPending && pendingUnitTypes!.length > 0 && (
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Beds / Baths</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Area (m²)</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Price (฿)</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Parking</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingUnitTypes!.map((unit, i) => (
                <>
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 text-sm font-semibold text-gray-900">{unit.name}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                        <Bed size={11} className="text-[#125DE5]" /> {unit.bedrooms}
                        <span className="text-gray-300">/</span>
                        <Bath size={11} className="text-[#125DE5]" /> {unit.bathrooms}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {unit.areaSqmMax && unit.areaSqmMax !== unit.areaSqmMin ? `${unit.areaSqmMin}–${unit.areaSqmMax}` : unit.areaSqmMin} m²
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-semibold text-[#125DE5]">฿{formatPrice(unit.priceMin)}</p>
                      {unit.priceMax && <p className="text-[10px] text-gray-400">up to ฿{formatPrice(unit.priceMax)}</p>}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      <span className="inline-flex items-center gap-1"><Car size={11} className="text-[#125DE5]" /> {unit.parking}</span>
                    </td>
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
                  {editingPendingIndex === i && (
                    <tr key={`edit-${i}`}>
                      <td colSpan={6} className="px-5 py-4 bg-gray-50/50">
                        <UnitTypeForm
                          defaultValues={unit}
                          onSave={(data) => handleEditPending(i, data)}
                          onCancel={() => setEditingPendingIndex(null)}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {allEmpty && !showAdd && (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-gray-400 text-sm mb-1">No unit types added yet.</p>
          <p className="text-gray-400 text-xs">Add at least one unit type so buyers can see pricing and availability.</p>
        </div>
      )}

      {showAdd && (
        <UnitTypeForm
          onSave={isPending ? handleAddPending : async (data) => {
            const res = await fetch(`/api/properties/${propertyId}/unit-types`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            })
            if (res.ok) {
              // router.refresh() called via SavedUnitTypeRow — need router here
              window.location.reload()
            }
            setShowAdd(false)
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {!showAdd && (
        <button type="button" onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-sm font-semibold text-[#125DE5] hover:opacity-70 transition-opacity">
          <Plus size={16} /> Add Unit Type
        </button>
      )}
    </div>
  )
}
