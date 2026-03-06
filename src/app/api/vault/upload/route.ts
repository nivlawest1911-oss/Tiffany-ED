
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Initialize Supabase Admin for secure operations if needed, 
// but here we use prisma to write to DB.
// We assume the file is already uploaded to storage by the client.

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fileName, fileSize, fileType, storagePath, userId } = body;

        if (!userId || !fileName || !storagePath) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create VaultDocument record
        const document = await prisma.vaultDocument.create({
            data: {
                userId,
                fileName,
                fileSize,
                fileType,
                storagePath,
                isEncrypted: true,
                securityLevel: 'confidential',
                tags: [],
            },
        });

        // Create Audit Log
        await prisma.vaultAudit.create({
            data: {
                documentId: document.id,
                userId,
                action: 'UPLOAD',
                timestamp: new Date(),
            },
        });

        return NextResponse.json(document);
    } catch (error: any) {
        console.error('Vault Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
