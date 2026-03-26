'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Cpu, ChevronRight } from 'lucide-react';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import { GlassCard } from '@/components/ui/Cinematic';
import FleetCommander from '@/components/fleet/FleetCommander';
import { RegionalIntelligenceFeed } from '@/components/fleet/RegionalIntelligenceFeed';

export default function FleetPage() {
    return (
        <div className="relative flex flex-col font-inter text-slate-200">
            <HolographicBackground />

            {/* Header / Hero */}
            <div className="relative z-10 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-noble-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-noble-gold/20">
                        <Globe className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-noble-gold">
                            Regional Command
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic mt-1">
                            Fleet Orchestration Protocol <ChevronRight size={10} /> Sector 7-G
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-8 max-w-5xl">
                    Command the <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold via-yellow-400 to-white">Intelligence</span> Fleet.
                </h1>

                <div className="flex flex-wrap items-center gap-6">
                    <GlassCard className="px-6 py-4 flex items-center gap-4 border-noble-gold/20 bg-noble-gold/5">
                        <Shield className="w-5 h-5 text-noble-gold" />
                        <div>
                            <div className="text-[9px] font-black text-noble-gold/60 uppercase tracking-widest mb-1">Fleet Security Level</div>
                            <div className="text-sm font-bold text-white uppercase tracking-tight tracking-tighter">Sovereign Ultra</div>
                        </div>
                    </GlassCard>

                    <GlassCard className="px-6 py-4 flex items-center gap-4 border-cyan-500/20 bg-cyan-500/5">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                        <div>
                            <div className="text-[9px] font-black text-cyan-400/60 uppercase tracking-widest mb-1">Global Neural Load</div>
                            <div className="text-sm font-bold text-white uppercase tracking-tighter italic">66% Aggregate</div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Main Command Workspace */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 space-y-12"
            >
                <FleetCommander />
                <RegionalIntelligenceFeed />
            </motion.div>

            {/* Tactical Footer Overlay */}
            <div className="mt-12 pt-8 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 translate-y-4 opacity-50">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Regional Relay</span>
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            Relay-12-Stable
                        </span>
                    </div>
                    <div className="flex flex-col md:border-l border-white/10 md:pl-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Coordination Latency</span>
                        <span className="text-xs font-bold text-white">4ms Neural Hop</span>
                    </div>
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                    Fleet_ID_Sovereign_992_A
                </div>
            </div>
        </div>
    );
}
