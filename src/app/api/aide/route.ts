export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import { classroomAideFlow } from '@/ai/flows/classroom-aide';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Ensuring the flow receives the exact object it expects
    const result = await classroomAideFlow({
      topic: body.topic || 'General Education',
      subject: body.subject || 'Multi-disciplinary',
      gradeLevel: body.gradeLevel || '6th Grade'
    });
    return NextResponse.json({ output: result });
  } catch (error) {
    console.error('Aide Flow Error:', error);
    return NextResponse.json({ error: 'AI Brain timeout or invalid API key' }, { status: 500 });
  }
}