'use client';

import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    description?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}

export default function VideoPlayer({
    src,
    poster,
    title,
    description,
    autoPlay = false,
    loop = false,
    muted = false,
    controls = true,
    className = ''
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);

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

    return (
        <div className={`relative group ${className}`}>
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                className="w-full h-auto rounded-2xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                Your browser does not support the video tag.
            </video>

            {/* Custom Controls Overlay */}
            {controls && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 text-white" />
                            ) : (
                                <Play className="w-6 h-6 text-white" />
                            )}
                        </button>

                        {/* Mute Button */}
                        <button
                            onClick={toggleMute}
                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="w-6 h-6 text-white" />
                            ) : (
                                <Volume2 className="w-6 h-6 text-white" />
                            )}
                        </button>

                        {/* Title */}
                        {title && (
                            <div className="ml-auto">
                                <h4 className="text-white font-bold text-sm">{title}</h4>
                                {description && (
                                    <p className="text-white/80 text-xs">{description}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && controls && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="p-6 rounded-full bg-indigo-600/90 backdrop-blur-sm hover:bg-indigo-500 transition-all transform hover:scale-110 shadow-2xl"
                    >
                        <Play className="w-12 h-12 text-white ml-1" />
                    </button>
                </div>
            )}
        </div>
    );
}
