'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface ConversationProps {
    conversationUrl?: string;
    onLeave?: () => void;
    style?: React.CSSProperties;
}

export const Conversation = ({ conversationUrl: _conversationUrl, onLeave, style }: ConversationProps) => {
    const [status, setStatus] = useState<'initializing' | 'connected' | 'disconnected'>('initializing');
    const [isMicEnabled, setIsMicEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('connected');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5),_inset_0_0_100px_rgba(0,0,0,0.8)]"
            style={style}
        >
            <AnimatePresence>
                {status === 'initializing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="w-16 h-16 border-t-2 border-amber-500 rounded-full animate-spin mb-6" />
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Initializing Phoenix-3</h3>
                        <p className="text-xs text-zinc-500 font-mono">Securing Neural Handshake with EdIntel Node...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Live Feed Mockup */}
            <div className="absolute inset-0 z-10">
                {/* 
                    This is where the Tavus iframe or WebRTC stream would go.
                    For the presentation, we use a high-fidelity video loop that simulates the live response.
                */}
                <video
                    src="/videos/dr-alvin-west-premium-loop.mp4"
                    autoPlay
                    loop
                    muted={!isMicEnabled}
                    playsInline
                    className="w-full h-full object-cover scale-110"
                />

                {/* Holographic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Live: EdIntel Handshake</span>
                </div>
            </div>

            {/* Controls HUD */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-6 py-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
                <button
                    onClick={() => setIsMicEnabled(!isMicEnabled)}
                    className={`p-4 rounded-2xl transition-all ${isMicEnabled ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
                >
                    {isMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </button>

                <button
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className={`p-4 rounded-2xl transition-all ${isVideoEnabled ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
                >
                    {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                </button>

                <div className="w-px h-8 bg-white/10 mx-2" />

                <button
                    onClick={onLeave}
                    className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:scale-105 transition-all shadow-xl shadow-red-900/20 flex items-center gap-2"
                >
                    <PhoneOff size={16} />
                    Terminate
                </button>
            </div>

            {/* Micro-expressions/Telemetry */}
            <div className="absolute bottom-8 right-8 z-30 flex flex-col items-end gap-2">
                <div className="flex gap-0.5 h-12 items-end opacity-40">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 bg-amber-500 rounded-full"
                            animate={{ height: [8, 32, 12, 40, 8] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                </div>
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Neural Latency: 12ms</span>
            </div>
        </div>
    );
};
