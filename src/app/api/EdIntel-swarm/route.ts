import { createClient } from '@supabase/supabase-js';
import { streamText } from 'ai';
import { openaiProvider, AI_MODELS } from '@/lib/ai-config';
import { rateLimit } from '@/lib/EdIntel-connections';
import { assertHumanRequest } from '@/lib/security/ironshield-gate';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const _supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function POST(req: Request) {
    const start = Date.now();
    const modelId = AI_MODELS.OPENAI.PRIMARY;

    try {
        const gate = await assertHumanRequest(req, { routeName: 'EdIntel-swarm' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        // --- EdIntel GATEKEEPER (Rate Limiting) ---
        // Ensuring the Token Economy is respected via Upstash
        const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';

        try {
            const { success, limit, remaining, reset } = await rateLimit.limit(ip);
            if (!success) {
                return new Response('EdIntel Rate Limit Exceeded. Compliance Protocol Initiated.', {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString(),
                    },
                });
            }
        } catch (e) {
            // Fail open if Redis is down/unconfigured in dev
            console.warn('Rate Limit Check Failed (Fail Open):', e);
        }

        const { intent, userId, loadScore, context } = await req.json();

        // 1. NEURAL MAPPING: Connect to the 100+ Engine Hub (Simulated or Real RPC)
        const _engines = ['Literacy_Engine_Alpha', 'Behavior_Reform_Module', 'Executive_Briefing_Node'];

        // 2. DECISION FATIGUE FILTER
        // If fatigue is high (loadScore > 75), simplify the UI output dynamically
        const isFatigued = (loadScore || 0) > 75;

        const systemPrompt = `
      You are the EdIntel Swarm Intelligence for EdIntel.
      
      User Context: ${context || 'Mobile County Public Schools System'}
      Current Cognitive Load: ${loadScore || 0}%
      Fatigue Component: ${isFatigued ? 'ACTIVE - REDUCE COGNITIVE FRICTION' : 'STABLE - PROVIDE COMPREHENSIVE DATA'}
      
      AESTHETIC INSTRUCTION:
      Maintain a tone that is "Regal, Intellectual, and Authoritative" yet "Empathetic and Cultured". 
      Use the "African American Professional" aesthetic: Bold, soulful, excellence-driven.
      
      OBJECTIVE:
      Generate a response for the intent: "${intent}".
      
      ${isFatigued
                ? 'INSTRUCTION: The user is experiencing decision fatigue. Provide exactly TWO binary options for immediate action. Do not overwhelm. Be concise.'
                : 'INSTRUCTION: The user is cognitively fit. Provide a robust, peer-reviewed, multi-faceted strategy. detailed analysis, and step-by-step execution protocols.'}
    `;

        // 3. GENERATIVE OUTPUT
        // Using Vercel AI SDK to stream the response
        const result = streamText({
            model: openaiProvider(modelId),
            system: systemPrompt,
            prompt: `Execute protocol for: ${intent}.`,
            onFinish: (event) => {
                const usage = extractUsageFromResult(event);
                void recordLlmUsage({
                    modelId,
                    provider: 'openai',
                    operation: 'EdIntelSwarmStream',
                    route: 'api/EdIntel-swarm',
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.totalTokens,
                    isEstimated: usage.isEstimated,
                    latencyMs: Date.now() - start,
                    userId,
                    success: true,
                });
            },
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('EdIntel Swarm Error:', error);
        void recordLlmUsage({
            modelId,
            provider: 'openai',
            operation: 'EdIntelSwarmStream',
            route: 'api/EdIntel-swarm',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'SWARM_STREAM_ERROR',
        });
        return new Response(JSON.stringify({ error: 'EdIntel Swarm Uplink Failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
