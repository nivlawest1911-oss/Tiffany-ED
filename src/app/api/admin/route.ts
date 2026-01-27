import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Sovereign Security Layer
  const apiKey = req.headers.get('x-sovereign-key');
  const validKey = process.env.EDINTEL_SOVEREIGN_KEY;

  if (apiKey && apiKey === validKey) {
    // Authenticated Sovereign Access
    try {
      const body = await req.json();
      return NextResponse.json({
        status: 'Authenticated',
        role: 'Sovereign Architect',
        output: `## Sovereign Command Deck\n\n**Clearance**: Level 5 (Master)\n**Uplink**: Secure\n\n*Welcome back, Director.*`
      });
    } catch (error) {
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  // Fallback / Unauthorized for public
  return NextResponse.json({
    error: 'Unauthorized: Missing or Invalid Sovereign Key',
    hint: 'Include x-sovereign-key header'
  }, { status: 401 });
}
