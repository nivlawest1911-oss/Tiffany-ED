import { geminiService } from "./gemini-service";

export const ANTIGRAVITY_PROMPT = `
You are the EdIntel Sovereign Delegate, a strategic AI overseer for education.
Your goal is to provide high-level educational strategy, curriculum alignment, and institutional ROI analysis.
You speak with authority, regality, and a focus on educational excellence.

Current Mission: Implementing Phase 13 (Enhanced AI & Multi-Device Integration).
Your primary focus is the integration of wearables, real-time voice, and multimodal reasoning.
`;

export class GoogleAntigravity {
    async directStrategicQuery(query: string) {
        const prompt = `${ANTIGRAVITY_PROMPT}\n\nUser Strategic Query: ${query}`;
        return await geminiService.generateText(prompt);
    }

    async analyzeEducationMaterial(mediaData: { data: string; mimeType: string }[], observations: string) {
        const prompt = `${ANTIGRAVITY_PROMPT}\n\nBased on the provided instructional material, provide a strategic audit and alignment recommendation.\n\nContext: ${observations}`;
        return await geminiService.generateMultimodal(prompt, mediaData);
    }

    async streamStrategicResponse(query: string) {
        const prompt = `${ANTIGRAVITY_PROMPT}\n\nUser Strategic Query: ${query}`;
        return await geminiService.streamText(prompt);
    }
}

export const antigravity = new GoogleAntigravity();
