import { z } from 'genkit';
import { ai } from '../lib/genkit-config';

export const sentimentTrackerFlow = ai.defineFlow(
  {
    name: 'sentimentTrackerFlow',
    inputSchema: z.object({
      feedbackText: z.string(),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      prompt: `Analyze the following staff feedback for emotional sentiment and burnout risk.
      Feedback: ${input.feedbackText}
      1. Identify the primary emotion.
      2. Score burnout risk (0-100).
      3. Suggest a proactive leadership intervention to improve moral.`,
    });
    return response.text;
  }
);