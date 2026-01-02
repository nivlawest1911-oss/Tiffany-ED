
import { NextResponse } from 'next/server';
import { eqReframerFlow } from '@/ai/flows/eq-reframer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await eqReframerFlow(body);
    return NextResponse.json({ output: result });
  } catch (error) {
    return NextResponse.json({ error: 'EQ Brain unavailable' }, { status: 500 });
  }
}