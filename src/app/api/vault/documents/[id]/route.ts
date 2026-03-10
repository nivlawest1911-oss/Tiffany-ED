import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = session.user.id;

        const { id } = await params;

        const document = await prisma.strategicVault.findFirst({
            where: { id, userId },
        });

        if (!document) {
            return NextResponse.json({ error: 'Asset not found or access denied' }, { status: 404 });
        }

        await prisma.strategicVault.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Vault DELETE Error:', error);
        return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
    }
}
