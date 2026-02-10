import { TavusConversation } from '@/types/tavus';
import { withResilience } from '@/lib/ai-resilience';

const TAVUS_API_KEY = process.env.NEXT_PUBLIC_TAVUS_API_KEY;
const TAVUS_API_URL = 'https://api.tavus.io/v2';

export class TavusService {
    private static instance: TavusService;

    private constructor() { }

    public static getInstance(): TavusService {
        if (!TavusService.instance) {
            TavusService.instance = new TavusService();
        }
        return TavusService.instance;
    }

    /**
     * initializes a new conversation with a Replica
     */
    public async createConversation(
        replicaId: string,
        context: Record<string, any>,
        personaContent: string,
        signal?: AbortSignal
    ): Promise<TavusConversation> {
        if (!TAVUS_API_KEY) throw new Error("Tavus API Key missing");

        return withResilience(async () => {
            console.log("[Tavus] Initializing Phoenix-3 Stream...");

            const response = await fetch(`${TAVUS_API_URL}/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': TAVUS_API_KEY
                },
                body: JSON.stringify({
                    replica_id: replicaId,
                    system_prompt: personaContent,
                    context: context,
                    properties: {
                        max_call_duration: 300,
                        enable_recording: false,
                        enable_transcription: true
                    }
                }),
                signal
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.message || 'Failed to create Tavus conversation');
            }

            const data = await response.json();
            return data as TavusConversation;
        }, { signal });
    }

    /**
     * ends an active conversation
     */
    public async endConversation(conversationId: string, signal?: AbortSignal): Promise<void> {
        if (!TAVUS_API_KEY) return;
        await withResilience(async () => {
            await fetch(`${TAVUS_API_URL}/conversations/${conversationId}/end`, {
                method: 'POST',
                headers: { 'x-api-key': TAVUS_API_KEY },
                signal
            });
        }, { signal });
    }

    /**
     * Injects real-time event logs into the conversation context
     */
    public async updateContext(conversationId: string, eventData: string): Promise<void> {
        console.log(`[Tavus] Injecting Context: ${eventData}`);
        // Implementation for CVI (Context Video Injection) goes here
    }
}

export const tavusService = TavusService.getInstance();
