'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Volume2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface HuggingFaceAvatarProps {
    textToSpeak?: string;
    avatarUrl?: string; // Static image URL
    name?: string;
    role?: string;
    className?: string;
}

export default function HuggingFaceAvatar({
    textToSpeak = "",
    avatarUrl = "/images/avatars/dr_alvin_west_premium.png",
    name = "Dr. Alvin West",
    role = "AI Superintendent",
    className = ""
}: HuggingFaceAvatarProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    // Effect: Text changed -> Generate Audio
    useEffect(() => {
        if (!textToSpeak) return;

        const generateSpeech = async () => {
            setIsLoading(true);
            setError(null);
            setIsPlaying(false);

            try {
                const res = await fetch('/api/huggingface/tts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: textToSpeak })
                });

                if (!res.ok) throw new Error("Failed to generate speech");

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
                setIsLoading(false);

                // Auto-play
                if (audioRef.current) {
                    audioRef.current.src = url;
                    audioRef.current.play().catch(e => console.warn("Auto-play blocked", e));
                    setIsPlaying(true);
                }

            } catch (err: any) {
                console.error("HF Avatar Error:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        generateSpeech();

        // Cleanup
        return () => {
            if (audioSrc) URL.revokeObjectURL(audioSrc);
        };
    }, [textToSpeak, audioSrc]);

    return (
        <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 group ${className}`}>
            {/* 1. Base Layer: Static Avatar Image */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full">
                    <Image
                        src={avatarUrl}
                        alt={name}
                        fill
                        className={`object-cover transition-transform duration-1000 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </div>
            </div>

            {/* 2. Animation Overlay (Simulating Speech) */}
            {isPlaying && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="absolute bottom-1/3 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                </div>
            )}

            {/* 3. Status HUD */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                {isLoading && (
                    <div className="px-3 py-1 bg-black/60 backdrop-blur rounded-full border border-amber-500/30 flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Synthesizing...</span>
                    </div>
                )}
                {isPlaying && (
                    <div className="px-3 py-1 bg-black/60 backdrop-blur rounded-full border border-emerald-500/30 flex items-center gap-2">
                        <Activity size={12} className="text-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Speaking</span>
                    </div>
                )}
                {error && (
                    <div className="px-3 py-1 bg-black/60 backdrop-blur rounded-full border border-red-500/30 flex items-center gap-2">
                        <AlertCircle size={12} className="text-red-500" />
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Signal Lost</span>
                    </div>
                )}
            </div>

            {/* 4. Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors ${isPlaying ? 'bg-indigo-600 border-indigo-500' : 'bg-white/10 border-white/10'}`}>
                        <Volume2 size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase text-lg leading-none mb-1">{name}</h3>
                        <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">{role}</p>
                    </div>
                </div>

                {/* Waveform Visualization (CSS Animation) */}
                {isPlaying && (
                    <div className="flex gap-1 mt-4 h-4 items-end">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-indigo-400 rounded-full"
                                animate={{ height: ['20%', '100%', '20%'] }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.05
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                className="hidden"
            />
        </div>
    );
}
