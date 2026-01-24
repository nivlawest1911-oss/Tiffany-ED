'use client';

import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VideoShowcaseProps {
    videoUrl: string;
    title: string;
    description?: string;
    thumbnail?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
}

export default function VideoShowcase({
    videoUrl,
    title,
    description,
    thumbnail,
    autoPlay = false,
    loop = true,
    muted = true,
    className = ''
}: VideoShowcaseProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress(progress);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

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
        if (!containerRef.current) return;

        if (!isFullscreen) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * videoRef.current.duration;
    };

    return (
        <div className={`relative group ${className}`}>
            {/* Video Container */}
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                {/* Video Element */}
                <video
                    ref={videoRef}
                    src={videoUrl}
                    poster={thumbnail}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    playsInline
                    className="w-full h-full object-cover"
                    onClick={togglePlay}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Title Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-8 right-8 z-10"
                >
                    <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-white/80 max-w-2xl drop-shadow-md">
                            {description}
                        </p>
                    )}
                </motion.div>

                {/* Play/Pause Button Overlay */}
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: showControls || !isPlaying ? 1 : 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center z-20 transition-all hover:bg-white/30"
                >
                    {isPlaying ? (
                        <Pause className="w-10 h-10 text-white" />
                    ) : (
                        <Play className="w-10 h-10 text-white ml-1" />
                    )}
                </motion.button>

                {/* Controls Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                >
                    {/* Progress Bar */}
                    <div
                        className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer overflow-hidden backdrop-blur-sm"
                        onClick={handleProgressClick}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5 text-white" />
                                ) : (
                                    <Play className="w-5 h-5 text-white ml-0.5" />
                                )}
                            </button>

                            <button
                                onClick={toggleMute}
                                className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 text-white" />
                                ) : (
                                    <Volume2 className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>

                        <button
                            onClick={toggleFullscreen}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                        >
                            {isFullscreen ? (
                                <Minimize2 className="w-5 h-5 text-white" />
                            ) : (
                                <Maximize2 className="w-5 h-5 text-white" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-8 right-8 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-8 left-8 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
                </div>
            </motion.div>

            {/* Floating Stats/Info */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl border border-white/20"
            >
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                        AI-Powered Content
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
