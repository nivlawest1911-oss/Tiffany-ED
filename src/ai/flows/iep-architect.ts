import { z } from 'genkit';
import { ai } from '../lib/genkit-config';
import { gemini15Flash } from '@genkit-ai/googleai';

export const iepArchitectFlow = ai.defineFlow(
  {
    name: 'iepArchitectFlow',
    inputSchema: z.object({
      studentStrength: z.string(),
      areaOfNeed: z.string(),
      gradeLevel: z.string(),
    }),
  },
  async (input) => {
    // Passing the model object directly removes the 404 string mismatch
    const response = await ai.generate({
      model: gemini15Flash,
      prompt: `Act as a Senior Special Education Coordinator. 
      Draft a SMART goal and 3 accommodations for a ${input.gradeLevel} student.
      Strengths: ${input.studentStrength}
      Needs: ${input.areaOfNeed}.`,
    });
    return response.text;
  }
);