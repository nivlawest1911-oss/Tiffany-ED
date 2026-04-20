'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { PodcastEpisode } from '@/lib/data/podcasts';
import Image from 'next/image';

interface PodcastPlayerProps {
    episode: PodcastEpisode;
}

export default function PodcastPlayer({ episode }: PodcastPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);


    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Synchronize play state when a new episode is provided
    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setIsLoaded(false);
        if (audioRef.current) {
            audioRef.current.src = episode.audioUrl;
            audioRef.current.load();
        }
    }, [episode]);

    // Format time helpers (seconds to MM:SS)
    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Audio Event Handlers
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setIsLoaded(true);
        }
    };

    const togglePlayPause = () => {
        if (!audioRef.current || !isLoaded) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };


    // Skip controls
    const handleSkipBack = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
        }
    };

    const handleSkipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 15);
        }
    };

    // Derived progress percentage
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    const roundedProgress = Math.round(progressPercentage);

    return (
        <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden isolate shadow-2xl">
            {/* Visualizer Background Matrix */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none -z-10" />

            {/* Audio Element Hidden */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                preload="metadata"
            />

            <div className="flex flex-col md:flex-row gap-8 items-center h-full">

                {/* Album Art Area (Left) */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-noble-gold/20 blur-xl rounded-full"
                        animate={{
                            scale: isPlaying ? [1, 1.2, 1] : 1,
                            opacity: isPlaying ? [0.4, 0.8, 0.4] : 0.2
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="absolute inset-0 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center p-4">
                        <Image
                            src={episode.imageUrl}
                            alt={episode.title}
                            width={100}
                            height={100}
                            className="object-contain filter contrast-125 saturate-150 drop-shadow-md"
                            priority
                        />
                    </div>

                    {/* Ring animation */}
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute -inset-2 border-2 border-noble-gold/30 rounded-[2.5rem] pointer-events-none"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Player Controls & Info (Right) */}
                <div className="flex-1 w-full space-y-6 flex flex-col justify-center">

                    {/* Meta Data */}
                    <div className="text-center md:text-left space-y-1">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={episode.id + '-badge'}
                            className="inline-block px-3 py-1 bg-noble-gold/10 border border-noble-gold/30 text-noble-gold text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-2 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        >
                            EdIntel Episode
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                            {episode.title}
                        </h2>
                        <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{episode.host}</p>
                    </div>

                    {/* Scrubber Area */}
                    <div className="space-y-2 mt-4 relative">
                        {/* Hidden native range input for accessibility and state management */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={roundedProgress}
                            onChange={(e) => {
                                const newProgress = parseFloat(e.target.value);
                                if (audioRef.current) {
                                    audioRef.current.currentTime = (newProgress / 100) * duration;
                                }
                            }}
                            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-10"
                            aria-label="Playback progress"
                        />
                        
                        {/* Visual Scrubber (Matches EdIntel Aesthetic) */}
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden group">
                            <motion.div
                                className="h-full bg-gradient-to-r from-noble-gold via-yellow-400 to-cyan-400 relative"
                                initial={false}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center justify-between mt-2">
                        {/* Audio Toggle */}
                        <button
                            onClick={toggleMute}
                            className="p-3 text-white/40 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        {/* Main Media Controls */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleSkipBack}
                                className="p-2 text-white/60 hover:text-white transition-transform hover:-translate-x-1"
                                aria-label="Skip back 15 seconds"
                            >
                                <SkipBack size={24} />
                            </button>

                            <button
                                onClick={togglePlayPause}
                                disabled={!isLoaded}
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-noble-gold to-yellow-600 flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {!isLoaded ? (
                                    <Loader2 className="animate-spin text-black/80" size={28} />
                                ) : isPlaying ? (
                                    <Pause size={28} strokeWidth={3} className="ml-0.5 fill-black" />
                                ) : (
                                    <Play size={28} strokeWidth={3} className="ml-1 fill-black" />
                                )}
                            </button>

                            <button
                                onClick={handleSkipForward}
                                className="p-2 text-white/60 hover:text-white transition-transform hover:translate-x-1"
                                aria-label="Skip forward 15 seconds"
                            >
                                <SkipForward size={24} />
                            </button>
                        </div>

                        {/* Empty spacer to balance layout */}
                        <div className="w-10" />
                    </div>

                </div>
            </div>
        </div>
    );
}
