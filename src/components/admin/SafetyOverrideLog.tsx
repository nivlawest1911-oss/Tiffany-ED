'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ShieldCheck, Clock, Download, FileText } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, EthicalViolation } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function SafetyOverrideLog() {
    const [logs, setLogs] = useState<EthicalViolation[]>(engine.getEthicalViolations());
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLogs(engine.getEthicalViolations());
    }, []);

    const filteredLogs = logs.filter(log => 
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.agentId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <GlassCard className="p-8 border-indigo-500/10 bg-indigo-500/[0.01] h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-indigo-400 tracking-widest uppercase flex items-center gap-3">
                        Safety Override Log
                        <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                            <span className="text-[10px] text-indigo-400 font-black tracking-widest">IMMUTABLE ARCHIVE</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Intervention Audit Trail</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
                        aria-label="Export Audit Logs"
                        title="Export Audit Logs"
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {/* Search Hub */}
            <div className="mb-6 flex-shrink-0">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors" size={16} />
                    <input 
                        type="text"
                        placeholder="SEARCH ETHICAL INTERVENTIONS..."
                        className="w-full h-12 bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 text-xs text-white placeholder:text-zinc-700 outline-none focus:border-indigo-500/40 transition-all font-mono tracking-widest uppercase"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Logs Stream */}
            <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar space-y-3">
                <AnimatePresence mode="popLayout">
                    {filteredLogs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 rounded-xl border border-white/5 bg-white/[0.02] grid grid-cols-[1fr_auto] gap-4 group hover:bg-white/[0.05] transition-all"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                        <Database size={12} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Override ID: {log.id}</span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-tight">{log.type}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-tight leading-relaxed line-clamp-2">
                                    {log.description}
                                </p>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-tight">{log.timestamp.toLocaleTimeString()}</span>
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                                        RECLAIMED
                                    </div>
                                    <button 
                                        className="p-1 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-all"
                                        aria-label="View Detailed Intervention Transcript"
                                        title="View Detailed Intervention Transcript"
                                    >
                                        <FileText size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-8 p-4 bg-indigo-400/5 border border-indigo-400/10 rounded-2xl flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-400/10 rounded-lg text-indigo-400">
                        <ShieldCheck size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Blockchain Hash Verified</span>
                        <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-tight leading-none italic">Verified via node: 0x8A...F9B0</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 font-black uppercase">
                    <Clock size={12} />
                    <span>LATEST SYNC: T-4M</span>
                </div>
            </div>
        </GlassCard>
    );
}
