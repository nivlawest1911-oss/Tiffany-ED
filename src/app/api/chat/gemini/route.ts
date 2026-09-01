import { streamText } from 'ai';
import { getGoogleAIKey, googleProvider, AI_MODELS } from '@/lib/ai-config';
import { assertHumanRequest } from '@/lib/security/bot-gate';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    const requestId = req.headers.get('x-request-id') || `req_${Date.now()}`;
    try {
        const gate = await assertHumanRequest(req, { routeName: 'chat/gemini' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const { messages } = await req.json();

        if (!getGoogleAIKey()) {
            return new Response(JSON.stringify({ error: 'AI Service Temporarily Unavailable' }), { status: 503 });
        }

        const result = await streamText({
            model: googleProvider(AI_MODELS.GOOGLE.FLASH),
            system: `You are the EdIntel Mentor for EdIntel. 
      Your identity is grounded in Transcend Holistic Wellness and the vision of Dr. Alvin West, Jr.
      You speak with doctoral-level authority, empathy, and regional awareness (Alabama/Mobile County).
      Focus on neuro-resilience, cognitive fitness, and Instructional Agency for administrators.
      Keep responses concise (under 3 sentences) unless a deep dive is requested.`,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error(`[GEMINI_ERROR] (Request ID: ${requestId}):`, error?.message);
        return new Response(JSON.stringify({ error: 'Neural Link Interrupted', requestId }), { status: 500 });
    }
}
