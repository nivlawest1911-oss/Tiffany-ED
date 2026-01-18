'use client';

import dynamic from 'next/dynamic';

const ModernHomePage = dynamic(() => import('@/components/ModernHomePage'), {
  ssr: false
});

export default function Home() {
  return <ModernHomePage />;
}
