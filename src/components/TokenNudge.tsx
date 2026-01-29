'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, ArrowRight, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface TokenNudgeProps {
    daysRemaining: number;
    tokensRemaining: number;
    isTrial: boolean;
}

export const TokenNudge: React.FC<TokenNudgeProps> = ({
    daysRemaining,
    tokensRemaining,
    isTrial
}) => {
    if (tokensRemaining > 10 && daysRemaining > 3) return null;

    const isCritical = tokensRemaining <= 5 || daysRemaining <= 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-8 right-8 z-50 max-w-sm w-full p-6 bg-black border ${isCritical ? 'border-amber-500/50' : 'border-zinc-800'
                } rounded-[2rem] shadow-2xl backdrop-blur-xl bg-opacity-90 overflow-hidden group`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${isCritical ? 'from-amber-500/5' : 'from-indigo-500/5'
                } to-transparent pointer-events-none`} />

            <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isCritical ? 'bg-amber-500/20 text-amber-500' : 'bg-indigo-500/20 text-indigo-400'
                        }`}>
                        {isCritical ? <AlertTriangle size={24} /> : <Zap size={24} />}
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest italic">
                            {isCritical ? 'Neural Sync Critical' : 'Pilot Status Update'}
                        </h4>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">
                            System Authorization Check
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Remaining Tokens</span>
                        <span className={`text-sm font-black ${tokensRemaining <= 5 ? 'text-amber-500' : 'text-white'}`}>
                            {tokensRemaining} / 50
                        </span>
                    </div>

                    {isTrial && (
                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Pilot Phase</span>
                            <span className={`text-sm font-black ${daysRemaining <= 1 ? 'text-amber-500' : 'text-white'}`}>
                                {daysRemaining} Days Left
                            </span>
                        </div>
                    )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6 italic">
                    {isCritical
                        ? "Your risk-free pilot is nearing expiration. Authorize full license to maintain continuous neural connectivity."
                        : "Strategic capacity is limited. Refill your token ledger to ensure uninterrupted executive support."}
                </p>

                <Link href="/pricing" className="block">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all ${isCritical
                                ? 'bg-amber-600 text-black shadow-lg shadow-amber-900/20'
                                : 'bg-white text-black hover:bg-zinc-200'
                            }`}
                    >
                        {isTrial ? 'Upgrade License' : 'Purchase Tokens'}
                        <ArrowRight size={14} />
                    </motion.button>
                </Link>

                <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1.5 opacity-40 grayscale">
                        <CreditCard size={12} className="text-zinc-400" />
                        <span className="text-[8px] text-zinc-400 font-bold tracking-widest uppercase italic">Secure Checkout</span>
                    </div>
                </div>
            </div>

            {/* Animated sweep line */}
            <div className="absolute top-0 left-[-100%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-marquee pointer-events-none" />
        </motion.div>
    );
};
