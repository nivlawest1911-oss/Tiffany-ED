import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const entry = await prisma.legacyLedger.findUnique({
            where: { id }
        });

        if (!entry) {
            return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json(entry);
    } catch (error) {
        console.error('Legacy Entry GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch legacy entry' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { outcome, learnings } = body;

        const result = await prisma.legacyLedger.update({
            where: { id },
            data: { outcome, learnings }
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Legacy Entry PATCH Error:', error);
        return NextResponse.json({ error: 'Failed to update legacy outcome' }, { status: 500 });
    }
}
