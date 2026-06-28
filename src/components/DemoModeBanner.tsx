'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function DemoModeContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  if (!isDemo) return null;

  return (
    <div className="w-full bg-[#C5A46E]/10 border-b border-[#C5A46E]/30 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-[#C5A46E]">
          <span className="font-semibold tracking-wider">DEMO MODE</span>
          <span className="text-white/60">— All data is simulated for presentation purposes</span>
        </div>

        <Button
          onClick={() => window.location.href = '/login'}
          variant="outline"
          size="sm"
          className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 hover:text-[#C5A46E] text-xs px-4"
        >
          Exit Demo Mode
        </Button>
      </div>
    </div>
  );
}

export function DemoModeBanner() {
  return (
    <Suspense fallback={null}>
      <DemoModeContent />
    </Suspense>
  );
}
