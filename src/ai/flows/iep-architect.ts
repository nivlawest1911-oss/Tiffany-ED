import { GoogleGenerativeAI } from '@google/generative-ai';

export async function iepArchitectFlow(input: { studentStrength: string; areaOfNeed: string; gradeLevel: string }) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const response = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{
        text: `Act as a Senior Special Education Coordinator. 
      Draft a SMART goal and 3 accommodations for a ${input.gradeLevel} student.
      Strengths: ${input.studentStrength}
      Needs: ${input.areaOfNeed}.`
      }]
    }]
  });

  return response.response.text();
}