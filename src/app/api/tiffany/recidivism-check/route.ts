import { NextResponse } from 'next/server';
import { checkRecidivism } from '@/utils/recidivism-checker';

export async function POST(req: Request) {
    try {
        const { studentId, incidentType } = await req.json();
        const alert = await checkRecidivism(studentId, incidentType);
        return NextResponse.json(alert);
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to check recidivism' }, { status: 500 });
    }
}
