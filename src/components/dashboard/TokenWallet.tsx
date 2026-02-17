'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Plus, ChevronRight, Zap, Loader2 } from 'lucide-react';
import { createTopupSession } from '@/lib/stripe';
import { useAuth } from '@/context/AuthContext';

const REFILL_TIERS = [
    { id: 'starter', label: 'Starter', amount: 1000, price: 12, desc: 'Essential tasks' },
    { id: 'pro', label: 'Growth', amount: 5000, price: 49, desc: 'Heavy media gen', recommended: true },
    { id: 'elite', label: 'School Site Pro', amount: 15000, price: 99, desc: 'District-wide usage', highlight: true },
];

export default function TokenWallet() {
    const { user } = useAuth();
    const [isRefilling, setIsRefilling] = useState(false);
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleRefill = async (tierId: string, _priceId: number) => { // priceId logic needs mapping in real app
        if (!user) return;
        setLoadingTier(tierId);
        try {
            // Mapping tier IDs to Price IDs (simulated or from env)
            // In a real scenario, we'd pass the actual Stripe Price ID
            let stripePriceId = '';
            if (tierId === 'starter') stripePriceId = 'price_token_1k_12';
            if (tierId === 'pro') stripePriceId = 'price_token_5k_49';
            if (tierId === 'elite') stripePriceId = 'price_token_15k_99';

            const session = await createTopupSession(
                user.id,
                stripePriceId, // Use the ID here
                window.location.href,
                window.location.href
            );

            if (session?.url) {
                window.location.href = session.url;
            }
        } catch (error) {
            console.error('Refill failed', error);
        } finally {
            setLoadingTier(null);
        }
    };

    return (
        <div className="p-6 rounded-[2rem] bg-indigo-950/20 border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1 text-indigo-400">
                            <Coins size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Token Wallet</span>
                        </div>
                        <div className="text-3xl font-black text-white tracking-tight">
                            {user?.usageTokens?.toLocaleString() || 0}
                            <span className="text-sm font-medium text-slate-500 ml-1">TKN</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsRefilling(!isRefilling)}
                        className={`p-2 rounded-full border transition-all ${isRefilling ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
                    >
                        {isRefilling ? <ChevronRight size={16} className="rotate-90" /> : <Plus size={16} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isRefilling && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 space-y-3 border-t border-white/5">
                                {REFILL_TIERS.map((tier) => (
                                    <button
                                        key={tier.id}
                                        onClick={() => handleRefill(tier.id, tier.price)}
                                        disabled={!!loadingTier}
                                        className={`w-full p-3 rounded-xl border flex items-center justify-between group/tier relative overflow-hidden ${tier.recommended
                                            ? 'bg-indigo-500/10 border-indigo-500/50 hover:bg-indigo-500/20'
                                            : 'bg-slate-900/50 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-white group-hover/tier:text-indigo-300 transition-colors">
                                                    {tier.amount.toLocaleString()} TKN
                                                </span>
                                                {tier.recommended && (
                                                    <span className="px-1.5 py-0.5 rounded-full bg-indigo-500 text-[8px] font-black text-white uppercase tracking-wider">
                                                        Best
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase font-medium">{tier.desc}</div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-slate-300">${tier.price}</span>
                                            {loadingTier === tier.id ? (
                                                <Loader2 size={14} className="animate-spin text-indigo-500" />
                                            ) : (
                                                <Zap size={14} className="text-slate-600 group-hover/tier:text-indigo-400" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isRefilling && (
                    <div className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        High-fidelity models (GPT-4) consume ~50 tokens/request.
                    </div>
                )}
            </div>
        </div>
    );
}
