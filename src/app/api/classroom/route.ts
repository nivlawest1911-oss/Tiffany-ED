import { generateProfessionalResponse } from '@/lib/leadership-ai';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();

    // Using Professional AI Engine for comprehensive human-like content
    const text = await generateProfessionalResponse(message, mode || 'general');

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
