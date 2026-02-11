import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { logToBigQuery } from '@/lib/bigquery-logger';
import { INTELLIGENCE_MAP } from '@/lib/intelligence-engine';

// BigQuery requires Node.js runtime
export const runtime = 'nodejs';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

export async function POST(req: Request) {
    const start = Date.now();

    try {
        const { messages: rawMessages, protocolContext } = await req.json();

        // 1. Map messages from frontend format
        const messages = rawMessages.map((msg: any) => ({
            role: msg.role === 'avatar' ? 'assistant' : msg.role,
            content: msg.content || msg.text || '',
        }));

        const lastUserMessage = messages.findLast((m: any) => m.role === 'user')?.content || '';

        // 2. Log User Input to BigQuery (Async) - Fire and forget
        logToBigQuery({
            role: 'user',
            content: lastUserMessage,
            model: 'gemini-1.5-pro',
            timestamp: new Date(),
        }).catch(err => console.error("BigQuery Log Error:", err));

        // 3. Execute Stream with AI SDK (Gemini)
        const result = await streamText({
            model: google('gemini-1.5-pro'),
            system: `You are a Tier-1 EdIntel Delegate for EdIntel. 
            Context: ${protocolContext || 'General Executive Assistance'}
            
            Platform Features & Specialized Intelligence Nodes:
            ${JSON.stringify(Object.keys(INTELLIGENCE_MAP).map(key => ({ id: key, role: INTELLIGENCE_MAP[key].role, description: INTELLIGENCE_MAP[key].description.slice(0, 100) })), null, 2)}

            Directives:
            1. Speak with precision, authority, and empathy. You are a doctoral-level advisor.
            2. Prioritize "Instructional Agency"—returning time and choices to educators.
            3. Use terminology aligned with Alabama State Department of Education (ALSDE).
            4. If asked about compliance, cite FERPA and specific AL Acts (Literacy, Numeracy, RAISE).
            5. INTELLIGENCE FUSION: If the user's request aligns with an existing platform feature (listed above), proactively include a Protocol Token at the END of your response in the format: [PROTOCOL: ID]. Replace ID with the exact key from the feature list.
            6. CONTEXTUAL TRANSITIONS: You can optionally include a JSON payload within the token to pass context, e.g., [PROTOCOL: IEP Architect {"student": "John Doe", "focus": "Social Skills"}]. Only include payloads if you have specific student names or goals from the conversation.
            7. Keep responses concise (under 3 sentences unless asked for a deep dive).`,
            messages,
            onFinish: async (event) => {
                // Log Assistant Response to BigQuery
                await logToBigQuery({
                    role: 'assistant',
                    content: event.text,
                    model: 'gemini-1.5-pro',
                    timestamp: new Date(),
                    metadata: {
                        latencyMs: Date.now() - start,
                        finishReason: event.finishReason
                    }
                }).catch(err => console.error("BigQuery Log Error:", err));
            },
            abortSignal: req.signal,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("[AI_CHAT_ERROR]", error);

        const errorMessage = error.message?.includes('API key')
            ? 'Missing Neural Key (GOOGLE_GENAI_API_KEY)'
            : 'Neural Link Severed';

        return new Response(JSON.stringify({ error: errorMessage, details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
