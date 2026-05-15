'use client'
import { useState } from 'react'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function DeletePropertyButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
    setDeleting(false)
    setOpen(false)
    if (res.ok) {
      toast.success(`"${title}" has been deleted.`)
    } else {
      toast.error('Failed to delete property. Please try again.')
    }
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !deleting && setOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              disabled={deleting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-red-500" />
            </div>

            <h2 className="text-base font-bold text-gray-900 mb-1">Delete Property</h2>
            <p className="text-sm text-gray-500 mb-1">
              Are you sure you want to delete:
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-5 truncate">
              &ldquo;{title}&rdquo;
            </p>
            <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 mb-6">
              This will permanently remove the property and all its unit types. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
