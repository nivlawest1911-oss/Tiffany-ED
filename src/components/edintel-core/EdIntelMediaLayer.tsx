'use client';

import React from 'react';

interface EdIntelMediaLayerProps {
    assetId?: string;
}

export const EdIntelMediaLayer = ({ assetId = "56cbf6f5-7bff-4176-9ae5-f5c6067d3fb1" }: EdIntelMediaLayerProps) => (
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22256%22%20height%3D%22256%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.15%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] mix-blend-overlay" />
        <div className="tactical-scanlines absolute inset-0 pointer-events-none opacity-[0.05]" />
    </div>
);
