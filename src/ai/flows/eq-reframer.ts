import { z } from 'genkit';
import { ai } from '../lib/genkit-config';

export const eqReframerFlow = ai.defineFlow(
  {
    name: 'eqReframerFlow',
    inputSchema: z.object({
      rawSituation: z.string(),
      stakeholder: z.enum(['Parent', 'Staff', 'District']),
      intensity: z.enum(['Low', 'Medium', 'High']),
      protocol: z.enum(['ef-reframing', 'meeting-agenda', 'feedback', 'crisis', 'conflict', 'discipline']).optional(),
    }),
  },
  async (input) => {
    let systemRole = "expert in Emotional Intelligence (EQ), School Law, and Special Education Compliance";
    let instructions = "";

    switch (input.protocol) {
      case 'discipline':
        instructions = `1. Analyze the following disciplinary situation for legal and IDEA/504 compliance: ${input.rawSituation}.
        2. Clarify the "10-Day Rule" (cumulative vs consecutive removals) and its impact.
        3. Outline steps for a "Manifestation Determination" review (MDR) if required.
        4. Provide the "Sovereign Compliance" move to ensure FAPE (Free Appropriate Public Education) is maintained.
        5. Draft a legally sound but empathetic notification to the ${input.stakeholder}.`;
        break;
      case 'meeting-agenda':
        instructions = `1. Generate a high-impact meeting agenda focused on resolving: ${input.rawSituation}.
        2. Define clear objectives and timed milestones.
        3. Include specific "EQ Bridge" questions to facilitate stakeholder buy-in.`;
        break;
      case 'feedback':
        instructions = `1. Draft constructive performance feedback based on the following observation/event: ${input.rawSituation}.
        2. Use the "SBI" model (Situation, Behavior, Impact).
        3. Ensure the tone is growth-oriented and supportive of ${input.stakeholder} professional autonomy.`;
        break;
      case 'crisis':
        instructions = `1. Draft an urgent communication protocol (email/memo) for the following crisis: ${input.rawSituation}.
        2. Focus on transparency, safety, and district authority.
        3. Include a "Decision Velocity" summary to inform leadership actions.`;
        break;
      case 'conflict':
        instructions = `1. Address a difficult, touchy, and challenging situation: ${input.rawSituation}.
        2. Provide a 3-step de-escalation plan focusing on neutral mediation and psychological safety.
        3. Draft a sensitive communication response that maintains professional boundaries while showing deep empathy.
        4. Suggest a specific "Sovereign Leadership" move to resolve the underlying tension.`;
        break;
      case 'ef-reframing':
      default:
        instructions = `1. Provide a de-escalation strategy for the following: ${input.rawSituation}.
        2. Draft a high-EQ communication response targeting a ${input.stakeholder}.
        3. Suggest a "Leadership Mindset" shift to reduce decision fatigue during this ${input.intensity} urgency situation.`;
        break;
    }

    const response = await ai.generate({
      prompt: `You are an ${systemRole}.
      
      Target Stakeholder: ${input.stakeholder}
      Situation/Context: ${input.rawSituation}
      Urgency Level: ${input.intensity}
      
      Instructions:
      ${instructions}
      
      Ensure output is professional, data-driven, and establishes sovereign educational authority.`,
    });
    return response.text;
  }
);