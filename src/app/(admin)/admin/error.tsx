'use client'
import { useEffect } from 'react'
import { RefreshCw, AlertTriangle } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isNetwork = error.message.includes('EAI_AGAIN') ||
    error.message.includes('ECONNRESET') ||
    error.message.includes('ETIMEDOUT')

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle size={22} className="text-red-500" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">
        {isNetwork ? 'Connection error' : 'Something went wrong'}
      </h2>
      <p className="text-sm text-gray-500 max-w-sm mb-6">
        {isNetwork
          ? 'Could not reach the database. This is usually a brief network hiccup — refreshing almost always fixes it.'
          : 'An unexpected error occurred. Try refreshing the page.'}
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 bg-[#125DE5] hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
      >
        <RefreshCw size={15} />
        Try again
      </button>
    </div>
  )
}
