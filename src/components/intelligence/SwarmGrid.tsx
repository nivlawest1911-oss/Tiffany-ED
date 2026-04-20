'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Brain, Network, X
} from 'lucide-react';
import Image from 'next/image';
import { INTELLIGENCE_MAP } from '@/lib/intelligence-engine';

const SwarmGrid = () => {
    const agents = Object.entries(INTELLIGENCE_MAP).map(([id, data]) => ({
        id,
        ...data
    }));

    const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);

    // Placeholder for swarm activity
    useEffect(() => {
        const interval = setInterval(() => {
            // Heartbeat logic could go here
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full min-h-[600px] flex flex-col gap-8 p-8 overflow-hidden rounded-[2.5rem] bg-[#05070A] border border-white/5">
            {/* AMBIENT BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        Collective <span className="gold-gradient-text">Intelligence</span>
                    </h2>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
                        <Network size={12} className="text-noble-gold animate-pulse" />
                        District-Wide Swarm Activation // 4K STABLE
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Active Nodes</p>
                        <p className="text-2xl font-mono text-emerald-400">{agents.length}</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-right">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Sync Latency</p>
                        <p className="text-2xl font-mono text-noble-gold">0.2ms</p>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="relative z-10 flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {agents.map((agent, i) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => setSelectedAgent(agent)}
                        className={`group relative liquid-glass border-white/5 p-6 cursor-pointer transition-all hover:border-noble-gold/30 hover:bg-white/[0.03] flex flex-col gap-4
                            ${selectedAgent?.id === agent.id ? 'border-noble-gold/50 bg-noble-gold/5 ring-1 ring-noble-gold/20' : ''}`}
                    >
                        {/* AGATAR BUBBLE */}
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 mb-2">
                            <Image 
                                src={agent.avatar} 
                                alt={agent.id} 
                                width={64}
                                height={64}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* ACTIVE INDICATOR */}
                            <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0A0E1A] z-20">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-60" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-1 group-hover:text-noble-gold transition-colors">{agent.id}</h3>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight line-clamp-1">{agent.role}</p>
                        </div>

                        {/* MINI STATS */}
                        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                            <div className="flex items-center gap-1.5">
                                <Activity size={10} className="text-emerald-400" />
                                <span className="text-[9px] font-mono text-white/60">{agent.stats.accuracy}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Brain size={10} className="text-noble-gold" />
                                <span className="text-[9px] font-mono text-white/60">{agent.stats.time}</span>
                            </div>
                        </div>

                        {/* HOVER GLOW overlay */}
                        <div className="absolute inset-0 bg-noble-gold/0 group-hover:bg-noble-gold/[0.02] transition-colors pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            {/* AGENT DETAIL SIDEBAR / OVERLAY */}
            <AnimatePresence>
                {selectedAgent && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAgent(null)}
                            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="absolute top-0 right-0 h-full w-full max-w-md z-50 bg-[#0A0E1A] border-l border-white/10 shadow-[-20px_0_100px_rgba(0,0,0,1)] p-12 overflow-y-auto"
                        >
                            <button 
                                onClick={() => setSelectedAgent(null)}
                                className="absolute top-8 left-8 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                                aria-label="Close Agent Profile"
                            >
                                <X size={20} />
                            </button>

                            <div className="mt-12 space-y-12">
                                <div className="flex flex-col items-center text-center gap-6">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-noble-gold/30 p-2 bg-black/40 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                                        <Image 
                                            src={selectedAgent.avatar} 
                                            alt={selectedAgent.id} 
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover rounded-[2rem]" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-2">{selectedAgent.id}</h3>
                                        <p className="text-noble-gold font-black text-[10px] uppercase tracking-[0.4em]">{selectedAgent.role}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(selectedAgent.stats).map(([label, value]) => (
                                        <div key={label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">{label}</p>
                                            <p className="text-lg font-mono text-white italic">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] border-b border-white/5 pb-4">Neural Profile</h4>
                                    <p className="text-sm text-white/60 leading-relaxed italic">{selectedAgent.description}</p>
                                </div>

                                <button className="w-full py-5 rounded-2xl bg-noble-gold text-black font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-all">
                                    Sync Command Interface
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SwarmGrid;
