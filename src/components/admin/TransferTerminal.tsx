'use client';

import React, { useState } from 'react';
import { Send, ShieldCheck, User, Zap, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TransferTerminal = ({ staffId, staffName }: { staffId: string, staffName: string }) => {
    const [amount, setAmount] = useState(100);
    const [status, setStatus] = useState<'idle' | 'executing' | 'confirmed'>('idle');

    const executeTransfer = async () => {
        setStatus('executing');
        // Call the Supabase RPC function (transfer_school_energy) in a real implementation
        console.log(`💎 Strategic Transfer Initiated: Moving ${amount} units to ${staffName}`);

        setTimeout(() => {
            setStatus('confirmed');
            setTimeout(() => setStatus('idle'), 3000);
        }, 2000);
    };

    return (
        <div className="p-8 bg-[#050507] border border-emerald-500/30 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Background Command Glow */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 blur-[50px] -z-10" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="text-emerald-500 w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-black italic">Allocation Terminal</h4>
                    <p className="text-[8px] text-zinc-500 uppercase font-bold mt-1 tracking-widest">Resource Identity Control</p>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between group-hover:border-white/20 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                            <User className="text-zinc-600 w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">Personnel Recipient</p>
                            <p className="text-sm font-black text-white uppercase italic tracking-tight">{staffName}</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
                        <Zap className="text-emerald-500/30 w-4 h-4" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Charge Amount (Units)</label>
                        <span className="text-[9px] font-mono text-emerald-500/50">VAL: {amount}U</span>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full bg-black border border-white/10 p-5 rounded-2xl text-xl font-black text-white italic outline-none focus:border-emerald-500/50 transition-all transition-all"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-4">
                            {[100, 500, 1000].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setAmount(val)}
                                    className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-emerald-400 transition-colors"
                                >
                                    +{val}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'confirmed' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full py-5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20"
                        >
                            <ShieldCheck className="text-emerald-500 w-5 h-5" />
                            <span className="text-xs font-black uppercase text-emerald-500 tracking-[0.2em]">Allocation Synchronized</span>
                        </motion.div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={executeTransfer}
                            disabled={status === 'executing'}
                            className="w-full relative group/btn flex items-center justify-center gap-3 py-5 bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all disabled:opacity-50"
                        >
                            <Send className={`w-4 h-4 text-emerald-500 ${status === 'executing' ? 'animate-bounce' : 'group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1'} transition-transform`} />
                            <span className="text-xs font-black uppercase text-white tracking-[0.3em]">
                                {status === 'executing' ? 'Synchronizing Node...' : 'Authorize Transfer'}
                            </span>
                            {/* Interior Scan Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                    <AlertTriangle className="text-red-500/50 w-4 h-4 shrink-0" />
                    <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest leading-relaxed">
                        Notice: Energy transfers are irreversible and recorded in the EdIntel Ledger for audit compliance.
                    </p>
                </div>
            </div>
        </div>
    );
};
