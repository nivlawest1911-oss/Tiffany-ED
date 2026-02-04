'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient, LiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';

interface UseSovereignEarReturn {
    isListening: boolean;
    transcript: string;
    startListening: () => Promise<void>;
    stopListening: () => void;
    error: string | null;
}

export function useSovereignEar(): UseSovereignEarReturn {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const connectionRef = useRef<LiveClient | null>(null);
    const microphoneRef = useRef<MediaRecorder | null>(null);

    const startListening = useCallback(async () => {
        setError(null);
        try {
            // 1. Get Ephemeral Key
            const response = await fetch('/api/deepgram/token');
            const data = await response.json();

            if (!data.key) {
                throw new Error(data.error || 'Failed to acquire Sovereign Ear credentials');
            }

            // 2. Initialize Deepgram
            const deepgram = createClient(data.key);
            const connection = deepgram.listen.live({
                model: 'nova-2',
                language: 'en-US',
                smart_format: true,
            });

            // 3. Setup Socket Listeners
            connection.on(LiveTranscriptionEvents.Open, () => {
                console.log('Sovereign Ear: Channel Open');
                setIsListening(true);
            });



            connection.on(LiveTranscriptionEvents.Transcript, (data) => {
                const draft = data.channel.alternatives[0].transcript;
                if (draft) {
                    setTranscript((prev) => prev + ' ' + draft);
                }
            });

            connection.on(LiveTranscriptionEvents.Error, (err) => {
                console.error('Sovereign Ear Error:', err);
                setError('Signal Interrupted');
                setIsListening(false);
            });

            // 4. Activate Microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (!MediaRecorder.isTypeSupported('audio/webm')) {
                throw new Error('Browser not supported for Sovereign Audio');
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
            console.error('Activation Failed:', err);
            setError(err.message || 'Sovereign Ear failed to activate');
            setIsListening(false);
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
            stopListening();
        };
    }, [stopListening]);

    return { isListening, transcript, startListening, stopListening, error };
}
