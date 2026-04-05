"use client";

import dynamic from 'next/dynamic';

export const ClientAIGeneratorsHub = dynamic(
    () => import('@/components/ai-generators-hub').then(mod => mod.AIGeneratorsHub),
    {
        ssr: false,
        loading: () => (
            <div className="w-full flex items-center justify-center min-h-[600px]">
                <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-noble-gold/10 border border-noble-gold/30 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                    Initializing Compliance Nexus...
                </div>
            </div>
        )
    }
);
