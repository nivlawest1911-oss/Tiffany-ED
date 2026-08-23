import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { RestorativeScriptSchema } from '@/lib/ai/signatures';
import { z } from 'zod';

export interface RestorativeContext {
    studentName: string;
    incidentType: string;
    severity: 'low' | 'medium' | 'high';
    relationshipHistory: 'positive' | 'neutral' | 'strained';
}

export type RestorativeScript = z.infer<typeof RestorativeScriptSchema>;

export async function generateRestorativeScript(context: RestorativeContext): Promise<RestorativeScript> {
    try {
        const prompt = `
      Act as a master Restorative Justice facilitator and veteran educator (Tiffany).
      Create a "Restorative Reset" script for a teacher to use with a student.
      
      Context:
      - Student Name: ${context.studentName}
      - Incident: ${context.incidentType}
      - Severity: ${context.severity}
      - Relationship History: ${context.relationshipHistory}
      
      Goal: De-escalate, reconnect, and problem-solve. Avoid shaming. Use "I" statements and open-ended questions.
    `;

        const { object } = await generateObject({
            model: googleProvider(AI_MODELS.GOOGLE.PRO),
            schema: RestorativeScriptSchema,
            prompt: prompt,
        });

        return object;
    } catch (error) {
        console.error('Error generating restorative script:', error);
        // Fallback script
        return {
            opener: `I notice things are a bit off, ${context.studentName}. Let's reset.`,
            questions: [
                "What's happening for you right now?",
                "Who has been affected by this?",
                "What do we need to do to fix this?"
            ],
            closing: "I believe in you. Let's try again."
        };
    }
}
