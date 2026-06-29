'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useDemoMode() {
  const searchParams = useSearchParams();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fromUrl = searchParams.get('demo') === 'true';
    const fromStorage = sessionStorage.getItem('demoMode') === 'true';
    
    if (fromUrl || fromStorage) {
      setIsDemo(true);
      // Keep the flag alive
      if (fromUrl) sessionStorage.setItem('demoMode', 'true');
    }
  }, [searchParams]);

  return isDemo;
}
