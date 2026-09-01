import { streamText } from 'ai';
import { INTELLIGENCE_MAP } from '@/lib/intelligence-engine';
import { queryEdIntelVault } from '@/lib/rag/rag-core';
import { getBirthCertificate } from '@/lib/supabase';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

// BigQuery logic moved to proxy API to prevent SDK leakage
export const runtime = 'nodejs';

export async function POST(req: Request) {
    const start = Date.now();
    const requestId = req.headers.get('x-request-id') || `req_${Date.now()}`;

    try {
        const gate = await assertHumanRequest(req, { routeName: 'ai/chat' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const { messages: rawMessages, protocolContext, companionId } = await req.json();

        // 1. Map messages from frontend format
        const messages = rawMessages.map((msg: any) => ({
            role: msg.role === 'assistant' || msg.role === 'avatar' ? 'assistant' : msg.role,
            content: msg.content || msg.text || '',
        }));

        const lastUserMessage = messages.findLast((m: any) => m.role === 'user')?.content || '';

        // 2. SOVEREIGN RAG: Retrieve grounded context from Knowledge Vault
        const { context: ragContext, sources: ragSources } = await queryEdIntelVault(lastUserMessage, companionId);

        // 3. Log User Input to BigQuery via Proxy API
        const logToBigQueryProxy = async (entry: any) => {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/logging/bigquery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(entry)
                });
            } catch (err) {
                console.error("[BigQuery Proxy Log Error]:", err);
            }
        };

        logToBigQueryProxy({
            role: 'user',
            content: lastUserMessage,
            model: 'gemini-1.5-pro',
            timestamp: new Date().toISOString(),
        });

        // 4. Fetch Companion Identity if companionId is provided
        let avatarName = 'Tier-1 EdIntel Delegate';
        let avatarRole = 'Strategic Doctoral Advisor';
        let customSystemPrompt = '';

        if (companionId) {
            const certificate = await getBirthCertificate(companionId);
            if (certificate) {
                avatarName = certificate.name;
                avatarRole = certificate.role;
                customSystemPrompt = certificate.masterSystemPrompt;
            }
        }

        // 5. Execute Stream with AI SDK (Gemini)
        const result = await streamText({
            model: googleProvider(AI_MODELS.GOOGLE.PRO),
            system: `You are ${avatarName}, an elite EdIntel Companion serving in the role of ${avatarRole}. 
            
            ${customSystemPrompt ? `CORE IDENTITY PROTOCOL:\n${customSystemPrompt}` : `Context: ${protocolContext || 'General Executive Assistance'}`}
            
            ${ragContext}
            
            Platform Features & Specialized Intelligence Nodes:
            ${JSON.stringify(Object.keys(INTELLIGENCE_MAP).map(key => ({ id: key, role: INTELLIGENCE_MAP[key].role, description: INTELLIGENCE_MAP[key].description.slice(0, 100) })), null, 2)}

            Directives:
            1. Speak with precision, authority, and empathy. You are a doctoral-level advisor.
            2. Prioritize "Instructional Agency" — returning time and choices to educators.
            3. Use terminology aligned with Alabama State Department of Education (ALSDE).
            4. If asked about compliance, cite FERPA and specific AL Acts (Literacy, Numeracy, RAISE).
            5. INTELLIGENCE FUSION: If the user's request aligns with an existing platform feature (listed above), proactively include a Protocol Token at the END of your response in the format: [PROTOCOL: ID]. Replace ID with the exact key from the feature list.
            6. CONTEXTUAL TRANSITIONS: You can optionally include a JSON payload within the token to pass context, v.g., [PROTOCOL: IEP Architect {"student": "John Doe", "focus": "Social Skills"}]. Only include payloads if you have specific student names or goals from the conversation.
            7. GROUNDED CITATION: If you used information from the 'GROUNDED INSTITUTIONAL CONTEXT' provided, you MUST append a Source Token at the absolute END of your response in the format: [SOURCES: ${JSON.stringify(ragSources.map(s => s.title))}]. Only include this if you actually used the vault context.
            8. Keep responses concise (under 3 sentences unless asked for a deep dive).`,
            messages,
            onFinish: async (event) => {
                const usage = extractUsageFromResult(event);
                void recordLlmUsage({
                    modelId: AI_MODELS.GOOGLE.PRO,
                    provider: 'google',
                    operation: 'companionChatStream',
                    route: 'api/ai/chat',
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.totalTokens,
                    isEstimated: usage.isEstimated,
                    latencyMs: Date.now() - start,
                    requestId,
                    success: true,
                });

                // Log Assistant Response to BigQuery via Proxy API
                await logToBigQueryProxy({
                    role: 'assistant',
                    content: event.text,
                    model: 'gemini-1.5-pro',
                    timestamp: new Date().toISOString(),
                    metadata: {
                        latencyMs: Date.now() - start,
                        finishReason: event.finishReason,
                        sources: ragSources.length
                    }
                });
            },
            abortSignal: req.signal,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error(`[AI_CHAT_ERROR] (Request ID: ${requestId}):`, error?.message);
        void recordLlmUsage({
            modelId: AI_MODELS.GOOGLE.PRO,
            provider: 'google',
            operation: 'companionChatStream',
            route: 'api/ai/chat',
            latencyMs: Date.now() - start,
            requestId,
            success: false,
            errorCode: error?.name || 'AI_CHAT_ERROR',
        });

        return new Response(JSON.stringify({ error: 'Neural Link Interrupted', requestId }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
