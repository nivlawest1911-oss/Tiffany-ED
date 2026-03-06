import { NextResponse } from 'next/server';
import { aggregateStudentData, generateGrowthNarrative } from '@/services/portfolio-service';

export async function GET(req: Request, { params }: { params: { studentId: string } }) {
    try {
        const studentId = params.studentId;

        // 1. Aggregate Data
        const data = await aggregateStudentData(studentId);

        // 2. Generate Narrative
        const narrative = await generateGrowthNarrative(data);

        return NextResponse.json({ data, narrative });
    } catch (error) {
        console.error('Error in portfolio route:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}
