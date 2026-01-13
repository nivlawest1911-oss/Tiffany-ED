
'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Play, Square, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceIdentityProps {
    src: string;
    label?: string;
}

export default function VoiceIdentity({ src, label = "Executive Voice Uplink" }: VoiceIdentityProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Reset for "Voice Note" feel
            } else {
                audioRef.current.play().catch(e => console.error("Audio playback error:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 rounded-full px-4 py-2 hover:border-indigo-500/50 transition-colors backdrop-blur-md">
            <audio
                ref={audioRef}
                src={src}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
            />

            <button
                onClick={togglePlay}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all ${isPlaying ? 'bg-indigo-500 text-white' : 'bg-white/10 text-zinc-400 hover:text-white hover:bg-white/20'}`}
            >
                {/* Visual Ping Animation when playing */}
                {isPlaying && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping"></span>
                )}
                {isPlaying ? <Square size={12} fill="currentColor" /> : <Mic size={14} />}
            </button>

            <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                    {label}
                </span>
                {isPlaying ? (
                    // Fake Waveform Animation
                    <div className="flex items-end gap-[2px] h-3 mt-1">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: "20%" }}
                                animate={{ height: ["20%", "80%", "30%", "100%", "40%"] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.5 + Math.random() * 0.5,
                                    delay: i * 0.05
                                }}
                                className="w-1 bg-indigo-400 rounded-full"
                            />
                        ))}
                    </div>
                ) : (
                    <span className="text-[10px] text-zinc-500 font-mono">
                        SECURE AUDIO CHANNEL
                    </span>
                )}
            </div>
        </div>
    );
}
