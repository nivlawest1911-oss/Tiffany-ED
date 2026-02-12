'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, Activity, Shield } from 'lucide-react';
import { useEdIntelVibe, VIBES, Vibe } from '@/context/EdIntelVibeContext';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { cn } from '@/lib/utils';

export const TacticalHeaderBar = () => {
    const router = useRouter();
    const { currentVibe, setVibe } = useEdIntelVibe();
    const { playHover, playClick } = useProfessionalSounds();
    const [latency, setLatency] = useState('1.4ms');

    // Simulate slight latency fluctuations for "lived-in" feel
    useEffect(() => {
        const interval = setInterval(() => {
            const base = 1.4;
            const variance = (Math.random() * 0.2) - 0.1;
            setLatency(`${(base + variance).toFixed(1)}ms`);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleVibeChange = (vibe: Vibe) => {
        if (vibe.id === currentVibe.id) return;
        playClick();
        setVibe(vibe);
        router.push(vibe.route);
    };

    return (
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-2xl">
            {/* System Metrics */}
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-white/5 rounded-xl border border-white/5 mr-2">
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none">District</span>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-tighter">Optimal</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-white/10" />

                <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-cyan-500" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none">Latency</span>
                        <span className="text-[10px] font-mono text-cyan-500 font-black tracking-tighter">{latency}</span>
                    </div>
                </div>
            </div>

            {/* Tactical Switcher */}
            <div className="flex items-center gap-1.5">
                {VIBES.map((v) => {
                    const isActive = currentVibe.id === v.id;
                    return (
                        <button
                            key={v.id}
                            onMouseEnter={playHover}
                            onClick={() => handleVibeChange(v)}
                            className={cn(
                                "group relative px-4 py-2 rounded-xl transition-all duration-500 overflow-hidden border",
                                isActive
                                    ? "bg-noble-gold/10 border-noble-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                                    : "bg-transparent border-transparent text-white/40 hover:text-white/80 hover:bg-white/5"
                            )}
                        >
                            {/* Active Glow Effect */}
                            {isActive && (
                                <motion.div
                                    layoutId="vibe-active-bg"
                                    className="absolute inset-0 bg-gradient-to-r from-noble-gold/20 to-transparent"
                                />
                            )}

                            <div className="relative z-10 flex items-center gap-2">
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                                    isActive ? "bg-noble-gold shadow-[0_0_10px_#D4AF37] scale-125" : "bg-white/10 group-hover:bg-white/30"
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

            {/* System Status Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-noble-gold/5 border border-noble-gold/20 ml-2">
                <Shield className="w-5 h-5 text-noble-gold opacity-50" />
            </div>
        </div>
    );
};
