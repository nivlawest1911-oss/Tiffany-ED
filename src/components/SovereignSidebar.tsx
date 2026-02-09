import { motion } from 'framer-motion';
import { Activity, Shield, Brain, Zap, Clock, Info } from 'lucide-react';
import { CognitiveBattery } from './CognitiveBattery';
import { DueProcessShield } from './SovereignRegulatory';
import SovereignInteractionAgent from './SovereignInteractionAgent';

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
            className="fixed right-0 top-0 h-screen w-80 bg-black/95 backdrop-blur-2xl text-white border-l border-white/10 z-[200] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
        >
            {/* Neural Stream Telemetry Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
                <motion.div
                    animate={{ y: [-1000, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-noble-gold to-transparent h-[200%] w-px left-0"
                />
            </div>
            <div className="p-8 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-2 h-2 rounded-full bg-noble-gold animate-pulse shadow-[0_0_10px_#D4AF37]" />
                        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white italic">Sovereign Swarm</h2>
                    </div>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] pl-5">Neural Grid v2.1</p>
                </div>
                <SovereignInteractionAgent
                    title="Swarm Intelligence"
                    description="Our decentralized network of autonomous agents working in parallel to secure your district's future."
                    agentId="visionary"
                    position="left"
                >
                    <Info size={14} className="text-white/20 hover:text-white transition-colors cursor-help" />
                </SovereignInteractionAgent>
            </div>

            {/* Live Agent Feed */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">

                {/* 1. Cognitive Battery */}
                <SovereignInteractionAgent
                    title="Cognitive Load Balancing"
                    description="Real-time monitoring of decision fatigue. This engine adjusts AI complexity based on your current workload."
                    agentId="tactical"
                    position="left"
                    className="w-full"
                >
                    <CognitiveBattery loadScore={cognitiveLoad} />
                </SovereignInteractionAgent>

                <div className="space-y-4">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Active Neural Node</p>
                    <SovereignInteractionAgent
                        title="Active Agent Protocols"
                        description={`Currently deploying the ${activeAgent} to optimize state regulatory alignment and executive synthesis.`}
                        agentId="strategic"
                        position="left"
                        className="w-full"
                    >
                        <div className="p-5 bg-white/[0.03] border border-noble-gold/20 rounded-2xl relative group overflow-hidden cursor-help">
                            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-noble-gold flex items-center gap-2">
                                        <Brain size={14} />
                                        {activeAgent}
                                    </span>
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <p className="text-[11px] text-zinc-400 font-bold leading-relaxed italic">
                                    "Optimizing 4th Grade math protocols for Science of Reading alignment. Cross-referencing 12 state standards."
                                </p>
                            </div>
                        </div>
                    </SovereignInteractionAgent>
                </div>

                <div className="space-y-4">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Swarm Telemetry</p>
                    <div className="grid grid-cols-2 gap-4">
                        <SovereignInteractionAgent
                            title="Network State"
                            description="Real-time connectivity status of the Sovereign Intelligence Layer across your district network."
                            agentId="tactical"
                            position="left"
                            className="w-full"
                        >
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl cursor-help hover:border-emerald-500/30 transition-all">
                                <Activity size={16} className="text-emerald-400 mb-3" />
                                <div className="text-xl font-black text-white italic">{agentStatus}</div>
                                <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold mt-1">Grid State</div>
                            </div>
                        </SovereignInteractionAgent>

                        <SovereignInteractionAgent
                            title="Neural Latency"
                            description="Speed of agent training and inference delivery directly to your dashboard."
                            agentId="tactical"
                            position="left"
                            className="w-full"
                        >
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl cursor-help hover:border-noble-gold/30 transition-all">
                                <Zap size={16} className="text-noble-gold mb-3" />
                                <div className="text-xl font-black text-white italic">42ms</div>
                                <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold mt-1">Fiber Speed</div>
                            </div>
                        </SovereignInteractionAgent>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Engine Activity</p>
                    <div className="space-y-2">
                        {[
                            { name: 'Literacy Architect', status: 'Processing', color: 'text-emerald-400', agent: 'strategic' as const },
                            { name: 'Reform Engine', status: 'Standby', color: 'text-zinc-600', agent: 'philosopher' as const },
                            { name: 'Wellness Shield', status: 'Monitoring', color: 'text-blue-400', agent: 'tactical' as const }
                        ].map((engine, i) => (
                            <SovereignInteractionAgent
                                key={i}
                                title={`${engine.name} Status`}
                                description={`Autonomous monitoring of ${engine.name.toLowerCase()} protocols for district-wide sovereignty.`}
                                agentId={engine.agent}
                                position="left"
                                className="w-full"
                            >
                                <div className="flex items-center justify-between text-[10px] py-1 opacity-60 hover:opacity-100 transition-opacity cursor-help">
                                    <span className="font-black text-white tracking-widest uppercase">{engine.name}</span>
                                    <span className={`font-black font-mono uppercase italic ${engine.color}`}>{engine.status}</span>
                                </div>
                            </SovereignInteractionAgent>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Ticker */}
            <div className="p-6 border-t border-white/10 bg-white/[0.01] backdrop-blur-3xl space-y-6">
                <SovereignInteractionAgent
                    title="Strategic ROI"
                    description="Total professional hours reclaimed through autonomous agent task delegation."
                    agentId="visionary"
                    position="left"
                    className="w-full"
                >
                    <div className="flex items-center justify-between px-2 cursor-help">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Reclaimed</span>
                            <div className="flex items-baseline gap-2">
                                <Clock size={12} className="text-noble-gold" />
                                <span className="text-lg font-black text-white italic">{hoursSaved}h</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Compliance</span>
                            <div className="flex items-center gap-2">
                                <Shield size={12} className="text-blue-400" />
                                <span className="text-lg font-black text-blue-400 italic">{complianceScore}%</span>
                            </div>
                        </div>
                    </div>
                </SovereignInteractionAgent>

                {/* Integrated Due Process Shield */}
                <SovereignInteractionAgent
                    title="Regulatory Shield"
                    description="Continuous scanning of AL Code 290-8-9 and federal mandates to ensure absolute administrative compliance."
                    agentId="philosopher"
                    position="left"
                    className="w-full"
                >
                    <div className="cursor-help">
                        <DueProcessShield compact={true} showDetails={false} className="!bg-white/[0.03] !border-white/5 !p-4 hover:!border-white/20 transition-all rounded-2xl" />
                    </div>
                </SovereignInteractionAgent>
            </div>
        </motion.div>
    );
}

