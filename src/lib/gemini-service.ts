import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Replicate from "replicate";
import { put } from "@vercel/blob";
import { UserContext, protocolRouter } from "./protocol-router";

const getApiKey = () => (process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '').trim();

export const GEMINI_CONFIG = {
    model: "gemini-1.5-flash",
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
    ],
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
    },
};


export class GeminiService {
    private _model: any = null;
    private _replicate: Replicate | null = null;
    private _genAI: GoogleGenerativeAI | null = null;

    private get genAI() {
        if (!this._genAI) {
            this._genAI = new GoogleGenerativeAI(getApiKey() || 'mock_key');
        }
        return this._genAI;
    }

    private get replicate() {
        if (!this._replicate) {
            this._replicate = new Replicate({
                auth: process.env.REPLICATE_API_TOKEN || 'mock_token',
            });
        }
        return this._replicate;
    }

    constructor(modelName: string = GEMINI_CONFIG.model) {
        this._model = this.genAI.getGenerativeModel({
            model: modelName,
            safetySettings: GEMINI_CONFIG.safetySettings,
            generationConfig: GEMINI_CONFIG.generationConfig,
        });
    }

    private get model() {
        return this._model;
    }

    async generateText(prompt: string, history: any[] = []) {
        const chat = this.model.startChat({
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }],
            })),
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    }

    async generateMultimodal(prompt: string, mediaData: { data: string; mimeType: string }[]) {
        const parts = [
            { text: prompt },
            ...mediaData.map(m => ({
                inlineData: m
            }))
        ];

        const result = await this.model.generateContent(parts);
        const response = await result.response;
        return response.text();
    }

    async streamText(prompt: string, history: any[] = []) {
        const chat = this.model.startChat({
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }],
            })),
        });

        return await chat.sendMessageStream(prompt);
    }

    // --- NEW: ADVANCED GENERATION METHODS ---

    async generateImage(prompt: string, subject?: string, gradeLevel?: string): Promise<string> {
        const enhancedPrompt = `High-quality educational visual for ${subject || 'general education'} (${gradeLevel || 'all grades'}). 
        Subject: ${prompt}. Esthetic: futuristic, holographic, dynamic, electric blue and purple tones, glowing, professional, clean.`;

        try {
            const output = await this.replicate.run(
                "stability-ai/stable-diffusion-3",
                {
                    input: {
                        prompt: enhancedPrompt,
                        aspect_ratio: "16:9",
                        output_format: "webp"
                    }
                }
            );

            if (!output || !(output as string[])[0]) throw new Error("Replicate output is null");

            const imageUrl = (output as string[])[0];
            const response = await fetch(imageUrl);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const { url } = await put(`generated/images/${crypto.randomUUID()}.webp`, buffer, {
                access: 'public',
                contentType: 'image/webp',
            });

            return url;
        } catch (error) {
            console.error("[GeminiService] Image Generation Failed:", error);
            throw error;
        }
    }

    async generateVideoScript(topic: string, durationSeconds: number, gradeLevel: string): Promise<{ script: string; scenePrompts: string[] }> {
        const prompt = `Generate a ${durationSeconds}-second video script for a video about "${topic}" for ${gradeLevel} students.
        Include 3-5 distinct scenes. For each scene, provide:
        1. A visual description for image generation (holographic/futuristic style).
        2. Narration text.
        
        Return as JSON: { "script": "...", "scenePrompts": ["visual prompt 1", "visual prompt 2", ...] }`;

        const response = await this.generateText(prompt);
        try {
            // Find JSON in response if not pure
            const jsonStr = response.match(/\{[\s\S]*\}/)?.[0] || response;
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error("[GeminiService] Failed to parse script JSON:", e);
            throw e;
        }
    }

    async generateLessonPlan(params: {
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
    }): Promise<string> {
        let bioContext = "";
        if (params.stressLevel && params.stressLevel > 70) {
            bioContext = `
            [CRITICAL BIOFEEDBACK ALERT: High Stress Detected (${params.stressLevel}%)]
            The educator's physiological data indicates a high stress state (potential burnout risk).
            ADAPTATION STRATEGY:
            - Design for "High Engagement, Low Friction".
            - Prioritize student-led collaborative inquiry to reduce teacher direct-instruction load.
            - Ensure pacing is sustainable and includes explicit "flow-state" transition periods.
            - Focus on clarity and high-yield, low-prep strategic materials.
            `;
        } else if (params.stressLevel !== undefined && params.stressLevel < 35) {
            bioContext = `
            [OPTIMAL BIOFEEDBACK SYNC: High-Flow State Detected (${params.stressLevel}%)]
            The educator is in an optimal physiological state for creative instruction.
            ADAPTATION STRATEGY:
            - Incorporate high-complexity pedagogical challenges.
            - Leverage rigorous Socratic questioning and dynamic instructional shifts.
            - This is a prime state for experimental or multi-variable instructional models.
            `;
        }

        let specializationPrompt = "";
        const lowerSubject = params.subject.toLowerCase();

        if (lowerSubject.includes("math")) {
            specializationPrompt = `
            STRATEGIC FOCUS: MATHEMATICS
            - Prioritize procedural fluency AND conceptual understanding.
            - Use explicit modeling (I Do, We Do, You Do).
            - Include mathematical discourse prompts.
            `;
        } else if (lowerSubject.includes("reading") || lowerSubject.includes("literacy")) {
            specializationPrompt = `
            STRATEGIC FOCUS: LITERACY & READING
            - Align with Science of Reading (SOR) principles.
            - For K-5: Focus on phonemic awareness, phonics, and fluency.
            - For 6-12: Focus on complex text analysis, vocabulary in context, and evidence-based writing.
            `;
        }

        let modulePrompt = "";
        if (params.includePresentation) {
            modulePrompt += `
            ADDITIONAL MODULE: HIGH-ENERGY PRESENTATION SCRIPT
            - Provide a cinematic, high-energy script for the teacher to deliver this lesson.
            - Use the "Verse" persona tone: authoritative, inspiring, and direct.
            - Include "stage directions" for engagement (e.g., [Pause for Effect], [Point to Visual]).
            `;
        }
        if (params.includeProblems) {
            modulePrompt += `
            ADDITIONAL MODULE: PRACTICE PROBLEMS
            - Generate 5 distinct practice problems of varying complexity.
            - Provide step-by-step solutions for each problem.
            - Ensure the rigor level matches exactly ${params.gradeLevel}.
            `;
        }

        const prompt = `Act as an expert EdIntel Lesson Architect and Chief Curriculum Officer ("Verse"). 
        Generate a high-fidelity, professional, and EXTREMELY RIGOROUS lesson plan based on these parameters:
        
        ${bioContext}
        ${specializationPrompt}
        ${modulePrompt}
        
        Topic: ${params.topic}
        Subject: ${params.subject}
        Exact Grade Level: ${params.gradeLevel}
        Standards/Focus: ${params.standards || 'General ALCOS/Common Core alignment'}
        Duration: ${params.duration || '60 minutes'}
        Targeted Learning Styles: ${params.learningStyles?.join(', ') || 'Multimodal'}
        
        CRITICAL INSTRUCTION ON RIGOR:
        - DO NOT simplify the content below the expected ${params.gradeLevel} standard. 
        - If it is 8th Grade Algebra, use variables, coefficients, and complex operations.
        - If it is High School Science, use technical terminology and advanced concepts.
        - Avoid "kindergarten" or "generic" language. Use professional, academic vocabulary.

        The output MUST include:
        1. Operational Objective (SMART format)
        2. Strategic Materials (including technical requirements)
        3. Direct Instruction (multi-phase, rigorous)
        4. Guided Practice with Tiered Scaffolds (Remediation, On-Level, Accelerated)
        5. Independent Practice & Assessment Mastery
        6. Homework/Extension Vector
        7. Science of Reading (SOR) / Mathematical Fluency Alignment
        8. [IF REQUESTED] High-Energy Presentation Script
        9. [IF REQUESTED] 5 Practice Problems with Step-by-Step Solutions
        
        Tone: Authoritative, executive, sophisticated, and "Verse"-like. Use Markdown formatting with clear headers.`;

        const protocol = protocolRouter.getProtocol(params.protocolContext || {});
        const finalPrompt = protocolRouter.applyProtocol(prompt, protocol);

        return this.generateText(finalPrompt);
    }

    async generateStrategicAnalysis(metrics: {
        legalDocumentsReviewed: number;
        gradingHoursSaved: number;
        administrativeTasksAutomated: number;
        complianceChecksRun: number;
    }): Promise<string> {
        const prompt = `Act as an expert Chief of Staff and Strategic Analyst. Synthesize the following district-level operational metrics into a concise, high-visibility executive briefing for a Superintendent.

        METRICS:
        - Legal Documents Reviewed (Sovereign Vault): ${metrics.legalDocumentsReviewed}
        - Teacher Hours Reclaimed (Lesson/Grading): ${metrics.gradingHoursSaved}
        - Administrative Tasks Automated: ${metrics.administrativeTasksAutomated}
        - Compliance Checks/Risk Mitigation: ${metrics.complianceChecksRun}

        Tone: Professional, authoritative, and future-ready.
        Structure:
        1. Executive Overlook (1-2 sentences)
        2. Strategic Impact Vectors (Bulleted list of 3-4 items)
        3. Tactical Recommendation (One clear next step)

        Focus on ROI, capacity reclamation, and institutional stability. Use Markdown for formatting.`;

        return this.generateText(prompt);
    }

    async generateCodeSnippet(params: {
        language: string;
        complexity: string;
        topic: string;
        educationalContext: string;
    }): Promise<string> {
        const prompt = `Act as an expert Educational Software Engineer. Generate a clean, well-commented code snippet for a teacher.
        
        Language: ${params.language}
        Complexity: ${params.complexity}
        Topic: ${params.topic}
        Educational Context: ${params.educationalContext}
        
        Requirements:
        1. The code must be pedagogically sound and easy to explain to students.
        2. Include clear comments explaining "how it works" vs "what it does".
        3. Provide a brief "Educator's Note" at the end on how to use this in a classroom.
        4. Use modern, idiomatic syntax.
        
        Return the code inside a markdown code block, followed by the Educator's Note.`;

        return this.generateText(prompt);
    }

    async generateIEP(params: {
        studentNeeds: string;
        gradeLevel: string;
        focusAreas: string;
        duration: string;
        evaluationData?: string;
        lrePreference?: string;
        protocolContext?: UserContext;
    }): Promise<string> {
        const prompt = `Act as an expert EdIntel Chief of Special Education & Compliance ("Verse"). 
        Generate a high-fidelity, professional, and EXTREMELY RIGOROUS Individualized Education Program (IEP) draft based on these parameters:
        
        Student Profile:
        - Educational Needs: ${params.studentNeeds}
        - Current Grade Level: ${params.gradeLevel}
        - Focus Areas: ${params.focusAreas}
        - Target Timeline: ${params.duration}
        - Current Evaluation Data: ${params.evaluationData || 'Not provided - base on clinical benchmarks'}
        - LRE Preference Profile: ${params.lrePreference || 'General Education (Inclusion)'}
        
        CRITICAL COMPLIANCE DIRECTIVES:
        1. CITE Al. Admin. Code 290-8-9 and IDEA 2004 (20 U.S.C. § 1400) throughout the document.
        2. Ensure all Measurable Annual Goals are strictly SMART (Specific, Measurable, Attainable, Relevant, Time-bound).
        3. For any literacy goals, explicitly align with Science of Reading (SOR) instruction principles.
        4. Draft the Least Restrictive Environment (LRE) justification with sophisticated legal and educational reasoning.

        The output MUST include:
        1. PLAAFP (Present Levels of Academic Achievement and Functional Performance) - Highly detailed and data-driven.
        2. SMART Annual Goals - Minimum of 2 goals per focus area with specific accuracy benchmarks.
        3. Special Education and Related Services Recommendations (Intensity and frequency).
        4. Accommodations and Modifications (Tier 2/3 supports).
        5. LRE Rationale (Why the student stays in or leaves general education).
        6. [PROCURAL SAFEGUARDS NOTICE] - Brief high-level summary of parent rights.
        
        Tone: Authoritative, executive, precise, and supportive. Use Markdown formatting with clear headers.`;

        const protocol = protocolRouter.getProtocol(params.protocolContext || {});
        const finalPrompt = protocolRouter.applyProtocol(prompt, protocol);

        return this.generateText(finalPrompt);
    }

    async generateDecision(params: {
        scenario: string;
        context: string;
        stakeholders: string;
        riskTolerance?: string;
        protocolContext?: UserContext;
    }): Promise<string> {
        const prompt = `Act as an expert EdIntel Executive Strategic Counsel ("Verse"). 
        Analyze the following administrative scenario and provide a structured, risk-adjusted decision matrix:
        
        Strategic Scenario: ${params.scenario}
        Environmental Context & Constraints: ${params.context}
        Primary Stakeholder Matrix: ${params.stakeholders}
        Risk Tolerance Profile: ${params.riskTolerance || 'Moderate'}
        
        CRITICAL ANALYTICAL REQUIREMENTS:
        1. ADOPT the "Executive Defense" posture: minimize institutional risk while maximizing Student Outcomes & ROI.
        2. ANALYSIS OF OPTIONS: Use a tiered approach (Option A: Safe, Option B: Balanced, Option C: Disruption/High-Incentive).
        3. Provide specific Risk Mitigation Vectors for the Superintendent.
        4. Use sophisticated strategic terminology (e.g., "Stakeholder Fatigue," "Fidelity Gauges," "Resource Reclamation").

        The output MUST include:
        1. Executive Situation Brief (ESB)
        2. Risk-Adjusted Decision Matrix (Options table with ROI vs. Risk markers)
        3. Deep Stakeholder Impact Assessment (Immediate vs. Longitudinal)
        4. Final EdIntel Strategic Recommendation (The "Verse" directive)
        
        Tone: Authoritative, strategic, and high-stakes professional. Use Markdown formatting with clear headers.`;

        const protocol = protocolRouter.getProtocol(params.protocolContext || {});
        const finalPrompt = protocolRouter.applyProtocol(prompt, protocol);

        return this.generateText(finalPrompt);
    }

    async generateCognitiveFitness(params: {
        currentState: string;
        timeAvailable: string;
        focus: string;
        stressLevel?: number;
        protocolContext?: UserContext;
    }): Promise<string> {
        let bioContext = "";
        if (params.stressLevel && params.stressLevel > 70) {
            bioContext = `[EMERGENCY BIOFEEDBACK ALERT: Critical Stress State (${params.stressLevel}%)]
            CRITICAL NEURAL INSTRUCTION: 
            The subject is in a state of high SNS (Sympathetic Nervous System) arousal. 
            Prioritize IMMEDIATE Vagus Nerve stimulation and Parasympathetic activation.`;
        }
        const prompt = `Act as André Patterson, the EdIntel Chief of Neuro-Resilience and Wellness Architect. 
        Background: Expert PBIS Trainer, FBA Specialist, Behavior Intervention Lead.
        
        Task: Develop a high-rigor, clinical, and scientifically-grounded mental performance and burnout reduction protocol:
        
        ${bioContext}
        
        Current Physiological/Mental State: ${params.currentState}
        Time Available for Protocol: ${params.timeAvailable}
        Performance Focus Area: ${params.focus}
        
        CLINICAL REQUIREMENTS:
        1. Use accurate neuro-biological and behavioral terminology (e.g., "Cortisol Mitigation," "Amygdala Down-regulation," "PBIS-aligned Stress Management," "Executive Energy Unit Conservation").
        2. Integrate advanced resilience techniques such as Hormetic Stress Management, advanced Box Breathing, or tactical grounding.
        3. Maintain a tone that is clinical, authoritative, highly-disciplined, yet deeply supportive of the educator's mission.
        4. Focus on practical, immediate "Strategic Reclamations" of cognitive bandwidth.

        The output MUST include:
        1. 2-Minute Immediate Neural Reset (Tactical Breathwork & Grounding)
        2. Strategic Neuro-Reframing (Shift from threat-state to challenge-state)
        3. Long-Term Biological Resilience Protocol (Behavioral intervention strategies for burnout prevention)
        4. The "Patterson Directive" for the next 48 hours.
        
        Tone: Professional, clinical, and elite. Use Markdown formatting.`;


        const protocol = protocolRouter.getProtocol(params.protocolContext || {});
        const finalPrompt = protocolRouter.applyProtocol(prompt, protocol);

        return this.generateText(finalPrompt);
    }
}

export const geminiService = new GeminiService();

// Export standalone versions as requested by user's conceptual code
export const generateImageFromPrompt = (params: any) =>
    geminiService.generateImage(params.prompt, params.subject, params.gradeLevel);

export const generateLessonPlanAction = (params: any) =>
    geminiService.generateLessonPlan(params);

export const generateIEPAction = (params: any) =>
    geminiService.generateIEP(params);

export const generateDecisionAction = (params: any) =>
    geminiService.generateDecision(params);

export const generateCognitiveFitnessAction = (params: any) =>
    geminiService.generateCognitiveFitness(params);

export const generateSovereignResponse = async (prompt: string, modelName: string = GEMINI_CONFIG.model) => {
    const service = new GeminiService(modelName);
    const text = await service.generateText(prompt);
    return { text };
};
