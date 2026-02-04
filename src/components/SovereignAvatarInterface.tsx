'use client';

import { useEffect, useRef, useState } from 'react';
import StreamingAvatar, { AvatarQuality, StreamingEvents } from '@heygen/streaming-avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Video as VideoIcon } from 'lucide-react';
import { useSovereignEar } from '@/hooks/useSovereignEar';

interface SovereignAvatarProps {
    avatarId?: string; // Default: 'Angela-inTshirt-20220820' or similar
    onError?: (error: string) => void;
}

export default function SovereignAvatarInterface({ avatarId = 'ef08039a41354ed5a20565db899373f3', onError }: SovereignAvatarProps) {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [debug, setDebug] = useState<string>('System Idle');
    const [isTalking, setIsTalking] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false);

    // Voice Input Integration
    const { isListening, transcript, startListening, stopListening } = useSovereignEar();
    const mediaStreamRef = useRef<HTMLVideoElement>(null);
    const avatarRef = useRef<StreamingAvatar | null>(null);

    // Initialize/Destroy Avatar Session
    async function toggleSession() {
        if (isSessionActive) {
            await avatarRef.current?.stopAvatar();
            avatarRef.current = null;
            setStream(null);
            setIsSessionActive(false);
            setDebug('Session Terminated');
        } else {
            setDebug('Authenticating Sovereign Link...');
            try {
                const res = await fetch('/api/heygen/token', { method: 'POST' });
                const data = await res.json();

                if (!data.data?.token) throw new Error('Token Acquisition Failed');

                const avatar = new StreamingAvatar({ token: data.data.token });
                avatarRef.current = avatar;

                avatar.on(StreamingEvents.AVATAR_START_TALKING, () => setIsTalking(true));
                avatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => setIsTalking(false));
                avatar.on(StreamingEvents.STREAM_READY, (event) => {
                    setStream(event.detail);
                    setDebug('Visual Link Established');
                });
                avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
                    setIsSessionActive(false);
                    setDebug('Visual Link Severed');
                });

                setDebug('Initializing Avatar Construct...');
                await avatar.createStartAvatar({
                    quality: AvatarQuality.High,
                    avatarName: avatarId,
                    voice: { rate: 1.0 } // Default
                });

                setIsSessionActive(true);

            } catch (err: any) {
                console.error(err);
                if (onError) onError(err.message);
                setDebug(`Error: ${err.message}`);
            }
        }
    }

    // Pass Transcript to Avatar
    // In a real loop, you'd send this to the Swarm (OpenAI), get text back, then avatar.speak(text).
    // For this interface, we'll demonstrate direct echo or simple command.
    useEffect(() => {
        if (transcript && isSessionActive && !isListening) {
            // Example hook: User stopped talking, send to avatar
            // ensure we debounce or wait for silence.
        }
    }, [transcript, isSessionActive, isListening]);

    useEffect(() => {
        if (stream && mediaStreamRef.current) {
            mediaStreamRef.current.srcObject = stream;
            mediaStreamRef.current.onloadedmetadata = () => {
                mediaStreamRef.current!.play();
            };
        }
    }, [stream]);

    return (
        <Card className="w-full h-full min-h-[400px] bg-black border-none relative overflow-hidden group rounded-[2.5rem]">
            {/* Holographic Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-900/20 z-0" />

            {/* Avatar Video Layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                {isSessionActive && (
                    <video
                        ref={mediaStreamRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
                    />
                )}
                {!isSessionActive && (
                    <div className="flex flex-col items-center gap-4 text-slate-500 opacity-50">
                        <div className="w-20 h-20 rounded-full border border-dashed border-slate-700 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <VideoIcon size={32} />
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em]">Neural Link Offline</p>
                    </div>
                )}
            </div>

            {/* Sovereign Interface Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={isListening ? stopListening : startListening}
                            variant="outline"
                            className={`rounded-full h-12 w-12 border-noble-gold/20 ${isListening ? 'bg-red-500/10 text-red-500 border-red-500/50' : 'bg-black/40 text-noble-gold'} transition-all`}
                        >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </Button>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-noble-gold font-mono uppercase tracking-widest mb-1">
                                {isTalking ? 'Sovereign Agent Speaking...' : isListening ? 'Listening...' : 'System Ready'}
                            </span>
                            <p className="text-xs text-white/50 font-mono truncate max-w-[200px]">
                                {debug}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={toggleSession}
                        className={`font-black uppercase tracking-wider rounded-full px-6 transition-all ${isSessionActive ? 'bg-red-500 hover:bg-red-600' : 'bg-noble-gold hover:bg-[#b5952f] text-black'}`}
                    >
                        {isSessionActive ? 'Sever Link' : 'Initialize'}
                    </Button>
                </div>
            </div>

            {/* Transcription Overlay */}
            {transcript && (
                <div className="absolute top-8 left-8 right-8 z-20 pointer-events-none">
                    <p className="text-lg md:text-2xl font-light text-white/80 text-center leading-relaxed drop-shadow-md">
                        "{transcript}"
                    </p>
                </div>
            )}
        </Card>
    );
}
