import { NextResponse } from 'next/server';
import { validateCompliance } from '@/utils/vault-sync';

export async function POST(req: Request) {
    try {
        const { narrative } = await req.json();
        const result = await validateCompliance(narrative);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in audit route:', error);
        return NextResponse.json({ error: 'Failed to audit portfolio' }, { status: 500 });
    }
}
