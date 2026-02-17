import { NextResponse } from 'next/server';
import { generateRestorativeScript, RestorativeContext } from '@/utils/restorative-service';

export async function POST(req: Request) {
    try {
        const context: RestorativeContext = await req.json();
        const script = await generateRestorativeScript(context);
        return NextResponse.json(script);
    } catch (error) {
        console.error('Error in restorative-reset route:', error);
        return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
    }
}
