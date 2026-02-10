'use client';

import React from 'react';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';

export const AmbientBackground = () => {
    const { currentVibe } = useEdIntelVibe();

    return (
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-zinc-950">
            <video
                key={currentVibe.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-20 saturate-[0.25] scale-105 transition-all duration-1000"
                src={currentVibe.video}
            />
            {/* Tactical Overlays: Grain & Vignette */}
            <div className={`absolute inset-0 bg-gradient-to-tr transition-colors duration-1000 ${currentVibe.id === 'emergency'
                    ? 'from-red-950/40 via-zinc-950/80 to-transparent'
                    : 'from-zinc-950 via-zinc-950/80 to-transparent'
                }`} />

            {/* The Tactical Scanlines Effect */}
            <div className="absolute inset-0 tactical-scanlines pointer-events-none opacity-30" />

            <div className="absolute inset-0 bg-[url('/tactical-grain.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};
