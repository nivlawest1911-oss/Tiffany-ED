'use client';
import React, { useRef, useState } from 'react';
import { Play, Pause, Maximize, Activity } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

interface EdIntelPlayerProps {
    src: string;
    poster?: string;
    title?: string;
}

export function EdIntelPlayer({
    src,
    poster = "/images/avatars/dr_alvin_west_official.svg",
    title = "Secure Transmission"
}: EdIntelPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { playClick } = useProfessionalSounds();
    const [hasError, setHasError] = useState(false);

    const togglePlay = () => {
        if (hasError) return;
        playClick();
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play().catch(() => setHasError(true));
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative group w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-[0_0_50px_-10px_rgba(59,130,246,0.25)]">

            {/* 1. Cinematic Overlays (EdIntel OS) */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none z-10" />

            {/* 2. The Video Element or Error Fallback */}
            {!hasError ? (
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover aspect-video"
                    src={src}
                    poster={poster}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setHasError(true)}
                    playsInline
                />
            ) : (
                <div className="w-full h-full aspect-video flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                    <Activity size={48} className="mb-4 opacity-50" />
                    <p className="text-xs font-bold uppercase tracking-widest">Signal Lost / Media Offline</p>
                </div>
            )}

            {/* 3. The "EdIntel" Play Trigger */}
            {!isPlaying && !hasError && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-black/10 cursor-pointer">
                    <button
                        onClick={togglePlay}
                        aria-label="Play Video"
                        className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        <Play className="fill-current ml-2" size={32} />
                    </button>
                </div>
            )}

            {/* 4. Metadata Label (Tactical Footer) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Activity size={12} className="text-emerald-500 animate-pulse" />
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">
                            Encrypted Feed
                        </p>
                    </div>
                    <h3 className="text-white font-bold text-lg tracking-tight drop-shadow-md">{title}</h3>
                </div>

                {/* Controls Overlay */}
                <div className="flex gap-2">
                    <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                        aria-label="Maximize"
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <Maximize size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
