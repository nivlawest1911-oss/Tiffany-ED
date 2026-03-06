import React, { useEffect, useRef, useState } from 'react';
import StreamingAvatar, { AvatarQuality, TaskType } from '@heygen/streaming-avatar';

interface AIAgentAvatarProps {
    textToSpeak?: string;
    className?: string;
}

export default function AIAgentAvatar({ textToSpeak = "", className = "" }: AIAgentAvatarProps) {
    const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
    const [streamReady, setStreamReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleSpeak = React.useCallback(async (text: string) => {
        if (avatar) {
            try {
                await avatar.speak({
                    text: text,
                    task_type: TaskType.REPEAT,
                });
            } catch (err) {
                console.error("Speak error:", err);
            }
        }
    }, [avatar]);

    useEffect(() => {
        if (avatar && streamReady && textToSpeak) {
            handleSpeak(textToSpeak);
        }
    }, [textToSpeak, avatar, streamReady, handleSpeak]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function initAvatar() {
            try {
                setIsLoading(true);
                setError(null);
                // Fetch secure session token from backend
                const res = await fetch('/api/heygen-token', { signal });
                if (!res.ok) throw new Error('Failed to fetch protocol token');

                const data = await res.json();
                const token = data.token || data; // Handle different response shapes

                if (!token) throw new Error('Invalid protocol token');

                const newAvatar = new StreamingAvatar({ token });

                newAvatar.on('stream_ready', (event) => {
                    if (videoRef.current && event.detail) {
                        videoRef.current.srcObject = event.detail;
                        videoRef.current.onloadedmetadata = () => {
                            videoRef.current?.play().catch(console.error);
                            if (!signal.aborted) {
                                setStreamReady(true);
                                setIsLoading(false);
                            }
                        };
                    }
                });

                newAvatar.on('stream_disconnected', () => {
                    if (!signal.aborted) {
                        setStreamReady(false);
                    }
                });

                await newAvatar.createStartAvatar({
                    quality: AvatarQuality.High,
                    avatarName: 'default', // Future: Allow dynamic mapping to CORE_AVATARS
                });

                if (!signal.aborted) {
                    setAvatar(newAvatar);
                } else {
                    newAvatar.stopAvatar();
                }
            } catch (error: any) {
                if (signal.aborted) return;
                console.error("Failed to initialize avatar:", error);
                setError(error.message || "Protocol connection failed");
                setIsLoading(false);
            }
        }

        if (!avatar) {
            initAvatar();
        }

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Handle avatar cleanup separately
    useEffect(() => {
        return () => {
            if (avatar) {
                avatar.stopAvatar();
            }
        };
    }, [avatar]);

    return (
        <div className={`avatar-container relative w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-black ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Initializing Neural Link...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 z-20 p-6 text-center">
                    <div className="space-y-4">
                        <div className="text-red-500/50 flex justify-center">
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="text-xs text-white/70 font-mono uppercase tracking-widest leading-relaxed">
                            {error}
                        </p>
                        <button
                            onClick={() => { setAvatar(null); setError(null); }}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-black text-[9px] text-white uppercase tracking-widest transition-all"
                        >
                            Retry Protocol
                        </button>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
            />

            {/* Interactive Controls Overlay */}
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                {streamReady && (
                    <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live Stream
                    </div>
                )}
            </div>
        </div>
    );
}
