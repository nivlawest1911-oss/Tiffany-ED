import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = session.user.id;

        const documents = await prisma.strategicVault.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(documents);
    } catch (error) {
        console.error('Vault GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch intelligence assets' }, { status: 500 });
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
        const { fileName, content, metadata, tags } = body;

        const document = await prisma.strategicVault.create({
            data: {
                userId,
                fileName,
                content,
                metadata,
                tags: tags || [],
            },
        });

        return NextResponse.json(document);
    } catch (error) {
        console.error('Vault POST Error:', error);
        return NextResponse.json({ error: 'Failed to archive document' }, { status: 500 });
    }
}
