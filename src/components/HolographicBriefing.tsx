'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Maximize2, Sparkles, Activity } from 'lucide-react';
import useSovereignSounds from '@/hooks/useSovereignSounds';

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
    theme?: 'default' | 'sovereign'; // Added theme prop
}

// Generative Visualizer Component
function GenerativeDataStream({ theme }: { theme: 'default' | 'sovereign' }) {
    const primaryColor = theme === 'sovereign' ? '#d97706' : '#6366f1';
    const secondaryColor = theme === 'sovereign' ? '#7c3aed' : '#ec4899';

    // Create a matrix-like rain of data
    return (
        <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black" />

            {/* Abstract Data Columns */}
            <div className="flex gap-4 opacity-30 transform -skew-x-12 scale-110">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-8 flex flex-col gap-2"
                        animate={{ y: [0, -100] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2 + Math.random() * 3,
                            ease: "linear"
                        }}
                    >
                        {[...Array(10)].map((_, j) => (
                            <div
                                key={j}
                                className="h-12 w-full rounded pixelated text-[8px] font-mono leading-none overflow-hidden text-transparent"
                                style={{
                                    background: `linear-gradient(to bottom, ${Math.random() > 0.5 ? primaryColor : secondaryColor}00, ${Math.random() > 0.5 ? primaryColor : secondaryColor}40)`
                                }}
                            >
                                {Math.random().toString(36).substring(7)}
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Central Pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full border border-${theme === 'sovereign' ? 'amber' : 'indigo'}-500/20 animate-ping`} />
                <div className={`w-48 h-48 rounded-full border border-${theme === 'sovereign' ? 'amber' : 'indigo'}-500/10 animate-ping animation-delay-500`} />
            </div>

            <div className="absolute bottom-10 right-10 text-right font-mono text-xs z-10">
                <div className={theme === 'sovereign' ? 'text-amber-500' : 'text-indigo-500'}>SYSTEM STATUS: ONLINE</div>
                <div className="text-zinc-500">ENCRYPTION: MAX</div>
                <div className="text-zinc-600 animate-pulse">Waiting for Stream...</div>
            </div>
        </div>
    );
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
    role = "Sovereign Guide",
    theme = 'default'
}: HolographicBriefingProps) {
    const { playClick, playHover, playSuccess } = useSovereignSounds();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [progress, setProgress] = useState(0);

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
            const text = `Initiating protocol analysis for ${title}. ${description}`;
            const utterance = new SpeechSynthesisUtterance(text);

            // Attempt to find a "Sovereign" voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                (v.name.includes('Google US English') || v.name.includes('Samantha')) && v.lang.startsWith('en')
            );
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
    const accentColor = theme === 'sovereign' ? 'text-amber-400' : 'text-indigo-400';
    const borderColor = theme === 'sovereign' ? 'border-amber-500/30' : 'border-indigo-500/20';
    const gradientBg = theme === 'sovereign' ? 'from-purple-900 to-amber-900' : 'from-indigo-500 to-purple-600';

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
                        className={`relative w-full max-w-5xl aspect-video bg-zinc-950 border ${theme === 'sovereign' ? 'border-amber-500/20' : 'border-white/10'} rounded-3xl overflow-hidden shadow-2xl ${theme === 'sovereign' ? 'shadow-amber-500/20' : 'shadow-indigo-500/20'} flex flex-col md:flex-row`}
                    >
                        {/* LEFT COLUMN: Visual/Video Context */}
                        <div className="md:w-2/3 h-64 md:h-full relative bg-black border-r border-white/10 overflow-hidden">
                            {/* Theme Pattern Overlay (Kente-ish) */}
                            {theme === 'sovereign' && (
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
                                <GenerativeDataStream theme={theme} />
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
                            {theme === 'sovereign' && (
                                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                                    backgroundImage: `radial-gradient(circle at center, #d97706 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }} />
                            )}

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-start">
                                <div>
                                    <h3 className={`text-xs font-bold ${accentColor} uppercase tracking-widest mb-1`}>
                                        Active Protocol
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
                                <div className={`relative w-32 h-32 rounded-full p-1 bg-gradient-to-br ${gradientBg} mb-6 shadow-2xl ${theme === 'sovereign' ? 'shadow-amber-500/30' : 'shadow-indigo-500/30'}`}>
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black z-10 relative">
                                        <img
                                            src={avatarImage}
                                            alt={role}
                                            className={`w-full h-full object-cover transition-transform duration-700 ${isSpeaking ? 'scale-110' : 'scale-100'}`}
                                        />
                                        {/* Holographic Scanline Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${theme === 'sovereign' ? 'via-amber-500/20' : 'via-indigo-500/20'} to-transparent w-full h-full animate-[scan_2s_linear_infinite] pointer-events-none`} />
                                    </div>
                                    {/* Speaking Ripple */}
                                    {isSpeaking && (
                                        <>
                                            <div className={`absolute inset-0 rounded-full border ${theme === 'sovereign' ? 'border-amber-500' : 'border-indigo-500'} animate-[ping_1.5s_ease-in-out_infinite] opacity-50`} />
                                            <div className={`absolute inset-0 rounded-full border ${theme === 'sovereign' ? 'border-purple-500' : 'border-purple-500'} animate-[ping_1.5s_ease-in-out_infinite_0.5s] opacity-30`} />
                                            {/* Rotating Neural Ring */}
                                            <div className={`absolute -inset-4 rounded-full border ${theme === 'sovereign' ? 'border-amber-500/30' : 'border-indigo-500/30'} border-t-white/50 animate-[spin_3s_linear_infinite]`} />
                                            <div className="absolute -inset-8 rounded-full border border-purple-500/20 border-b-white/50 animate-[spin_4s_linear_infinite_reverse]" />
                                        </>
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
                                        className={`h-full ${theme === 'sovereign' ? 'bg-amber-500' : 'bg-indigo-500'}`}
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
