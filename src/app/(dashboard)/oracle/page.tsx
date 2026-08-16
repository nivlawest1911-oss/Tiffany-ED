"use client";

import dynamic from 'next/dynamic';
const OracleInterface = dynamic(() => import('@/components/oracle/OracleInterface').then(mod => mod.OracleInterface), {
    ssr: false,
    loading: () => <div className="min-h-[500px] w-full bg-slate-900/60 rounded-3xl border border-slate-800 animate-pulse" />
});
const ParticleBackground = dynamic(() => import('@/components/ui/Cinematic').then(mod => mod.ParticleBackground), {
    ssr: false,
    loading: () => <div className="absolute inset-0 pointer-events-none" />
});

export default function OraclePage() {
    return (
        <div className="relative min-h-[calc(100-vh-4rem)] bg-black overflow-hidden flex flex-col">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
                <ParticleBackground count={40} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full opacity-30 animate-pulse pointer-events-none" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full p-6 md:p-12">
                <OracleInterface />
            </div>
        </div>
    );
}
