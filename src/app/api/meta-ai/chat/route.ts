import { NextRequest, NextResponse } from 'next/server';
import { getMetaAIClient } from '@/lib/meta-ai/client';

/**
 * Meta AI Chat Endpoint
 * Supports Llama models via multiple providers
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, provider, model, temperature, max_tokens } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        const client = getMetaAIClient(provider);

        const response = await client.chat({
            messages,
            model,
            temperature,
            max_tokens,
        });

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in Meta AI chat:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to process chat' },
            { status: 500 }
        );
    }
}

/**
 * Generate educational content
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const topic = searchParams.get('topic');
        const gradeLevel = searchParams.get('gradeLevel');
        const format = searchParams.get('format') as any;

        if (!topic || !gradeLevel) {
            return NextResponse.json(
                { error: 'Topic and grade level are required' },
                { status: 400 }
            );
        }

        const client = getMetaAIClient();

        const content = await client.generateEducationalContent(topic, gradeLevel, {
            format: format || 'explanation',
        });

        return NextResponse.json({ content });
    } catch (error) {
        console.error('Error generating educational content:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate content' },
            { status: 500 }
        );
    }
}
