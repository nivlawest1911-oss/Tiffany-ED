import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  // EdIntel Security Layer
  const apiKey = req.headers.get('x-EdIntel-key');
  const validKey = process.env.EDINTEL_EdIntel_KEY;

  if (apiKey && apiKey === validKey) {
    // Authenticated EdIntel Access
    try {
      // const body = await req.json(); // body unused
      await req.json(); // Still consume the body if needed, then ignore
      return NextResponse.json({
        status: 'Authenticated',
        role: 'EdIntel Architect',
        output: `## EdIntel Command Deck\n\n**Clearance**: Level 5 (Master)\n**Uplink**: Secure\n\n*Welcome back, Director.*`
      });
    } catch (_error) {
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  // Fallback / Unauthorized for public
  return NextResponse.json({
    error: 'Unauthorized: Missing or Invalid EdIntel Key',
    hint: 'Include x-EdIntel-key header'
  }, { status: 401 });
}
