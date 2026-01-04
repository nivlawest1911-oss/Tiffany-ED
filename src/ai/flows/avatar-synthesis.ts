import { GoogleGenerativeAI } from '@google/generative-ai';

export async function avatarSynthesisFlow(input: { name: string; role: string; specialization: string; autonomyLevel: number }) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const response = await model.generateContent({
        contents: [{
            role: 'user',
            parts: [{
                text: `You are the EdIntel Avatar Synthesis Engine. Generate a "Sovereign AI Delegate" profile for a school district personnel.
      
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
      
      Ensure the tone is professional, high-authority, and futuristic.`
            }]
        }]
    });

    return response.response.text();
}
