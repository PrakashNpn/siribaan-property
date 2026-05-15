'use client'
import { useState, useTransition } from 'react'
import { Star } from 'lucide-react'
import { toggleFeatured } from './actions'

export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
  const [optimistic, setOptimistic] = useState(featured)
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    const next = !optimistic
    setOptimistic(next)
    startTransition(() => toggleFeatured(id, next))
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      title={optimistic ? 'Remove from featured' : 'Mark as featured'}
      className={`p-2 transition-colors disabled:opacity-50 ${
        optimistic
          ? 'text-amber-400 hover:text-amber-500 hover:bg-amber-50'
          : 'text-gray-300 hover:text-amber-400 hover:bg-amber-50'
      }`}
    >
      <Star size={15} className={optimistic ? 'fill-amber-400' : ''} />
    </button>
  )
}
