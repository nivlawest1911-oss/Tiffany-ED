import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Initialize Gemini directly
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('--- STARTING IEP GENERATOR (FREE TIER) ---');

    // Robust Fallback if Key is Missing
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      console.warn("Using Offline Fallback for IEP");
      return NextResponse.json({
        output: `**IEP DRAFT (SIMULATED)**\n\nBased on input: ${JSON.stringify(body).slice(0, 50)}...\n\n1. **Goals**: Improve reading comprehension.\n2. **Accommodations**: Extended time.\n\n*Note: Configure API Key for live AI.*`
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `You are an expert IEP architect. Generate a comprehensive IEP based on this student data: ${JSON.stringify(body)}. Include Goals, Accommodations, and PLAAFP.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log('--- GENERATION SUCCESS ---');
    return NextResponse.json({ output: text });
  } catch (error: any) {
    console.error('!!! AI GENERATION ERROR !!!', error);
    return NextResponse.json({
      error: 'IEP Generator encountered an issue',
      details: error.message
    }, { status: 500 });
  }
}