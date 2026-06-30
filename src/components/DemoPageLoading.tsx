'use client';

import React from 'react';

interface DemoPageLoadingProps {
  title?: string;
  showSidebar?: boolean;
}

export default function DemoPageLoading({ title = "Loading...", showSidebar = true }: DemoPageLoadingProps) {
  return (
    <div className="flex h-full min-h-[calc(100vh-57px)] bg-[#0A0F1C]">
      {/* Sidebar Skeleton */}
      {showSidebar && (
        <div className="w-72 border-r border-white/10 bg-[#0A0F1C] p-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-white/10 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-14 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-11 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Skeleton */}
      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-9 w-72 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-96 bg-white/10 rounded animate-pulse" />
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
                <div className="h-9 w-9 bg-white/10 rounded-2xl animate-pulse" />
              </div>
              <div className="h-10 w-24 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-32 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content Area Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
            {[1,2,3].map(i => (
              <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-4/5 bg-white/10 rounded animate-pulse" />
            <div className="h-10 bg-white/10 rounded-2xl mt-6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
