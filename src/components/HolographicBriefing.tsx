'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, Wifi, Zap, Lock, Command } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import AbilityAnimation from './AbilityAnimation';

interface HolographicBriefingProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    stats?: { time: string; saved: string; accuracy: string; };
    videoSrc?: string;
    thumbnail?: string;
    avatarImage?: string;
    role?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

export default function HolographicBriefing({
    isOpen,
    onClose,
    title,
    description,
    stats,
    videoSrc,
    thumbnail: _thumbnail,
    avatarImage = "/images/avatars/dr_alvin_west_premium.png",
    role = "Executive Lead",
    abilityType
}: HolographicBriefingProps) {
    const { playClick: _playClick, playHover: _playHover, playSuccess } = useProfessionalSounds();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [progress, setProgress] = useState(0);
    const _humanBehavior = useHumanBehavior(isOpen);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isSpeaking) {
                videoRef.current.play().catch(e => console.warn("Briefing video play failed", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isSpeaking]);

    const startBriefing = useCallback(() => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);

        const text = `${title}. ${description}`;
        const buildUtterance = (voices: SpeechSynthesisVoice[]) => {
            const utterance = new SpeechSynthesisUtterance(text);
            const isAlvin = role.toLowerCase().includes('executive') || role.toLowerCase().includes('alvin') || title.toLowerCase().includes('finance');

            const preferredVoice = voices.find(v =>
                (isAlvin ? (v.name.includes('Daniel') || v.name.includes('UK English Male')) : v.name.includes('Male')) && v.lang.startsWith('en')
            );

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                buildUtterance(window.speechSynthesis.getVoices());
                window.speechSynthesis.onvoiceschanged = null;
            };
        } else {
            buildUtterance(voices);
        }
    }, [title, description, role]);

    useEffect(() => {
        if (isOpen) {
            playSuccess();
            startBriefing();
        } else {
            handleStopSpeaking();
        }
        return () => handleStopSpeaking();
    }, [isOpen, playSuccess, startBriefing]);

    const handleStopSpeaking = () => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    useEffect(() => {
        if (isSpeaking) {
            const interval = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 0.5 : 100));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isSpeaking]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        className="relative w-full max-w-7xl aspect-video bg-zinc-950 border border-noble-gold/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col md:flex-row"
                    >
                        {/* Interactive UI Layers */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

                        {/* LEFT: Neural Context Stream */}
                        <div className="md:w-[65%] h-64 md:h-full relative overflow-hidden border-r border-white/5 bg-black">
                            {videoSrc ? (
                                <video
                                    src={videoSrc}
                                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                                    autoPlay loop muted playsInline
                                />
                            ) : (
                                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center scale-75">
                                    <AbilityAnimation type={abilityType || 'strategy'} />
                                </div>
                            )}

                            {/* HUD Overlays */}
                            <div className="absolute top-10 left-10 z-20 flex flex-col gap-4">
                                <div className="flex items-center gap-3 px-4 py-2 liquid-glass border-noble-gold/30">
                                    <Wifi size={14} className="text-noble-gold animate-pulse" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Uplink: Stable</span>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-2 liquid-glass border-emerald-500/30">
                                    <Lock size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Sovereign Encryption</span>
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-20">
                                {stats && (
                                    <div className="flex gap-6">
                                        {[
                                            { label: 'Latency', value: stats.time, icon: Activity },
                                            { label: 'Throughput', value: stats.saved, icon: Zap },
                                            { label: 'Fidelity', value: stats.accuracy, icon: Shield }
                                        ].map((s, i) => (
                                            <div key={i} className="liquid-glass p-4 min-w-[120px] border-white/10">
                                                <div className="flex items-center gap-2 mb-2 opacity-40">
                                                    <s.icon size={12} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">{s.label}</span>
                                                </div>
                                                <div className="text-xl font-black text-white">{s.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Scanning Line */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-noble-gold/5 to-transparent h-px w-full z-10"
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>

                        {/* RIGHT: Sovereign Delegate */}
                        <div className="md:w-[35%] flex flex-col bg-zinc-950/80 backdrop-blur-3xl relative">
                            {/* Header */}
                            <div className="p-10 border-b border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-2">Protocol Analysis</p>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{title}</h3>
                                </div>
                                <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Speaker Node */}
                            <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
                                <div className="relative group">
                                    <div className={`w-40 h-40 rounded-full p-1 bg-gradient-to-br from-noble-gold via-white/20 to-zinc-900 shadow-[0_0_50px_rgba(212,175,55,0.2)] ${isSpeaking ? 'animate-pulse' : ''}`}>
                                        <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                                            <motion.img
                                                src={avatarImage}
                                                alt={role}
                                                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700"
                                                animate={isSpeaking ? { scale: [1, 1.05, 1], filter: 'brightness(1.2)' } : {}}
                                            />
                                            {isSpeaking && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-1.5">
                                                    {[...Array(6)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="w-1 bg-noble-gold rounded-full"
                                                            animate={{ height: [4, 32, 4] }}
                                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isSpeaking && <div className="absolute -inset-4 border border-noble-gold/30 rounded-full animate-ping opacity-20" />}
                                </div>

                                <div className="mt-8 text-center">
                                    <h4 className="text-white font-black uppercase text-sm tracking-widest">{role}</h4>
                                    <p className="text-noble-gold/50 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Sovereign Asset Node</p>
                                </div>
                            </div>

                            {/* Transcript / Action Area */}
                            <div className="p-10 bg-black/40 border-t border-white/5 space-y-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                                        <span className="text-noble-gold mr-3">{">>>"}</span>
                                        {description}
                                    </p>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-noble-gold shadow-[0_0_10px_#D4AF37]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startBriefing()}
                                        className="flex-1 sovereign-button bg-white text-black py-4 text-[10px]"
                                    >
                                        <Command size={14} className="mr-2" />
                                        Relay Audio
                                    </motion.button>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-4 liquid-glass border-white/10 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
