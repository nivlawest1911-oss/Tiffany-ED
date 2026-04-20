'use server';

import { prisma } from '@/lib/prisma';
import { aiResilience, ALABAMA_STRATEGIC_DIRECTIVE, SOVEREIGN_PERSONAS } from '@/lib/ai-resilience';
import { protocolRouter, UserContext } from '@/lib/protocol-router';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import crypto from 'crypto';

interface SynthesisParams {
    topic: string;
    subject: string;
    gradeLevel: string;
    standards?: string;
    duration?: string;
    learningStyles?: string[];
    stressLevel?: number;
    includePresentation?: boolean;
    includeProblems?: boolean;
    protocolContext?: UserContext;
}

/**
 * executeCurriculumSynthesis
 * 
 * Secure Server Action for generating high-fidelity curriculum content.
 * 1. Authenticates the session.
 * 2. Synthesizes the pedagogical prompt with Tiffany-ED persona.
 * 3. Adapts to bio-feedback (Stress-Load Adaptation).
 * 4. Executes generation via IntelligenceEngine (Failover enabled).
 * 5. Persists the result as an immutable institutional record in generated_content_hub.
 */
export async function executeCurriculumSynthesis(params: SynthesisParams) {
    console.log(`[CurriculumAction] executeCurriculumSynthesis initiated for: ${params.topic}`);

    try {
        // 1. Session Validation
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            throw new Error("UNAUTHORIZED: Institutional credentials required for curriculum synthesis.");
        }

        const userId = session.user.id;

        // 2. Persona Selection: Tiffany-ED
        const persona = SOVEREIGN_PERSONAS['/tiffany-ed'];
        const systemPrompt = `
            ${ALABAMA_STRATEGIC_DIRECTIVE}
            
            UNIFIED PERSONA: ${persona.name} (${persona.role})
            TONE: ${persona.tone}
            MISSION: ${persona.mission}
            CONTEXT: ${persona.culturalContext}
            DEGREES: ${persona.degrees}
            
            You are drafting a high-fidelity institutional record. Focus on absolute compliance with the Alabama Literacy Act and Science of Reading (SOR).
        `;

        // 3. Specialization Directives
        let specializationPrompt = "";
        const lowerSubject = params.subject.toLowerCase();
        if (lowerSubject.includes("math")) {
            specializationPrompt = `
            STRATEGIC FOCUS: MATHEMATICS
            - Prioritize procedural fluency AND conceptual understanding.
            - Use explicit modeling (I Do, We Do, You Do).
            - Include mathematical discourse prompts and rigorous problems.
            `;
        } else if (lowerSubject.includes("reading") || lowerSubject.includes("literacy")) {
            specializationPrompt = `
            STRATEGIC FOCUS: LITERACY & READING
            - Align with Science of Reading (SOR) principles (SB 216).
            - Focus on the "Big Five": Phonemic Awareness, Phonics, Fluency, Vocabulary, and Comprehension.
            - Provide evidence-based instructional scaffolds.
            `;
        }

        // 4. Bio-Sync Adaptation
        let bioSyncPrompt = "";
        if (params.stressLevel && params.stressLevel > 70) {
            bioSyncPrompt = `
            [STRESS-LOAD ADAPTATION ACTIVE: ${params.stressLevel}%]
            ADAPTATION STRATEGY: "High Engagement, Low Friction".
            - Prioritize student-led collaborative inquiry.
            - Provide explicit, step-by-step procedural scaffolds.
            - Reduce teacher cognitive load during direct instruction.
            `;
        }

        // 5. Module Synthesis
        let modulePrompt = "";
        if (params.includePresentation) {
            modulePrompt += `
            ADDITIONAL MODULE: HIGH-ENERGY PRESENTATION SCRIPT
            - Provide a cinematic script in the "Verse" tone.
            - Include "stage directions" ([Pause for Effect], [Visual Cue]).
            - Ensure tone is authoritative yet inspiring.
            `;
        }
        if (params.includeProblems) {
            modulePrompt += `
            ADDITIONAL MODULE: RIGOROUS PRACTICE PROBLEMS
            - Generate 5 distinct problems of varying DOK levels (3-4 preferred).
            - Provide step-by-step solutions with pedagogical reasoning.
            `;
        }

        // 6. Prompt Synthesis
        const baseUserPrompt = `
            SUBJECT: ${params.subject}
            GRADE LEVEL: ${params.gradeLevel}
            TOPIC: ${params.topic}
            STANDARDS: ${params.standards || 'ACOS/ALCOS alignment'}
            DURATION: ${params.duration || '60 mins'}
            
            ${bioSyncPrompt}
            ${specializationPrompt}
            ${modulePrompt}
            
            OUTPUT REQUIREMENTS:
            1. Operational Objective (SMART format)
            2. Strategic Materials
            3. Direct Instruction (Multi-phase)
            4. Guided Practice (Tiered Scaffolds: Remediation, On-Level, Accelerated)
            5. Independent Practice & Mastery Check
            6. SOR / Math Fluency Compliance Note
        `;

        const protocol = protocolRouter.getProtocol(params.protocolContext || {});
        const finalUserPrompt = protocolRouter.applyProtocol(baseUserPrompt, protocol);

        // 7. Intelligence Execution (Failover)
        const result = await aiResilience.generateWithFailover(systemPrompt, finalUserPrompt, 'premium');

        // 8. Institutional Record Persistence
        const recordId = crypto.randomUUID();
        const _savedRecord = await prisma.generated_content_hub.create({
            data: {
                id: recordId,
                user_id: userId,
                type: 'LESSON_PLAN',
                title: `${params.topic} - ${params.subject}`,
                description: `High-fidelity synthesis for ${params.gradeLevel}.`,
                prompt: finalUserPrompt,
                content: {
                    content: result.content,
                    params: {
                        ...params,
                        persona: persona.name,
                        provider: result.provider,
                        model: result.model
                    }
                },
                subject: params.subject,
                grade_level: params.gradeLevel,
                ai_model: result.model,
                updated_at: new Date()
            }
        });

        console.log(`[CurriculumAction] Record persisted: ${recordId}`);

        return {
            success: true,
            data: result.content,
            recordId: recordId,
            provider: result.provider
        };

    } catch (error: any) {
        console.error('[CurriculumAction] Synthesis Failed:', error);
        return {
            success: false,
            error: error.message || "Pedagogical synthesis interrupted. Please check neural link."
        };
    }
}
