import AIPhoneCenter from '@/components/AIPhoneCenter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '📞 AI Phone Center | EdIntel Professional',
    description: 'World-class AI phone agents powered by Google Gemini, Twilio, and advanced speech AI',
};

export default function PhoneCenterPage() {
    return <AIPhoneCenter />;
}
