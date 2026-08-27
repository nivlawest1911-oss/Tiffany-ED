import { cookies } from 'next/headers';
import { BirthCertificateForm } from './components/BirthCertificateForm';
import { Metadata } from 'next';
import VisualDefer from '@/components/shared/VisualDefer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'EdIntel Foundry | Birth Certificate System',
    description: 'The secure neural forge for creating and certifying Sovereign AI companions. FERPA-compliant and institutional-grade.',
};

/**
 * 🏛️ EdIntel Foundry Page: The central hub for AI companion creation.
 * This page hosts the Birth Certificate system, allowing educators to
 * forge custom neural identities for strategic instruction.
 */
export default async function FoundryPage() {
    await cookies();
    return (
        <main className="min-h-screen bg-black pt-20 pb-32">
            {/* 🏗️ FOUNDRY AMBIANCE - PERFORMANCE OPTIMIZED (Phase 24.1) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-20 transform-gpu"
                    style={{
                        background: `radial-gradient(circle at 20% 30%, #c5a47e 0%, transparent 40%),
                                     radial-gradient(circle at 80% 70%, #10b981 0%, transparent 40%)`,
                        willChange: 'transform, opacity',
                        animation: 'drift1 20s infinite alternate ease-in-out'
                    }}
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <VisualDefer height="600px">
                    <BirthCertificateForm />
                </VisualDefer>
            </div>
        </main>
    );
}
