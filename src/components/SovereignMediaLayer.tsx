'use client';

import React from 'react';

interface SovereignMediaLayerProps {
    assetId?: string;
}

export const SovereignMediaLayer = ({ assetId = "56cbf6f5-7bff-4176-9ae5-f5c6067d3fb1" }: SovereignMediaLayerProps) => (
    <div className="fixed inset-0 -z-20 w-full h-full bg-zinc-950 overflow-hidden">
        {/* THE CINEMATIC UNDERLAY */}
        <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-15 saturate-[0.2] scale-[1.02] blur-[2px]"
            src={`/media/${assetId}.mp4`}
        />

        {/* TACTICAL VIGNETTE & SCANLINES */}
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-zinc-950/20" />
        <div className="absolute inset-0 bg-[url('/tactical-noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="tactical-scanlines absolute inset-0 pointer-events-none opacity-[0.05]" />
    </div>
);
