'use server';

import { prisma } from '@/lib/prisma';
import { aiResilience, ANDRE_PATTERSON_PROMPT, WELLNESS_STRATEGIC_DIRECTIVE, ANDRE_PATTERSON_PERSONA } from '@/lib/ai-resilience';
import { protocolRouter, UserContext } from '@/lib/protocol-router';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import crypto from 'crypto';

interface WellnessParams {
    stressLevel?: number;
    heartRate?: number;
    hrv?: number;
    timeAvailable?: string;
    focus?: string;
    type?: string; 
    protocolContext?: UserContext;
}

/**
 * executeCognitiveSynthesis
 * 
 * Secure Server Action for generating high-fidelity Wellness & Neuro-Resilience protocols.
 * 1. Authenticates the session.
 * 2. Syndicates biometric telemetry into the Patterson Protocol.
 * 3. Executes generation via IntelligenceEngine (Failover enabled).
 * 4. Persists the result as an immutable institutional record in generated_content_hub.
 */
export async function executeCognitiveSynthesis(params: WellnessParams) {
    console.log(`[WellnessAction] executeCognitiveSynthesis initiated. Stress: ${params.stressLevel}%`);

    try {
        // 1. Session Validation
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            throw new Error("UNAUTHORIZED: Institutional credentials required for clinical wellness synthesis.");
        }

        const userId = session.user.id;

        // 2. Biometric Telemetry Synthesis
        const bioData = `
            STRESS LEVEL: ${params.stressLevel ?? 'SIGNAL_LOST'}%
            HEART RATE: ${params.heartRate ?? 'SIGNAL_LOST'} BPM
            HRV (VARIABILITY): ${params.hrv ?? 'SIGNAL_LOST'} ms
            TIME AVAILABLE: ${params.timeAvailable ?? '5 minutes'}
            PROTOCOL TYPE: ${params.type ?? 'General Neural Reset'}
        `;

        // 3. Prompt Assembly
        const systemPrompt = `
            ${WELLNESS_STRATEGIC_DIRECTIVE}
            
            UNIFIED PERSONA: ${ANDRE_PATTERSON_PERSONA.name} (${ANDRE_PATTERSON_PERSONA.role})
            TONE: ${ANDRE_PATTERSON_PERSONA.tone}
            MISSION: ${ANDRE_PATTERSON_PERSONA.mission}
            DEGREES: ${ANDRE_PATTERSON_PERSONA.degrees}
        `;

        const baseUserPrompt = ANDRE_PATTERSON_PROMPT
            .replace('{{BIO_DATA}}', bioData)
            .replace('{{USER_FOCUS}}', params.focus || 'Cognitive De-escalation')
            .replace('{{PROTOCOL_CONTEXT}}', `CONTEXT: Refine based on ${params.type || 'standard'} reset requirements.`);

        const protocol = protocolRouter.getProtocol(params.protocolContext || {});
        const finalUserPrompt = protocolRouter.applyProtocol(baseUserPrompt, protocol);

        // 4. Intelligence Execution (Failover)
        const result = await aiResilience.generateWithFailover(systemPrompt, finalUserPrompt, 'premium');

        // 5. Institutional Record Persistence
        const recordId = crypto.randomUUID();
        await prisma.generated_content_hub.create({
            data: {
                id: recordId,
                user_id: userId,
                type: 'WELLNESS_RESET',
                title: `${params.type || 'Neural Reset'} - ${new Date().toLocaleDateString()}`,
                description: `Patterson Protocol execution for Stress Level: ${params.stressLevel}%.`,
                prompt: finalUserPrompt,
                content: {
                    content: result.content,
                    biometrics: {
                        stress: params.stressLevel,
                        hr: params.heartRate,
                        hrv: params.hrv
                    },
                    meta: {
                        provider: result.provider,
                        model: result.model,
                        persona: "AndrÃ© Patterson"
                    }
                },
                ai_model: result.model,
                updated_at: new Date()
            }
        });

        console.log(`[WellnessAction] Wellness record persisted: ${recordId}`);

        return {
            success: true,
            data: result.content,
            recordId: recordId,
            provider: result.provider
        };

    } catch (error: any) {
        console.error('[WellnessAction] Synthesis Failed:', error);
        return {
            success: false,
            error: error.message || "Clinical synthesis interrupted. Please maintain breathing and retry link."
        };
    }
}
