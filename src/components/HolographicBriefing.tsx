'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Maximize2, Sparkles, Activity, Shield } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';

interface HolographicBriefingProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    stats?: { time: string; saved: string; accuracy: string; };
    videoSrc?: string; // Fallback or background
    thumbnail?: string;
    avatarImage?: string; // For the delegate
    role?: string;
    theme?: 'default' | 'professional';
}



export default function HolographicBriefing({
    isOpen,
    onClose,
    title,
    description,
    stats,
    videoSrc,
    thumbnail,
    avatarImage = "/images/avatars/executive_leader.png", // Default avatar
    role = "Executive Lead",
    theme = 'default'
}: HolographicBriefingProps) {
    const { playClick, playHover, playSuccess } = useProfessionalSounds();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [progress, setProgress] = useState(0);
    const humanBehavior = useHumanBehavior(isOpen);

    // Effect to handle opening/speaking
    useEffect(() => {
        if (isOpen) {
            playSuccess(); // Initial activation sound
            startBriefing();
        } else {
            handleStopSpeaking();
        }
        return () => handleStopSpeaking();
    }, [isOpen]);

    const startBriefing = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            // Text to speak: Title, then description
            const text = `Starting briefing for ${title}. ${description}`;
            const utterance = new SpeechSynthesisUtterance(text);

            // Attempt to find a "Professional" voice
            const voices = window.speechSynthesis.getVoices();

            // Heuristic for gender based on role/title if not explicit
            // Defaulting to "Professional Guide" (Male usually for Dr. West) or check props
            // Targeted Voice Selection for "Dr. Alvin West"
            const isAlvin = role.toLowerCase().includes('executive') || role.toLowerCase().includes('alvin') || title.toLowerCase().includes('finance');

            let preferredVoice;
            if (isAlvin) {
                // Prioritize deep authoritative voices
                preferredVoice = voices.find(v =>
                    v.name.includes('Daniel') || // UK Male (Often Premium)
                    v.name.includes('Google UK English Male') ||
                    v.name.includes('Rocko') ||
                    v.name.includes('Google US English')
                );
            } else {
                const isMale = role.toLowerCase().includes('principal') || role.toLowerCase().includes('executive');
                if (isMale) {
                    preferredVoice = voices.find(v =>
                        (v.name.includes('Male') || v.name.includes('Guy') || v.name.includes('David'))
                        && v.lang.startsWith('en')
                    );
                } else {
                    preferredVoice = voices.find(v =>
                        (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English'))
                        && v.lang.startsWith('en')
                    );
                }
            }
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.rate = 1.05; // Slightly faster for efficiency
            utterance.pitch = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const handleStopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
    };

    function VoiceVisualizer({ index }: { index: number }) {
        return (
            <motion.div
                className={`w-1 rounded-full ${theme === 'professional' ? 'bg-amber-400/30' : 'bg-indigo-400/30'} blur-[1px]`}
                animate={{
                    height: [2, Math.random() * 24 + 4, 2],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.1 + (Math.random() * 0.15),
                    delay: index * 0.02,
                    ease: "easeInOut"
                }}
            />
        );
    }

    // Simulated progress bar while speaking
    useEffect(() => {
        if (isSpeaking) {
            const interval = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 0.5 : 100)); // Simulate analysis progress
            }, 50);
            return () => clearInterval(interval);
        } else {
            setProgress(100);
        }
    }, [isSpeaking]);

    // Theme-based colors
    const accentColor = theme === 'professional' ? 'text-amber-400' : 'text-indigo-400';
    const borderColor = theme === 'professional' ? 'border-amber-500/30' : 'border-indigo-500/20';
    const gradientBg = theme === 'professional' ? 'from-purple-900 to-amber-900' : 'from-indigo-500 to-purple-600';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Holographic Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className={`relative w-full max-w-5xl aspect-video bg-zinc-950 border ${theme === 'professional' ? 'border-amber-500/20' : 'border-white/10'} rounded-3xl overflow-hidden shadow-2xl ${theme === 'professional' ? 'shadow-amber-500/20' : 'shadow-indigo-500/20'} flex flex-col md:flex-row`}
                    >
                        {/* LEFT COLUMN: Visual/Video Context */}
                        <div className="md:w-2/3 h-64 md:h-full relative bg-black border-r border-white/10 overflow-hidden">
                            {/* Theme Pattern Overlay (Kente-ish) */}
                            {theme === 'professional' && (
                                <div className="absolute inset-0 opacity-10 pointer-events-none z-10" style={{
                                    backgroundImage: `repeating-linear-gradient(45deg, #d97706 0px, #d97706 2px, transparent 2px, transparent 10px), repeating-linear-gradient(-45deg, #7c3aed 0px, #7c3aed 2px, transparent 2px, transparent 10px)`
                                }} />
                            )}

                            {/* Background Video/Image OR Generative Stream */}
                            {videoSrc ? (
                                <video
                                    src={videoSrc}
                                    className="w-full h-full object-cover opacity-60"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : thumbnail ? (
                                <img src={thumbnail} className="w-full h-full object-cover opacity-50" alt="Context" />
                            ) : (
                                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-12 h-12 border-t border-white/10 rounded-full animate-spin mx-auto mb-4" />
                                        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">Loading Briefing...</p>
                                    </div>
                                </div>
                            )}

                            {/* Overlay Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0)_2px,transparent_2px),linear-gradient(90deg,rgba(17,24,39,0)_2px,transparent_2px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

                            {/* Stats Overlay */}
                            {stats && (
                                <div className="absolute bottom-6 left-6 grid grid-cols-3 gap-4 z-20">
                                    <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg">
                                        <div className="text-xs text-zinc-400 uppercase">Save Time</div>
                                        <div className="text-xl font-bold text-white">{stats.time}</div>
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg">
                                        <div className="text-xs text-zinc-400 uppercase">Efficiency</div>
                                        <div className="text-xl font-bold text-emerald-400">{stats.saved}</div>
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg">
                                        <div className="text-xs text-zinc-400 uppercase">Accuracy</div>
                                        <div className={`text-xl font-bold ${accentColor}`}>{stats.accuracy}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: The Briefing Delegate */}
                        <div className="md:w-1/3 flex flex-col bg-zinc-900/50 backdrop-blur-xl relative overflow-hidden">
                            {/* Theme Pattern for Right Column */}
                            {theme === 'professional' && (
                                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                                    backgroundImage: `radial-gradient(circle at center, #d97706 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }} />
                            )}

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-start">
                                <div>
                                    <h3 className={`text-xs font-bold ${accentColor} uppercase tracking-widest mb-1`}>
                                        Active Briefing
                                    </h3>
                                    <h2 className="text-2xl font-black text-white leading-tight">
                                        {title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    onMouseEnter={playHover}
                                    onClickCapture={playClick}
                                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Delegate Avatar Area */}
                            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                                <div className={`relative w-32 h-32 rounded-full p-1 bg-gradient-to-br ${gradientBg} mb-6 shadow-2xl ${theme === 'professional' ? 'shadow-amber-500/30' : 'shadow-indigo-500/30'}`}>
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black z-10 relative">
                                        {videoSrc ? (
                                            <motion.div
                                                className="w-full h-full"
                                                animate={isSpeaking ? {
                                                    x: [0, -4, 4, -2, 0],
                                                    y: [0, -1, 1, -0.5, 0],
                                                    rotate: [0, -1, 1, -0.5, 0],
                                                    scale: [1, 1.04, 1.02, 1.04, 1],
                                                    ...humanBehavior.behaviorStyles
                                                } : {
                                                    ...humanBehavior.behaviorStyles
                                                }}
                                                transition={isSpeaking ? {
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                } : {
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <video
                                                    src={videoSrc}
                                                    autoPlay loop muted playsInline
                                                    className="w-full h-full object-cover transform scale-125" // Scale up slightly to focus on face
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.img
                                                src={avatarImage}
                                                onError={(e) => e.currentTarget.src = '/images/avatars/executive_leader.png'}
                                                alt={role}
                                                className="w-full h-full object-cover"
                                                animate={isSpeaking ? {
                                                    x: [0, -4, 4, -2, 0],
                                                    y: [0, -1, 1, -0.5, 0],
                                                    rotate: [0, -1, 1, -0.5, 0],
                                                    scale: [1, 1.04, 1.02, 1.04, 1],
                                                    ...humanBehavior.behaviorStyles
                                                } : {
                                                    ...humanBehavior.behaviorStyles
                                                }}
                                                transition={isSpeaking ? {
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                } : {
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        )}

                                        {/* Holographic Scanline for Avatar */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent h-1 w-full z-20"
                                            animate={{ top: ["-10%", "110%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        />

                                        {/* Identity Check Glitch overlay */}
                                        <AnimatePresence>
                                            {isSpeaking && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: [0, 0.2, 0] }}
                                                    transition={{ duration: 0.15, repeat: Infinity }}
                                                    className="absolute inset-0 bg-amber-500/10 mix-blend-overlay z-20 pointer-events-none"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {isSpeaking && (
                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-1">
                                                {[...Array(8)].map((_, i) => (
                                                    <VoiceVisualizer key={i} index={i} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {/* Speaking Ripple (Subdued) */}
                                    {isSpeaking && (
                                        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
                                    )}
                                </div>

                                <div className="text-center w-full">
                                    <div className="text-sm font-medium text-zinc-500 mb-1">{role}</div>
                                    <div className="h-16 flex items-center justify-center">
                                        {isSpeaking ? (
                                            <div className="flex gap-1 h-8 items-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={`w-1 bg-gradient-to-t ${gradientBg} rounded-full`}
                                                        animate={{ height: [10, 32, 10] }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 0.5 + Math.random() * 0.5,
                                                            delay: i * 0.1
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-xs text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                Awaiting Input
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Live Transcript / Description */}
                            <div className="p-6 bg-black/20 border-t border-white/5 h-48 overflow-y-auto">
                                <p className="text-sm text-zinc-300 leading-relaxed font-mono">
                                    <span className={`${accentColor} mr-2`}>{">>>"}</span>
                                    {description}
                                </p>
                                {/* Progress Line */}
                                <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${theme === 'professional' ? 'bg-amber-500' : 'bg-indigo-500'}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
