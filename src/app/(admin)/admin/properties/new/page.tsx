import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PropertyForm } from '@/features/property/components/property-form'

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400">
        <Link href="/admin/properties" className="hover:text-gray-700 transition-colors">
          Properties
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium">Add New</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add Property</h1>
        <Link
          href="/admin/properties"
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-xl transition-colors"
        >
          ← Back to list
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <PropertyForm />
      </div>
    </div>
  )
}
