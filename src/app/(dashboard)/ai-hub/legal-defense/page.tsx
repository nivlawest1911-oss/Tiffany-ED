import { AIGeneratorsHub } from '@/components/ai-generators-hub';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Legal Defense Sentinel | EdIntel Sovereign',
    description: 'Navigate complex educational legal landscapes with institutional-grade AI counsel.',
};

/**
 * 👨‍⚖️ Legal Defense Protocol Page
 * A dedicated entry point for the Compliance Sentinel (Policy Advisor).
 * This fulfills the /ai-hub/legal-defense route requirement.
 */
export default function LegalDefensePage() {
    return (
        <main className="min-h-screen bg-black pt-20">
            <AIGeneratorsHub initialGeneratorId="policy-advisor" />
        </main>
    );
}
