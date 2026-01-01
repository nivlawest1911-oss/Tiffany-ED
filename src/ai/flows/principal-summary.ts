import { z } from 'genkit';
import { ai } from '../lib/genkit-config';

export const principalSummaryFlow = ai.defineFlow(
  {
    name: 'principalSummaryFlow',
    inputSchema: z.object({
      totalStudents: z.number(),
      interventionCount: z.number(),
      focusCount: z.number(),
      staffCount: z.number(),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      prompt: `Act as a Data-Driven School Principal. 
      Analyze these metrics: ${input.totalStudents} total students, ${input.interventionCount} in urgent intervention, and ${input.focusCount} needing focus. 
      Current staff: ${input.staffCount}.
      Provide a 3-point executive summary on school wellness and resource allocation needs.`,
    });
    return response.text;
  }
);