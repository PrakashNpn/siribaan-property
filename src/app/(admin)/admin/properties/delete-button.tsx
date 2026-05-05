'use client'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Delete this property?')) return
    await fetch(`/api/properties/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
      <Trash2 size={15} />
    </button>
  )
}
