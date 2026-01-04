import { GoogleGenerativeAI } from '@google/generative-ai';

export async function principalSummaryFlow(input: { totalStudents: number; interventionCount: number; focusCount: number; staffCount: number }) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const response = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{
        text: `Act as a Data-Driven School Principal. 
      Analyze these metrics: ${input.totalStudents} total students, ${input.interventionCount} in urgent intervention, and ${input.focusCount} needing focus. 
      Current staff: ${input.staffCount}.
      Provide a 3-point executive summary on school wellness and resource allocation needs.`
      }]
    }]
  });

  return response.response.text();
}