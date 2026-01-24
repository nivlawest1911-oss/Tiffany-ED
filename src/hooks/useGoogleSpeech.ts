'use client';

import { useState, useCallback, useRef } from 'react';

export function useGoogleSpeech() {
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

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
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setIsTranscribing(true);

                try {
                    const formData = new FormData();
                    formData.append('audio', audioBlob);

                    const response = await fetch('/api/google/stt', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) throw new Error('STT request failed');

                    const data = await response.json();
                    resolve(data.transcript);
                } catch (err) {
                    console.error('STT error:', err);
                    resolve(null);
                } finally {
                    setIsTranscribing(false);
                }
            };

            mediaRecorderRef.current.stop();
        });
    }, []);

    const speak = useCallback(async (text: string, voiceName?: string) => {
        setIsSynthesizing(true);
        try {
            const response = await fetch('/api/google/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voiceName }),
            });

            if (!response.ok) throw new Error('TTS request failed');

            const data = await response.json();
            const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);

            return new Promise<void>((resolve) => {
                audio.onended = () => {
                    setIsSynthesizing(false);
                    resolve();
                };
                audio.play().catch(e => {
                    console.error("Audio playback blocked", e);
                    setIsSynthesizing(false);
                    resolve();
                });
            });
        } catch (err) {
            console.error('TTS error:', err);
            setIsSynthesizing(false);
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
