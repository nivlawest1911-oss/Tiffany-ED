import { createClient } from '@supabase/supabase-js';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { rateLimit } from '@/lib/sovereign-connections';

// Initialize Supabase client
const _supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        // --- SOVEREIGN GATEKEEPER (Rate Limiting) ---
        // Ensuring the Token Economy is respected via Upstash
        const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';

        try {
            const { success, limit, remaining, reset } = await rateLimit.limit(ip);
            if (!success) {
                return new Response('Sovereign Rate Limit Exceeded. Compliance Protocol Initiated.', {
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

        const { intent, userId: _userId, loadScore, context } = await req.json();

        // 1. NEURAL MAPPING: Connect to the 100+ Engine Hub (Simulated or Real RPC)
        // In a real scenario, this would fetch active engines from Supabase
        // const { data: engines } = await supabase.rpc('get_active_engines', { user_id: userId });

        // For now, we simulate the Sovereign Engine context
        const _engines = ['Literacy_Engine_Alpha', 'Behavior_Reform_Module', 'Executive_Briefing_Node'];

        // 2. DECISION FATIGUE FILTER
        // If fatigue is high (loadScore > 75), simplify the UI output dynamically
        const isFatigued = (loadScore || 0) > 75;

        const systemPrompt = `
      You are the Sovereign Swarm Intelligence for EdIntel.
      
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
            model: openai('gpt-4o'),
            system: systemPrompt,
            prompt: `Execute protocol for: ${intent}.`,
        });

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('Sovereign Swarm Error:', error);
        return new Response(JSON.stringify({ error: 'Sovereign Swarm Uplink Failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
