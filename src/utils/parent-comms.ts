import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export type ParentUpdateType = 'celebratory' | 'restorative' | 'informational';

export type ParentUpdateContext = {
    studentName: string;
    culturalContext?: string; // e.g., "Alabama Legacy", "Griot Connection"
    topic?: string;
    recentWin?: string;
};

export async function generateParentUpdate(
    notes: string,
    type: ParentUpdateType,
    context: ParentUpdateContext
): Promise<string> {
    const systemPrompt = `You are the Tiffany-ED Parent Bridge, a highly emotionally intelligent and culturally resonant communication assistant for teachers. 
  Your goal is to translate classroom observations into professional, supportive, and empowering messages for parents.
  
  TONE GUIDELINES:
  - **Celebratory**: High energy, focusing on specific "Metacognitive Wins" or "Sovereign Thinking".
  - **Restorative**: Collaborative, focusing on solutions and the "Antecedent-Behavior-Consequence" loop without blame. Use "We" language.
  - **Informational**: Clear, concise, and respectful of the parent's time.
  
  CULTURAL RESONANCE:
  - If a cultural context is provided (e.g., "Alabama Legacy"), subtly weave in values of community, resilience, and history.
  
  SAFE-GUARD:
  - Never use clinical jargon (e.g., "recidivism", "oppositional").
  - Always emphasize growth and partnership.
  - If the notes are negative, pivot to a "Growth Opportunity" frame.
  
  Format the output as a ready-to-send email or text message.`;

    const userPrompt = `
  Student: ${context.studentName}
  Topic: ${context.topic || 'General Update'}
  Type: ${type}
  Context: ${context.culturalContext || 'Standard'}
  Recent Win: ${context.recentWin || 'N/A'}
  
  Teacher Notes: "${notes}"
  
  Generate the message:`;

    try {
        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            system: systemPrompt,
            prompt: userPrompt,
        });

        return text;
    } catch (error) {
        console.error("Parent update generation failed:", error);
        return `Subject: Update regarding ${context.studentName}\n\nDear Family,\n\nI wanted to share a quick update about ${context.studentName}. We are working on ${context.topic || 'their goals'} and I appreciate your partnership. Please contact me if you have questions.\n\nBest,\n[Teacher Name]`;
    }
}
