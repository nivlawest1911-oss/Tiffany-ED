import { NextResponse } from 'next/server';
import { getCaptionsClient } from '@/lib/captions/client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { projectId, action } = await req.json();
        const client = getCaptionsClient();

        if (action === 'list') {
            const projects = await client.listProjects();
            return NextResponse.json({ projects: projects.projects });
        }

        if (!projectId) {
            return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
        }

        const project = await client.getProject(projectId);
        return NextResponse.json({ project });
    } catch (error: any) {
        console.error('Captions API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
