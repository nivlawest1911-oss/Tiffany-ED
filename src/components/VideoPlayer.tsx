'use client';

import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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
    voiceSrc?: string;
}

function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    className = '',
    voiceSrc
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
    
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [hasError, setHasError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const progressRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.setProperty('--progress', `${progress}%`);
        }
    }, [progress]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    const togglePlay = () => {
        if (hasError) return;
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                audioRef.current?.pause();
            } else {
                videoRef.current.play().catch(() => setHasError(true));
                audioRef.current?.play().catch(() => {
                    console.warn("Sync audio failed to play, continuing with video only");
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            if (audioRef.current) {
                audioRef.current.muted = !isMuted;
            }
            setIsMuted(!isMuted);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video || !duration) return;

        const newTime = (parseFloat(e.target.value) / 100) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(parseFloat(e.target.value));
    };

    const skipForward = () => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = Math.min(video.currentTime + 10, duration);
    };

    const skipBackward = () => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = Math.max(video.currentTime - 10, 0);
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current);
        }
        controlsTimeout.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handlePlay = () => {
        setIsPlaying(true);
        audioRef.current?.play().catch(e => console.log("Audio autoplay blocked", e));
    };

    const handlePause = () => {
        setIsPlaying(false);
        audioRef.current?.pause();
    };

    const handleEnded = () => {
        setIsPlaying(false);
        if (loop && videoRef.current) {
            videoRef.current.play();
            audioRef.current?.play();
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`relative group bg-black rounded-2xl overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Sync Audio Track */}
            {voiceSrc && (
                <audio
                    ref={audioRef}
                    src={voiceSrc}
                    muted={isMuted}
                />
            )}

            {/* Video Element */}
            {!hasError ? (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    playsInline
                    className="w-full h-auto"
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onEnded={handleEnded}
                    onError={() => setHasError(true)}
                    onClick={togglePlay}
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="w-full aspect-video flex flex-col items-center justify-center bg-zinc-900 rounded-2xl border border-white/5 text-zinc-400">
                    <VolumeX size={48} className="mb-4 opacity-20" />
                    <p className="text-xs font-mono uppercase tracking-widest">Media Resource Offline</p>
                    <p className="text-[10px] text-zinc-600 mt-2 px-8 text-center">{src}</p>
                </div>
            )}

            {/* Title Overlay */}
            {title && controls && (
                <div
                    className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
                        showControls ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <h3 className="text-white font-semibold text-lg">{title}</h3>
                    {description && <p className="text-white/70 text-sm mt-1">{description}</p>}
                </div>
            )}

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && controls && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="p-6 rounded-full bg-[#FFB300]/90 backdrop-blur-sm hover:bg-[#FFB300] transition-all transform hover:scale-110 shadow-2xl"
                        title="Play Video"
                        aria-label="Play Video"
                    >
                        <Play className="w-12 h-12 text-white ml-1" fill="white" />
                    </button>
                </div>
            )}

            {/* Controls Bar */}
            {controls && !hasError && (
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-8 transition-opacity duration-300 ${
                        showControls ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Progress Bar */}
                    <div className="mb-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            title="Seek"
                            aria-label="Seek"
                            ref={progressRef}
                            className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-3
                                [&::-webkit-slider-thumb]:h-3
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-[#FFB300]
                                [&::-webkit-slider-thumb]:shadow-lg
                                [&::-webkit-slider-thumb]:cursor-pointer
                                [&::-webkit-slider-thumb]:transition-transform
                                [&::-webkit-slider-thumb]:hover:scale-125
                                [background-image:linear-gradient(to_right,#FFB300_var(--progress),rgba(255,255,255,0.3)_var(--progress))]"
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5 text-white" />
                                ) : (
                                    <Play className="w-5 h-5 text-white" fill="white" />
                                )}
                            </button>

                            {/* Skip Backward */}
                            <button
                                onClick={skipBackward}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                title="Skip back 10s"
                            >
                                <SkipBack className="w-4 h-4 text-white" />
                            </button>

                            {/* Skip Forward */}
                            <button
                                onClick={skipForward}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                title="Skip forward 10s"
                            >
                                <SkipForward className="w-4 h-4 text-white" />
                            </button>

                            {/* Volume */}
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 text-white" />
                                ) : (
                                    <Volume2 className="w-5 h-5 text-white" />
                                )}
                            </button>

                            {/* Time Display */}
                            <span className="text-white/80 text-sm font-mono ml-2">
                                {formatDuration(currentTime)} / {formatDuration(duration)}
                            </span>
                        </div>

                        {/* Fullscreen */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            title="Fullscreen"
                        >
                            <Maximize className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
