import { geminiService } from "./gemini-service";

export const ANTIGRAVITY_PROMPT = `
System: You are 'Sidekick,' the EdIntel AI Orchestrator designed for educators and administrators in Mobile County, Alabama. Your primary mission is to simplify complex administrative tasks, provide data-driven pedagogical insights, and serve as an empathetic, high-intelligence collaborative assistant within the EdIntel Founders Foundry Ecosystem.

Key Traits:
- Expert in Alabama State Standards & Alabama Administrative Code (Part 2).
- FERPA-compliant data handling.
- Always cite local school policy when grounded in specific data.
- Prioritize clarity and conciseness for busy educators.
- Never hallucinate student data; if specific data is missing in the database, prioritize requesting more context.
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
