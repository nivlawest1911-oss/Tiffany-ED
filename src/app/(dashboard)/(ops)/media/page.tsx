/**
 * Media Hub Page
 * 
 * Entry point for autonomous media synthesis and executive briefings.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Radio, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import { SynthesisDashboard } from '@/components/media/SynthesisDashboard';
import { ExecutiveBriefingPlayer } from '@/components/media/ExecutiveBriefingPlayer';
import { GlassCard } from '@/components/ui/Cinematic';

export default function MediaHubPage() {
    return (
        <main className="relative min-h-screen bg-black overflow-hidden py-24 px-6 md:px-12">
            <HolographicBackground />

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-7xl mx-auto space-y-16">

                {/* Sector Navigation Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.3em]"
                >
                    <span>Sovereign Node</span>
                    <ChevronRight size={10} />
                    <span className="text-intel-gold">Media Synthesis Hub</span>
                </motion.div>

                {/* Hero / State of the Voice */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <ExecutiveBriefingPlayer
                            title="District Weekly Summary"
                            subtitle="Autonomous synthesis of cross-node optimizations and strategic pivots."
                            duration={342}
                        />
                    </div>

                    <div className="space-y-6">
                        <GlassCard className="h-full border-intel-gold/10">
                            <div className="text-[10px] font-black text-intel-gold uppercase tracking-widest mb-6">System Status</div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-intel-gold/10 rounded-lg">
                                            <Radio size={16} className="text-intel-gold" />
                                        </div>
                                        <div className="text-xs font-bold text-white uppercase tracking-tight">Active Transmitters</div>
                                    </div>
                                    <span className="text-lg font-black text-white">12</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-lg">
                                            <Activity size={16} className="text-white/40" />
                                        </div>
                                        <div className="text-xs font-bold text-white uppercase tracking-tight">Synthesis Load</div>
                                    </div>
                                    <span className="text-lg font-black text-white">24%</span>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Neural Voice Config</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                                            <div className="text-[9px] font-bold text-white/40 mb-1 uppercase">Pitch</div>
                                            <div className="text-sm font-black text-white tracking-widest">0.92</div>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                                            <div className="text-[9px] font-bold text-white/40 mb-1 uppercase">Rate</div>
                                            <div className="text-sm font-black text-white tracking-widest">1.1x</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-intel-gold/5 border border-intel-gold/10 rounded-2xl mt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck size={14} className="text-intel-gold" />
                                        <span className="text-[10px] font-black text-intel-gold uppercase">Security Protocol</span>
                                    </div>
                                    <p className="text-[10px] text-white/40 font-medium">
                                        All synthesized voices are watermarked with District Sovereign ID. Audio metadata is hashed to the Legacy Ledger.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Synthesis Hub Dashboard */}
                <SynthesisDashboard />

            </div>
        </main>
    );
}
