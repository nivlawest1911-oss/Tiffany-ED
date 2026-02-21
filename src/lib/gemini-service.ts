import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export const GEMINI_CONFIG = {
    model: "gemini-2.0-flash-exp",
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
}

export const geminiService = new GeminiService();
