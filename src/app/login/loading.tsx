export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-7 w-28 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Card Skeleton */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="h-7 w-48 bg-white/10 rounded mx-auto animate-pulse" />
              <div className="h-4 w-56 bg-white/10 rounded mx-auto animate-pulse" />
            </div>

            {/* Demo Button Skeleton */}
            <div className="h-12 bg-white/10 rounded-2xl animate-pulse" />

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Buttons Skeleton */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 bg-white/10 rounded-2xl animate-pulse" />
              <div className="h-11 bg-white/10 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>

        <div className="h-3 w-64 bg-white/10 rounded mx-auto mt-6 animate-pulse" />
      </div>
    </div>
  );
}
