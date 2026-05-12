function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white/60 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  )
}

export default function PropertyDetailLoading() {
  return (
    <div className="bg-blue-50 min-h-screen">

      {/* Breadcrumb skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <Shimmer className="h-3 w-48 rounded-full" />
      </div>

      {/* Gallery skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
        <Shimmer className="h-[340px] md:h-[480px] rounded-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — property details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title block */}
            <div className="space-y-3">
              <Shimmer className="h-3 w-24 rounded-full" />
              <Shimmer className="h-9 w-3/4 rounded-xl" />
              <Shimmer className="h-4 w-1/2 rounded-full" />
              {/* Stat chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[1, 2, 3, 4].map(i => <Shimmer key={i} className="h-8 w-24 rounded-full" />)}
              </div>
            </div>

            {/* Description card skeleton */}
            <div className="bg-white/70 rounded-2xl border border-blue-100/70 p-6 space-y-3">
              <Shimmer className="h-5 w-36 rounded-lg" />
              <Shimmer className="h-3 w-full rounded-full" />
              <Shimmer className="h-3 w-full rounded-full" />
              <Shimmer className="h-3 w-4/5 rounded-full" />
              <Shimmer className="h-3 w-3/5 rounded-full" />
            </div>

            {/* Unit types skeleton */}
            <div className="bg-white/70 rounded-2xl border border-blue-100/70 p-6 space-y-4">
              <Shimmer className="h-5 w-32 rounded-lg" />
              {[1, 2].map(i => (
                <div key={i} className="border border-blue-100/50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <Shimmer className="h-4 w-32 rounded-lg" />
                    <Shimmer className="h-4 w-24 rounded-lg" />
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(j => <Shimmer key={j} className="h-6 w-20 rounded-full" />)}
                  </div>
                </div>
              ))}
            </div>

            {/* Map skeleton */}
            <Shimmer className="h-64 rounded-2xl" />
          </div>

          {/* Right — sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl overflow-hidden border border-blue-100/60 shadow-xl shadow-blue-200/40">
              <Shimmer className="h-36 rounded-none" />
              <div className="bg-white p-6 space-y-4">
                <Shimmer className="h-10 rounded-xl" />
                <Shimmer className="h-px rounded-full bg-gray-100" />
                {[1, 2, 3, 4].map(i => <Shimmer key={i} className="h-10 rounded-xl" />)}
                <Shimmer className="h-10 rounded-xl" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
