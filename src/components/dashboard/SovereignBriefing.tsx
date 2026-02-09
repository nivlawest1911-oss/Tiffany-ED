'use client';

import React, { useState } from 'react';
import SovereignNode from '../layout/SovereignNode';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Activity } from 'lucide-react';

interface SovereignBriefingProps {
    summary: string;
    loading?: boolean;
    videoSrc?: string;
}

export const SovereignBriefing = ({ summary, loading, videoSrc }: SovereignBriefingProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // Parse bullet points from summary (Expected format: "Key: Value")
    const points = summary.split('\n').filter(line => line.trim().length > 0).map(line => {
        const [label, ...valParts] = line.split(':');
        return {
            label: label?.trim() || 'PROTOCOL',
            value: valParts.join(':')?.trim() || line.trim()
        };
    });

    return (
        <SovereignNode
            title="DAILY TACTICAL SYNTHESIS // NODE-02"
            videoSrc={videoSrc || "/videos/dashboard/briefing-room.mp4"}
            fallbackImage="/images/hero_educator_team.png"
            actionText="EXECUTE ALL PROTOCOLS →"
            onAction={() => console.log('Executing protocols...')}
            delay={0.3}
        >
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-white/10 rounded w-3/4" />
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {points.map((point, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
                                    <div>
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-0.5">
                                            {point.label}
                                        </span>
                                        <span className="text-sm text-white font-medium leading-tight">
                                            {point.value}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive "Player" Thumbnail */}
                        <div className="hidden md:block relative group/player aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/player:opacity-100 transition-opacity">
                                <div className="p-3 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/40">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                                <Activity size={10} className="text-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Live Uplink</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tactical Overlays */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-10 right-0 flex gap-2 pointer-events-none"
                        >
                            <div className="px-2 py-1 bg-black/80 border border-blue-500/30 rounded text-[8px] text-blue-400 font-mono uppercase">
                                Crypto-Verified
                            </div>
                            <div className="px-2 py-1 bg-black/80 border border-emerald-500/30 rounded text-[8px] text-emerald-400 font-mono uppercase">
                                Priority 1
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SovereignNode>
    );
};
