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

            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22256%22%20height%3D%22256%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.15%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};
