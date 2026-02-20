'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import StreamingAvatar, {
    AvatarQuality,
    StreamingEvents,
    TaskType,
    VoiceEmotion,
} from '@heygen/streaming-avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface StreamingAvatarProps {
    avatarId?: string;
    voiceId?: string;
    quality?: AvatarQuality;
    className?: string;
    onReady?: () => void;
    onError?: (error: Error) => void;
    autoStart?: boolean;
}

export function HeyGenStreamingAvatar({
    avatarId = 'default',
    voiceId = 'en-US-JennyNeural',
    quality = AvatarQuality.High,
    className = '',
    onReady,
    onError,
    autoStart = false,
}: StreamingAvatarProps) {
    const [isLoadingSession, setIsLoadingSession] = useState(false);
    const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [debug, setDebug] = useState<string>('');
    const [_data, _setData] = useState<any>(null);
    const [text, setText] = useState<string>('');
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    const mediaStream = useRef<HTMLVideoElement>(null);
    const avatar = useRef<StreamingAvatar | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // ============================================
    // SESSION MANAGEMENT
    // ============================================

    async function fetchAccessToken(signal?: AbortSignal) {
        try {
            const response = await fetch('/api/heygen/streaming-token', {
                method: 'POST',
                signal
            });

            if (!response.ok) {
                throw new Error('Failed to fetch access token');
            }

            const { token } = await response.json();
            return token;
        } catch (error) {
            console.error('Error fetching access token:', error);
            throw error;
        }
    }

    const startSession = useCallback(async () => {
        if (isLoadingSession) return;

        // Cancel any existing session init
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoadingSession(true);
        setDebug('Initializing session...');

        try {
            const newToken = await fetchAccessToken(controller.signal);

            if (controller.signal.aborted) return;

            avatar.current = new StreamingAvatar({
                token: newToken,
            });

            // Set up event listeners
            avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
                console.log('Avatar started talking', e);
                setDebug('Avatar is speaking...');
            });

            avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
                console.log('Avatar stopped talking', e);
                setDebug('Avatar finished speaking');
            });

            avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
                console.log('Stream disconnected');
                setDebug('Session ended');
                endSession();
            });

            avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
                if (controller.signal.aborted) return;
                console.log('Stream ready:', event.detail);
                setDebug('Session started successfully');
                setStream(event.detail);
                setIsSessionActive(true);
                if (onReady) onReady();
            });

            avatar.current.on(StreamingEvents.USER_START, (event) => {
                console.log('User started talking', event);
                setDebug('Listening...');
            });

            avatar.current.on(StreamingEvents.USER_STOP, (event) => {
                console.log('User stopped talking', event);
                setDebug('Processing...');
            });

            // Create streaming session
            const res = await avatar.current.createStartAvatar({
                quality,
                avatarName: avatarId,
                voice: {
                    voiceId: voiceId,
                    rate: 1.0,
                    emotion: VoiceEmotion.FRIENDLY,
                },
                language: 'en',
                disableIdleTimeout: false,
            });

            if (controller.signal.aborted) {
                await avatar.current.stopAvatar();
                return;
            }

            _setData(res);
            setDebug('Session created');
        } catch (error: any) {
            if (error.name === 'AbortError') {
                setDebug('Session initialization aborted');
                return;
            }
            console.error('Error starting session:', error);
            setDebug(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            if (onError && error instanceof Error) {
                onError(error);
            }
        } finally {
            if (abortControllerRef.current === controller) {
                setIsLoadingSession(false);
                abortControllerRef.current = null;
            }
        }
    }, [isLoadingSession, quality, avatarId, voiceId, onReady, onError]);

    async function endSession() {
        if (!avatar.current) {
            setDebug('No session to end');
            return;
        }

        try {
            await avatar.current.stopAvatar();
            setStream(null);
            setIsSessionActive(false);
            setDebug('Session ended');
        } catch (error) {
            console.error('Error ending session:', error);
            setDebug(`Error ending session: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // ============================================
    // AVATAR INTERACTION
    // ============================================

    async function handleSpeak() {
        if (!avatar.current || !text.trim()) {
            setDebug('No avatar session or empty text');
            return;
        }

        setIsLoadingRepeat(true);
        setDebug('Sending message...');

        try {
            await avatar.current.speak({
                text: text,
                taskType: TaskType.REPEAT,
            });
            setText('');
            setDebug('Message sent');
        } catch (error) {
            console.error('Error speaking:', error);
            setDebug(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoadingRepeat(false);
        }
    }

    async function handleInterrupt() {
        if (!avatar.current) {
            setDebug('No avatar session');
            return;
        }

        try {
            await avatar.current.interrupt();
            setDebug('Interrupted');
        } catch (error) {
            console.error('Error interrupting:', error);
            setDebug(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    const toggleMute = useCallback(() => {
        if (mediaStream.current) {
            mediaStream.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    const toggleVideo = useCallback(() => {
        if (mediaStream.current) {
            if (isVideoEnabled) {
                mediaStream.current.style.display = 'none';
            } else {
                mediaStream.current.style.display = 'block';
            }
            setIsVideoEnabled(!isVideoEnabled);
        }
    }, [isVideoEnabled]);

    // ============================================
    // EFFECTS
    // ============================================

    useEffect(() => {
        if (stream && mediaStream.current) {
            mediaStream.current.srcObject = stream;
            mediaStream.current.onloadedmetadata = () => {
                mediaStream.current!.play();
                setDebug('Playing');
            };
        }
    }, [stream]);

    useEffect(() => {
        if (autoStart) {
            startSession();
        }

        return () => {
            endSession();
        };
    }, [autoStart, startSession]);

    // ============================================
    // RENDER
    // ============================================

    return (
        <Card className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${className}`}>
            {/* Video Stream */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                    ref={mediaStream}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <track kind="captions" />
                </video>

                {/* Loading Overlay */}
                <AnimatePresence>
                    {(isLoadingSession || isLoadingRepeat) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        >
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
                                <p className="text-white font-medium">
                                    {isLoadingSession ? 'Initializing Avatar...' : 'Processing...'}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* No Stream Placeholder */}
                {!stream && !isLoadingSession && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Video className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                            <p className="text-white/70">Click "Start Session" to begin</p>
                        </div>
                    </div>
                )}

                {/* Controls Overlay */}
                {isSessionActive && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <Button
                            size="sm"
                            variant={isMuted ? 'danger' : 'secondary'}
                            onClick={toggleMute}
                            className="flex-1"
                        >
                            {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                            {isMuted ? 'Unmute' : 'Mute'}
                        </Button>
                        <Button
                            size="sm"
                            variant={isVideoEnabled ? 'secondary' : 'danger'}
                            onClick={toggleVideo}
                            className="flex-1"
                        >
                            {isVideoEnabled ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
                            {isVideoEnabled ? 'Hide' : 'Show'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Control Panel */}
            <div className="p-6 space-y-4">
                {/* Session Controls */}
                <div className="flex gap-2">
                    {!isSessionActive ? (
                        <Button
                            onClick={startSession}
                            disabled={isLoadingSession}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            {isLoadingSession ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <Video className="w-4 h-4 mr-2" />
                                    Start Session
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={endSession}
                            variant="danger"
                            className="flex-1"
                        >
                            <VideoOff className="w-4 h-4 mr-2" />
                            End Session
                        </Button>
                    )}
                </div>

                {/* Text Input */}
                {isSessionActive && (
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSpeak()}
                                placeholder="Type a message for the avatar to speak..."
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={isLoadingRepeat}
                            />
                            <Button
                                onClick={handleSpeak}
                                disabled={isLoadingRepeat || !text.trim()}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {isLoadingRepeat ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Mic className="w-4 h-4" />
                                )}
                            </Button>
                        </div>

                        <Button
                            onClick={handleInterrupt}
                            variant="ghost"
                            size="sm"
                            className="w-full"
                        >
                            <MicOff className="w-4 h-4 mr-2" />
                            Interrupt
                        </Button>
                    </div>
                )}

                {/* Debug Info */}
                {debug && (
                    <div className="text-xs text-white/60 font-mono bg-black/20 p-2 rounded">
                        {debug}
                    </div>
                )}
            </div>
        </Card>
    );
}
