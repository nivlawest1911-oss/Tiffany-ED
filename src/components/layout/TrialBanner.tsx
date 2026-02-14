'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Sparkles } from 'lucide-react';

interface TrialBannerProps {
    tierId: string;
    tierName: string;
    daysRemaining: number;
}

/**
 * High-fidelity Trial Banner for the "Executive Shell".
 * Provides a sense of urgency and a clear path to conversion.
 */
export const TrialBanner: React.FC<TrialBannerProps> = ({ tierId, tierName, daysRemaining }) => {
    // Hide if user is on the free Initiate tier
    if (tierId === 'initiate') return null;

    const progress = ((30 - daysRemaining) / 30) * 100;

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-2.5 flex items-center justify-between relative z-50 overflow-hidden"
        >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse" />

            <div className="flex items-center gap-6 relative z-10">
                <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-noble-gold animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noble-gold">
                        {tierName} Trial Active
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-noble-gold transition-all duration-1000"
                        />
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 tabular-nums">
                        {daysRemaining} Days Until Premium Activation
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <a
                    href="/pricing"
                    className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all text-[10px] font-black uppercase tracking-widest text-white group"
                >
                    <CreditCard size={12} className="text-zinc-500 group-hover:text-noble-gold transition-colors" />
                    Manage Sovereign Subscription
                </a>
            </div>
        </motion.div>
    );
};
