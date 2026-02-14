import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getMetaAIClient } from '@/lib/meta-ai/client';
import { ALABAMA_STRATEGIC_DIRECTIVE, EdIntel_PERSONA } from '@/lib/ai-resilience';
import { getSession } from '@/lib/auth'; // Custom auth helper
import { TokenService } from '@/lib/services/token-service';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { prompt, generatorId, systemInstruction, delegate } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // 1. AUTHENTICATE & DEDUCT TOKENS
        // CRITICAL FIX: Ensure session is fully resolved before stream starts.
        const session = await getSession();

        if (!session?.user) {
            console.warn("[API Security] Unauthorized access attempt blocked.");
            return NextResponse.json({ error: 'Unauthorized: EdIntel Access Required' }, { status: 401 });
        }

        const user = session.user;

        // Determine cost (Standard: 50, Advanced: 100)
        // We could make this dynamic based on generatorId
        const tokenCost = 50;

        // Attempt Deduction
        const hasFunds = await TokenService.deductTokens(user.id, tokenCost, {
            transactionType: 'GENERATION',
            description: `AI Usage: ${generatorId}`
        }, user.tier);

        if (!hasFunds) {
            return NextResponse.json(
                {
                    error: 'Insufficient Tokens',
                    message: 'Your strategic reserves are depleted. Please refill your token wallet to continue.'
                },
                { status: 402 }
            );
        }

        // DYNAMIC PERSONA SELECTION
        // If delegate context is passed, use it. Otherwise fall back to Dr. Alvin.
        const activePersona = delegate ? {
            name: delegate.name || EdIntel_PERSONA.name,
            role: delegate.role || EdIntel_PERSONA.role,
            tone: EdIntel_PERSONA.tone, // Maintain professional tone
            culturalContext: EdIntel_PERSONA.culturalContext,
            mission: EdIntel_PERSONA.mission
        } : EdIntel_PERSONA;

        // Determine if we should use Llama 3.3 for high-fidelity reasoning
        const highFidelityTools = [
            'quiz-gamifier',
            'assessment-builder',
            'risk-analyzer',
            'district-strategy',
            'special-ed-law-compliance-auditor',
            'district-budget-optimizer',
            'iep-architect',
            'lesson-planner',
            'data-analyzer',
            'behavior-coach',
            'substitute-binder-pro',
            'grant-compliance-auditor',
            'rubric-maker',
            'conflict-mediator',
            'schedule-optimizer',
            'sports-eligibility-tracker',
            'dyslexia-resource-gen',
            'email-composer',
            'policy-advisor',
            'cognitive-gym',
            'idea-generator',
            'code-commander',
            'comms-director',
            'design-studio',
            'meeting-prep',
            'differentiation-planner',
            'parent-communicator',
            'student-goal-setter',
            'study-guide-maker',
            'writing-coach',
            'video-lesson-planner',
            'college-essay-coach',
            'science-fair-mentor',
            'math-tutor-pro',
            'debate-prep',
            'bus-route-optimizer',
            'budget-allocator',
            'project-pbl-architect',
            'safety-drill-master',
            'newsletter-wizard',
            'staff-retention-prophet',
            'equity-audit-protocol',
            'fiscal-strategist',
            'enrollment-forecaster',
            'classroom-decor-ai',
            'teacher-wellness-guide',
            'strategic-visionary',
            'hr-talent-scout',
            'restorative-justice-guide',
            'grant-narrative-architect',
            'crisis-ops-lead',
            'plc-facilitator',
            '504-compliance-officer',
            'instructional-mastery-coach',
            'family-community-nexus',
            'digital-innovation-architect',
            'board-governance-strategist',
            'culture-climate-architect',
            'cte-industry-liaison',
            'ell-success-coordinator',
            'gt-gifted-architect',
            'athletic-director-pro',
            'alumni-relations-manager',
            'restorative-dean',
            'testing-coordinator-pro',
            'facilities-ops-manager',
            'transportation-logistics',
            'substitute-manager',
            'mental-health-lead',
            'social-media-manager',
            'literacy-architect',
            'math-interventionist',
            'early-learning-director',
            'transition-coordinator',
            'library-media-specialist',
            'dual-language-bridge',
            'federal-programs-director',
            'magnet-coordinator',
            'attendance-officer',
            'school-registrar',
            'procurement-specialist',
            'pd-coordinator',
            'mckinney-vento-liaison',
            'foster-care-poc',
            'school-health-director',
            'after-school-director',
            'volunteer-coordinator'
        ];
        const isHighFidelityTool = highFidelityTools.includes(generatorId);

        if (isHighFidelityTool) {
            // Check for API Key presence for Meta/Together
            if (!process.env.TOGETHER_API_KEY) {
                console.warn("[Configuration] TOGETHER_API_KEY missing, falling back to Gemini.");
                // Fallback to Gemini handled below by skipping this block
            } else {
                // HIGH-FIDELITY SYNTHESIS: Switch to Llama 3.3 for EdIntel Quiz Directive
                const metaClient = getMetaAIClient('together');

                const directive = `
                    ${ALABAMA_STRATEGIC_DIRECTIVE}
                    
                    EdIntel OS: HIGH-FIDELITY REASONING (${generatorId.toUpperCase()})
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
            console.warn("[Configuration] GOOGLE_API_KEY missing. Activation Simulation Mode.");

            // SIMULATION MODE FOR USER DEMO/AUDIT
            const encoder = new TextEncoder();
            const readableStream = new ReadableStream({
                async start(controller) {
                    const simulatedResponse = `
                    <neural_synthesis>
                    ANALYZING REQUEST: ${prompt}
                    STRATEGY: SIMULATION_PROTOCOL_ACTIVE
                    </neural_synthesis>
                    
                    **SIMULATED INTELLIGENCE RESPONSE**
                    
                    Configuration: API Key Not Detected.
                    Protocol: Displaying high-fidelity mock data for audit purposes.
                    
                    Subject: ${prompt.substring(0, 50)}...
                    
                    1. **Strategic Alignment**: The requested action aligns with district production goals.
                    2. **Tactical Execution**: To implement this in production, please add your GOOGLE_GENERATIVE_AI_API_KEY to the .env file.
                    3. **Generated Insight**: Using simulation data, we project a 15% increase in operational efficiency once fully connected.
                    
                    *EdIntel System Status: WAITING_FOR_KEY*
                    `;

                    const chunks = simulatedResponse.split(' ');
                    for (const chunk of chunks) {
                        controller.enqueue(encoder.encode(chunk + ' '));
                        await new Promise(resolve => setTimeout(resolve, 50)); // Typing effect
                    }
                    controller.close();
                }
            });

            return new Response(readableStream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }

        // SYSTEM PROMPT: FORCING HIGH-FIDELITY EdIntel PERSONA
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
            - Output your reasoning inside <neural_synthesis> tags, evaluating 3 distinct strategies and selecting the optimal one.
            - CITATION PROTOCOL: Reference specific Alabama codes (SB 216/171), ESSA federal statutes, and MCPSS strategic goals.
            - CEU/PLU ALIGNMENT: Ensure all professional development recommendations are structured to qualify for state-recognized credit.
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
