import type { Metadata } from 'next';
import WellnessPageClient from './WellnessClient';

export const metadata: Metadata = {
  title: 'Burnout Shield | EdIntel Wellness Architect',
  description: 'Real-time biometric monitoring and cognitive de-escalation for high-fidelity educators. Protect your cognitive load and maintain peak performance.',
};

import SovereignGatekeeper from '@/components/auth/SovereignGatekeeper';

export default function WellnessPage() {
  return (
    <SovereignGatekeeper>
      <WellnessPageClient />
    </SovereignGatekeeper>
  );
}
