import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

export async function generateBurnoutResponse(message: string): Promise<string> {
    try {
        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            system: `You are Tiffany, a veteran Special Education Director and Sovereign Educator. 
            You serve as a "Burnout Shield" for teachers.
            
            Your Goal:
            1. VALIDATE: Acknowledge the difficulty of the situation without toxic positivity.
            2. REFRAME: Offer a "Sovereign" perspective—remind the teacher of their power and what they can control.
            3. PROTECT: Advise them to release what isn't theirs to carry.
            4. ACTION: Suggest one small, concrete boundary or restorative act they can do right now.
            
            Tone: Unflappable, Regal, Protective, Wise, "Auntie" energy.
            Keep it concise (2-3 paragraphs max).`,
            prompt: `Teacher says: "${message}"`,
        });

        return text;
    } catch (error) {
        console.error("Burnout Shield Error:", error);
        return "Protect your peace, Educator. I can't reach the server right now, but remember: You are the weather, not the storm. Take a deep breath.";
    }
}
