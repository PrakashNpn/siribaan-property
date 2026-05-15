function Skeleton({ className }: { className: string }) {
  return <div className={`bg-gray-100 animate-pulse rounded-xl ${className}`} />
}

export default function InquiriesLoading() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 space-y-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 space-y-2">
            <Skeleton className="h-7 w-10" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="space-y-2 items-end flex flex-col">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-24 rounded-lg" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 space-y-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
