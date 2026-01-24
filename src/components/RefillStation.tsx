'use client';

import React from 'react';
import { Zap, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const RefillStation = () => {
    const handlePurchase = async (tokens: number) => {
        // This will trigger the Stripe Checkout flow in a production update
        console.log(`💎 Protocol Initiated: Requesting Sovereign Charge of ${tokens} units`);
        alert(`Initiating Sovereign Charge: ${tokens} units. Connecting to EdIntel Treasury...`);
    };

    return (
        <div className="p-8 bg-[#050507] border border-emerald-500/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-colors" />

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Refill Station</h2>
                    <p className="text-[10px] text-emerald-500/60 uppercase tracking-[0.3em] mt-1 font-bold">Strategic Resource Replenishment</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Zap className="text-emerald-500 animate-pulse w-6 h-6" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 relative z-10">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePurchase(1000)}
                    className="group relative flex items-center justify-between p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 overflow-hidden"
                >
                    <div className="text-left">
                        <span className="block text-[9px] text-slate-500 uppercase tracking-[0.2em] mb-1 font-bold">Standard Core Charge</span>
                        <span className="text-2xl font-black text-white italic uppercase tracking-tight">1,000 Units</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-black text-xl">$9.99</span>
                            <ShoppingCart className="w-4 h-4 text-emerald-500/50" />
                        </div>
                        <span className="text-[7px] text-slate-600 uppercase font-black tracking-widest mt-1">Non-Expiring Ledger</span>
                    </div>

                    {/* Animated Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 relative z-10">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-slate-600" />
                    <span className="text-[8px] text-slate-600 uppercase font-bold tracking-[0.2em]">Secured by Stripe Intelligence</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-[8px] text-slate-600 uppercase font-bold tracking-[0.2em]">Payments routed to EdIntel Treasury</span>
            </div>
        </div>
    );
};
