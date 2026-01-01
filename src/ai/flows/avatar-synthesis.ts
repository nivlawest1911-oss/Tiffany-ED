import { z } from 'genkit';
import { ai } from '../lib/genkit-config';

export const avatarSynthesisFlow = ai.defineFlow(
    {
        name: 'avatarSynthesisFlow',
        inputSchema: z.object({
            name: z.string(),
            role: z.string(),
            specialization: z.string(),
            autonomyLevel: z.number(),
        }),
    },
    async (input) => {
        const response = await ai.generate({
            prompt: `You are the EdIntel Avatar Synthesis Engine. Generate a "Sovereign AI Delegate" profile for a school district personnel.
      
      User Configuration:
      Name: ${input.name}
      Role: ${input.role}
      Specialization: ${input.specialization}
      Autonomy Level: ${input.autonomyLevel}%
      
      Provide the following in a structured format with explicit headers for parsing:
      MISSION: [A powerful 1rd person mission statement for this avatar]
      COGNITIVE_PROFILE: [Describe its decision-making style based on its role and autonomy]
      CORE_POWER: [One unique "Superpower" or specialized capability]
      AUTOMATED_TASKS:
      [Task 1]
      [Task 2]
      [Task 3]
      [Task 4]
      SOVEREIGN_ID: [A unique alphanumeric identifier]
      
      Ensure the tone is professional, high-authority, and futuristic.`,
        });
        return response.text;
    }
);
