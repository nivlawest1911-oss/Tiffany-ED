
import { NextRequest, NextResponse } from 'next/server';
import { SwarmRouter } from '@/lib/ai/swarm-router';


export const runtime = 'edge'; // Or nodejs, depending on needs. Edge is fine if SwarmRouter uses fetch/standard APIs.

export async function POST(req: NextRequest) {
    try {
        // 1. Basic Auth Check (Expand as needed)
        // const session = await getServerSession(...) 
        // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { query, context } = body;

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // 2. Execute Swarm
        const result = await SwarmRouter.routeRequest(query, context);

        return NextResponse.json({
            success: true,
            data: result
        });

    } catch (error: any) {
        console.error('[API] Swarm Execution Failed:', error);
        return NextResponse.json({ error: 'Internal Swarm Error' }, { status: 500 });
    }
}
