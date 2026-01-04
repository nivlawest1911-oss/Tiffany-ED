import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize lazily to prevent build-time/init-time errors
export async function aideFlow(message: string, mode: 'aide' | 'iep') {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const systemPrompts = {
    aide: `You are an EdIntel Classroom Assistant. 
           Focus on pedagogy, lesson planning, and student engagement. 
           Keep tone supportive and creative.`,
    iep: `You are a Special Education Compliance Officer and IEP Architect. 
          Generate structured, data-driven goals. 
          Use clinical language (e.g., 'The student will demonstrate...', 'with 80% accuracy over 5 consecutive trials'). 
          Ensure all suggestions align with IDEA (Individuals with Disabilities Education Act) standards.`
  };

  const finalPrompt = `${systemPrompts[mode]}\n\nUser: ${message}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
      generationConfig: {
        temperature: mode === 'iep' ? 0.3 : 0.8,
      }
    });

    return result.response.text();
  } catch (error) {
    console.error("AI SDK Error in aideFlow:", error);
    throw error;
  }
}