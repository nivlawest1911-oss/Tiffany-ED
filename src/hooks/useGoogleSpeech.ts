'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export function useGoogleSpeech() {
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start();
        } catch (err) {
            console.error('Error starting recording:', err);
        }
    }, []);

    const stopRecording = useCallback(async (): Promise<string | null> => {
        return new Promise((resolve) => {
            if (!mediaRecorderRef.current) {
                resolve(null);
                return;
            }

            mediaRecorderRef.current.onstop = async () => {
                // Cancel any existing requests
                if (abortControllerRef.current) abortControllerRef.current.abort();
                const controller = new AbortController();
                abortControllerRef.current = controller;

                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setIsTranscribing(true);

                try {
                    const formData = new FormData();
                    formData.append('audio', audioBlob);

                    const response = await fetch('/api/google/stt', {
                        method: 'POST',
                        body: formData,
                        signal: controller.signal
                    });

                    if (!response.ok) throw new Error('STT request failed');

                    const data = await response.json();
                    if (!controller.signal.aborted) {
                        resolve(data.transcript);
                    } else {
                        resolve(null);
                    }
                } catch (err: any) {
                    if (err.name !== 'AbortError') {
                        console.error('STT error:', err);
                    }
                    resolve(null);
                } finally {
                    if (abortControllerRef.current === controller) {
                        setIsTranscribing(false);
                        abortControllerRef.current = null;
                    }
                }
            };

            mediaRecorderRef.current.stop();
        });
    }, []);

    const speak = useCallback(async (text: string, voiceName?: string) => {
        // Cancel previous speech/requests
        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsSynthesizing(true);
        try {
            const response = await fetch('/api/google/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voiceName }),
                signal: controller.signal
            });

            if (!response.ok) throw new Error('TTS request failed');

            const data = await response.json();

            if (controller.signal.aborted) return;

            const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);

            return new Promise<void>((resolve) => {
                const onAbort = () => {
                    audio.pause();
                    audio.currentTime = 0;
                    resolve();
                };

                if (controller.signal.aborted) {
                    onAbort();
                    return;
                }

                controller.signal.addEventListener('abort', onAbort, { once: true });

                audio.onended = () => {
                    controller.signal.removeEventListener('abort', onAbort);
                    if (!controller.signal.aborted) {
                        setIsSynthesizing(false);
                    }
                    resolve();
                };

                audio.play().catch(err => {
                    console.error("Audio playback error:", err);
                    resolve();
                });
            });
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error('TTS error:', err);
            }
            // Always turn off flag on error
            if (abortControllerRef.current === controller) {
                setIsSynthesizing(false);
            }
        }
    }, []);

    return {
        startRecording,
        stopRecording,
        speak,
        isTranscribing,
        isSynthesizing,
    };
}
