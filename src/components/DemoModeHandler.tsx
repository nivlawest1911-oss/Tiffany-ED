'use client';

import { Suspense } from 'react';
import { useDemoMode } from '@/hooks/useDemoMode';

function DemoModeListener() {
  useDemoMode();
  return null;
}

export function DemoModeHandler() {
  return (
    <Suspense fallback={null}>
      <DemoModeListener />
    </Suspense>
  );
}
