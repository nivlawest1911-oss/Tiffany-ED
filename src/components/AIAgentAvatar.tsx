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
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleSpeak = React.useCallback(async (text: string) => {
        if (avatar) {
            await avatar.speak({
                text: text,
                task_type: TaskType.REPEAT,
            });
        }
    }, [avatar]);

    useEffect(() => {
        if (avatar && streamReady && textToSpeak) {
            handleSpeak(textToSpeak);
        }
    }, [textToSpeak, avatar, streamReady, handleSpeak]);

    useEffect(() => {
        async function initAvatar() {
            try {
                // Fetch secure session token from backend
                const res = await fetch('/api/heygen-token');
                if (!res.ok) throw new Error('Failed to fetch token');

                const { token } = await res.json();
                const newAvatar = new StreamingAvatar({ token });

                newAvatar.on('stream_ready', (event) => {
                    if (videoRef.current && event.detail) {
                        videoRef.current.srcObject = event.detail;
                        videoRef.current.onloadedmetadata = () => {
                            videoRef.current?.play().catch(console.error);
                            setStreamReady(true);
                            setIsLoading(false);
                        };
                    }
                });

                newAvatar.on('stream_disconnected', () => {
                    setStreamReady(false);
                });

                await newAvatar.createStartAvatar({
                    quality: AvatarQuality.High,
                    avatarName: 'default',
                });

                setAvatar(newAvatar);
            } catch (error) {
                console.error("Failed to initialize avatar:", error);
                setIsLoading(false);
            }
        }

        if (!avatar) {
            initAvatar();
        }

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
                    <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
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
