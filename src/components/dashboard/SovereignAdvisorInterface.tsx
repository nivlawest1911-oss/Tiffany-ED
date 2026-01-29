'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Video, X } from 'lucide-react';
import { useTavus } from '@/context/TavusContext';

export default function SovereignAdvisorInterface() {
    const { isSessionActive, isConnecting, conversationUrl, startAdvisorySession, endAdvisorySession } = useTavus();

    if (!isSessionActive && !isConnecting) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 bg-indigo-950/20 border border-indigo-500/20 rounded-[2rem] text-center backdrop-blur-sm"
            >
                <div className="w-24 h-24 rounded-full bg-indigo-500/10 border-2 border-cyan-400 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/20">
                    <Video className="w-10 h-10 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">Sovereign Advisor <span className="text-cyan-400">Uplink</span></h2>
                <p className="text-indigo-200/60 mb-8 max-w-xs text-xs font-bold uppercase tracking-widest">Initiate secure logic stream with Dr. West for real-time strategic counsel.</p>

                <button
                    onClick={startAdvisorySession}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/30"
                >
                    Initialize Uplink
                </button>
            </motion.div>
        );
    }

    return (
        <div className="h-full min-h-[500px] relative rounded-[2rem] overflow-hidden bg-black border border-indigo-500/20 shadow-2xl">
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse box-shadow-[0_0_10px_red]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                        Live Secure Uplink
                    </span>
                </div>
                <button
                    onClick={endAdvisorySession}
                    className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all backdrop-blur-md"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Loading State with INTELLIGENT AUDIO VISUALIZER */}
            {isConnecting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white z-10 bg-[#020617]">
                    {/* Simulated Waveform Analysis */}
                    <div className="flex gap-1 items-end h-16">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, 40, 15, 50, 20] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                className="w-2 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                            />
                        ))}
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold tracking-tight text-[#D4AF37]">SECURING NEURAL UPLINK</h3>
                        <p className="text-xs text-slate-400 font-mono tracking-widest">
                            CALIBRATING VOICE BIOMETRICS...
                        </p>
                    </div>
                </div>
            )}

            {/* Video Stream */}
            {conversationUrl && (
                <iframe
                    src={conversationUrl}
                    allow="camera; microphone; autoplay; fullscreen; display-capture"
                    className="w-full h-full border-none object-cover"
                />
            )}
        </div>
    );
}
