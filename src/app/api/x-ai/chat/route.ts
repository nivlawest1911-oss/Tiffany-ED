/**
 * X.AI (Grok) Chat API
 * POST /api/x-ai/chat
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIDispatcher } from '@/lib/ai/dispatcher';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, model, temperature, maxTokens } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        const result = await AIDispatcher.stream({
            provider: 'xai',
            model: model || 'grok-1',
            messages,
            temperature,
            maxTokens,
        });

        return result.toDataStreamResponse();
    } catch (error: any) {
        console.error('X.AI Chat Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
