"use client";

import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/ui/Cinematic').then(mod => mod.ParticleBackground), { ssr: false });

interface CinematicBackgroundProps {
    count?: number;
    color?: string;
}

export function CinematicBackground(props: CinematicBackgroundProps) {
    return <ParticleBackground {...props} />;
}
