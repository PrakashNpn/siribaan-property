import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import { propertyService } from '@/features/property/server/property.service'
import { formatPrice } from '@/lib/utils'
import { DeletePropertyButton } from './delete-button'

export const dynamic = 'force-dynamic'

export default async function AdminPropertiesPage() {
  const properties = await propertyService.getAllAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <Link href="/admin/properties/new" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
          <Plus size={16} /> Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-gray-400 mb-4">No properties yet.</p>
          <Link href="/admin/properties/new" className="text-blue-600 text-sm font-semibold">Add your first property →</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Property</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Location</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                        {property.images[0] && <Image src={property.images[0]} alt="" fill sizes="48px" className="object-cover" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{property.title}</p>
                        <p className="text-xs text-gray-400">{property.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{property.location}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">฿{formatPrice(property.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      property.status === 'active' ? 'bg-green-50 text-green-700' :
                      property.status === 'sold' ? 'bg-red-50 text-red-700' :
                      'bg-yellow-50 text-yellow-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/properties/${property.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <DeletePropertyButton id={property.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
