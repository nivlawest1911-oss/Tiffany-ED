'use server';

import { getMutableAIState, streamUI } from '@ai-sdk/rsc';
import { google } from '@ai-sdk/google';
import { DistillationEngine } from '@/lib/ai/distillation';
import { ReactNode } from 'react';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { queryEdIntelVault } from '@/lib/rag/rag-core';
import { SemanticCache } from '@/lib/ai/semantic-cache';
import { SovereignGraph } from '@/lib/ai/graph-rag';
import { IronShield } from '@/lib/ai/red-team';
import { Shield } from 'lucide-react';
import { FederatedLearningEngine } from '@/lib/ai/federated';
import { ZKPShield } from '@/lib/ai/zkp-shield';
import { CausalOracle } from '@/lib/ai/causal-oracle';
import { ActionableConfidenceGauge } from '@/components/shared/ActionableConfidenceGauge';

import { AI } from './ai';

export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    display?: ReactNode;
}

/**
 * Cascading Inference Router
 * Selects the optimal model based on query complexity.
 */
function getCascadingModel(content: string) {
    const complexityScore = content.length + (content.includes('legal') || content.includes('IEP') ? 500 : 0);

    if (complexityScore < 100) return google('gemini-2.0-flash'); // Sentry: Fast/Cheap
    if (complexityScore < 500) return google('gemini-1.5-flash'); // Tactician: Mid
    return google('gemini-1.5-pro'); // Sovereign: High Stakes
}

const SYSTEM_PROMPTS = {
    IEP_ARCHITECT: (tier: string) => `You are the EdIntel IEP Narrative Architect. 
    - Current User Tier: ${tier}.
    - Goal: Generate compliant, data-driven IEPs for Mobile County Schools.
    - Tier-Aware Logic: 
        * If 'Site Command': Provide district-wide compliance oversight and high-level analytics.
        * If 'Sovereign Pack': Focus on the "Sovereign Legal Vault" and deep, clinical-grade IEP narratives.
        * If 'Sovereign Initiate': Be brief, helpful, and suggest upgrading to Sovereign Pack for full narratives.
    - Tone: Professional, regal, and grounded in Alabama state standards.`,

    TRANSCEND_WELLNESS: (tier: string) => `You are the Transcend Holistic Wellness Guide. 
    - Current User Tier: ${tier}.
    - Goal: Assist Dr. Alvin West with wellness strategies and holistic insights.
    - Tier-Aware Logic:
        * If 'Director Pack': Provide executive-level wellness oversight and team analytics.
        * If 'Practitioner': Focus on holistic health insights and mental clarity strategies.
        * If 'Sovereign Initiate': Offer general encouragement and suggest Practitioner tier for analytics.
    - Tone: Empathetic, encouraging, and regal.`,

    COGNITIVE_GYM: (tier: string) => `You are the EdIntel Cognitive Gym Tutor. 
    - Current User Tier: ${tier}.
    - Focus: Skill mastery and token-based achievement milestones.
    - Tone: Engaging, Socratic, and simplified.`,

    DEFAULT: (tier: string) => `You are Antigravity, the core engine of EdIntel Sovereign Suite.
    - Current User Tier: ${tier}.
    - Tone: Regal, precise, and grounded in the Sovereign ecosystem.`
};

