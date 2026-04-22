import React from 'react';
import VerifyInstitutionalNode from '@/components/onboarding/VerifyInstitutionalNode';
import { CinematicBackground } from '@/components/ui/CinematicBackground';

export const metadata = {
    title: 'Institutional Verification | EdIntel Sovereign',
    description: 'Establish your institutional uplink and verify your professional role within the Sovereign ecosystem.',
};

export default function OnboardingVerifyPage() {
    return (
        <div className="min-h-screen content-stage bg-[#020617] relative overflow-hidden flex flex-col justify-center py-12">
            {/* Neural Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
                <CinematicBackground count={8} color="bg-blue-500/20" />
            </div>

            <div className="relative z-10 w-full">
                <VerifyInstitutionalNode />
            </div>

            {/* Bottom Branding */}
            <footer className="mt-12 text-center opacity-30 relative z-10 px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
                    Unified Sovereign Ecosystem // Institutional Node_v2.0
                </p>
            </footer>
        </div>
    );
}
