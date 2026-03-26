'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, Activity, Shield, Heart } from 'lucide-react';
import { useEdIntelVibe, VIBES, Vibe } from '@/context/EdIntelVibeContext';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { SovereignBadge } from '@/components/ui/SovereignBadge';
import { useAuth } from '@/context/AuthContext';
import { useIntelligence } from '@/context/IntelligenceContext';
import { wearableService } from '@/lib/wearable-service';
import { cn } from '@/lib/utils';

export const TacticalHeaderBar = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { currentVibe, setVibe } = useEdIntelVibe();
    const { playHover, playClick } = useProfessionalSounds();
    const { isSynthesizing } = useIntelligence();
    const [latency, setLatency] = useState('1.4ms');
    const [isLinked, setIsLinked] = useState(false);

    // Simulate slight latency fluctuations for "lived-in" feel
    useEffect(() => {
        const interval = setInterval(() => {
            const base = 1.4;
            const variance = (Math.random() * 0.2) - 0.1;
            setLatency(`${(base + variance).toFixed(1)}ms`);
        }, 3000);

        // Listen to wearable status
        const unsubscribe = wearableService.onStatusChange((connected) => {
            setIsLinked(connected);
        });

        return () => {
            clearInterval(interval);
            unsubscribe();
        };
    }, []);

    const handleVibeChange = (vibe: Vibe) => {
        if (vibe.id === currentVibe.id) return;
        playClick();
        setVibe(vibe);
        router.push(vibe.route);
    };

    return (
        <div role="region" aria-label="System Metrics" className="flex items-center justify-between w-full max-w-full bg-black/40 backdrop-blur-xl border border-white/10 p-1 md:p-1.5 rounded-2xl shadow-2xl overflow-hidden">
            {/* System Metrics (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-white/5 rounded-xl border border-white/5 mr-2 shrink-0">
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">District</span>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-tighter">Optimal</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-white/10" />

                <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-electric-cyan" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">Latency</span>
                        <span className="text-[10px] font-mono text-electric-cyan font-black tracking-tighter">{latency}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Cloud Sync</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-white/10" />

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-noble-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-noble-gold">Zenith Absolute</span>
                    </div>
                </div>


                {/* HEARTBEAT / NEURAL LINK */}
                <div className={cn(
                    "flex items-center gap-2 px-2 transition-all duration-500",
                    isSynthesizing ? "bg-sovereign-gold/10 rounded-lg px-3 py-1" :
                        isLinked ? "bg-cyan-500/10 rounded-lg px-3 py-1" : ""
                )}>
                    <motion.div
                        animate={{
                            scale: isSynthesizing ? [1, 1.4, 1] : [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: isSynthesizing ? 0.6 : 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart className={cn(
                            "w-3 h-3 transition-colors duration-500",
                            isSynthesizing ? "text-sovereign-gold fill-sovereign-gold" :
                                isLinked ? "text-cyan-400 fill-cyan-400" : "text-rose-500 fill-rose-500/20"
                        )} />
                    </motion.div>
                    <span className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                        isSynthesizing ? "text-sovereign-gold animate-pulse" :
                            isLinked ? "text-cyan-400" : "text-zinc-400"
                    )}>
                        {isSynthesizing ? "Synthesizing..." : isLinked ? "Biometrics Linked" : "Neural Link"}
                    </span>
                </div>
            </div>

            {/* Tactical Switcher */}
            <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 px-1 md:gap-1.5 md:px-0 scroll-smooth shadow-inner lg:shadow-none">
                {VIBES.map((v) => {
                    const isActive = currentVibe.id === v.id;
                    return (
                        <button
                            key={v.id}
                            onMouseEnter={playHover}
                            onClick={() => handleVibeChange(v)}
                            className={cn(
                                "group relative px-2.5 py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-500 shrink-0 border",
                                isActive
                                    ? "bg-sovereign-gold/10 border-sovereign-gold/40 shadow-[0_0_20px_rgba(255,179,0,0.15)]"
                                    : "bg-transparent border-transparent text-zinc-400 hover:text-white/80 hover:bg-white/5"
                            )}
                        >
                            {/* Active Glow Effect */}
                            {isActive && (
                                <motion.div
                                    layoutId="vibe-active-bg"
                                    className="absolute inset-0 bg-gradient-to-r from-sovereign-gold/20 to-transparent"
                                />
                            )}

                            <div className="relative z-10 flex items-center gap-2">
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                                    isActive ? "bg-sovereign-gold shadow-[0_0_10px_#FFB300] scale-125" : "bg-white/10 group-hover:bg-white/30"
                                )} />
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.15em] transition-colors",
                                    isActive ? "text-white" : "text-inherit"
                                )}>
                                    {v.label}
                                </span>
                            </div>

                            {/* Hover Scanline */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-1px]" />
                        </button>
                    );
                })}
            </div>

            {/* User Tier Badge (Phase 12 Integration) */}
            {user?.tier && (
                <div className="ml-2">
                    <SovereignBadge tier={user.tier} />
                </div>
            )}

            {/* System Status Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sovereign-gold/5 border border-sovereign-gold/20 ml-2">
                <Shield className="w-5 h-5 text-sovereign-gold opacity-50" />
            </div>
        </div>
    );
};
