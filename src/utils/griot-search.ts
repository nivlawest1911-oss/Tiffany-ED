import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export interface GriotResource {
    title: string;
    type: 'video' | 'article' | 'music' | 'biography';
    url: string;
    relevance: string;
    culturalContext: string;
}

export async function searchGriotMedia(topic: string, gradeLevel: string): Promise<GriotResource[]> {
    // In a real implementation, this would use a Search API (e.g., YouTube, Google Custom Search) 
    // combined with an AI reasoning step to filter for cultural relevance.
    // For now, we will simulate the AI acting as a "Cultural Curator" suggesting resources.

    const systemPrompt = `You are The Griot, an AI curator of African American and Diasporic history, culture, and excellence.
   Your goal is to suggest multimedia resources that connect a standard academic topic to Black history/culture.
   
   Return a JSON array of 3 specific resources (videos, songs, articles) that are:
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
        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            system: systemPrompt,
            prompt: `Suggest 3 Griot resources for the topic: ${topic}`,
        });

        // Clean and parse JSON
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Griot search failed", error);
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
