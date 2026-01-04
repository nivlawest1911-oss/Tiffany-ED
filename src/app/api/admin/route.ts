export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { principalSummaryFlow } from '@/ai/flows/principal-summary';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await principalSummaryFlow(body);
    return NextResponse.json({ output: result });
  } catch (error) {
    return NextResponse.json({ error: 'Admin Brain connection failed' }, { status: 500 });
  }
}