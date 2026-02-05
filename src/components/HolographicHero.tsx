'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield } from 'lucide-react';
import HumanAvatar from './ui/HumanAvatar';

interface HolographicHeroProps {
    activeAgent: number;
    agents: any[];
    message: string;
}

export default function HolographicHero({ activeAgent, agents, message }: HolographicHeroProps) {
    const currentAgent = agents[activeAgent];

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-video flex items-center justify-center p-4 md:p-8">
            {/* Central Floating core */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotateY: [0, 5, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20"
            >
                <div className="w-64 h-64 md:w-80 md:h-80 bg-intel-gold/10 border border-intel-gold/40 rounded-[3rem] backdrop-blur-3xl flex flex-col items-center justify-center relative group overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)]">
                    <div className="absolute inset-0 bg-gold-gradient opacity-20" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAgent}
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            className="w-full h-full p-6 flex flex-col items-center justify-center text-center"
                        >
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-intel-gold/30 mb-4 bg-black/40">
                                <HumanAvatar
                                    src={currentAgent.avatar}
                                    alt={currentAgent.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-sm font-black text-white uppercase tracking-widest">{currentAgent.name}</div>
                            <div className="text-[10px] font-bold text-intel-gold/60 uppercase tracking-[0.3em] italic">{currentAgent.role}</div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Scanning lines */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="w-full h-1/2 bg-gradient-to-b from-transparent via-intel-gold/10 to-transparent skew-y-12"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Orbiting rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-75 md:scale-110">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-intel-gold/15 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] border border-intel-gold/5 rounded-full"
                />
            </div>

            {/* Message Bubble Overlay */}
            <motion.div
                key={message}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-4 md:bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 py-4 bg-noble-black/80 border border-intel-gold/30 rounded-2xl backdrop-blur-xl z-30 shadow-2xl"
            >
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-intel-gold animate-ping mt-1" />
                    <p className="text-[11px] font-bold italic text-white uppercase tracking-tight leading-snug">
                        {message}
                    </p>
                </div>
            </motion.div>

            {/* Performance Nodes */}
            <div className="absolute top-0 md:top-10 left-0 md:left-10 space-y-4 scale-75 md:scale-100 origin-top-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-md p-4 rounded-2xl"
                >
                    <div className="w-10 h-10 bg-intel-gold/10 rounded-xl flex items-center justify-center text-intel-gold">
                        <Zap size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">Core Frequency</div>
                        <div className="text-sm font-black text-white">4.8 GHz</div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute top-0 md:top-10 right-0 md:right-10 space-y-4 scale-75 md:scale-100 origin-top-right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-md p-4 rounded-2xl"
                >
                    <div className="w-10 h-10 bg-noble-gold/10 rounded-xl flex items-center justify-center text-noble-gold">
                        <Shield size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">Network Shield</div>
                        <div className="text-sm font-black text-emerald-400">ENCRYPTED</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
