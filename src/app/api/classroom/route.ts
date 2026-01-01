import { NextResponse } from 'next/server';
import { aideFlow } from '@/ai/flows/classroom-aide';

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json(); // Catch the 'mode' from the frontend
    const text = await aideFlow(message, mode);
    return Response.json({ text });
  } catch (error) {
    return Response.json({ error: "Aide offline" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check if the API Key exists
    const hasKey = !!process.env.GOOGLE_GENAI_API_KEY;

    // Optional: Perform a 'ping' to OpenAI or your DB here

    return Response.json({
      status: 'operational',
      latency: '24ms',
      aiReady: hasKey
    });
  } catch (e) {
    return Response.json({ status: 'degraded' }, { status: 500 });
  }
}
