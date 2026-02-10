'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const UsageHistory = ({ logs }: { logs: any[] }) => {
    return (
        <div className="bg-[#050507] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl group">
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-indigo-500/5 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-black">EdIntel Ledger</h3>
                        <p className="text-[8px] text-zinc-600 uppercase font-bold">Encrypted Transaction History</p>
                    </div>
                </div>
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group/btn">
                    <Download className="w-3 h-3 text-zinc-500 group-hover/btn:text-indigo-400 transition-colors" />
                </button>
            </div>

            <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                {logs && logs.length > 0 ? logs.map((log, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={log.id}
                        className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group/item"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${log.amount > 0
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>
                                {log.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                            </div>
                            <div>
                                <p className="text-xs font-black text-white uppercase tracking-tight group-hover/item:text-indigo-300 transition-colors">
                                    {log.feature_used || (log.amount > 0 ? 'System Core Refill' : 'Neural Synthesis Event')}
                                </p>
                                <p className="text-[8px] text-zinc-500 uppercase font-mono mt-1">
                                    {new Date(log.created_at).toLocaleString()} {" // "} REF: {log.id.substring(0, 8)}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`text-xs font-black font-mono ${log.amount > 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                {log.amount > 0 ? `+${log.amount}` : log.amount} U
                            </span>
                            <p className="text-[7px] text-zinc-600 uppercase font-bold tracking-widest mt-1">
                                Verified
                            </p>
                        </div>
                    </motion.div>
                )) : (
                    <div className="p-12 text-center">
                        <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">No Transactions Detected</div>
                        <div className="text-[8px] text-zinc-700 uppercase mt-2">Ledger is active and awaiting input</div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-white/[0.01] border-t border-white/5 text-center">
                <span className="text-[7px] text-zinc-700 uppercase font-black tracking-[0.4em]">District Audit Readiness: High</span>
            </div>
        </div>
    );
};
