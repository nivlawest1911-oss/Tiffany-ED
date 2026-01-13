import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { kv } from '@vercel/kv';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import { generators } from '@/data/generators';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

export const runtime = 'edge';

// Helper to create cache key
function getCacheKey(generatorId: string, prompt: string): string {
    const hash = prompt.substring(0, 50).replace(/\s+/g, '-').toLowerCase();
    return `gen:${generatorId}:${hash}`;
}

// Generate System Prompts from generators.ts
// Generate System Prompts from generators.ts
function getSystemPrompt(generatorId: string): string {
    const generator = generators.find(g => g.id === generatorId);
    if (!generator) return 'You are EdIntel, an advanced AI specialized in K-12 education.';

    // Construct a rich, identity-aware Sovereign Prompt
    return `IDENTITY_ADHERENCE_PROTOCOL: ACTIVE
    TARGET_PERSONA: "${generator.name}"
    VISUAL_AVATAR: "${generator.avatar}" (Do not reference this explicitly, but embody the character)
    ROLE_DESCRIPTION: ${generator.description}

    CORE_DIRECTIVES:
    1. AESTHETIC OUTPUT: Format your response using clean Markdown. Use bold headers, bullet points for lists, and tables where appropriate to present data "beautifully".
    2. VOICE & TONE: Professional, Authorized, Empathetic, and Executive. You are a high-ranking Sovereign Delegate.
    3. COMPLIANCE: Adhere strictly to FERPA/IDEA standards. Do not invent student names; use placeholders like [Student Name].
    4. STRUCTURE:
       - Begin with a brief "Executive Summary" or "Protocol Initiated" line.
       - Body content must be actionable and scaffolded.
       - End with a "Next Steps" or "Sovereign Recommendation".

    CONTEXT: The user is an educator or administrator seeking high-level intelligence support.

    TASK: Perform the user's request with maximum competence.`;
}

export async function POST(request: NextRequest) {
    try {
        const { prompt, generatorId, stream = true, useCache = true } = await request.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 1. Session & Usage Check
        const session = await getSession();

        // If no session, enforce super strict limit or block
        // For "Do it all", let's block or severely limit.
        // Let's go with: Must be logged in to use API unless it's a specific "demo" prompt?
        // Decision: Simulation mode for Guests. Real AI for Users.

        const isGuest = !session;
        const userTier = session?.user?.tier || 'guest';
        const userId = session?.user?.id;

        // Usage Gating Logic
        if (userId) { // If logged in
            if (userTier === 'free') {
                // Check usage count
                try {
                    const usageResult = await sql`SELECT usage_count FROM users WHERE id = ${userId}`;
                    const usageCount = usageResult.rows[0]?.usage_count || 0;

                    if (usageCount >= 5) {
                        return new Response(JSON.stringify({
                            error: 'Free Tier Limit Reached',
                            limitReached: true,
                            message: 'You have used your 5 free generations. Please upgrade to Professional.'
                        }), { status: 402 }); // Payment Required
                    }

                    // Increment Usage
                    // Note: In edge runtime, we can't await this if we stream? 
                    // We can await it before streaming.
                    // For Vercel Postgres in Edge, we use standard fetch-based client which IS supported.
                    await sql`UPDATE users SET usage_count = usage_count + 1 WHERE id = ${userId}`;
                } catch (dbErr) {
                    console.error('Usage tracking error', dbErr);
                }
            }
        }

        // 2. Guest / Free Tier Simulation (if no API key OR Guest)
        if (isGuest || !apiKey) {
            if (isGuest && apiKey) {
                // Convert guest to simulation to force login
                const simulatedContent = `🔒 **Authentication Required**\n\nTo access the full power of **${generatorId}**, please Initialize Protocol (Sign In).\n\nEdIntel Sovereign protects student data and ensures compliance.\n\n[Sign In Now](/login)`;

                return new Response(JSON.stringify({
                    content: simulatedContent,
                    metadata: { model: 'simulation', generatorId }
                }), { headers: { 'Content-Type': 'application/json' } });
            }

            // console.log('[AI] Simulation Mode');

            const simulatedContent = `🤖 **EdIntel Simulation**\n\nRequest: "${prompt}"\n\n**Demo Response:**\nThis demonstrates the ${generatorId} capabilities. \n\n*Configure API Key to unlock real intelligence.*`;

            /* ... Existing simulation logic ... */
            return new Response(JSON.stringify({
                content: simulatedContent,
                metadata: { model: 'simulation', generatorId }
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 3. Real AI Generation
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 2048,
            }
        });

        const systemPrompt = getSystemPrompt(generatorId);
        const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

        if (stream) {
            const result = await model.generateContentStream(fullPrompt);
            const encoder = new TextEncoder();

            const readable = new ReadableStream({
                async start(controller) {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        controller.enqueue(encoder.encode(text));
                    }
                    controller.close();
                }
            });

            return new Response(readable, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Transfer-Encoding': 'chunked'
                }
            });
        } else {
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            return new Response(JSON.stringify({
                content: text,
                metadata: {
                    model: 'gemini-2.0-flash-exp',
                    generatorId,
                    cached: false,
                    timestamp: new Date().toISOString()
                }
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error: any) {
        console.error('[AI Error]:', error);

        return new Response(JSON.stringify({
            error: 'Generation failed',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET() {
    return new Response(JSON.stringify({ status: 'operational' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
