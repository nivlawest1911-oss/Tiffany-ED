'use client';

import { motion } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, ChevronRight } from 'lucide-react';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import ConflictSimulator from '@/components/simulator/ConflictSimulator';

export default function SimulatorPage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col font-inter text-slate-200">
            <HolographicBackground />

            {/* Header / Hero */}
            <div className="relative z-10 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-intel-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-intel-gold/20">
                        <Terminal className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-intel-gold">
                            Executive Simulation
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic mt-1">
                            Roleplay Node <ChevronRight size={10} /> Conflict Engine v1.0
                        </div>
                    </div>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-8 max-w-5xl">
                    Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-gold via-yellow-400 to-white">Tactical</span> Decision.
                </h1>

                <div className="flex flex-wrap items-center gap-6">
                    <div className="px-6 py-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                        <ShieldAlert className="w-5 h-5 text-intel-gold" />
                        <div>
                            <div className="text-[9px] font-black text-intel-gold/60 uppercase tracking-widest mb-1">Scenario Fidelity</div>
                            <div className="text-sm font-bold text-white uppercase tracking-tight">Ultra High</div>
                        </div>
                    </div>

                    <div className="px-6 py-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                        <div>
                            <div className="text-[9px] font-black text-cyan-400/60 uppercase tracking-widest mb-1">Swarm Adversary</div>
                            <div className="text-sm font-bold text-white uppercase tracking-tighter italic">Active</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Simulator Workspace */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
            >
                <ConflictSimulator />
            </motion.div>

            {/* Operational Metadata */}
            <div className="mt-auto pt-8 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    Simulation_Hash: 0xFD96...ABF1230
                </div>
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                    <span>Tactical Handoff Ready</span>
                    <span>Continuity Protocol Stable</span>
                </div>
            </div>
        </div>
    );
}
