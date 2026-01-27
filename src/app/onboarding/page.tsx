import { cookies } from 'next/headers';
import OnboardingFlow from '@/components/OnboardingFlow';

export const dynamic = 'force-dynamic';

export default async function OnboardingPage() {
    await cookies(); // Force dynamic rendering
    return <OnboardingFlow />;
}
