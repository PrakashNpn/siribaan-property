export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { propertyService } from '@/features/property/server/property.service'
import { PropertyForm } from '@/features/property/components/property-form'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await propertyService.getById(id)
  if (!property) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Property</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <PropertyForm property={property} />
      </div>
    </div>
  )
}