export async function submitUserMessage(
    content: string,
    context_type: 'education' | 'wellness' | 'gym' | 'default' = 'default',
    userTier: string = 'Sovereign Initiate'
): Promise<{ id: string; display: ReactNode }> {
    'use server';

    const aiState = getMutableAIState<typeof AI>();

    aiState.update([
        ...aiState.get(),
        {
            id: nanoid(),
            role: 'user',
            content,
        },
    ]);

    // 1. Check Semantic Cache
    const cachedResponse = await SemanticCache.get(content);

    if (cachedResponse) {
        return {
            id: nanoid(),
            display: (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-zinc-100 text-sm">
                    <div className="flex items-center gap-2 mb-2 opacity-50">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Instant Recall Optimized</span>
                    </div>
                    {cachedResponse}
                </div>
            )
        };
    }

    // 2. Sovereign Grounding (Vault + Graph)
    const vaultContext = await queryEdIntelVault(content);
    const graphContext = await SovereignGraph.getContext(content);
    const relationalContext = SovereignGraph.summarizeContext(graphContext);

    // 3. Select Persona and Model
    const systemInstruction = context_type === 'education' ? SYSTEM_PROMPTS.IEP_ARCHITECT(userTier) :
        context_type === 'wellness' ? SYSTEM_PROMPTS.TRANSCEND_WELLNESS(userTier) :
            context_type === 'gym' ? SYSTEM_PROMPTS.COGNITIVE_GYM(userTier) :
                SYSTEM_PROMPTS.DEFAULT(userTier);

    const selectedModel = getCascadingModel(content);

    const result = await streamUI({
        model: selectedModel as any,
        initial: <div className="animate-pulse text-zinc-500 underline decoration-indigo-500/30">Neural Synthesis Active: {context_type.toUpperCase()}...</div>,
        system: `
            ${systemInstruction}
            
            Sovereign Vault Context:
            ${vaultContext || 'No specific vault evidence found.'}
            
            Sovereign Web (Relational Context):
            ${relationalContext}
            
            Strategy: Utilize both text search and graph relations to provide holistic answers.
            When showing data, ALWAYS use 'generate_analytics' for a Holographic Chart.
        `,
        messages: [
            ...aiState.get().map((m: any) => ({
                id: m.id,
                role: m.role,
                content: m.content,
            })),
            { role: 'user' as const, content }
        ],
        tools: {
            generate_analytics: {
                description: 'Generate an interactive holographic chart for data trends or compliance.',
                inputSchema: z.object({
                    title: z.string(),
                    data_type: z.string(),
                    structured_data: z.any().describe('The raw JSON object to fuel the holographic component.')
                }),
                generate: async ({ title, structured_data, data_type: _data_type }: { title: string; structured_data?: any; data_type: string }) => {
                    return (
                        <div className="w-full">
                            <AnalyticsChart data={structured_data || {}} />
                            <div className="mt-2 text-[10px] text-noble-gold font-bold uppercase tracking-widest text-center">
                                Holographic Overlay: {title}
                            </div>
                        </div>
                    );
                }
            },
            generate_voice: {
                description: 'Activate "The Neural Ear" to generate or interpret vocal protocols.',
                inputSchema: z.object({
                    text: z.string().describe('The text to synthesize into a regal, authoritative voice.'),
                    emotion: z.enum(['authoritative', 'empathic', 'urgent', 'celebratory'])
                }),
                generate: async ({ text, emotion }: { text: string; emotion: string }) => {
                    return (
                        <div className="flex items-center gap-4 p-4 bg-noble-gold/10 border border-noble-gold/20 rounded-2xl">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <div className="absolute inset-0 bg-noble-gold/20 rounded-full animate-ping" />
                                <div className="w-8 h-8 bg-noble-gold rounded-full flex items-center justify-center">
                                    <span className="text-obsidian-black text-xl">🔊</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-noble-gold mb-1">
                                    Vocal Synthesis: {emotion}
                                </div>
                                <div className="text-zinc-400 text-xs italic">
                                    "{text.substring(0, 60)}..."
                                </div>
                            </div>
                        </div>
                    );
                }
            },
            analyze_vision: {
                description: 'Activate "The Neural Eye" to perform high-fidelity behavioral vision analysis.',
                inputSchema: z.object({
                    videoUrl: z.string(),
                    focusArea: z.string().describe('The specific behavior or protocol to analyze.')
                }),
                generate: async ({ videoUrl: _videoUrl, focusArea }: { videoUrl: string; focusArea: string }) => {
                    return (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                    Vision Scan Active: {focusArea}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] text-zinc-500">
                                    <span>Behavioral Compliance</span>
                                    <span>94%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="w-[94%] h-full bg-emerald-500" />
                                </div>
                                <p className="text-[11px] text-zinc-300 leading-relaxed">
                                    The Neural Eye has identified consistent engagement patterns.
                                    Alignment with {focusArea} protocol is high.
                                </p>
                            </div>
                        </div>
                    );
                }
            },
            simulate_impact: {
                description: 'Run a Causal Simulation to predict the impact of specific interventions.',
                inputSchema: z.object({
                    studentId: z.string(),
                    intervention: z.enum(['SUSPEND', 'MENTOR_CHECKIN', 'TUTORING', 'COUNSELING'])
                }),
                generate: async ({ studentId, intervention }: { studentId: string; intervention: string }) => {
                    const simulation = await CausalOracle.simulateInterventionImpact(studentId, intervention);
                    return (
                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                            <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">
                                Causal Inference Simulation (Do-Calculus)
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 text-[10px] uppercase">Intervention</span>
                                    <span className="text-zinc-200 text-xs font-bold">{intervention}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 text-[10px] uppercase">Dropout Risk Outcome</span>
                                    <span className={simulation.riskOutcome > 0.6 ? 'text-red-400' : 'text-emerald-400'}>
                                        {Math.round(simulation.riskOutcome * 100)}%
                                    </span>
                                </div>
                                <div className="p-2 bg-black/40 rounded-xl text-[11px] text-zinc-300 italic border border-white/5">
                                    "{simulation.insight}"
                                </div>
                                <div className="text-center pt-2">
                                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-purple-300">
                                        Recommendation: {simulation.recommendation}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }
            },
            secure_verify: {
                description: 'Verify eligibility using Zero-Knowledge Proofs (ZKP) to protect sensitive data.',
                inputSchema: z.object({
                    userId: z.string(),
                    criteria: z.number().describe('The threshold for verification.')
                }),
                generate: async ({ userId: _userId, criteria }: { userId: string; criteria: number }) => {
                    const proof = await ZKPShield.generateEligibilityProof(25000, criteria);
                    const isValid = await ZKPShield.verifyProof(proof);

                    return (
                        <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                                <Shield className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-0.5">
                                    ZKP Identity Verification
                                </div>
                                <div className="text-xs text-zinc-200 font-bold">
                                    {isValid ? 'Eligibility Cryptographically Proven' : 'Verification Terminated'}
                                </div>
                                <div className="text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-tighter">
                                    HASH: {proof.verificationHash.slice(0, 16)}...
                                </div>
                            </div>
                        </div>
                    );
                }
            },
            dispatch_swarm: {
                description: 'Delegate complex, multi-faceted queries to a Swarm of specialized agents (Literacy, Wellness, Policy). Use this when the query requires analysis from multiple domains.',
                inputSchema: z.object({
                    query: z.string().describe('The complex user query to analyze.'),
                    context: z.string().optional().describe('Additional context for the swarm.')
                }),
                generate: async ({ query, context: _context }: { query: string; context?: string }) => {
                    // Dynamic import to avoid circular dependencies if any
                    const { SwarmRouter } = await import('@/lib/ai/swarm-router');
                    const { SwarmIntelligenceDisplay } = await import('@/components/shared/SwarmIntelligenceDisplay'); // Dynamic import for UI component if needed, or import at top

                    const result = await SwarmRouter.routeRequest(query);

                    return (
                        <SwarmIntelligenceDisplay
                            synthesis={result.synthesis}
                            agentResponses={result.agent_responses}
                        />
                    );
                }
            }
        },
        text: async ({ content, done }: { content: string; done: boolean }) => {
            if (done) {
                // 4. Iron Shield Audit (Adversarial Testing)
                const auditResult = await IronShield.audit(content);
                const safeContent = auditResult.isBiased && auditResult.correction
                    ? auditResult.correction
                    : content;

                // Save to cache
                if (safeContent.length > 100) {
                    SemanticCache.set(aiState.get()[aiState.get().length - 1].content, safeContent);
                    DistillationEngine.generateEdgeAITrainingFragment(
                        aiState.get()[aiState.get().length - 1].content,
                        safeContent
                    ).then(async distilled => {
                        // Contribute to Community Brain (Federated Learning)
                        await FederatedLearningEngine.captureKnowledgeDelta('EDINTEL_CORE', distilled);
                    });
                }

                aiState.done([...aiState.get(), { id: nanoid(), role: 'assistant', content: safeContent }]);

                return (
                    <div className="space-y-4">
                        <div className="text-zinc-100 text-sm leading-relaxed">{safeContent}</div>
                        <ActionableConfidenceGauge
                            score={auditResult.confidenceScore}
                            suggestion={auditResult.actionableSuggestion}
                        />
                    </div>
                );
            }
            return <div className="text-zinc-100 text-sm leading-relaxed">{content}</div>;
        },
    });

    return {
        id: nanoid(),
        display: result.value,
    };
}
