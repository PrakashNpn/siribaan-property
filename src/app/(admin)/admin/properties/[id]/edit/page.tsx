export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { propertyService } from '@/features/property/server/property.service'
import { PropertyForm } from '@/features/property/components/property-form'
import { UnitTypeManager } from '@/features/property/components/unit-type-manager'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await propertyService.getById(id)
  if (!property) notFound()

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <PropertyForm property={property} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Unit Types</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage the unit types available in this property.</p>
        </div>
        <UnitTypeManager propertyId={property.id} unitTypes={property.unitTypes} />
      </div>
    </div>
  )
}
