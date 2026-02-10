import { useState, useRef, useEffect, useCallback } from 'react';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';

export function useEdIntelSwarm() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const { setSystemThinking } = useEdIntelVibe();

    const [syncProgress, setSyncProgress] = useState(0);
    const stallingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const executeSwarmProtocol = useCallback(async (intent: string, context?: any, retryCount = 0) => {
        const MAX_RETRIES = 2;
        const STALL_TIMEOUT = 12000; // 12 seconds with no data = stall

        // Cancel previous request if active
        if (abortControllerRef.current && retryCount === 0) {
            abortControllerRef.current.abort();
        }

        if (retryCount === 0) {
            setSyncProgress(0);
            setResponse(null);
            setError(null);
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);
        setSystemThinking(true);

        const resetStallingTimeout = () => {
            if (stallingTimeoutRef.current) clearTimeout(stallingTimeoutRef.current);
            stallingTimeoutRef.current = setTimeout(() => {
                console.warn('Swarm stream stalled. Attempting recovery...');
                controller.abort();
                if (retryCount < MAX_RETRIES) {
                    executeSwarmProtocol(intent, context, retryCount + 1);
                } else {
                    setError('Swarm uplink stalled. Please try again.');
                }
            }, STALL_TIMEOUT);
        };

        try {
            resetStallingTimeout();

            const res = await fetch('/api/EdIntel-swarm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    intent,
                    context,
                    userId: 'EdIntel-user-001',
                    loadScore: Math.floor(Math.random() * 100)
                }),
                signal: controller.signal
            });

            if (!res.ok) {
                if (retryCount < MAX_RETRIES) {
                    const backoff = Math.pow(2, retryCount) * 1000;
                    await new Promise(r => setTimeout(r, backoff));
                    return executeSwarmProtocol(intent, context, retryCount + 1);
                }
                throw new Error('Swarm uplink failed after multiple attempts');
            }

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                let chunksReceived = 0;
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    resetStallingTimeout();
                    chunksReceived++;

                    const chunk = decoder.decode(value, { stream: true });
                    setResponse((prev) => (prev || '') + chunk);

                    // Simulate sync progress based on chunks (capped at 99% until done)
                    setSyncProgress(Math.min(99, chunksReceived * 5));
                }
                setSyncProgress(100);
            }
        } catch (err: any) {
            if (err.name === 'AbortError') {
                if (retryCount >= MAX_RETRIES) {
                    setError('Swarm uplink timed out.');
                }
                return;
            }
            setError(err.message);
        } finally {
            if (stallingTimeoutRef.current) clearTimeout(stallingTimeoutRef.current);

            // Only turn off loading if this is the active request
            if (abortControllerRef.current === controller) {
                setIsLoading(false);
                setSystemThinking(false);
                abortControllerRef.current = null;
            }
        }
    }, [setSystemThinking]);

    return {
        executeSwarmProtocol,
        swarmResponse: response,
        isSwarmActive: isLoading,
        swarmError: error,
        syncProgress
    };
}
