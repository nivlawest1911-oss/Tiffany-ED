'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radio, Activity, Brain } from 'lucide-react';
import dynamic from 'next/dynamic';

const Conversation = dynamic(() => import('./cvi/components/conversation').then(mod => mod.Conversation), { ssr: false });

interface EdIntelDirectorProps {
    cinematicVideoSrc?: string;
    tavusConversationUrl?: string;
    avatarName?: string;
    avatarRole?: string;
}

export default function EdIntelDirector({
    cinematicVideoSrc = "/videos/heritage/alvin_west_doctoral_intro.mp4",
    avatarName = "Dr. Alvin West",
    avatarRole = "Chief Executive Officer"
}: EdIntelDirectorProps) {
    const [mode, setMode] = useState<'cinematic' | 'live'>('cinematic');
    const [isShimmering, setIsShimmering] = useState(false);

    const handleTransition = () => {
        setIsShimmering(true);
        setTimeout(() => {
            setMode(mode === 'cinematic' ? 'live' : 'cinematic');
            setIsShimmering(false);
        }, 1500);
    };

    return (
        <div className="relative w-full h-[90vh] bg-black rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            {/* Neural Background Mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 pointer-events-none" />

            {/* Shimmer Effect Layer */}
            <AnimatePresence>
                {isShimmering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[60] bg-white/20 backdrop-blur-3xl mix-blend-overlay"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Stage */}
            <div className="relative w-full h-full flex flex-col md:flex-row">
                <div className="flex-1 relative bg-black overflow-hidden">
                    <AnimatePresence mode="wait">
                        {mode === 'cinematic' ? (
                            <motion.div
                                key="cinematic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full"
                            >
                                <video
                                    src={cinematicVideoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                                {/* Heritage Label */}
                                <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                        <span className="text-xs font-black text-white uppercase tracking-widest">
                                            {avatarName} - Neural Introduction
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="live"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full"
                            >
                                <Conversation
                                    onLeave={() => setMode('cinematic')}
                                    style={{ border: 'none' }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Director Controls Sidebar */}
                <div className="w-full md:w-80 bg-zinc-900/50 backdrop-blur-3xl border-l border-white/10 p-8 flex flex-col">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase">EdIntel Director</h2>
                        <p className="text-[10px] text-amber-500 font-mono tracking-widest uppercase">Board Activation Mode</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Uplink Status</span>
                            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                                <span className="text-xs text-white font-medium">Phoenix-3</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-emerald-500 font-bold uppercase">Ready</span>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Neural Directives</span>
                            <button
                                onClick={handleTransition}
                                className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex flex-col items-center gap-3 ${mode === 'cinematic'
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-900/30 ring-1 ring-amber-400/50'
                                    : 'bg-zinc-800 text-zinc-400 border border-white/5'}`}
                            >
                                <Radio size={24} className={mode === 'cinematic' ? 'animate-pulse' : ''} />
                                Activate Live Q&A
                            </button>

                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <Brain size={16} />
                                Ground in Local History
                            </button>

                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <Shield size={16} />
                                Board Compliance Shield
                            </button>
                        </div>
                    </div>

                    {/* Biometric Telemetry */}
                    <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[8px] text-zinc-500 font-bold uppercase">Neural Load</span>
                                <span className="text-xs text-white font-mono">14.2%</span>
                            </div>
                            <Activity size={16} className="text-amber-500 opacity-50" />
                        </div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-amber-500"
                                animate={{ width: ['10%', '15%', '12%'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
