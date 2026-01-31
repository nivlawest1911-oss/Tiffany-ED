import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getMetaAIClient } from '@/lib/meta-ai/client';
import { ALABAMA_STRATEGIC_DIRECTIVE, SOVEREIGN_PERSONA } from '@/lib/ai-resilience';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { prompt, generatorId, systemInstruction } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const activePersona = SOVEREIGN_PERSONA;

        // Determine if we should use Llama 3.3 for Quiz Synthesis
        const isQuizTool = generatorId === 'quiz-gamifier' || generatorId === 'assessment-builder';

        if (isQuizTool) {
            // HIGH-FIDELITY SYNTHESIS: Switch to Llama 3.3 for Sovereign Quiz Directive
            const metaClient = getMetaAIClient('together');

            const directive = `
                ${ALABAMA_STRATEGIC_DIRECTIVE}
                
                SOVEREIGN OS: QUIZ SYNTHESIS SPECIFIC
                Tool Name: ${generatorId}
                User: ${activePersona.name} (${activePersona.role})
            `;

            try {
                // Use streaming completion for the UI
                const stream = metaClient.chatStream({
                    messages: [
                        { role: 'system', content: directive },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 3000
                });

                // Convert Meta AI AsyncGenerator to a response compatible with AI SDK
                const encoder = new TextEncoder();
                const readableStream = new ReadableStream({
                    async start(controller) {
                        try {
                            for await (const chunk of stream) {
                                controller.enqueue(encoder.encode(chunk));
                            }
                            controller.close();
                        } catch (err) {
                            controller.error(err);
                        }
                    }
                });

                return new Response(readableStream, {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            } catch (llamaError) {
                console.warn("[Synthesis Failover] Llama 3.3 overloaded, falling back to Gemini.", llamaError);
                // Continue to Gemini fallback
            }
        }

        // SYSTEM PROMPT: FORCING HIGH-FIDELITY SOVEREIGN PERSONA
        const systemPrompt = systemInstruction || `
            ${ALABAMA_STRATEGIC_DIRECTIVE}
            
            You are ${activePersona.name}, the ${activePersona.role}.
            
            Strategic Guidelines:
            1. Tone: ${activePersona.tone}
            2. Cultural Context: ${activePersona.culturalContext}
            3. Mission: ${activePersona.mission}
            4. Goal: 79 school site signups in Mobile County, Alabama.
            
            Identify as the specialist for ${generatorId || 'this area'}.
        `;

        const result = await streamText({
            model: google('models/gemini-1.5-pro-latest'),
            system: systemPrompt,
            prompt: prompt,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('Generation Error:', error);

        // Professional Shield: Robust error reporting
        const status = (error.message.includes('503') || error.message.includes('overloaded')) ? 503 : 500;
        return NextResponse.json(
            { error: error.message || 'Generation failed', retryable: status === 503 },
            { status }
        );
    }
}
