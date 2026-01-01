import { z } from 'genkit';
import { ai } from '../lib/genkit-config';
import { gemini15Flash } from '@genkit-ai/googleai';

export async function aideFlow(message: string, mode: 'aide' | 'iep') {
  const systemPrompts = {
    aide: `You are an EdIntel Classroom Assistant. 
           Focus on pedagogy, lesson planning, and student engagement. 
           Keep tone supportive and creative.`,
    iep: `You are a Special Education Compliance Officer and IEP Architect. 
          Generate structured, data-driven goals. 
          Use clinical language (e.g., 'The student will demonstrate...', 'with 80% accuracy over 5 consecutive trials'). 
          Ensure all suggestions align with IDEA (Individuals with Disabilities Education Act) standards.`
  };

  const response = await ai.generate({
    model: gemini15Flash,
    config: {
      // IEPs need low temperature for consistency; Aides need high for creativity
      temperature: mode === 'iep' ? 0.3 : 0.8,
    },
    prompt: `${systemPrompts[mode]}\n\nUser: ${message}`,
  });

  return response.text;
}

export const classroomAideFlow = ai.defineFlow(
  {
    name: 'classroomAideFlow',
    inputSchema: z.object({
      topic: z.string(),
      subject: z.string(),
      gradeLevel: z.string(),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      model: gemini15Flash,
      prompt: `Generate 3 innovative teaching strategies for: ${input.topic}. 
      Subject: ${input.subject}. Grade: ${input.gradeLevel}.`,
    });
    return response.text;
  }
);