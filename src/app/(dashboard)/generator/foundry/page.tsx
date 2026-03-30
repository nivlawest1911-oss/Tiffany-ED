import { BirthCertificateForm } from './components/BirthCertificateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EdIntel Foundry | Birth Certificate System',
    description: 'The secure neural forge for creating and certifying Sovereign AI companions. FERPA-compliant and institutional-grade.',
};

/**
 * 🏛️ EdIntel Foundry Page: The central hub for AI companion creation.
 * This page hosts the Birth Certificate system, allowing educators to
 * forge custom neural identities for strategic instruction.
 */
export default function FoundryPage() {
    return (
        <main className="min-h-screen bg-black pt-20 pb-32">
            {/* 🏗️ FOUNDRY AMBIANCE */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#c5a47e]/5 blur-[120px] rounded-full animate-aurora-1" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full animate-aurora-2" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <BirthCertificateForm />
            </div>

            {/* 📜 SQL MIGRATION NOTICE (HIDDEN IN UI, VISUALIZED FOR DEVELOPER) */}
            {/* 
                SQL MIGRATION REQUIRED:
                
                CREATE TABLE companion_certificates (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name TEXT NOT NULL,
                    role TEXT NOT NULL,
                    tier TEXT NOT NULL,
                    persona JSONB NOT NULL,
                    voice_id TEXT NOT NULL,
                    avatar_id TEXT NOT NULL,
                    master_system_prompt TEXT NOT NULL,
                    district_id TEXT NOT NULL,
                    creator_id UUID NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT now(),
                    metadata JSONB
                );

                ALTER TABLE companion_certificates ENABLE ROW LEVEL SECURITY;
                -- Policy for teachers to see their own creations
                CREATE POLICY "Creators can see their own companions" 
                    ON companion_certificates 
                    FOR SELECT 
                    USING (auth.uid() = creator_id);
            */}
        </main>
    );
}
