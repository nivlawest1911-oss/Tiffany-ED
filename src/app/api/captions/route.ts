
import { NextResponse } from 'next/server';
import { getCaptionsProject, listCaptionsProjects } from '@/lib/captions';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { stableId, action } = await req.json();

        if (action === 'list') {
            const projects = await listCaptionsProjects();
            return NextResponse.json({ projects });
        }

        if (!stableId) {
            return NextResponse.json({ error: 'Missing stableId' }, { status: 400 });
        }

        const project = await getCaptionsProject(stableId);
        return NextResponse.json({ project });
    } catch (error: any) {
        console.error('Captions API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
