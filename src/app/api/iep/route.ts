export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import { iepArchitectFlow } from '@/ai/flows/iep-architect';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('--- STARTING IEP FLOW ---');
    const result = await iepArchitectFlow(body);
    console.log('--- FLOW SUCCESS ---');
    return NextResponse.json({ output: result });
  } catch (error: any) {
    // THIS WILL PRINT THE REAL ERROR TO YOUR POWERSHELL
    console.error('!!! GENKIT INTERNAL ERROR !!!');
    console.error(error.message || error);
    if (error.stack) console.error(error.stack);

    return NextResponse.json({
      error: 'IEP Architect brain is offline',
      details: error.message
    }, { status: 500 });
  }
}