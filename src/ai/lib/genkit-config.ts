import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

console.log("GENKIT DEBUG: Key length:", process.env.GOOGLE_GENAI_API_KEY?.length);

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })
  ],
  model: 'gemini-1.5-flash-latest' as any,
});