'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DemoModeHandlerContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasDemoParam = searchParams.get('demo') === 'true';
    const hasDemoStorage = sessionStorage.getItem('demoMode') === 'true';

    if (hasDemoParam || hasDemoStorage) {
      // Ensure the flag stays alive
      if (!hasDemoStorage) {
        sessionStorage.setItem('demoMode', 'true');
      }
    }
  }, [searchParams]);

  return null;
}

export function DemoModeHandler() {
  return (
    <Suspense fallback={null}>
      <DemoModeHandlerContent />
    </Suspense>
  );
}
