/**
 * EdIntel Multimodal Live Avatar Hook
 * Vercel AI SDK Integration with Google Cloud Run Backend
 * 
 * Features:
 * - WebSocket connection to GCP Avatar Engine
 * - Real-time streaming responses
 * - Generative UI components
 * - Sub-second latency monitoring
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AvatarMessage {
    role: 'user' | 'avatar';
    text: string;
    timestamp: string;
}

interface UseMultimodalAvatarProps {
    avatarName: string;
    avatarRole: string;
    engine?: 'duix' | 'tavus' | 'heygen' | 'liveportrait' | 'adobe' | 'viggle' | 'did' | 'akool';
    onTokenDeduct?: (amount: number) => void;
    onXPGain?: (amount: number) => void;
    onSpeak?: (text: string) => boolean; // Returns true if handled externally
    voiceId?: string; // Optional: Explicit voice ID/gender hint
}

interface UseMultimodalAvatarReturn {
    // Connection State
    isConnected: boolean;
    isProcessing: boolean;
    latency: number | null;

    // Conversation
    messages: AvatarMessage[];
    sendMessage: (text: string) => Promise<void>;

    // Session Management
    connect: () => Promise<void>;
    disconnect: () => void;

    // Memory & Observations
    retrieveMemory: (query: string) => Promise<any[]>;
    saveObservation: (data: any) => Promise<void>;

    // Metrics
    sessionId: string | null;
    sentiment: 'neutral' | 'positive' | 'urgent' | 'distressed';

    // Error Handling
    error: string | null;

    // Multimodal Controls
    startListening: () => void;
    stopListening: () => void;
    isListening: boolean;
    isSpeaking: boolean;
    speak: (text: string) => void;
}

const LEADERSHIP_ARCHETYPES: Record<string, { tone: string, rate: number, pitch: number }> = {
    'alvin': { tone: 'visionary', rate: 0.9, pitch: 0.85 },
    'marcus': { tone: 'philosophical', rate: 0.8, pitch: 0.7 },
    'sarah': { tone: 'tactical', rate: 1.1, pitch: 1.05 },
    'andré': { tone: 'innovative', rate: 1.0, pitch: 0.9 },
    'default': { tone: 'professional', rate: 0.95, pitch: 0.9 }
};

export function useMultimodalAvatar({
    avatarName,
    avatarRole,
    engine = 'duix',
    onTokenDeduct,
    onXPGain,
    onSpeak, // Optional: Allow external component to handle speech (e.g. HeyGen)
    voiceId
}: UseMultimodalAvatarProps): UseMultimodalAvatarReturn {

    const { user } = useAuth();

    // Core State
    const [isConnected, setIsConnected] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [latency, setLatency] = useState<number | null>(null);
    const [messages, setMessages] = useState<AvatarMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [sentiment, setSentiment] = useState<'neutral' | 'positive' | 'urgent' | 'distressed'>('neutral');
    const [error, setError] = useState<string | null>(null);

    // Multimodal State
    const [mode, setMode] = useState<'cloud-socket' | 'edge-stream'>('edge-stream'); // Default to HTTP Stream for now
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const getArchetype = useCallback(() => {
        const lowerName = avatarName.toLowerCase();
        // Check voiceId hints
        if (voiceId === '21m00Tcm4TlvDq8ikWAM' || voiceId === 'EXAVITQu4vr4xnSDxMaL' || voiceId === 'MF3mGyEYCl7XYW7LpInj' || voiceId === 'AZnzlk1XjtbaicYn0nS5') {
            return { tone: 'authoritative-female', rate: 1.0, pitch: 1.05 };
        }

        if (lowerName.includes('alvin')) return LEADERSHIP_ARCHETYPES['alvin'];
        if (lowerName.includes('marcus')) return LEADERSHIP_ARCHETYPES['marcus'];
        if (lowerName.includes('sarah')) return LEADERSHIP_ARCHETYPES['sarah'];
        if (lowerName.includes('andre') || lowerName.includes('andré')) return LEADERSHIP_ARCHETYPES['andré'];
        return LEADERSHIP_ARCHETYPES['default'];
    }, [avatarName, voiceId]);

    const wsRef = useRef<WebSocket | null>(null);
    const messageQueueRef = useRef<string>('');
    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

    // ============================================
    // TEXT TO SPEECH (TTS)
    // ============================================
    const speak = useCallback((text: string) => {
        // 1. Check for External Handler (e.g. HeyGen / Azure)
        if (onSpeak && onSpeak(text)) {
            // External handler accepted the task.
            setIsSpeaking(true);

            // Heuristic Timeout to reset speaking state
            const wordCount = text.split(/\s+/).length;
            const estimatedDurationMs = Math.max(2000, (wordCount / 2.5) * 1000); // ~150 wpm min 2s
            setTimeout(() => {
                setIsSpeaking(false);
            }, estimatedDurationMs);

            return;
        }

        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();

        // HUMAN-LIKE REFINEMENT: Inject natural fillers
        let naturalText = text;
        if (Math.random() > 0.6) {
            const fillers = ["Well, ", "You know, ", "Basically, ", "So, ", "I mean, "];
            naturalText = fillers[Math.floor(Math.random() * fillers.length)] + text;
        }

        const utterance = new SpeechSynthesisUtterance(naturalText);
        const archetype = getArchetype();

        utterance.rate = archetype.rate;
        utterance.pitch = archetype.pitch;

        // Voice Selection Logic
        const voices = window.speechSynthesis.getVoices();
        const lowerName = avatarName.toLowerCase();
        const isFemale = lowerName.includes('keisha') || lowerName.includes('emily') || lowerName.includes('maya') || lowerName.includes('nova') || voiceId?.includes('Rachel') || voiceId?.includes('Bella') || voiceId?.includes('Elli') || voiceId?.includes('Nicole');

        const preferredVoice = voices.find(v =>
            isFemale
                ? (v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Female'))
                : (v.name.includes('Daniel') || v.name.includes('Google UK English Male') || v.name.includes('Male'))
        );
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [avatarName, onSpeak, voiceId, getArchetype]);

    // ============================================
    // SEND MESSAGE (UNIFIED)
    // ============================================
    const sendMessage = useCallback(async (text: string) => {
        // 1. Update Local State
        const userMsg: AvatarMessage = { role: 'user', text, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMsg]);
        if (onTokenDeduct) onTokenDeduct(1);

        setIsProcessing(true);

        if (mode === 'cloud-socket' && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'USER_SPEECH', data: { text } }));
            return;
        }

        // 2. HTTP EDGE STREAM FALLBACK (Original LiveAvatarChat Logic)
        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.map(m => ({ role: m.role, content: m.text })).concat([{ role: 'user', content: text }]),
                    protocolContext: `Role: ${avatarRole}. Name: ${avatarName}.`
                })
            });

            if (!response.ok || !response.body) throw new Error('Network response was not ok');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            // Add placeholder for AI response
            setMessages(prev => [...prev, { role: 'avatar', text: '', timestamp: new Date().toISOString() }]);

            let sentenceBuffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedResponse += chunk;
                sentenceBuffer += chunk;

                // Update UI State
                setMessages(prev => {
                    const newArr = [...prev];
                    newArr[newArr.length - 1].text = accumulatedResponse;
                    return newArr;
                });

                // Check for sentence completion to trigger TTS streaming
                if (sentenceBuffer.match(/[.!?](\s|$)/)) {
                    speak(sentenceBuffer.trim()); // Speak chunk
                    sentenceBuffer = '';
                }
            }
            if (sentenceBuffer.trim()) speak(sentenceBuffer.trim()); // Speak remaining

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    }, [messages, avatarRole, avatarName, mode, speak, onTokenDeduct]);

    // ============================================
    // SPEECH RECOGNITION (STT)
    // ============================================
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);

                recognition.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    sendMessage(text); // Auto-send on speech end
                };

                recognitionRef.current = recognition;
            }
        }
    }, [sendMessage]);

    // ============================================
    // HANDLE SERVER MESSAGES
    // ============================================
    const handleServerMessage = useCallback((message: any) => {
        switch (message.type) {
            case 'SESSION_INITIALIZED':
                setSessionId(message.data.sessionId);
                setMessages([{
                    role: 'avatar',
                    text: message.data.message,
                    timestamp: new Date().toISOString()
                }]);
                break;

            case 'PROCESSING_START':
                setIsProcessing(true);
                messageQueueRef.current = '';
                break;

            case 'RESPONSE_CHUNK':
                messageQueueRef.current += message.data.text;
                // Update last message in real-time
                setMessages(prev => {
                    const newMessages = [...prev];
                    if (newMessages[newMessages.length - 1]?.role === 'avatar') {
                        newMessages[newMessages.length - 1].text = messageQueueRef.current;
                    } else {
                        newMessages.push({
                            role: 'avatar',
                            text: messageQueueRef.current,
                            timestamp: new Date().toISOString()
                        });
                    }
                    return newMessages;
                });
                // NEW: Trigger TTS
                speak(message.data.text);
                break;

            case 'RESPONSE_COMPLETE':
                setIsProcessing(false);
                setLatency(message.data.latency);
                setSentiment(message.data.sentiment || 'neutral');
                if (onXPGain) onXPGain(2);
                break;

            case 'ERROR':
                setError(message.message);
                setIsProcessing(false);
                break;

            default:
                break;
        }
    }, [speak, onXPGain]);

    // ============================================
    // CONNECT TO CLOUD RUN AVATAR ENGINE
    // ============================================
    const connect = useCallback(async () => {
        const wsUrl = process.env.NEXT_PUBLIC_AVATAR_ENGINE_WS_URL;

        if (wsUrl && mode === 'cloud-socket') {
            // ... existing WebSocket logic ...
            try {
                const ws = new WebSocket(wsUrl);
                wsRef.current = ws;
                ws.onopen = () => {
                    setIsConnected(true);
                    ws.send(JSON.stringify({ type: 'INIT_SESSION', data: { userId: user?.id, avatarName, avatarRole, engine } }));
                };
                ws.onmessage = (event) => handleServerMessage(JSON.parse(event.data));
                ws.onclose = () => setIsConnected(false);
            } catch (e) {
                console.warn("WebSocket failed, falling back to Edge Stream");
                setMode('edge-stream');
            }
        } else {
            // Edge Stream Mode (Simulated Connection)
            setIsConnected(true);
        }
    }, [user, avatarName, avatarRole, engine, mode, handleServerMessage]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.warn("Speech recognition already active or blocking", e);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    // ============================================
    // RETRIEVE MEMORY
    // ============================================
    const retrieveMemory = useCallback(async (query: string): Promise<any[]> => {
        if (mode === 'edge-stream' || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            return [];
        }
        return new Promise((resolve) => {
            const handler = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                if (message.type === 'MEMORY_RETRIEVED') {
                    wsRef.current?.removeEventListener('message', handler);
                    resolve(message.data.memories);
                }
            };
            wsRef.current?.addEventListener('message', handler);
            wsRef.current?.send(JSON.stringify({ type: 'RETRIEVE_MEMORY', data: { query, limit: 5 } }));
        });
    }, [mode]);

    // ============================================
    // SAVE OBSERVATION
    // ============================================
    const saveObservation = useCallback(async (data: any) => {
        if (mode === 'cloud-socket' && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'SAVE_OBSERVATION', data }));
        }
    }, [mode]);

    // ============================================
    // DISCONNECT
    // ============================================
    const disconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({ type: 'END_SESSION' }));
            wsRef.current.close();
            wsRef.current = null;
        }
        setIsConnected(false);
        setSessionId(null);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return {
        isConnected,
        isProcessing,
        latency,
        messages,
        sendMessage,
        connect,
        disconnect,
        retrieveMemory,
        saveObservation,
        sessionId,
        sentiment,
        error,
        // New Exports
        startListening,
        stopListening,
        isListening,
        isSpeaking,
        speak
    };
}
