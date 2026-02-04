import { useState } from 'react';

export function useSovereignSwarm() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const executeSwarmProtocol = async (intent: string, context?: any) => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch('/api/sovereign-swarm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    intent,
                    context,
                    // Simulate getting these from a global store or context in a real app
                    userId: 'sovereign-user-001',
                    loadScore: Math.floor(Math.random() * 100)
                })
            });

            if (!res.ok) throw new Error('Swarm uplink failed');

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let result = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    result += chunk;
                    setResponse((prev) => (prev || '') + chunk);
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        executeSwarmProtocol,
        swarmResponse: response,
        isSwarmActive: isLoading,
        swarmError: error
    };
}
