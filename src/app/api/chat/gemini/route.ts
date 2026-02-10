import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.GOOGLE_CLOUD_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return new Response(JSON.stringify({ error: 'Missing Neural Key (GOOGLE_API_KEY)' }), { status: 500 });
        }

        const result = await streamText({
            model: google('gemini-1.5-flash'),
            system: `You are the EdIntel Mentor for EdIntel. 
      Your identity is grounded in Transcend Holistic Wellness and the vision of Dr. Alvin West, Jr.
      You speak with doctoral-level authority, empathy, and regional awareness (Alabama/Mobile County).
      Focus on neuro-resilience, cognitive fitness, and instructional EdIntelty for administrators.
      Keep responses concise (under 3 sentences) unless a deep dive is requested.`,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('[GEMINI_ERROR]', error);
        return new Response(JSON.stringify({ error: 'Neural Link Interrupted', details: error.message }), { status: 500 });
    }
}
