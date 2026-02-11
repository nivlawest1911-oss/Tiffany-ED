'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Maximize2, Sparkles } from 'lucide-react';

interface EdIntelMediaEngineProps {
    type: 'video' | 'image';
    src: string;
    alt?: string;
    className?: string;
    autoPlay?: boolean;
    isCinematic?: boolean;
    overlayText?: string;
}

export default function EdIntelMediaEngine({
    type,
    src,
    alt = 'EdIntel Asset',
    className = '',
    autoPlay = true,
    isCinematic = true,
    overlayText
}: EdIntelMediaEngineProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);

    const containerClasses = `
        relative overflow-hidden rounded-[2rem] border border-noble-gold/30 
        shadow-[0_0_30px_rgba(212,175,55,0.1)] group select-none
        ${isCinematic ? 'aspect-video' : 'aspect-square'}
        ${className}
    `;

    const handlePlayPause = () => {
        if (type === 'video') {
            const video = document.getElementById(`video-${src}`) as HTMLVideoElement;
            if (video) {
                if (video.paused) {
                    video.play();
                    setIsPlaying(true);
                } else {
                    video.pause();
                    setIsPlaying(false);
                }
            }
        }
    };

    return (
        <motion.div
            className={containerClasses}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Obsidian Glass Filter Overlay */}
            <div className="absolute inset-0 bg-noble-gold/5 pointer-events-none z-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none" />

            {/* Media Content */}
            {type === 'video' ? (
                <video
                    id={`video-${src}`}
                    src={src}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    autoPlay={autoPlay}
                    loop
                    muted
                    playsInline
                />
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
            )}

            {/* Cinematic Overlay UI */}
            <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-noble-gold/30 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-noble-gold animate-pulse" />
                        <span className="text-[9px] font-black uppercase text-noble-gold tracking-widest">Live Feed</span>
                    </div>
                </div>

                <div className="flex items-end justify-between">
                    <div>
                        {overlayText && (
                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                                className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter leading-none mb-2"
                            >
                                {overlayText}
                            </motion.h3>
                        )}
                        <div className="flex items-center gap-2 text-white/60">
                            <Sparkles size={12} className="text-noble-gold" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">EdIntel Optical Array</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {type === 'video' && (
                            <button
                                onClick={handlePlayPause}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-noble-gold hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all"
                            >
                                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                            </button>
                        )}
                        <button
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all"
                            title="Maximize View"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-noble-gold/30 z-20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-noble-gold/30 z-20" />
        </motion.div>
    );
}
