'use client';

import { useState, useEffect } from 'react';
import SovereignSubscription from '@/components/SovereignSubscription';
import { ParticleBackground } from '@/components/ui/Cinematic';

export default function PricingClient() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <ParticleBackground count={isMobile ? 10 : 30} />
            <div className="pt-24 relative z-10">
                <SovereignSubscription />
            </div>

            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-noble-gold/5 blur-[120px] rounded-full pointer-events-none -z-10 aspect-video" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10 aspect-square" />
        </div>
    );
}

