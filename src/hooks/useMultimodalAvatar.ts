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
}

export function useMultimodalAvatar({
    avatarName,
    avatarRole,
    engine = 'duix',
    onTokenDeduct,
    onXPGain
}: UseMultimodalAvatarProps): UseMultimodalAvatarReturn {

    const { user } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [latency, setLatency] = useState<number | null>(null);
    const [messages, setMessages] = useState<AvatarMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [sentiment, setSentiment] = useState<'neutral' | 'positive' | 'urgent' | 'distressed'>('neutral');
    const [error, setError] = useState<string | null>(null);

    const wsRef = useRef<WebSocket | null>(null);
    const messageQueueRef = useRef<string>('');
    const requestStartTimeRef = useRef<number>(0);

    // ============================================
    // CONNECT TO CLOUD RUN AVATAR ENGINE
    // ============================================
    const connect = useCallback(async () => {
        if (!user) {
            setError('User not authenticated');
            return;
        }

        try {
            // Get Cloud Run WebSocket URL from environment
            const wsUrl = process.env.NEXT_PUBLIC_AVATAR_ENGINE_WS_URL ||
                'wss://edintel-avatar-engine-xxxxx.run.app';

            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('🔗 Connected to Avatar Engine');
                setIsConnected(true);
                setError(null);

                // Initialize session
                ws.send(JSON.stringify({
                    type: 'INIT_SESSION',
                    data: {
                        userId: user.id,
                        avatarName,
                        avatarRole,
                        engine
                    }
                }));
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    handleServerMessage(message);
                } catch (err) {
                    console.error('Failed to parse message:', err);
                }
            };

            ws.onerror = (err) => {
                console.error('WebSocket error:', err);
                setError('Connection error');
                setIsConnected(false);
            };

            ws.onclose = () => {
                console.log('🔌 Disconnected from Avatar Engine');
                setIsConnected(false);
            };

        } catch (err) {
            console.error('Failed to connect:', err);
            setError('Failed to connect to avatar engine');
        }
    }, [user, avatarName, avatarRole, engine]);

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
                console.log(`✅ Session ${message.data.sessionId} initialized`);
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
                break;

            case 'RESPONSE_COMPLETE':
                setIsProcessing(false);
                setLatency(message.data.latency);
                setSentiment(message.data.sentiment || 'neutral');

                // Award XP for interaction
                if (onXPGain) onXPGain(2);

                console.log(`📊 Response latency: ${message.data.latency}ms`);
                break;

            case 'MEMORY_RETRIEVED':
                // Handle memory retrieval
                console.log('💾 Memories retrieved:', message.data.memories);
                break;

            case 'OBSERVATION_SAVED':
                console.log('✅ Observation saved:', message.data.observationId);
                break;

            case 'SESSION_ENDED':
                disconnect();
                break;

            case 'ERROR':
                setError(message.message);
                setIsProcessing(false);
                console.error('❌ Server error:', message.message);
                break;

            default:
                console.warn('Unknown message type:', message.type);
        }
    }, [onXPGain]);

    // ============================================
    // SEND MESSAGE TO AVATAR
    // ============================================
    const sendMessage = useCallback(async (text: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            setError('Not connected to avatar engine');
            return;
        }

        // Add user message to conversation
        setMessages(prev => [...prev, {
            role: 'user',
            text,
            timestamp: new Date().toISOString()
        }]);

        // Deduct token
        if (onTokenDeduct) onTokenDeduct(1);

        // Send to server
        requestStartTimeRef.current = Date.now();
        wsRef.current.send(JSON.stringify({
            type: 'USER_SPEECH',
            data: { text }
        }));

    }, [onTokenDeduct]);

    // ============================================
    // RETRIEVE MEMORY FROM EVIDENCE FOLDER
    // ============================================
    const retrieveMemory = useCallback(async (query: string): Promise<any[]> => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
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

            wsRef.current.addEventListener('message', handler);
            wsRef.current.send(JSON.stringify({
                type: 'RETRIEVE_MEMORY',
                data: { query, limit: 5 }
            }));
        });
    }, []);

    // ============================================
    // SAVE OBSERVATION TO EVIDENCE FOLDER
    // ============================================
    const saveObservation = useCallback(async (data: any) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            throw new Error('Not connected');
        }

        wsRef.current.send(JSON.stringify({
            type: 'SAVE_OBSERVATION',
            data
        }));
    }, []);

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
        error
    };
}
