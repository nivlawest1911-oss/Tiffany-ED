import { NextResponse } from 'next/server';
import { generateProfessionalResponse } from '@/lib/leadership-ai';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // SOVEREIGN IEP ARCHITECT: ENFORCING CLINICAL PRECISION & STATE COMPLIANCE
    const prompt = `
      Act as the Sovereign IEP Architect. Generate a COMPREHENSIVE and CLINICALLY PRECISE IEP based on this data: ${JSON.stringify(body)}.
      
      REQUIREMENTS:
      1. LEGAL ALIGNMENT: Must cite IDEA 2004 (LRE/FAPE) and Alabama Administrative Code Chapter 290-8-9 specifically.
      2. RESEARCH-BASED GOALS: All goals must be SMART (Specific, Measurable, Achievable, Relevant, Time-bound) and based on Webb's DOK 3 or 4.
      3. PEDAGOGICAL FIDELITY: Incorporate Science of Reading (SOR) principles for literacy goals or Alabama Numeracy Act standards for math.
      4. STRATEGIC ACCOMMODATIONS: Provide specific, non-generic accommodations (e.g., 'Frequency: Once daily during core instruction' rather than 'As needed').
      5. FORMAT: Structured executive briefing with clear sections for Present Levels of Performance (PLOP), Annual Goals, and Service Provision.
    `;

    const output = await generateProfessionalResponse(prompt, 'iep-architect');

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error('IEP Generation Error:', error);
    const fallback = await generateProfessionalResponse("Fallback IEP Request", "iep-architect");
    return NextResponse.json({ output: fallback });
  }
}
