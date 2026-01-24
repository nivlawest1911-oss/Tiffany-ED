import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { messages: rawMessages, protocolContext } = await req.json();

        // 1. Map messages from frontend format
        const messages = rawMessages.map((msg: any) => ({
            role: msg.role === 'avatar' ? 'assistant' : msg.role,
            content: msg.content || msg.text || '',
        }));

        // 2. Execute Stream with AI SDK
        const result = await streamText({
            model: openai('gpt-4o'),
            system: `You are a Tier-1 Sovereign Delegate for EdIntel. 
            Context: ${protocolContext || 'General Executive Assistance'}
            
            Directives:
            1. Speak with precision, authority, and empathy. You are a doctoral-level advisor.
            2. Prioritize "Instructional Sovereignty"—returning time and choices to educators.
            3. Use terminology aligned with Alabama State Department of Education (ALSDE).
            4. If asked about compliance, cite FERPA and specific AL Acts (Literacy, Numeracy, RAISE).
            5. Keep responses concise (under 3 sentences unless asked for a deep dive).`,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("[AI_CHAT_ERROR]", error);

        // Provide more detailed error if possible (safe for dev)
        const errorMessage = error.message?.includes('API key')
            ? 'Missing Neural Key (OPENAI_API_KEY)'
            : 'Neural Link Severed';

        return NextResponse.json({ error: errorMessage, details: error.message }, { status: 500 });
    }
}
