function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white/60 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  )
}

function ListingCardSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] overflow-hidden flex">
      {/* Image placeholder */}
      <Shimmer className="w-44 sm:w-56 shrink-0 rounded-none rounded-l-2xl min-h-[160px]" />
      {/* Content */}
      <div className="flex-1 p-5 space-y-3">
        <Shimmer className="h-3 w-20 rounded-full" />
        <Shimmer className="h-5 w-3/4 rounded-lg" />
        <Shimmer className="h-3 w-1/2 rounded-full" />
        <div className="flex gap-2 pt-1">
          {[1, 2, 3, 4].map(i => <Shimmer key={i} className="h-7 w-20 rounded-full" />)}
        </div>
        <div className="flex items-center justify-between pt-2">
          <Shimmer className="h-5 w-32 rounded-lg" />
          <Shimmer className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function PropertiesLoading() {
  return (
    <section className="relative bg-blue-50 pt-6 md:pt-10 pb-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#125DE5] blur-3xl opacity-[0.1]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

        {/* Hero skeleton */}
        <Shimmer className="h-[240px] md:h-[300px] rounded-3xl mb-10" />

        {/* Filter bar skeleton */}
        <div className="mb-8">
          <Shimmer className="h-3 w-36 rounded-full mb-5" />
          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 4].map(i => <Shimmer key={i} className="h-10 w-36 rounded-xl" />)}
          </div>
        </div>

        {/* Result count skeleton */}
        <Shimmer className="h-3 w-48 rounded-full mb-7" />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — cards */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3, 4, 5].map(i => <ListingCardSkeleton key={i} />)}
          </div>

          {/* Right — CTA skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl overflow-hidden border border-blue-100/60 shadow-xl shadow-blue-200/40">
              <Shimmer className="h-40 rounded-none" />
              <div className="bg-white p-6 space-y-4">
                {[1, 2, 3, 4].map(i => <Shimmer key={i} className="h-10 rounded-xl" />)}
                <Shimmer className="h-10 rounded-xl" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
