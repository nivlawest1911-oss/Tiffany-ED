'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mic, Video, X } from 'lucide-react';
import { useTavus } from '@/context/TavusContext';

export default function SovereignAdvisorInterface() {
    const { isSessionActive, isConnecting, conversationUrl, startAdvisorySession, endAdvisorySession } = useTavus();

    if (!isSessionActive && !isConnecting) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-700 rounded-[2rem] text-center"
            >
                <div className="w-24 h-24 rounded-full bg-[#0F172A] border-2 border-[#D4AF37] flex items-center justify-center mb-6 shadow-xl shadow-[#D4AF37]/20">
                    <Video className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Sovereign Advisor Protocol</h2>
                <p className="text-slate-400 mb-8 max-w-xs text-sm">Initiate a secure logic stream with Dr. West for real-time strategic counsel.</p>

                <button
                    onClick={startAdvisorySession}
                    className="px-8 py-4 rounded-full bg-[#D4AF37] text-[#0F172A] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-[#D4AF37]/40"
                >
                    Initialize Uplink
                </button>
            </motion.div>
        );
    }

    return (
        <div className="h-full min-h-[500px] relative rounded-[2rem] overflow-hidden bg-black border border-slate-700 shadow-2xl">
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        LIVE SECURE UPLINK
                    </span>
                </div>
                <button
                    onClick={endAdvisorySession}
                    className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Loading State with INTELLIGENT AUDIO VISUALIZER */}
            {isConnecting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white z-10 bg-[#0F172A]">
                    {/* Simulated Waveform Analysis */}
                    <div className="flex gap-1 items-end h-16">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, 40, 15, 50, 20] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                className="w-2 bg-[#D4AF37] rounded-full"
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
