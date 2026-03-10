/**
 * ExecutiveBriefingPlayer Component
 * 
 * A premium audio playback interface for synthetic podcasts and 
 * executive briefings, featuring waveform visualizations and 
 * synchronized transcript simulation.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Headphones, Download } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { toast } from 'sonner';

interface PlayerProps {
    title: string;
    subtitle: string;
    duration: number; // seconds
}

export const ExecutiveBriefingPlayer: React.FC<PlayerProps> = ({ title, subtitle, duration }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentTime < duration) {
            interval = setInterval(() => {
                setCurrentTime(prev => Math.min(prev + 1, duration));
            }, 1000);
        } else if (currentTime >= duration) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTime, duration]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <GlassCard className="p-0 overflow-hidden border-intel-gold/20 shadow-2xl shadow-intel-gold/5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row h-full">
                {/* Visual Side */}
                <div className="w-full md:w-1/3 bg-black relative flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-intel-gold/10 to-transparent pointer-events-none" />

                    <motion.div
                        className="w-48 h-48 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-2xl"
                        animate={{
                            scale: isPlaying ? [1, 1.02, 1] : 1,
                            rotate: isPlaying ? [0, 1, 0] : 0
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <Headphones size={64} className="text-intel-gold/40" />

                        {/* Orbiting Particles */}
                        {isPlaying && [...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-intel-gold rounded-full"
                                animate={{
                                    x: [0, Math.cos(i * 90) * 100, 0],
                                    y: [0, Math.sin(i * 90) * 100, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                            />
                        ))}
                    </motion.div>

                    <div className="mt-8 text-center">
                        <div className="text-[10px] font-black text-intel-gold uppercase tracking-[0.2em] mb-2">Synthetic Voice G-4</div>
                        <div className="text-xs text-white/40 font-medium">Neural Upscaling Active</div>
                    </div>
                </div>

                {/* Controls Side */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-intel-gold uppercase tracking-widest">Executive Briefing</span>
                            <span className="px-2 py-0.5 bg-intel-gold/10 rounded text-[9px] font-black text-intel-gold">AUDIO PROVENANCE SECURED</span>
                        </div>
                        <h3 className="text-2xl font-black text-white leading-none mb-2">{title}</h3>
                        <p className="text-white/40 text-sm font-medium">{subtitle}</p>
                    </div>

                    {/* Waveform Mock */}
                    <div className="h-24 flex items-center justify-center gap-1 my-8">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-1 rounded-full ${i / 40 < currentTime / duration ? 'bg-intel-gold' : 'bg-white/10'}`}
                                animate={{
                                    height: isPlaying ? [10, Math.random() * 60 + 10, 10] : 10
                                }}
                                transition={{ repeat: Infinity, duration: 0.4 + Math.random(), delay: i * 0.02 }}
                            />
                        ))}
                    </div>

                    {/* Scrubber */}
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-white/5 rounded-full relative overflow-hidden group cursor-pointer">
                            <motion.div
                                className="h-full bg-intel-gold absolute left-0 top-0"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-8 mt-8">
                        <button 
                            title="Skip Back" 
                            className="text-white/40 hover:text-white transition-colors"
                            onClick={() => toast.info("Rewinding 15s...")}
                        >
                            <SkipBack size={24} />
                        </button>
                        <button
                            title={isPlaying ? "Pause Briefing" : "Play Briefing"}
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/10"
                        >
                            {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                        </button>
                        <button 
                            title="Skip Forward" 
                            className="text-white/40 hover:text-white transition-colors"
                            onClick={() => toast.info("Skipping 15s...")}
                        >
                            <SkipForward size={24} />
                        </button>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                        <div className="flex gap-4">
                            <button title="Volume Control" className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                                <Volume2 size={14} />
                            </button>
                            <button 
                                title="Export Briefing" 
                                className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                                onClick={() => toast.success("Briefing metadata hashed. Downloading MP3...")}
                            >
                                <Download size={14} />
                                Export MP3
                            </button>
                        </div>
                        <button title="Fullscreen" className="text-white/40 hover:text-white transition-colors">
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
};
