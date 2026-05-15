'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCheck } from 'lucide-react'

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const router = useRouter()
  const [optimistic, setOptimistic] = useState(read)
  const [, startTransition] = useTransition()

  const toggle = () => {
    const next = !optimistic
    setOptimistic(next)
    startTransition(async () => {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: next }),
      })
      router.refresh()
    })
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors ${
        optimistic
          ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          : 'text-[#125DE5] hover:text-blue-700 hover:bg-blue-100 bg-blue-50'
      }`}
    >
      <CheckCheck size={11} />
      {optimistic ? 'Mark unread' : 'Mark as read'}
    </button>
  )
}
