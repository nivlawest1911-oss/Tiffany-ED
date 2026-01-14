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
    completionText?: string;
}

export default function SovereignDelegate({
    role,
    name,
    avatarImage,
    videoSrc,
    voiceSrc,
    color,
    completionText
}: SovereignDelegateProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Speak completion text when it arrives
    useEffect(() => {
        if (completionText && completionText.length > 10) { // arbitrary threshold to avoid empty completion triggers
            setIsOpen(true);
            setIsMinimized(false);
            speakText("Principal, I have successfully generated the requested protocol. Please review the analysis below.");
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
                        className="pointer-events-auto mb-6 w-80 md:w-96 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 ring-1 ring-white/20"
                    >
                        {/* Header */}
                        <div className={`p-4 bg-gradient-to-r ${color} relative flex items-center justify-between`}>
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
                                    <div className="relative w-full h-full">
                                        <VideoPlayer
                                            src={videoSrc}
                                            voiceSrc={voiceSrc}
                                            autoPlay={true}
                                            className="w-full h-full object-cover opacity-80"
                                            controls={false}
                                        />
                                        {/* Talking Overlay Effect when AI is speaking (Text) */}
                                        {isSpeaking && !voiceSrc && (
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-4 gap-1">
                                                <div className="w-1 bg-indigo-500 animate-bounce" style={{ height: '20px', animationDuration: '0.4s' }} />
                                                <div className="w-1 bg-indigo-500 animate-bounce" style={{ height: '30px', animationDuration: '0.5s' }} />
                                                <div className="w-1 bg-indigo-500 animate-bounce" style={{ height: '25px', animationDuration: '0.3s' }} />
                                                <div className="w-1 bg-indigo-500 animate-bounce" style={{ height: '15px', animationDuration: '0.6s' }} />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 px-4 text-center">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4 p-1">
                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                <img src={avatarImage} alt={name} className={`w-full h-full object-cover transition-transform duration-200 ${isSpeaking ? 'scale-110' : 'scale-100'}`} />
                                                {/* Lip Sync Simulation */}
                                                {isSpeaking && (
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
                                                        <div className="w-2 h-2 rounded-full bg-white/80 animate-ping" />
                                                    </div>
                                                )}
                                            </div>
                                            {isSpeaking && (
                                                <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-20" />
                                            )}
                                        </div>
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
                            <div className="p-3 bg-zinc-950 border-t border-white/5 flex justify-around">
                                <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex flex-col items-center gap-1" onClick={handleReadBriefing} title="Speak Analysis">
                                    <Mic size={16} />
                                    <span className="text-[8px] uppercase">Speak</span>
                                </button>
                                <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex flex-col items-center gap-1">
                                    <Video size={16} />
                                    <span className="text-[8px] uppercase">Video</span>
                                </button>
                                <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex flex-col items-center gap-1">
                                    <MoreVertical size={16} />
                                    <span className="text-[8px] uppercase">Options</span>
                                </button>
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
                        <p>Greetings, Principal. I have a briefing ready for you.</p>
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
                <div className={`relative w-16 h-16 rounded-full p-1 bg-gradient-to-br ${color} shadow-lg shadow-indigo-500/30`}>
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
