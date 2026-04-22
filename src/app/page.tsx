import type { Metadata } from 'next';
import ModernHomePage from '@/components/modern-home-page';

export const metadata: Metadata = {
  title: 'EdIntel Professional | AI Powered Education Hub',
  description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence. Experience the future of education management.',
  openGraph: {
    title: 'EdIntel â€” AI Operating System for Education Leaders',
    description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence.',
  },
};

export default function Index() {
  return <ModernHomePage />;
}
