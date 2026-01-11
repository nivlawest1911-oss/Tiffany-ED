import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { kv } from '@vercel/kv';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

export const runtime = 'edge';

// Helper to create cache key
function getCacheKey(generatorId: string, prompt: string): string {
    const hash = prompt.substring(0, 50).replace(/\s+/g, '-').toLowerCase();
    return `chat:${generatorId}:${hash}`;
}

// System prompts for different generators
function getSystemPrompt(generatorId: string): string {
    const prompts: Record<string, string> = {
        'iep-architect': 'You are an expert special education coordinator with 15+ years experience. Generate IDEA-compliant IEP content with measurable SMART goals, appropriate accommodations, and best practices. Use professional language and cite regulations when relevant.',

        'lesson-planner': 'You are a master curriculum designer. Create comprehensive lesson plans aligned with educational standards. Include: clear objectives, required materials, step-by-step procedures, differentiation strategies, assessment methods, and extension activities.',

        'email-composer': 'You are a professional education communicator. Draft clear, empathetic, action-oriented emails. Maintain appropriate tone for your audience (parents, staff, students, community). Always include a clear subject line.',

        'policy-advisor': 'You are an education law expert in K-12 compliance. Provide guidance on IDEA, Section 504, FERPA, Title IX with accurate citations. Explain complex legal concepts in accessible language.',

        'behavior-coach': 'You are a certified behavior analyst and PBIS expert. Provide evidence-based positive interventions, de-escalation techniques, and proactive classroom management strategies. Focus on building relationships and teaching replacement behaviors.',

        'default': 'You are EdIntel, an advanced AI specialized in K-12 education. You have deep expertise in curriculum design, instructional strategies, special education, school administration, and educational compliance. Provide helpful, accurate, actionable, and research-based responses.'
    };

    return prompts[generatorId] || prompts['default'];
}

export async function POST(request: NextRequest) {
    try {
        const { messages, generatorId = 'default' } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: 'Messages array is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get the last user message
        const lastMessage = messages[messages.length - 1];
        const prompt = lastMessage.content;

        // Check cache first (if enabled and KV is available)
        if (process.env.KV_REST_API_URL) {
            try {
                const cacheKey = getCacheKey(generatorId, prompt);
                const cached = await kv.get<string>(cacheKey);

                if (cached) {
                    console.log('[CACHE HIT]', cacheKey);

                    // Return cached response in streaming format
                    const encoder = new TextEncoder();
                    const stream = new ReadableStream({
                        start(controller) {
                            controller.enqueue(encoder.encode(cached));
                            controller.close();
                        }
                    });

                    return new Response(stream, {
                        headers: {
                            'Content-Type': 'text/plain; charset=utf-8',
                            'Transfer-Encoding': 'chunked'
                        }
                    });
                }
            } catch (cacheError) {
                console.warn('[CACHE ERROR]', cacheError);
                // Continue without cache if it fails
            }
        }

        // Free Tier Simulation (if no API key)
        if (!apiKey) {
            console.log('[AI] Free Tier Mode');

            const simulatedContent = `🤖 **EdIntel Free Tier Demo**

**Your Request:** "${prompt}"

**Demo Response:**
This is the EdIntel AI system demonstration. To unlock full AI capabilities:

✅ Configure \`GOOGLE_GENAI_API_KEY\` in Vercel
✅ Access 50+ specialized education tools
✅ Generate standards-aligned content
✅ Create compliance-ready documents
✅ Get real-time AI assistance

*Activate the Intelligence Engine in your Vercel project settings to enable production AI features.*`;

            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    for (const char of simulatedContent) {
                        controller.enqueue(encoder.encode(char));
                        await new Promise(resolve => setTimeout(resolve, 20));
                    }
                    controller.close();
                }
            });

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Transfer-Encoding': 'chunked'
                }
            });
        }

        // Real AI Generation with Google Gemini
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

        // Build conversation history
        const systemPrompt = getSystemPrompt(generatorId);
        const conversationHistory = messages.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Add system context to first message
        if (conversationHistory.length > 0) {
            conversationHistory[0].parts[0].text = `${systemPrompt}\n\n${conversationHistory[0].parts[0].text}`;
        }

        // Generate streaming response
        const chat = model.startChat({
            history: conversationHistory.slice(0, -1),
        });

        const result = await chat.sendMessageStream(conversationHistory[conversationHistory.length - 1].parts[0].text);

        const encoder = new TextEncoder();
        let fullResponse = '';

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        fullResponse += text;
                        controller.enqueue(encoder.encode(text));
                    }
                    controller.close();

                    // Cache the complete response (fire and forget)
                    if (process.env.KV_REST_API_URL) {
                        const cacheKey = getCacheKey(generatorId, prompt);
                        kv.set(cacheKey, fullResponse, { ex: 3600 }).catch(err =>
                            console.warn('[CACHE SAVE ERROR]', err)
                        );
                        console.log('[CACHE SAVED]', cacheKey);
                    }
                } catch (error) {
                    console.error('[STREAM ERROR]', error);
                    controller.error(error);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked'
            }
        });

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
    const kvAvailable = !!process.env.KV_REST_API_URL;

    return new Response(JSON.stringify({
        status: 'operational',
        aiReady: !!apiKey,
        cacheReady: kvAvailable,
        model: apiKey ? 'gemini-2.0-flash-exp' : 'simulation',
        features: {
            streaming: true,
            caching: kvAvailable,
            multiTurn: true
        }
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
