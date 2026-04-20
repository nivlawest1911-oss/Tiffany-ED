'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, XCircle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, EthicalViolation } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function RedlineMonitor() {
    const [violations, setViolations] = useState<EthicalViolation[]>(engine.getEthicalViolations());

    useEffect(() => {
        setViolations(engine.getEthicalViolations());
    }, []);

    const getSeverityColor = (severity: EthicalViolation['severity']) => {
        switch (severity) {
            case 'CRITICAL': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            case 'HIGH': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'MEDIUM': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    const getTypeIcon = (type: EthicalViolation['type']) => {
        switch (type) {
            case 'PII_EXPOSURE': return <XCircle size={14} />;
            case 'PEDAGOGICAL_BIAS': return <AlertTriangle size={14} />;
            case 'HALLUCINATION': return <Zap size={14} />;
            default: return <ShieldAlert size={14} />;
        }
    };

    return (
        <GlassCard className="p-8 border-rose-500/10 bg-rose-500/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-rose-500 tracking-widest uppercase flex items-center gap-3">
                        Redline Monitor
                        <div className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                            <span className="text-[10px] text-rose-500 font-black tracking-widest">ACTIVE GUARD</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sovereign Compliance Overwatch</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">System Integrity</span>
                        <div className="flex items-center gap-2 justify-end">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-xl font-black text-emerald-400">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {violations.map((violation, i) => (
                        <motion.div
                            key={violation.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] hover:border-rose-500/20 transition-all cursor-default"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl border ${getSeverityColor(violation.severity)}`}>
                                        {getTypeIcon(violation.type)}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{violation.type}</span>
                                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tight">Agent: {violation.agentId} | Node: {violation.nodeId}</span>
                                        </div>
                                        <span className="text-sm font-black text-white">{violation.severity} VIOLATION DETECTED</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono text-zinc-600 uppercase">
                                    {violation.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                            
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-4 group-hover:text-zinc-200 transition-colors uppercase italic">
                                {violation.description}
                            </p>

                            <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Sovereign Action</span>
                                    <span className="text-[9px] font-bold text-white tracking-widest">{violation.actionTaken}</span>
                                </div>
                                <button 
                                    className="p-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
                                    aria-label="View Violation Details"
                                    title="View Violation Details"
                                >
                                    <ArrowRight size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <button className="w-full py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 group">
                    <XCircle size={16} className="group-hover:rotate-90 transition-transform" />
                    <span>Initiate Full Swarm Ethics Sync</span>
                </button>
            </div>
        </GlassCard>
    );
}
