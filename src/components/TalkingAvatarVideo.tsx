'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

interface TalkingAvatarVideoProps {
    videoSrc: string;
    posterImage?: string;
    name: string;
    role?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
    showControls?: boolean;
}

export default function TalkingAvatarVideo({
    videoSrc,
    posterImage,
    name,
    role,
    autoPlay = false,
    loop = true,
    muted = false,
    className = '',
    showControls = true
}: TalkingAvatarVideoProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (videoRef.current && autoPlay) {
            videoRef.current.play().catch(err => {
                console.log('Autoplay prevented:', err);
                setIsPlaying(false);
            });
        }
    }, [autoPlay]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative group ${className}`}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoSrc}
                poster={posterImage}
                loop={loop}
                muted={isMuted}
                playsInline
                onLoadedData={() => setIsLoaded(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover rounded-2xl"
            />

            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-2xl">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {/* Avatar Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
                <h3 className="text-white font-bold text-lg">{name}</h3>
                {role && <p className="text-zinc-300 text-sm">{role}</p>}
            </div>

            {/* Controls Overlay */}
            {showControls && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <div className="absolute inset-0 bg-black/40 rounded-2xl" />

                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-white" />
                            ) : (
                                <Play className="w-8 h-8 text-white ml-1" />
                            )}
                        </button>

                        {/* Bottom Controls */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                            <button
                                onClick={toggleMute}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 text-white" />
                                ) : (
                                    <Volume2 className="w-5 h-5 text-white" />
                                )}
                            </button>

                            <button
                                onClick={toggleFullscreen}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
                            >
                                {isFullscreen ? (
                                    <Minimize2 className="w-5 h-5 text-white" />
                                ) : (
                                    <Maximize2 className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Holographic Effect */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 rounded-2xl" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite] rounded-2xl" />
            </div>
        </div>
    );
}
