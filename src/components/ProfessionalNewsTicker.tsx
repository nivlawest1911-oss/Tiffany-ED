'use client';

import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

const AL_NEWS = [
    "ALSDE announces new AI-Powered Literacy grant opportunities for rural districts.",
    "Mobile County Public Schools expands AI-twin pilot program to 12 new campuses.",
    "Alabama Literacy Act: New Tier 3 reporting systems now integrated into EdIntel.",
    "Professional Budget Optimizer recovers $2.4M in misallocated Title I funds in Baldwin County.",
    "National Education Association (NEA) highlights EdIntel's 'Zero-Burnout' initiative.",
];

export function ProfessionalNewsTicker() {
    return (
        <div className="w-full bg-zinc-900/30 border-y border-white/5 py-3 overflow-hidden backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
                <div className="flex items-center gap-2 shrink-0">
                    <div className="relative">
                        <Radio size={14} className="text-emerald-500 animate-pulse" />
                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Live Updates</span>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    <motion.div
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex gap-24 whitespace-nowrap"
                    >
                        {AL_NEWS.map((news, i) => (
                            <span key={i} className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-4">
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                {news}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
