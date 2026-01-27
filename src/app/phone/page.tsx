import { cookies } from 'next/headers';
import AIPhoneCenter from '@/components/AIPhoneCenter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '📞 AI Phone Center | EdIntel Professional',
    description: 'World-class AI phone agents powered by Google Gemini, Twilio, and advanced speech AI',
};

export const dynamic = 'force-dynamic';

export default async function PhoneCenterPage() {
    await cookies(); // Force dynamic rendering
    return <AIPhoneCenter />;
}
