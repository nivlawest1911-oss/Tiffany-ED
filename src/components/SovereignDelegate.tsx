
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
}

export default function SovereignDelegate({
    role,
    name,
    avatarImage,
    videoSrc,
    voiceSrc,
    color
}: SovereignDelegateProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Play greeting on mount once? No, maybe on first hover.

    const handleVoicePreview = () => {
        if (!voiceSrc) return;
        const audio = new Audio(voiceSrc);
        audio.play();
        setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
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
                        className="pointer-events-auto mb-6 w-80 md:w-96 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20"
                    >
                        {/* Header */}
                        <div className={`p-4 bg-gradient-to-r ${color} relative flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse box-shadow-glow" />
                                <div>
                                    <h3 className="text-sm font-black uppercase text-white tracking-wider">{role}</h3>
                                    <p className="text-xs text-white/80 font-mono">{name}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded-full text-white transition-colors">
                                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full text-white transition-colors">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Content Body */}
                        {!isMinimized && (
                            <div className="relative aspect-video bg-black">
                                {videoSrc ? (
                                    <VideoPlayer
                                        src={videoSrc}
                                        autoPlay={true}
                                        className="w-full h-full object-cover"
                                        controls={false} // Simple view
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4">
                                            <img src={avatarImage} alt={name} className="w-full h-full object-cover" />
                                            {isSpeaking && (
                                                <div className="absolute inset-0 bg-indigo-500/30 animate-pulse" />
                                            )}
                                        </div>
                                        <p className="text-zinc-500 text-xs uppercase tracking-widest">Video Feed Offline</p>
                                        {voiceSrc && (
                                            <button
                                                onClick={handleVoicePreview}
                                                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold uppercase transition-colors"
                                            >
                                                <Volume2 size={12} />
                                                Play Voice Packet
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Overlay Stats */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                                    <div className="text-[10px] font-mono text-emerald-400">
                                        SECURE_UPLINK::ESTABLISHED
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`w-1 bg-white/50 rounded-full animate-bounce`} style={{ height: Math.random() * 12 + 4, animationDelay: `${i * 0.1}s` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer Controls */}
                        {!isMinimized && (
                            <div className="p-3 bg-zinc-950 border-t border-white/5 flex justify-around">
                                <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex flex-col items-center gap-1">
                                    <Mic size={16} />
                                    <span className="text-[8px] uppercase">Voice</span>
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
                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black"></span>
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

                {/* Tooltip Label */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-black/80 backdrop-blur text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/10">
                    Detailed Briefing
                </div>
            </motion.button>
        </div>
    );
}

