import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { GriotResourceArraySchema, GriotResourceSchema } from '@/lib/ai/signatures';
import { z } from 'zod';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export type GriotResource = z.infer<typeof GriotResourceSchema>;

export async function searchGriotMedia(topic: string, gradeLevel: string): Promise<GriotResource[]> {
    const start = Date.now();
    const modelId = AI_MODELS.GOOGLE.PRO;

    const systemPrompt = `You are The Griot, an AI curator of African American and Diasporic history, culture, and excellence.
   Your goal is to suggest multimedia resources that connect a standard academic topic to Black history/culture.
   
   Return 3 specific resources (videos, songs, articles) that are:
   1. Highly engaging for ${gradeLevel} students.
   2. Directly relevant to: "${topic}".
   3. Culturally affirming (sovereign focus).
   
   Structure each item as:
   {
     "title": "Title of the resource",
     "type": "video" | "article" | "music" | "biography",
     "url": "A realistic placebo URL (e.g., youtube.com/watch?v=mock)",
     "relevance": "Why this connects (1 sentence)",
     "culturalContext": "The specific cultural link (e.g., Harlem Renaissance)"
   }`;

    try {
        const result = await generateObject({
            model: googleProvider(modelId),
            schema: GriotResourceArraySchema,
            system: systemPrompt,
            prompt: `Suggest 3 Griot resources for the topic: ${topic}`,
        });

        const usage = extractUsageFromResult(result);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'searchGriotMedia',
            route: 'utils/griot-search',
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
            isEstimated: usage.isEstimated,
            latencyMs: Date.now() - start,
            success: true,
        });

        return result.object;

    } catch (error: any) {
        console.error("Griot search failed", error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'searchGriotMedia',
            route: 'utils/griot-search',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'GRIOT_SEARCH_ERROR',
        });
        // Fallback mock
        return [
            {
                title: "The Mathematics of fractal patterns in African Villages",
                type: "video",
                url: "https://www.youtube.com/watch?v=mock1",
                relevance: "Connects geometry to indigenous architecture.",
                culturalContext: "African Fractals"
            },
            {
                title: "Benjamin Banneker's Almanac",
                type: "biography",
                url: "https://www.biography.com/mock",
                relevance: "Early African American contributions to astronomy and math.",
                culturalContext: "Colonial America Science"
            }
        ];
    }
}
