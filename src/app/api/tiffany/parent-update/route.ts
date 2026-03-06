import { generateParentUpdate } from '@/utils/parent-comms';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { notes, type, context } = await req.json();

        if (!notes || !type || !context) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const update = await generateParentUpdate(notes, type, context);

        return NextResponse.json({ update });
    } catch (error) {
        console.error('Error generating parent update:', error);
        return NextResponse.json({ error: 'Failed to generate update' }, { status: 500 });
    }
}
