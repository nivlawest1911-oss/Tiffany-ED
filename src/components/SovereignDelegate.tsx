'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Video, Maximize2, Minimize2, MoreVertical, Volume2 } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface SovereignDelegateProps {
    role: string;
    name: string;
    avatarImage: string;
    videoSrc?: string;
    voiceSrc?: string;
    color: string;
    greetingText?: string;
    completionText?: string; // Added missing prop
    theme?: 'default' | 'sovereign'; // Added theme prop
    isLoading?: boolean; // Added isLoading prop
}

export default function SovereignDelegate({
    role,
    name,
    avatarImage,
    videoSrc,
    voiceSrc,
    color,
    completionText,
    greetingText,
    theme = 'default',
    isLoading = false
}: SovereignDelegateProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const [hasGuided, setHasGuided] = useState(false);
    const hasAnnouncedRef = useRef(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Sync Video Playback with Speaking State
    useEffect(() => {
        if (videoRef.current) {
            if (isSpeaking) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isSpeaking]);

    // Auto-open if loading starts (user submitted prompt)
    useEffect(() => {
        if (isLoading) {
            setIsOpen(true);
            setIsMinimized(false);
        }
    }, [isLoading]);

    // Guide Mode: Auto-trigger greeting on load
    useEffect(() => {
        if (theme === 'sovereign' && !hasGuided && name === "Sovereign Agent" && !isLoading && !completionText) { // Only for main guide to avoid spam
            const timer = setTimeout(() => {
                setIsOpen(true);
                speakText(greetingText || "Greetings, Sovereign Commander. I am your Federated Delegate. My neural pathways are optimized and ready to generate prophetic protocols for your vision.");
                setHasGuided(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [theme, hasGuided, name, greetingText, isLoading, completionText]);

    // Speak completion text when it arrives (only once)
    useEffect(() => {
        if (!completionText || completionText.length < 5) {
            hasAnnouncedRef.current = false;
        } else if (completionText.length > 20 && !hasAnnouncedRef.current) {
            setIsOpen(true);
            setIsMinimized(false);
            speakText("Commander, I have synthesized the requested intelligence. The protocol is now vaulted for your review.");
            hasAnnouncedRef.current = true;
        }
    }, [completionText]);

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            // Try to find a professional voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                (v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Microsoft Zira'))
                && v.lang.startsWith('en')
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    // Clean up speech on unmount
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleVoicePreview = () => {
        if (!voiceSrc) return;
        const audio = new Audio(voiceSrc);
        audio.play();
        setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
    };

    const handleReadBriefing = () => {
        if (completionText) {
            // Read the first chunk of the output or a summary
            // Clean markdown for speech
            const cleanText = completionText.replace(/[*#_`]/g, '').substring(0, 400);
            speakText("Here is a summary of the generated output. " + cleanText + "...");
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">

            {/* The Expanded Interface (Pointer events auto-enabled by content) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`pointer-events-auto mb-6 w-80 md:w-96 bg-zinc-900/95 backdrop-blur-2xl border ${theme === 'sovereign' ? 'border-amber-500/30' : 'border-white/10'} rounded-3xl overflow-hidden shadow-2xl ${theme === 'sovereign' ? 'shadow-amber-500/20' : 'shadow-indigo-500/20'} ring-1 ring-white/20`}
                    >
                        {/* Kente Pattern Overlay for Sovereign Theme */}
                        {theme === 'sovereign' && (
                            <div className="absolute inset-0 opacity-10 pointer-events-none z-0 mix-blend-overlay" style={{
                                backgroundImage: `repeating-linear-gradient(45deg, #d97706 0px, #d97706 2px, transparent 2px, transparent 10px)`
                            }} />
                        )}
                        {/* Header */}
                        <div className={`p-4 ${theme === 'sovereign' ? 'bg-gradient-to-r from-amber-900 to-purple-900' : `bg-gradient-to-r ${color}`} relative flex items-center justify-between z-10`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'} box-shadow-glow`} />
                                <div>
                                    <h3 className="text-sm font-black uppercase text-white tracking-wider">{role}</h3>
                                    <p className="text-xs text-white/80 font-mono">{name}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded-full text-white transition-colors">
                                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                                </button>
                                <button onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="p-1 hover:bg-white/20 rounded-full text-white transition-colors">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Content Body */}
                        {!isMinimized && (
                            <div className="relative aspect-video bg-black flex flex-col">
                                {videoSrc ? (
                                    <div className="relative w-full h-full group">
                                        <video
                                            ref={videoRef}
                                            src={videoSrc}
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        />

                                        {/* Status Overlay */}
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            {isSpeaking ? (
                                                <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 animate-pulse">
                                                    Speaking
                                                </div>
                                            ) : (
                                                <div className="px-2 py-0.5 rounded bg-zinc-500/20 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-white/5">
                                                    Listening
                                                </div>
                                            )}
                                        </div>

                                        {/* Talking Overlay Effect just in case video is subtle */}
                                        {isSpeaking && !voiceSrc && (
                                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 gap-0.5 opacity-50">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-1 bg-indigo-400 animate-bounce rounded-full"
                                                        style={{
                                                            height: Math.random() * 15 + 5 + 'px',
                                                            animationDuration: 0.3 + Math.random() * 0.3 + 's'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 px-4 text-center">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4 p-1">
                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                <img
                                                    src={avatarImage}
                                                    alt={name}
                                                    className={`w-full h-full object-cover transition-transform duration-200 ${isSpeaking ? 'scale-110' : 'scale-100'} ${isLoading ? 'opacity-50 blur-sm grayscale' : ''}`}
                                                />

                                                {/* Thinking / Loading State */}
                                                {isLoading && (
                                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                                        <div className="relative w-16 h-16">
                                                            {/* Neural Spinner Rings */}
                                                            <div className="absolute inset-0 border-4 border-t-amber-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin" />
                                                            <div className="absolute inset-2 border-2 border-t-transparent border-r-white border-b-transparent border-l-white rounded-full animate-spin-reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

                                                            {/* Center Pulse */}
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                                            </div>
                                                        </div>
                                                        <div className="absolute -bottom-8 w-full text-center">
                                                            <span className="text-[10px] font-black tracking-widest text-amber-500 animate-pulse bg-black/50 px-2 py-1 rounded">PROCESSING</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Lip Sync Simulation - Neural Waveform */}
                                                {!isLoading && isSpeaking && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        {/* Outer Aura */}
                                                        <div className={`absolute w-24 h-24 rounded-full border ${theme === 'sovereign' ? 'border-amber-500/20' : 'border-indigo-500/20'} animate-ping`} />

                                                        {/* Waveform Generator */}
                                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end justify-center gap-1 h-8 z-20 bg-black/50 p-1 rounded-full backdrop-blur-sm">
                                                            {[...Array(7)].map((_, i) => (
                                                                <LipSyncBar key={i} theme={theme} index={i} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {isSpeaking && (
                                                <div className={`absolute inset-0 rounded-full border-2 ${theme === 'sovereign' ? 'border-amber-500' : 'border-indigo-500'} animate-ping opacity-20`} />
                                            )}
                                        </div>
                                        {/* Holographic Scanline Overlay */}
                                        {theme === 'sovereign' && (
                                            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-20"
                                                style={{
                                                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8) 50%)',
                                                    backgroundSize: '100% 4px'
                                                }}
                                            />
                                        )}
                                        {completionText ? (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <p className="text-white text-sm font-bold mb-2">Protocol Generative Complete</p>
                                                <button onClick={handleReadBriefing} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 mx-auto shadow-lg shadow-indigo-500/25 transition-all hover:scale-105">
                                                    <Volume2 size={14} />
                                                    Read Analysis
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Secure Uplink Active</p>
                                                {voiceSrc && (
                                                    <button
                                                        onClick={handleVoicePreview}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold uppercase transition-colors mx-auto"
                                                    >
                                                        <Volume2 size={12} />
                                                        Play Voice Packet
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer Controls */}
                        {!isMinimized && (
                            <div className="p-3 bg-zinc-950 border-t border-white/5 flex justify-around relative">
                                <button
                                    className={`p-2 rounded-lg hover:bg-white/5 ${isSpeaking ? 'text-amber-400 animate-pulse' : 'text-zinc-400'} hover:text-white flex flex-col items-center gap-1 transition-colors`}
                                    onClick={() => isSpeaking ? window.speechSynthesis.cancel() : handleReadBriefing()}
                                    title={isSpeaking ? "Stop Speaking" : "Speak Analysis"}
                                >
                                    {isSpeaking ? <Volume2 size={16} /> : <Mic size={16} />}
                                    <span className="text-[8px] uppercase">{isSpeaking ? 'Stop' : 'Speak'}</span>
                                </button>

                                <button
                                    className={`p-2 rounded-lg hover:bg-white/5 ${videoSrc ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-400'} flex flex-col items-center gap-1 transition-colors`}
                                    onClick={() => videoSrc ? window.open(videoSrc, '_blank') : alert("Secure Video Uplink is currently offline due to bandwidth conservation protocols.")}
                                    title={videoSrc ? "Open Video Feed" : "Video Uplink Offline"}
                                >
                                    <Video size={16} />
                                    <span className="text-[8px] uppercase">Video</span>
                                </button>

                                <div className="relative">
                                    <button
                                        className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex flex-col items-center gap-1 transition-colors"
                                        onClick={() => {
                                            const menu = document.getElementById('delegate-options-menu');
                                            if (menu) menu.classList.toggle('hidden');
                                        }}
                                    >
                                        <MoreVertical size={16} />
                                        <span className="text-[8px] uppercase">Options</span>
                                    </button>

                                    {/* Options Menu */}
                                    <div id="delegate-options-menu" className="hidden absolute bottom-full right-0 mb-2 w-32 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                        <button onClick={() => window.location.reload()} className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white">Restart Protocol</button>
                                        <button onClick={() => setIsOpen(false)} className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white">Dismiss Agent</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Floating Orb Trigger */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto relative group"
            >
                {/* Speech Bubble Greeting */}
                {!isOpen && !completionText && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-white text-zinc-900 text-xs font-bold rounded-2xl rounded-br-none shadow-2xl shadow-indigo-500/20 z-50"
                    >
                        <p>{greetingText || "Greetings, Principal. I have a briefing ready for you."}</p>
                        <div className="absolute -bottom-1 right-4 w-4 h-4 bg-white transform rotate-45" />
                    </motion.div>
                )}

                {/* Completion Bubble */}
                {!isOpen && completionText && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-emerald-500 text-white text-xs font-bold rounded-2xl rounded-br-none shadow-2xl shadow-emerald-500/20 z-50"
                    >
                        <p>Analysis Complete. Click to review.</p>
                        <div className="absolute -bottom-1 right-4 w-4 h-4 bg-emerald-500 transform rotate-45" />
                    </motion.div>
                )}

                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 z-50">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-zinc-900"></span>
                    </span>
                )}

                {/* Avatar Ring */}
                <div className={`relative w-16 h-16 rounded-full p-1 bg-gradient-to-br ${theme === 'sovereign' ? 'from-amber-400 via-purple-600 to-amber-600' : color} shadow-lg ${theme === 'sovereign' ? 'shadow-amber-500/30' : 'shadow-indigo-500/30'}`}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black relative">
                        <img src={avatarImage} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </motion.button>
        </div>
    );
}

// ------------------------------------------------------------------
// Helper Component: Neural Audio Visualizer Bar
// ------------------------------------------------------------------
function LipSyncBar({ theme, index }: { theme: string, index: number }) {
    // Randomize the movement to simulate voice range frequencies
    const randomHeight = [
        Math.random() * 10 + 4,
        Math.random() * 24 + 8,
        Math.random() * 12 + 4
    ];
    // Slightly off-set durations for organic feel
    const duration = 0.15 + (Math.random() * 0.1);

    return (
        <motion.div
            className={`w-1.5 rounded-full ${theme === 'sovereign' ? 'bg-amber-400' : 'bg-indigo-400'} shadow-[0_0_8px_rgba(251,191,36,0.5)]`}
            animate={{ height: randomHeight }}
            transition={{
                repeat: Infinity,
                duration: duration,
                ease: "easeInOut",
                delay: index * 0.05 // Stagger effect
            }}
        />
    );
}
