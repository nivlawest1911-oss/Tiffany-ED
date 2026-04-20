'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Zap, Brain, MessageSquare, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, LearningEntry } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function IntelligenceExchangeFeed() {
    const [insights, setInsights] = useState<LearningEntry[]>(engine.getLiveInsights());

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate a new insight arriving
            const domains: LearningEntry['domain'][] = ['PEDAGOGY', 'FISCAL', 'LOGISTICS', 'GOVERNANCE', 'SECURITY'];
            const randomDomain = domains[Math.floor(Math.random() * domains.length)];
            engine.addInsight(
                randomDomain,
                `Synthesized ${randomDomain.toLowerCase()} optimization detected in node 0x${Math.floor(Math.random() * 1000).toString(16)}.`,
                0.85 + Math.random() * 0.1,
                'MEDIUM',
                `node_${Math.floor(Math.random() * 10)}`
            );
            setInsights(engine.getLiveInsights());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="p-8 border-blue-500/10 bg-blue-500/[0.01] h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                        Intelligence Exchange
                        <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                            <span className="text-[10px] text-blue-500 font-black tracking-widest uppercase">Live Stream</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Cross-Node Synthesis Feed</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Node Connectivity</span>
                        <div className="flex items-center gap-2 justify-end">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-black text-white uppercase tracking-tighter italic">Sovereign_Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar space-y-4">
                <AnimatePresence mode="popLayout">
                    {insights.map((insight) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.04] hover:border-white/10 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                                        <Brain size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{insight.domain}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{insight.originNodeId}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Confidence</span>
                                    <span className="text-xs font-black text-emerald-500 italic">{(insight.confidence * 100).toFixed(0)}%</span>
                                </div>
                            </div>

                            <p className="text-sm font-medium text-zinc-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                                {insight.insight}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest hover:text-blue-400 transition-colors">
                                        <Share2 size={10} />
                                        Promote
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest hover:text-amber-400 transition-colors">
                                        <Zap size={10} />
                                        Integrate
                                    </button>
                                </div>
                                <span className="text-[9px] font-mono text-zinc-600 uppercase">
                                    {insight.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex-shrink-0">
                <button className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 text-zinc-400 hover:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group">
                    <MessageSquare size={14} className="group-hover:animate-bounce" />
                    <span>Open Synthesis Console</span>
                    <ArrowRight size={14} />
                </button>
            </div>
        </GlassCard>
    );
}
