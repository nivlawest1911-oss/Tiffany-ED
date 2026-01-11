import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { prompt, generatorId, stream = true } = await request.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Free Tier Simulation
        if (!apiKey) {
            console.log('[AI] Free Tier Mode');

            const simulatedContent = `🤖 **EdIntel Free Tier**\n\nRequest: "${prompt}"\n\n**Demo Response:**\nThis is the EdIntel AI system demonstration. Configure \`GOOGLE_GENAI_API_KEY\` in Vercel to unlock:\n\n✅ Real-time AI generation\n✅ 50+ specialized education tools\n✅ Standards-aligned content\n✅ Compliance-ready documents\n\n*Activate Intelligence Engine in Vercel Settings*`;

            if (stream) {
                const encoder = new TextEncoder();
                const readable = new ReadableStream({
                    async start(controller) {
                        for (const char of simulatedContent) {
                            controller.enqueue(encoder.encode(char));
                            await new Promise(resolve => setTimeout(resolve, 20));
                        }
                        controller.close();
                    }
                });
                return new Response(readable, {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            }

            return new Response(JSON.stringify({
                content: simulatedContent,
                metadata: { model: 'simulation', generatorId }
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Real AI Generation
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

function getSystemPrompt(generatorId: string): string {
    const prompts: Record<string, string> = {
        'iep-architect': 'You are an expert special education coordinator with 15+ years experience. Generate IDEA-compliant IEP content with measurable SMART goals, appropriate accommodations, and best practices. Use professional language and cite regulations.',

        'lesson-planner': 'You are a master curriculum designer. Create comprehensive lesson plans aligned with Alabama Course of Study. Include: objectives, materials, procedures, differentiation, assessment, and extensions.',

        'email-composer': 'You are a professional education communicator. Draft clear, empathetic, action-oriented emails. Maintain appropriate tone for audience (parents, staff, students, community). Include subject lines.',

        'policy-advisor': 'You are an education law expert in K-12 compliance. Provide guidance on IDEA, Section 504, FERPA, Title IX with accurate citations. Explain complex legal concepts accessibly.',

        'behavior-coach': 'You are a certified behavior analyst and PBIS expert. Provide evidence-based positive interventions, de-escalation techniques, and proactive management. Focus on relationships and replacement behaviors.',

        'recommendation-writer': 'You are an experienced educator writing compelling recommendations. Create personalized, specific letters highlighting unique strengths with concrete examples. Use professional yet warm tone.',

        'grant-writer': 'You are a professional grant writer. Write compelling narratives, clear objectives, realistic budgets, measurable outcomes. Use data-driven language aligned with funder priorities.',

        'assessment-builder': 'You are an assessment design specialist. Create valid, reliable assessments with clear targets, varied questions, appropriate difficulty, aligned rubrics. Include answer keys.',

        'rubric-maker': 'You are a rubric design expert. Create detailed, clear grading rubrics with specific criteria, performance levels, and point values. Make expectations transparent for students.',

        'field-trip-architect': 'You are an experiential learning coordinator. Plan educational excursions with learning objectives, logistics, safety protocols, permission forms, and assessment strategies.',

        'substitute-binder-pro': 'You are an organizational expert for educators. Create comprehensive substitute teacher packets with schedules, procedures, emergency protocols, and engaging lesson plans.',

        'conflict-mediator': 'You are a restorative practices specialist. Provide scripts and strategies for conflict resolution using active listening, empathy, and problem-solving frameworks.',

        'schedule-optimizer': 'You are a master scheduler for schools. Analyze constraints and suggest optimal schedules balancing teacher prep, student needs, facility usage, and instructional time.',

        'default': 'You are EdIntel, an advanced AI specialized in K-12 education. You have expertise in curriculum, instruction, special education, administration, and compliance. Provide helpful, accurate, actionable, research-based responses.'
    };

    return prompts[generatorId] || prompts['default'];
}

export async function GET() {
    return new Response(JSON.stringify({
        status: 'operational',
        aiReady: !!apiKey,
        model: apiKey ? 'gemini-2.0-flash-exp' : 'simulation'
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
