import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Replicate from "replicate";
import { put } from "@vercel/blob";

const apiKey = (process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '').trim();
const genAI = new GoogleGenerativeAI(apiKey);

export const GEMINI_CONFIG = {
    model: "gemini-2.5-flash",
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

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export class GeminiService {
    private model;

    constructor(modelName: string = GEMINI_CONFIG.model) {
        this.model = genAI.getGenerativeModel({
            model: modelName,
            safetySettings: GEMINI_CONFIG.safetySettings,
            generationConfig: GEMINI_CONFIG.generationConfig,
        });
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
            const output = await replicate.run(
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

        const prompt = `Act as an expert EdIntel Lesson Architect. Generate a high-fidelity, professional lesson plan based on these parameters:
        
        ${bioContext}
        
        Topic: ${params.topic}
        Subject: ${params.subject}
        Grade Level: ${params.gradeLevel}
        Standards/Focus: ${params.standards || 'General ALCOS alignment'}
        Duration: ${params.duration || '60 minutes'}
        Targeted Learning Styles: ${params.learningStyles?.join(', ') || 'Multimodal'}
        
        The output MUST include:
        1. Operational Objective
        2. Strategic Materials (including technical requirements)
        3. Direct Instruction (multi-phase)
        4. Guided Practice with Tiered Scaffolds
        5. Independent Practice & Assessment Mastery
        6. Homework/Extension Vector
        7. Science of Reading (SOR) Alignment (if applicable)
        
        Tone: Professional, executive, sophisticated yet highly actionable. Use Markdown formatting with clear headers.`;

        return this.generateText(prompt);
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
}

export const geminiService = new GeminiService();

// Export standalone versions as requested by user's conceptual code
export const generateImageFromPrompt = (params: any) =>
    geminiService.generateImage(params.prompt, params.subject, params.gradeLevel);

export const generateLessonPlanAction = (params: any) =>
    geminiService.generateLessonPlan(params);
