'use client';

import dynamic from 'next/dynamic';
import { Suspense, type ComponentType } from 'react';

// Generic skeleton loader for charts
export function ChartSkeleton({ height = 256 }: { height?: number }) {
  return (
    <div className="animate-pulse bg-zinc-900/50 rounded-xl" style={{ height }}>
      <div className="h-full flex items-end justify-around p-4 gap-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-zinc-800 rounded-t"
            style={{
              width: '10%',
              height: `${Math.random() * 60 + 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton for 3D avatars
export function AvatarSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-3xl animate-pulse">
      <div className="w-32 h-32 rounded-full bg-zinc-800 relative">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-700 animate-spin" />
      </div>
    </div>
  );
}

// Skeleton for Lottie animations
export function LottieSkeleton({ size = 120 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-zinc-900/50 animate-pulse flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="w-1/2 h-1/2 rounded-full bg-zinc-800" />
    </div>
  );
}

// Skeleton for dashboard sections
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-zinc-900/50 rounded-2xl" />
        <div className="h-64 bg-zinc-900/50 rounded-2xl" />
      </div>
    </div>
  );
}

// Generic wrapper for lazy-loaded components with Suspense
export function withLazySuspense<P extends object>(
  Component: ComponentType<P>,
  FallbackComponent: ComponentType<any> = () => <ChartSkeleton />
) {
  return function WrappedComponent(props: P) {
    return (
      <Suspense fallback={<FallbackComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// ============================================
// LAZY-LOADED HEAVY COMPONENTS
// ============================================

// Analytics Dashboard (contains Recharts)
export const LazyAnalyticsDashboard = dynamic(
  () => import('@/components/AnalyticsDashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// 3D Avatar Display (contains Three.js)
export const LazyAvatarDisplay3D = dynamic(
  () => import('@/components/avatars/AvatarDisplay3D').then(mod => ({ default: mod.AvatarDisplay3D })),
  {
    loading: () => <AvatarSkeleton />,
    ssr: false,
  }
);

// Lottie Avatar Display
export const LazyAvatarDisplay = dynamic(
  () => import('@/components/ui/AvatarDisplay').then(mod => ({ default: mod.AvatarDisplay })),
  {
    loading: () => <LottieSkeleton />,
    ssr: false,
  }
);

// Chart Component (for individual chart usage)
export const LazyChartComponent = dynamic(
  () => import('@/components/ui/chart').then(mod => mod),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

// Cinematic Logo Intro
export const LazyCinematicLogoIntro = dynamic(
  () => import('@/components/CinematicLogoIntro'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-32 h-32 rounded-full bg-zinc-900 animate-pulse" />
      </div>
    ),
    ssr: false,
  }
);

// Interactive Dashboard (contains Recharts)
export const LazyInteractiveDashboard = dynamic(
  () => import('@/components/InteractiveDashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// Revenue Dashboard (contains Recharts)
export const LazyRevenueDashboard = dynamic(
  () => import('@/components/RevenueDashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// Mission Control Dashboard
export const LazyMissionControlDashboard = dynamic(
  () => import('@/components/admin/MissionControlDashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// ROI Dashboard
export const LazyROIDashboard = dynamic(
  () => import('@/components/admin/ROIDashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// Synthesis Dashboard
export const LazySynthesisDashboard = dynamic(
  () => import('@/components/dashboard/SynthesisDashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// Neural Insights
export const LazyNeuralInsights = dynamic(
  () => import('@/components/dashboard/NeuralInsights'),
  {
    loading: () => <ChartSkeleton height={320} />,
    ssr: false,
  }
);

// EdIntel Cortex
export const LazyEdIntelCortex = dynamic(
  () => import('@/components/edintel-core/EdIntelCortex'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);

// Audit Chart
export const LazyAuditChart = dynamic(
  () => import('@/components/AuditChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

// AI Features Onboarding
export const LazyAIFeaturesOnboarding = dynamic(
  () => import('@/components/AIFeaturesOnboarding'),
  {
    loading: () => (
      <div className="w-full h-96 bg-zinc-900/50 rounded-2xl animate-pulse" />
    ),
    ssr: false,
  }
);

// Research Hub
export const LazyResearchHub = dynamic(
  () => import('@/components/research-hub'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  }
);
