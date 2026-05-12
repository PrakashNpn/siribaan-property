function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white/60 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  )
}

export default function AboutLoading() {
  return (
    <div className="bg-blue-50">

      {/* Hero skeleton */}
      <section className="pt-6 md:pt-10 pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Shimmer className="h-[48vh] md:h-[55vh] rounded-3xl" />
          {/* Card skeleton */}
          <div className="relative -mt-24 md:-mt-40 z-10 pb-10 md:pb-16 flex justify-center">
            <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl border border-white/70 rounded-3xl shadow-[0_24px_80px_rgba(18,93,229,0.15)] p-8 md:p-12 space-y-6">
              <Shimmer className="h-3 w-40 rounded-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Shimmer className="h-8 w-3/4 rounded-xl" />
                  <Shimmer className="h-8 w-1/2 rounded-xl" />
                </div>
                <div className="space-y-3">
                  <Shimmer className="h-4 w-full rounded-full" />
                  <Shimmer className="h-4 w-5/6 rounded-full" />
                  <div className="flex gap-3 pt-2">
                    <Shimmer className="h-10 flex-1 rounded-full" />
                    <Shimmer className="h-10 flex-1 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-blue-100/40">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="text-center space-y-2">
                    <Shimmer className="h-7 w-16 rounded-lg mx-auto" />
                    <Shimmer className="h-2 w-20 rounded-full mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission skeleton */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white/70 rounded-2xl border border-blue-100/70 p-8 md:p-10 space-y-4">
              <Shimmer className="h-3 w-24 rounded-full" />
              <Shimmer className="h-8 w-3/4 rounded-xl" />
              <Shimmer className="h-8 w-2/3 rounded-xl" />
              <Shimmer className="h-4 w-full rounded-full" />
              <Shimmer className="h-4 w-5/6 rounded-full" />
              <Shimmer className="h-10 w-36 rounded-full mt-4" />
            </div>
            <Shimmer className="lg:col-span-2 min-h-[280px] rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Values skeleton */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 space-y-3">
            <Shimmer className="h-3 w-32 rounded-full mx-auto" />
            <Shimmer className="h-8 w-56 rounded-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white/70 rounded-2xl border border-blue-100/70 p-5 md:p-7 flex gap-4">
                <Shimmer className="w-12 h-12 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Shimmer className="h-4 w-36 rounded-lg" />
                  <Shimmer className="h-3 w-full rounded-full" />
                  <Shimmer className="h-3 w-4/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
