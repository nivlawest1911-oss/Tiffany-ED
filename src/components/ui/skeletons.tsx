/**
 * EdIntel Skeleton Components
 * Premium loading states matching the EdIntel design system
 */

import { cn } from '@/lib/utils';

// Base skeleton with shimmer animation
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-zinc-800/50 relative overflow-hidden',
        'after:absolute after:inset-0 after:translate-x-[-100%]',
        'after:animate-[shimmer_2s_infinite]',
        'after:bg-gradient-to-r after:from-transparent after:via-zinc-700/20 after:to-transparent',
        className
      )}
      {...props}
    />
  );
}

// Card skeleton with EdIntel styling
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl bg-zinc-900/40 border border-white/5', className)}>
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

// Stats grid skeleton
export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Chart skeleton
export function ChartSkeleton({ height = 256, className }: { height?: number; className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl bg-zinc-900/40 border border-white/5', className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
      <div className="animate-pulse bg-zinc-800/30 rounded-xl" style={{ height }}>
        <div className="h-full flex items-end justify-around p-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-[#D4AF37]/20 rounded-t"
              style={{
                width: '10%',
                height: `${Math.random() * 60 + 20}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex gap-4 pb-4 border-b border-white/5">
          {[...Array(columns)].map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {/* Rows */}
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            {[...Array(columns)].map((_, j) => (
              <Skeleton key={j} className="h-6 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard page skeleton
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-black p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-6 w-32 mb-4 rounded-full" />
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
      
      {/* Stats */}
      <StatsGridSkeleton />
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      
      {/* Table */}
      <TableSkeleton />
    </div>
  );
}

// Generator page skeleton
export function GeneratorSkeleton() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Skeleton className="h-6 w-40 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        
        {/* Form */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-6">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Avatar/3D skeleton
export function AvatarSkeleton({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-full h-full min-h-[300px]',
  };
  
  return (
    <div className={cn(
      'rounded-3xl bg-zinc-900/50 border border-[#D4AF37]/20 flex items-center justify-center',
      sizeClasses[size]
    )}>
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-zinc-800 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/30 animate-spin" 
             style={{ animationDuration: '3s' }} />
      </div>
    </div>
  );
}

// Navigation skeleton
export function NavSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-lg" />
      ))}
    </div>
  );
}

// Profile card skeleton
export function ProfileSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Intel/Analytics page skeleton
export function IntelSkeleton() {
  return (
    <div className="min-h-screen bg-black p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-32 mb-2 rounded-full" />
          <Skeleton className="h-10 w-80" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
      
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartSkeleton height={320} />
          <TableSkeleton rows={4} columns={5} />
        </div>
        <div className="space-y-6">
          <ProfileSkeleton />
          <CardSkeleton className="h-48" />
          <CardSkeleton className="h-48" />
        </div>
      </div>
    </div>
  );
}
