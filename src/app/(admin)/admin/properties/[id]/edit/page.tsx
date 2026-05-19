export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { PropertyForm } from '@/features/property/components/property-form'
import { UnitTypeManager } from '@/features/property/components/unit-type-manager'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await propertyService.getById(id)
  if (!property) notFound()

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400">
        <Link href="/admin/properties" className="hover:text-gray-700 transition-colors">
          Properties
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-600 truncate max-w-[200px]">{property.title}</span>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium">Edit</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 truncate">Edit Property</h1>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{property.title}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/properties/${property.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-xl transition-colors"
          >
            <ExternalLink size={13} /> View on site
          </Link>
          <Link
            href="/admin/properties"
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-xl transition-colors"
          >
            ← Back to list
          </Link>
        </div>
      </div>

      {/* Property form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <PropertyForm property={property} />
      </div>

      {/* Unit types */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Unit Types</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage the unit types available in this property.</p>
        </div>
        <UnitTypeManager
          propertyId={property.id}
          folderId={property.images[0]?.match(/\/properties\/([^/]+)\/images\//)?.[1] ?? property.id}
          unitTypes={property.unitTypes}
        />
      </div>
    </div>
  )
}
