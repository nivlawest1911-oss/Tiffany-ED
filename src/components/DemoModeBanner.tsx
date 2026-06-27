'use client';

import { useSearchParams } from 'next/navigation';

export function DemoModeBanner() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  if (!isDemo) return null;

  return (
    <div className="bg-[#C5A46E] text-[#0A0F1C] text-sm font-semibold text-center py-2 px-4 shadow-sm flex items-center justify-center gap-2 z-40">
      <span>Demo Mode Active - Any changes made here will not affect production data.</span>
    </div>
  );
}
