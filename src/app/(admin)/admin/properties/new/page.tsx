import { PropertyForm } from '@/features/property/components/property-form'

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add Property</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <PropertyForm />
      </div>
    </div>
  )
}
