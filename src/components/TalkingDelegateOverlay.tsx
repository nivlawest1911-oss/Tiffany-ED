'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Activity, Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface TalkingDelegateOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    script: string;
    avatarImage: string;
    videoSrc?: string | null;
    name: string;
    role: string;
}

export default function TalkingDelegateOverlay({
    isOpen,
    onClose,
    script,
    avatarImage,
    videoSrc,
    name,
    role
}: TalkingDelegateOverlayProps) {
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Jaw Animation State
    const [jawOpen, setJawOpen] = useState(false);

    // Fetch Audio when opened with new script (only if no video is provided)
    useEffect(() => {
        if (!isOpen || !script || videoSrc) return;

        const fetchAudio = async () => {
            setIsLoading(true);
            setError(null);
            setAudioSrc(null);

            try {
                const response = await fetch('/api/huggingface/tts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: script.substring(0, 500) }) // Limit for demo speed
                });

                if (!response.ok) throw new Error('Failed to synthesize speech');

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
                setIsLoading(false);

                // Auto-play
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.play().catch(e => console.error("Autoplay blocked", e));
                    }
                }, 500);

            } catch (err: any) {
                console.error("TTS Error:", err);
                setError("Voice synthesis unavailable. Using backup protocol.");
                setIsLoading(false);
                // Fallback to browser TTS if server fails?
                // For now, just show error state.
            }
        };

        fetchAudio();

        return () => {
            if (audioSrc) URL.revokeObjectURL(audioSrc);
        };
    }, [isOpen, script]);

    // Lip-Sync Simulation (Randomized Jaw Movement when playing)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setJawOpen(prev => !prev);
            }, 150); // Fast toggle roughly matches speech cadence
        } else {
            setJawOpen(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-end md:items-center justify-center md:justify-end p-4 md:p-10 pointer-events-none"
                >
                    <motion.div
                        initial={{ y: 100, scale: 0.9 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 100, scale: 0.9 }}
                        className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                    >
                        {/* HEADER */}
                        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
                            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur rounded-full border border-white/10">
                                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                                    {isPlaying ? 'Live Audio Feed' : isLoading ? 'Synthesizing...' : 'Standby'}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-white transition-colors border border-white/5"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* AVATAR DISPLAY */}
                        <div className="relative aspect-[4/5] w-full bg-zinc-900">
                            {/* Static Body / Video Feed */}
                            <div className="absolute inset-0 z-0">
                                {videoSrc ? (
                                    <video
                                        src={videoSrc}
                                        autoPlay
                                        loop
                                        muted={false}
                                        playsInline
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onEnded={() => setIsPlaying(false)}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={avatarImage}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            {/* "Talking" Overlay Effect 
                                We subtly scale the image on the Y axis to simulate speaking motion if we can't separate the jaw.
                                Or we use the opacity pulse.
                            */}
                            <motion.div
                                animate={{
                                    scaleY: isPlaying ? [1, 1.02, 1] : 1,
                                    scaleX: isPlaying ? [1, 1.01, 1] : 1
                                }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                                className="absolute inset-0 z-0 mix-blend-overlay opacity-30 bg-indigo-500"
                            />

                            {/* Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />

                            {/* Waveform Visualizer */}
                            {isPlaying && (
                                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-end gap-1 h-8">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                                            animate={{ height: ['20%', '100%', '30%'] }}
                                            transition={{
                                                duration: 0.4 + Math.random() * 0.3,
                                                repeat: Infinity,
                                                delay: i * 0.05
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CONTROLS AREA */}
                        <div className="absolute bottom-0 left-0 right-0 bg-zinc-950 p-6 z-20 border-t border-white/10">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{name}</h3>
                            <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mb-4">{role}</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        if (videoSrc) {
                                            const v = document.querySelector('video');
                                            if (v) {
                                                if (isPlaying) v.pause();
                                                else v.play();
                                            }
                                        } else if (audioRef.current) {
                                            if (isPlaying) audioRef.current.pause();
                                            else audioRef.current.play();
                                        }
                                    }}
                                    disabled={isLoading || (!audioSrc && !videoSrc)}
                                    className="flex-1 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                    {isPlaying ? 'Pause Protocol' : 'Resume Protocol'}
                                </button>
                            </div>
                        </div>

                        <audio
                            ref={audioRef}
                            src={audioSrc || ''}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                            onError={(e) => console.error("Audio Playback Error", e)}
                            className="hidden"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
