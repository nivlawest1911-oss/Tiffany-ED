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
            : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    }, [userSubscription?.trial_end]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const distance = trialEnd.getTime() - now.getTime();

            if (distance < 0) {
                clearInterval(timer);
                setIsExpired(true);
                setTimeLeft("EXPIRED");
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

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Identity Manager // Node-01</span>
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                </div>
            </div>

            <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white uppercase italic tracking-tight">{activeTier}</h2>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                            ID: {userSubscription?.user_id?.slice(0, 12) || 'AL_MB_NODE_01'}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">District</span>
                        <span className="text-sm font-bold text-white">Mobile County</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
                        <span className="text-xs text-amber-500 uppercase tracking-wider">Trial Remaining</span>
                        <span className={`text-lg font-black font-mono ${isExpired ? 'text-red-500' : 'text-white'}`}>
                            {timeLeft || 'Loading...'}
                        </span>
                    </div>

                    {isExpired && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-xs text-red-400 mb-2">⚠️ Trial Expired</p>
                            <p className="text-[10px] text-gray-400">
                                Upgrade now to maintain access to your data
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="card-footer">
                {isExpired ? 'Upgrade Now' : 'View Subscription'}
            </div>
        </div>
    );
};
