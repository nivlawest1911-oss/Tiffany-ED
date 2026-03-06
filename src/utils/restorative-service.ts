import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

export interface RestorativeContext {
    studentName: string;
    incidentType: string;
    severity: 'low' | 'medium' | 'high';
    relationshipHistory: 'positive' | 'neutral' | 'strained';
}

export async function generateRestorativeScript(context: RestorativeContext) {
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
      
      Output Format (JSON):
      {
        "opener": "A gentle opening line to start the conversation.",
        "questions": ["Question 1", "Question 2", "Question 3"],
        "closing": "A hopeful closing statement to seal the agreement."
      }
    `;

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: prompt,
        });

        try {
            // Attempt to extract JSON if the model returns markdown code blocks
            const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
            const jsonString = jsonMatch ? jsonMatch[0].replace(/```json|```/g, '') : text;
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse AI response as JSON", e);
            return {
                opener: `Hey ${context.studentName}, can we take a minute to reset?`,
                questions: ["What happened just now?", "What were you thinking at the time?", "What do you think needs to happen to make things right?"],
                closing: "Thanks for talking with me. Let's get back on track."
            };
        }

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
