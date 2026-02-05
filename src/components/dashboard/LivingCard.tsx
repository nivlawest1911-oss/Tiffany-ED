'use client';

import React from 'react';

interface LivingCardProps {
    videoUrl: string;
    title: string;
    children: React.ReactNode;
}

export const LivingCard = ({ videoUrl, title, children }: LivingCardProps) => (
    <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm group transition-all duration-700 hover:border-amber-500/30">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-40 transition-opacity duration-[2000ms] pointer-events-none grayscale-[0.4]"
            src={videoUrl}
        />
        <div className="relative z-10 p-8">
            <h3 className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.3em] mb-4">{title}</h3>
            {children}
        </div>

        {/* SCANLINE OVERLAY ON HOVER */}
        <div className="absolute inset-0 tactical-scanlines opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-1000" />
    </div>
);
