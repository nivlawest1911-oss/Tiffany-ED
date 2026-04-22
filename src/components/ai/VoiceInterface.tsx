'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Shield, Loader2, Activity, Volume2, X } from 'lucide-react';
import { useMultimodalAvatar } from '@/hooks/useMultimodalAvatar';
import { heyGenService } from '@/services/heygen-streaming';

interface VoiceInterfaceProps {
    avatarName: string;
    avatarRole: string;
    heygenId?: string;
    onClose?: () => void;
}

export default function VoiceInterface({
    avatarName,
    avatarRole,
    heygenId,
    onClose
}: VoiceInterfaceProps) {
    const [isUplinkActive, setIsUplinkActive] = useState(false);
    const [isEstablishing, setIsEstablishing] = useState(false);
    const streamVideoRef = useRef<HTMLVideoElement>(null);
    const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(32).fill(10));

    const {
        isConnected,
        isProcessing,
        isSpeaking,
        isListening,
        startListening,
        stopListening,
        connect,
        disconnect,
        speak
    } = useMultimodalAvatar({
        avatarName,
        avatarRole,
        engine: 'duix',
        onSpeak: (text, signal) => {
            if (isUplinkActive) {
                const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
                const apiKey = storedKeys?.heygen || '';
                heyGenService.speak(text, apiKey, signal);
                return true;
            }
            return false;
        }
    });

    // Simulate Visualizer
    useEffect(() => {
        if (!isUplinkActive && !isProcessing && !isSpeaking) return;

        const interval = setInterval(() => {
            setVisualizerBars(prev => prev.map(() => {
                const base = isSpeaking ? 60 : isProcessing ? 30 : isListening ? 40 : 10;
                return Math.max(10, Math.random() * base + 5);
            }));
        }, 100);
        return () => clearInterval(interval);
    }, [isUplinkActive, isProcessing, isSpeaking, isListening]);

    const handleInitiateUplink = async () => {
        setIsEstablishing(true);
        const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
        const apiKey = storedKeys?.heygen || '';

        try {
            if (apiKey) {
                const stream = await heyGenService.startSession(heygenId || 'josh_lite3_20230714', apiKey);
                setIsUplinkActive(true);
                if (streamVideoRef.current) {
                    streamVideoRef.current.srcObject = stream;
                }
            } else {
                console.warn('HeyGen Key missing, falling back to neural audio only.');
                setIsUplinkActive(true);
            }

            if (!isConnected) connect();

            // Welcome Greeting
            setTimeout(() => {
                speak(`Uplink established. This is Verse. I am monitoring all instructional and compliance vectors. What is your status?`);
            }, 2000);

        } catch (error) {
            console.error('Uplink failure:', error);
        } finally {
            setIsEstablishing(false);
        }
    };

    const handleTerminate = async () => {
        const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
        const apiKey = storedKeys?.heygen || '';
        if (apiKey) await heyGenService.stopSession(apiKey);
        setIsUplinkActive(false);
        disconnect();
        if (onClose) onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-3xl p-6"
        >
            <div className="relative w-full max-w-4xl aspect-video bg-[#050505] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)] flex flex-col">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

                {/* Header */}
                <div className="p-8 flex justify-between items-center z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-noble-gold/10 border border-noble-gold/30 flex items-center justify-center">
                            <Shield className="text-noble-gold" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Verse Live Uplink</h2>
                            <p className="text-[10px] font-bold text-noble-gold/60 uppercase tracking-[0.4em]">Sovereign Voice Protocol v7.2</p>
                        </div>
                    </div>
                    <button
                        onClick={handleTerminate}
                        className="p-3 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                        title="Close Voice Interface"
                        aria-label="Close Voice Interface"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Main Stage */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    {/* Radial Visualizer */}
                    <div className="relative w-80 h-80 flex items-center justify-center">
                        <AnimatePresence>
                            {(isSpeaking || isProcessing) && (
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-noble-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Video Element for HeyGen */}
                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-noble-gold/30 bg-zinc-900 relative z-10 shadow-3xl">
                            {isUplinkActive ? (
                                <video
                                    ref={streamVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                    <Activity className="text-white/10" size={48} />
                                    {isEstablishing && <Loader2 className="animate-spin text-noble-gold" size={24} />}
                                </div>
                            )}
                        </div>

                        <div className="absolute inset-0 pointer-events-none">
                            {visualizerBars.map((h, i) => (
                                <div
                                    key={i}
                                    className="visualizer-bar absolute bottom-1/2 left-1/2 w-1 bg-noble-gold/40 rounded-full origin-bottom"
                                    data-height={h}
                                    data-index={i}
                                />
                            ))}

                            <style jsx>{`
                                .visualizer-bar {
                                    height: calc(var(--bar-height) * 1px);
                                    transform: translateX(-50%) rotate(var(--bar-rotate)) translateY(calc(var(--bar-height) * -0.5px));
                                }
                            `}</style>
                        </div>
                    </div>

                    {/* Status Info */}
                    <div className="mt-12 text-center space-y-2">
                        <div 
                            aria-live="polite"
                            className="text-noble-gold font-black text-xs uppercase tracking-[0.5em] h-4"
                        >
                            {isProcessing ? "Neural Processing..." : isSpeaking ? "Voice Synthesis Active" : isListening ? "Listening Mode" : "Ready for Command"}
                        </div>
                        <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                            Connection: {isUplinkActive ? "Secure 4K // E2EE" : "Standby"}
                        </p>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-12 flex justify-center items-center gap-8 z-10">
                    {!isUplinkActive ? (
                        <button
                            onClick={handleInitiateUplink}
                            disabled={isEstablishing}
                            className="px-12 py-5 bg-noble-gold text-black rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-50"
                        >
                            {isEstablishing ? "Establishing..." : "Initiate Verse Uplink"}
                        </button>
                    ) : (
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => isListening ? stopListening() : startListening()}
                                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                                title={isListening ? "Stop Listening" : "Start Listening"}
                                aria-label={isListening ? "Stop Listening" : "Start Listening"}
                            >
                                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                            </button>
                            <div className="h-10 w-px bg-white/10" />
                            <button
                                onClick={() => speak("I am Verse. I am currently monitoring the district compliance feed. Standby for briefing.")}
                                className="w-16 h-16 rounded-full bg-white/5 text-white/40 hover:bg-noble-gold hover:text-black transition-all flex items-center justify-center"
                                title="Play Sample Briefing"
                                aria-label="Play Sample Briefing"
                            >
                                <Volume2 size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Cyber Decorative Lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-noble-gold/20 to-transparent" />
            </div>
        </motion.div>
    );
}
