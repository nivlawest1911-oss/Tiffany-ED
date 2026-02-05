'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface SovereignIDManagerProps {
    userSubscription: any;
}

export const SovereignIDManager = ({ userSubscription }: SovereignIDManagerProps) => {
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [isExpired, setIsExpired] = useState(false);

    // Tier-based logic
    const activeTier = userSubscription?.tier_name || "Sovereign Initiate";

    const trialEnd = useMemo(() => {
        return userSubscription?.trial_end
            ? new Date(userSubscription.trial_end)
            : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Default to 14 days from now
    }, [userSubscription?.trial_end]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const distance = trialEnd.getTime() - now.getTime();

            if (distance < 0) {
                clearInterval(timer);
                setIsExpired(true);
                setTimeLeft("00:00:00:00");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [trialEnd]);

    if (isExpired) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 text-white p-6 relative z-[200]">
                <div className="border border-amber-600 p-8 rounded-lg bg-zinc-900 shadow-[0_0_20px_rgba(217,119,6,0.2)] max-w-lg text-center">
                    <h2 className="text-amber-500 text-3xl font-bold mb-4 font-mono">PROTOCOL EXPIRED</h2>
                    <p className="text-zinc-400 mb-6">
                        The {activeTier} trial has concluded. Neural Link is severed.
                        To maintain your data for Mobile County Schools, you must upgrade now.
                    </p>
                    <a
                        href="/pricing"
                        className="block w-full py-4 bg-amber-500 text-black font-black rounded hover:bg-amber-400 transition-all uppercase"
                    >
                        Ascend to Command (Upgrade)
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/80 backdrop-blur-xl border-b border-zinc-900 p-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                </div>
                <div>
                    <h1 className="text-zinc-100 font-black tracking-tighter text-sm uppercase italic">{activeTier}</h1>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                        Node ID: {userSubscription?.user_id?.slice(0, 8) || 'AL_MB_NODE_01'}
                    </p>
                </div>
            </div>

            <div className="text-right flex items-center gap-6">
                <div className="hidden md:block">
                    <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-1">District</p>
                    <p className="text-xs font-black text-white italic uppercase tracking-wider">Mobile County</p>
                </div>
                <div className="h-10 w-px bg-zinc-800" />
                <div>
                    <p className="text-[9px] text-amber-500 font-mono uppercase tracking-[0.3em] mb-1">Trial Remaining</p>
                    <p className="text-xl font-black font-mono text-zinc-100 tracking-tighter">{timeLeft}</p>
                </div>
            </div>
        </div>
    );
};
