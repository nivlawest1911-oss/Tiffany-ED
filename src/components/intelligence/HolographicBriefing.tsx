'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, Wifi, Zap, Lock, Command } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import AbilityAnimation from '@/components/shared/AbilityAnimation';
import AIAgentAvatar from '@/components/shared/AIAgentAvatar';

interface Agent {
    name: string;
    role: string;
    avatar: string;
    videoSrc?: string;
    musicSrc?: string;
    abilityType: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

const AGENTS: Record<string, Agent> = {
    visionary: {
        name: "Dr. Alvin West",
        role: "EdIntel Architect",
        avatar: "/images/avatars/Dr._alvin_west.png",
        videoSrc: "/videos/briefings/principal_briefing.mp4",
        musicSrc: "/music/The Future of Education - Orchestral.mp3",
        abilityType: 'strategy' as const
    },
    strategic: {
        name: "Keisha Reynolds",
        role: "Strategic Lead",
        avatar: "/images/avatars/keisha_reynolds_premium.png",
        videoSrc: "/videos/briefings/counselor_briefing.mp4",
        abilityType: 'strategy' as const
    },
    tactical: {
        name: "André Patterson",
        role: "Tactical Specialist",
        avatar: "/images/avatars/andre_patterson_premium.png",
        videoSrc: "/videos/Briefing - Andre Patterson (Behavior Specialist).mp4",
        musicSrc: "/music/Cyberpunk High Tension - Cinematic Track.mp3",
        abilityType: 'compliance' as const
    },
    philosopher: {
        name: "Dr. Isaiah Vance",
        role: "Ethics & Governance",
        avatar: "/images/avatars/dr_isaiah_vance_premium.png",
        videoSrc: "/videos/briefings/compliance_briefing.mp4",
        abilityType: 'compliance' as const
    }
};

interface HolographicBriefingProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    agentId?: keyof typeof AGENTS;
    briefingSteps?: string[];
    stats?: { time: string; saved: string; accuracy: string; };
    videoSrc?: string;
    musicSrc?: string;
    audioSrc?: string;
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
    agentId,
    briefingSteps,
    stats,
    videoSrc,
    musicSrc,
    audioSrc,
    thumbnail: _thumbnail,
    avatarImage,
    role,
    abilityType
}: HolographicBriefingProps) {
    const agent = agentId ? AGENTS[agentId] : null;
    const finalAvatar = avatarImage || agent?.avatar || "/images/avatars/Dr._alvin_west.png";
    const finalRole = role || agent?.role || "Executive Lead";
    const finalAbility = abilityType || agent?.abilityType || 'strategy';
    const finalVideo = videoSrc || agent?.videoSrc;
    const finalMusic = musicSrc || agent?.musicSrc;

    const { playClick: _playClick, playHover: _playHover,
        playSuccess,
        playMusic,
        stopMusic,
        playVoice,
        stopVoice
    } = useProfessionalSounds();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showLiveAvatar, setShowLiveAvatar] = useState(false);
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
        if (finalMusic) playMusic(finalMusic);

        if (audioSrc) {
            setIsSpeaking(true);
            playVoice(audioSrc, () => setIsSpeaking(false));
            return;
        }

        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);

        const text = `${title}. ${description}`;
        const buildUtterance = (voices: SpeechSynthesisVoice[]) => {
            const utterance = new SpeechSynthesisUtterance(text);
            const isAlvin = finalRole.toLowerCase().includes('executive') || finalRole.toLowerCase().includes('alvin') || title.toLowerCase().includes('finance');

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
    }, [title, description, finalRole, finalMusic, playMusic, audioSrc, playVoice]);

    const handleStopSpeaking = useCallback(() => {
        stopVoice();
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        stopMusic();
    }, [stopMusic, stopVoice]);

    useEffect(() => {
        if (isOpen) {
            playSuccess();
            startBriefing();
        } else {
            handleStopSpeaking();
        }
        return () => handleStopSpeaking();
    }, [isOpen, playSuccess, startBriefing, handleStopSpeaking]);

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
                            {finalVideo ? (
                                <video
                                    src={finalVideo}
                                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                                    autoPlay loop muted playsInline
                                />
                            ) : (
                                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center scale-75">
                                    <AbilityAnimation type={finalAbility} />
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
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">EdIntel Encryption</span>
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

                            {/* Visual Synthesis Overlay */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-20">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
                                <motion.div
                                    animate={{ y: ['0%', '100%'] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-px bg-noble-gold shadow-[0_0_10px_#D4AF37]"
                                />
                            </div>

                            {/* Scanning Line */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-noble-gold/5 to-transparent h-px w-full z-10"
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* LIVE AVATAR OVERLAY */}
                            <AnimatePresence>
                                {showLiveAvatar && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute inset-0 z-50 bg-black"
                                    >
                                        <AIAgentAvatar
                                            textToSpeak={description}
                                        />
                                        <button
                                            onClick={() => setShowLiveAvatar(false)}
                                            className="absolute top-6 right-6 z-[60] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
                                            title="Close Live Sync"
                                        >
                                            <X size={20} className="text-white" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: EdIntel Delegate */}
                        <div className="md:w-[35%] flex flex-col bg-zinc-950/80 backdrop-blur-3xl relative">
                            {/* Header */}
                            <div className="p-10 border-b border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-2">Protocol Analysis</p>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{title}</h3>
                                </div>
                                <button onClick={onClose} aria-label="Close" className="p-3 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Speaker Node */}
                            <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
                                <div className="relative group">
                                    <div className={`w-40 h-40 rounded-full p-1 bg-gradient-to-br from-noble-gold via-white/20 to-zinc-900 shadow-[0_0_50px_rgba(212,175,55,0.2)] ${isSpeaking ? 'animate-pulse' : ''}`}>
                                        <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                                            <motion.img
                                                src={finalAvatar}
                                                alt={finalRole}
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
                                    <h4 className="text-white font-black uppercase text-sm tracking-widest">{finalRole}</h4>
                                    <p className="text-noble-gold/50 text-[10px] font-black uppercase tracking-[0.3em] mt-1">EdIntel Asset Node</p>
                                </div>

                            </div>

                            {/* Transcript / Action Area */}
                            <div className="p-10 bg-black/40 border-t border-white/5 space-y-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                                        <span className="text-noble-gold mr-3">{">>>"}</span>
                                        {description}
                                    </p>

                                    {briefingSteps && briefingSteps.length > 0 && (
                                        <div className="space-y-3 mt-6">
                                            {briefingSteps.map((step, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="text-noble-gold text-[10px] mt-1 font-black">0{idx + 1}</span>
                                                    <span className="text-[11px] text-zinc-400 uppercase tracking-widest leading-relaxed">{step}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-6">
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
                                        className="flex-1 EdIntel-button bg-white text-black py-4 text-[10px]"
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
