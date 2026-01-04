import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const educatorAide = genkit({
  plugins: [googleAI()],
  model: 'gemini-1.5-flash',
});

export const paperworkAgent = educatorAide.defineFlow(
  {
    name: 'paperworkAgent',
    inputSchema: z.object({
      docType: z.enum(['IEP', 'LessonPlan', 'GrantProposal', 'ParentEmail']),
      context: z.string(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const prompt = `You are an AI assistant for Alabama schools, specifically Mobile County. 
    Generate a professional ${input.docType} based on this context: ${input.context}.
    Ensure it complies with Alabama standards and saves the user at least 2 hours of manual work.`;

    const response = await educatorAide.generate(prompt);
    return response.text;
  }
);
