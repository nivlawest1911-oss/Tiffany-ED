import type { Metadata } from 'next';
import NotFoundClient from '@/components/NotFoundClient';

export const metadata: Metadata = {
  title: 'Signal Lost | EdIntel Neural Recovery',
  description: 'The requested uplink segment has been decommissioned or misplaced. Dr. Alvin West is standing by to assist your navigation.',
};

export default function NotFound() {
  return <NotFoundClient />;
}
