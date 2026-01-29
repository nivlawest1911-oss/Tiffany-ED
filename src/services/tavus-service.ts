import { TavusConversation } from '@/types/tavus';

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
     * @param replicaId The ID of the Phoenix-3 replica (e.g., Dr. Alvin West)
     * @param context Initial context about the user and district
     * @param personaContent The 'System Prompt' defining the Sovereign Persona
     */
    public async createConversation(
        replicaId: string,
        context: Record<string, any>,
        personaContent: string
    ): Promise<TavusConversation> {
        if (!TAVUS_API_KEY) throw new Error("Tavus API Key missing");

        try {
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
                        max_call_duration: 300, // 5 min default for advisory
                        enable_recording: false,
                        enable_transcription: true
                    }
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Failed to create Tavus conversation');
            }

            const data = await response.json();
            return data as TavusConversation;
        } catch (error) {
            console.error("[Tavus] Error creating conversation:", error);
            throw error;
        }
    }

    /**
     * ends an active conversation
     */
    public async endConversation(conversationId: string): Promise<void> {
        if (!TAVUS_API_KEY) return;
        await fetch(`${TAVUS_API_URL}/conversations/${conversationId}/end`, {
            method: 'POST',
            headers: { 'x-api-key': TAVUS_API_KEY }
        });
    }

    /**
     * Injects real-time event logs into the conversation context
     * (Bridging the gap between EdIntel analytics and the Avatar)
     */
    public async updateContext(conversationId: string, eventData: string): Promise<void> {
        // Note: Tavus API v2 allows sending 'signals' or 'context_update'
        // This implementation assumes a hypothetical endpoint or mechanism for v2 context injection
        // If not explicitly documented, we might simulate it via a hidden user message.
        // For V2 CVI, we often send a 'tool' output or 'context' patch.

        console.log(`[Tavus] Injecting Context: ${eventData}`);
        // Placeholder for context injection implementation specific to Tavus V2 docs
    }
}

export const tavusService = TavusService.getInstance();
