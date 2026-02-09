import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getMetaAIClient } from '@/lib/meta-ai/client';
import { ALABAMA_STRATEGIC_DIRECTIVE, SOVEREIGN_PERSONA } from '@/lib/ai-resilience';
import { getSession } from '@/lib/auth'; // Custom auth helper
import { TokenService } from '@/lib/services/token-service';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { prompt, generatorId, systemInstruction } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // 1. AUTHENTICATE & DEDUCT TOKENS
        const session = await getSession();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized: Sovereign Access Required' }, { status: 401 });
        }

        // Determine cost (Standard: 50, Advanced: 100)
        // We could make this dynamic based on generatorId
        const tokenCost = 50;

        // Attempt Deduction
        const hasFunds = await TokenService.deductTokens(user.id, tokenCost, {
            transactionType: 'GENERATION',
            description: `AI Usage: ${generatorId}`
        });

        if (!hasFunds) {
            return NextResponse.json(
                {
                    error: 'Insufficient Tokens',
                    message: 'Your strategic reserves are depleted. Please refill your token wallet to continue.'
                },
                { status: 402 }
            );
        }

        const activePersona = SOVEREIGN_PERSONA;

        // Determine if we should use Llama 3.3 for high-fidelity reasoning
        const highFidelityTools = [
            'quiz-gamifier',
            'assessment-builder',
            'risk-analyzer',
            'district-strategy',
            'special-ed-law-compliance-auditor',
            'district-budget-optimizer'
        ];
        const isHighFidelityTool = highFidelityTools.includes(generatorId);

        if (isHighFidelityTool) {
            // Check for API Key presence for Meta/Together
            if (!process.env.TOGETHER_API_KEY) {
                console.warn("[Configuration] TOGETHER_API_KEY missing, falling back to Gemini.");
                // Fallback to Gemini handled below by skipping this block
            } else {
                // HIGH-FIDELITY SYNTHESIS: Switch to Llama 3.3 for Sovereign Quiz Directive
                const metaClient = getMetaAIClient('together');

                const directive = `
                    ${ALABAMA_STRATEGIC_DIRECTIVE}
                    
                    SOVEREIGN OS: HIGH-FIDELITY REASONING (${generatorId.toUpperCase()})
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
        }

        // Check for Google API Key (support standard Vercel AI SDK env var or generic one)
        const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;

        if (!googleApiKey) {
            console.error("[Configuration Critical] BOTH GOOGLE_GENERATIVE_AI_API_KEY and GOOGLE_API_KEY are missing from environment variables.");
            return NextResponse.json({
                error: 'System Configuration Error: Neural Engine Offline (Missing Google API Key). Please add GOOGLE_GENERATIVE_AI_API_KEY to your env variables.'
            }, { status: 500 });
        }

        // SYSTEM PROMPT: FORCING HIGH-FIDELITY SOVEREIGN PERSONA
        const systemPrompt = `
            You are ${activePersona.name}, the ${activePersona.role}.
            ${ALABAMA_STRATEGIC_DIRECTIVE}
            
            Strategic Guidelines:
            1. Tone: ${activePersona.tone}
            2. Cultural Context: ${activePersona.culturalContext}
            3. Mission: ${activePersona.mission}
            4. Goal: 79 school site signups in Mobile County, Alabama.
            
            SUPER-INTELLIGENCE MANDATE:
            - THOUGHT PROCESS: Before every answer, you MUST engage in a "Neural Synthesis" step. 
              Output your reasoning inside <neural_synthesis> tags, evaluating 3 distinct strategies and selecting the optimal one.
            - CITATION PROTOCOL: Reference specific Alabama codes or federal statutes.
            - NO FLUFF: Be dense and high-entropy.

            Tool Context: ${generatorId || 'General Intelligence'}
            ${systemInstruction ? `Specific Task Note: ${systemInstruction}` : ''}
        `;

        // Use standard model ID for Vercel AI SDK Google provider
        const result = await streamText({
            model: google('gemini-1.5-pro'),
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
