import { motion } from 'framer-motion';
import { Activity, Shield, Brain, Zap, Clock } from 'lucide-react';
import { CognitiveBattery } from './CognitiveBattery';
import { DueProcessShield } from './SovereignRegulatory';

interface SovereignSidebarProps {
    agentStatus?: string;
    hoursSaved?: number;
    activeAgent?: string;
    complianceScore?: number;
    cognitiveLoad?: number; // 0-100
}

export function SovereignSidebar({
    agentStatus = "Active",
    hoursSaved = 14.2,
    activeAgent = "Literacy Provost",
    complianceScore = 100,
    cognitiveLoad = 45 // Default to moderate load for demo
}: SovereignSidebarProps) {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed right-0 top-0 h-screen w-72 bg-[#050505]/95 backdrop-blur-xl text-white border-l border-white/10 z-[200] flex flex-col shadow-2xl"
        >
            <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full bg-noble-gold animate-pulse shadow-[0_0_10px_#D4AF37]" />
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Sovereign Swarm</h2>
                </div>
                <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest pl-5">Neural Orchestration Grid</p>
            </div>

            {/* Live Agent Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                {/* 1. Cognitive Battery (Decision Fatigue) */}
                <CognitiveBattery loadScore={cognitiveLoad} />

                <div className="space-y-3">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Active Neural Node</p>
                    <div className="p-4 bg-white/[0.03] border border-noble-gold/20 rounded-xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-noble-gold/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-noble-gold flex items-center gap-2">
                                    <Brain size={12} />
                                    {activeAgent}
                                </span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                                "Optimizing 4th Grade math protocols for Science of Reading alignment. Cross-referencing 12 state standards."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Swarm Telemetry</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <Activity size={14} className="text-emerald-400 mb-2" />
                            <div className="text-lg font-black text-white">{agentStatus}</div>
                            <div className="text-[8px] uppercase tracking-widest text-white/40">Network State</div>
                        </div>
                        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <Zap size={14} className="text-noble-gold mb-2" />
                            <div className="text-lg font-black text-white">42ms</div>
                            <div className="text-[8px] uppercase tracking-widest text-white/40">Latency</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Engine Activity</p>
                    {[
                        { name: 'Literacy Architect', status: 'Processing', color: 'text-emerald-400' },
                        { name: 'Reform Engine', status: 'Standby', color: 'text-zinc-500' },
                        { name: 'Wellness Shield', status: 'Monitoring', color: 'text-blue-400' }
                    ].map((engine, i) => (
                        <div key={i} className="flex items-center justify-between text-[10px] py-1">
                            <span className="font-bold text-white/60">{engine.name}</span>
                            <span className={`font-mono uppercase ${engine.color}`}>{engine.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact Ticker (Wellness Shield Engine) */}
            {/* Impact Ticker (Wellness Shield Engine) */}
            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between px-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Reclaimed</span>
                        <div className="flex items-baseline gap-1">
                            <Clock size={10} className="text-noble-gold" />
                            <span className="text-sm font-black text-white">{hoursSaved}h</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Score</span>
                        <div className="flex items-center gap-1">
                            <Shield size={10} className="text-blue-400" />
                            <span className="text-sm font-black text-blue-400">{complianceScore}%</span>
                        </div>
                    </div>
                </div>

                {/* Integrated Due Process Shield */}
                <DueProcessShield compact={true} showDetails={false} className="!bg-white/[0.03] !border-white/5" />
            </div>
        </motion.div>
    );
}
