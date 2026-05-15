'use client'
import { useState } from 'react'

export function DescriptionExpander({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  const words = text.split(/\s+/)
  const isLong = words.length > 70
  const displayed = !expanded && isLong ? words.slice(0, 70).join(' ') : text

  // Split into paragraphs for display
  const paragraphs = displayed.split('\n\n').filter(Boolean)

  return (
    <div>
      <div className="space-y-4 mb-4">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-gray-600 leading-relaxed text-sm sm:text-base">{para}{!expanded && isLong && i === paragraphs.length - 1 ? '…' : ''}</p>
        ))}
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-semibold text-[#125DE5] hover:opacity-70 transition-opacity flex items-center gap-1.5"
        >
          {expanded ? 'Show less ↑' : 'See full description ↓'}
        </button>
      )}
    </div>
  )
}
