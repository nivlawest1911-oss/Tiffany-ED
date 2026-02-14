'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient, LiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';

interface UseEdIntelEarReturn {
    isListening: boolean;
    transcript: string;
    startListening: () => Promise<void>;
    stopListening: () => void;
    error: string | null;
}

export function useEdIntelEar(): UseEdIntelEarReturn {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const connectionRef = useRef<LiveClient | null>(null);
    const microphoneRef = useRef<MediaRecorder | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const startListening = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setError(null);
        try {
            // 1. Get Ephemeral Key
            const response = await fetch('/api/deepgram/token', {
                signal: controller.signal
            });

            if (!response.ok) throw new Error('Failed to acquire token (Network)');

            const data = await response.json();

            if (!data.key) {
                throw new Error(data.error || 'Failed to acquire EdIntel Ear credentials');
            }

            // check if aborted after json await
            if (controller.signal.aborted) return;

            // 2. Initialize Deepgram
            const deepgram = createClient(data.key);
            const connection = deepgram.listen.live({
                model: 'nova-2',
                language: 'en-US',
                smart_format: true,
            });

            // 3. Setup Socket Listeners
            connection.on(LiveTranscriptionEvents.Open, () => {
                if (controller.signal.aborted) {
                    connection.finish();
                    return;
                }
                console.log('EdIntel Ear: Channel Open');
                setIsListening(true);
            });

            connection.on(LiveTranscriptionEvents.Transcript, (data) => {
                const draft = data.channel.alternatives[0].transcript;
                if (draft) {
                    setTranscript((prev) => prev + ' ' + draft);
                }
            });

            connection.on(LiveTranscriptionEvents.Error, (err) => {
                console.error('EDINTEL EAR: SIGNAL INTERRUPTED -', err);
                setError('Neural Link Fractured: Re-uplink Required');
                setIsListening(false);
            });

            // 4. Activate Microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (controller.signal.aborted) {
                stream.getTracks().forEach(track => track.stop());
                connection.finish();
                return;
            }

            if (!MediaRecorder.isTypeSupported('audio/webm')) {
                throw new Error('Browser not supported for EdIntel Audio');
            }

            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0 && connection.getReadyState() === 1) {
                    connection.send(event.data);
                }
            });

            mediaRecorder.start(250); // Slice every 250ms
            microphoneRef.current = mediaRecorder;
            connectionRef.current = connection;

        } catch (err: any) {
            if (err.name === 'AbortError') return;
            console.error('Activation Failed:', err);
            setError(err.message || 'EdIntel Ear failed to activate');
            setIsListening(false);
        } finally {
            // If this specific request finished (success or fail) and wasn't aborted, clear ref? 
            // Actually better to leave ref for cleanup on unmount
        }
    }, []);

    const stopListening = useCallback(() => {
        if (microphoneRef.current && microphoneRef.current.state !== 'inactive') {
            microphoneRef.current.stop();
        }
        if (connectionRef.current) {
            connectionRef.current.finish();
            connectionRef.current = null;
        }
        setIsListening(false);
    }, []);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            stopListening();
        };
    }, [stopListening]);

    return { isListening, transcript, startListening, stopListening, error };
}
