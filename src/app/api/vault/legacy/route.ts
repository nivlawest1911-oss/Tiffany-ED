import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = session.user.id;

        const timeline = await prisma.legacy_ledger.findMany({
            where: { user_id: userId },
            select: {
                id: true,
                title: true,
                directive: true,
                created_at: true,
                tags: true
            },
            orderBy: { created_at: 'desc' }
        });

        return NextResponse.json(timeline);
    } catch (error) {
        console.error('Legacy Ledger GET Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve legacy timeline' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = session.user.id;

        const body = await req.json();
        const { title, directive, logic, swarmContext, tags } = body;

        const result = await prisma.legacy_ledger.create({
            data: {
                id: crypto.randomUUID(),
                user_id: userId,
                title,
                directive,
                logic,
                swarm_context: swarmContext || {},
                tags: tags || [],
                is_immutable: true,
                updated_at: new Date()
            }
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Legacy Ledger POST Error:', error);
        return NextResponse.json({ error: 'Failed to commit to legacy ledger' }, { status: 500 });
    }
}
