'use client'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X, GripVertical } from 'lucide-react'

type PendingImage =
  | { type: 'file'; file: File; preview: string }
  | { type: 'url'; url: string }

function SortableImage({ item, index, onRemove }: { item: PendingImage; index: number; onRemove: () => void }) {
  const src = item.type === 'file' ? item.preview : item.url
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: src })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden group ${isDragging ? 'opacity-50 z-50 ring-2 ring-[#125DE5]' : ''}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover" />

      {/* Cover badge */}
      {index === 0 && (
        <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-[#125DE5] text-white px-1.5 py-0.5 rounded-full">
          Cover
        </span>
      )}

      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white rounded-md px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical size={12} />
      </button>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={10} />
      </button>
    </div>
  )
}

interface Props {
  images: PendingImage[]
  onChange: (images: PendingImage[]) => void
  onRemove: (index: number) => void
}

export function SortableImageGrid({ images, onChange, onRemove }: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const ids = images.map((item) => (item.type === 'file' ? item.preview : item.url))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id as string)
      const newIndex = ids.indexOf(over.id as string)
      onChange(arrayMove(images, oldIndex, newIndex))
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {images.map((item, i) => (
            <SortableImage
              key={item.type === 'file' ? item.preview : item.url}
              item={item}
              index={i}
              onRemove={() => onRemove(i)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
