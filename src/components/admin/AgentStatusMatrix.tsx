'use client';

import { motion } from 'framer-motion';
import { Cpu, Activity, CheckCircle, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

const AGENTS = [
    { id: 'AG-01', name: 'IEP Architect', role: 'Compliance', status: 'active', activity: 'Drafting 14 documents', drift: '0.01%' },
    { id: 'AG-02', name: 'Legal Sentinel', role: 'Governance', status: 'idle', activity: 'Policy sweep complete', drift: '0.00%' },
    { id: 'AG-03', name: 'Wellness Pulse', role: 'Support', status: 'active', activity: 'Sentiment analysis live', drift: '0.05%' },
    { id: 'AG-04', name: 'Fiscal Guardian', role: 'Operations', status: 'active', activity: 'Audit trail verified', drift: '0.01%' },
    { id: 'AG-05', name: 'Curriculum Core', role: 'Pedagogy', status: 'warning', activity: 'High entropy anomaly', drift: '0.12%' },
    { id: 'AG-06', name: 'Roster Synapse', role: 'Enrollment', status: 'active', activity: 'Syncing 4 external nodes', drift: '0.02%' },
];

export function AgentStatusMatrix() {
    return (
        <GlassCard className="p-8 border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase">Agent Status Matrix</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Real-Time Swarm Topology</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                        <CheckCircle size={12} />
                        <span>System Stable</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AGENTS.map((agent, i) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-default"
                    >
                        {/* Status Glow */}
                        <div className={`absolute top-4 right-4 h-2 w-2 rounded-full blur-[4px] animate-pulse ${
                            agent.status === 'active' ? 'bg-emerald-500' : 
                            agent.status === 'warning' ? 'bg-amber-500' : 'bg-zinc-500'
                        }`} />

                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-xl ${
                                    agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                                    agent.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-500/10 text-zinc-500'
                                }`}>
                                    <Cpu size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{agent.role}</span>
                                    <span className="text-sm font-black text-white">{agent.name}</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="flex flex-col gap-1.5 px-3 py-2 bg-black/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                                        <Activity size={10} className="animate-pulse" />
                                        <span>Current Task</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-white truncate">{agent.activity}</p>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Drift Index</span>
                                        <span className={`text-[11px] font-bold ${
                                            agent.status === 'warning' ? 'text-amber-500' : 'text-emerald-400'
                                        }`}>{agent.drift}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Clock size={10} className="text-zinc-500" />
                                        <span className="text-[8px] font-mono text-zinc-500 uppercase">Latency: 2ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </GlassCard>
    );
}
