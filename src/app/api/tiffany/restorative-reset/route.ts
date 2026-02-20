import { NextResponse } from 'next/server';
import { generateRestorativeScript, RestorativeContext } from '@/utils/restorative-service';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        if (!supabase) {
            return NextResponse.json({ error: 'Supabase client unavailable' }, { status: 503 });
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const context: RestorativeContext = await req.json();
        const script = await generateRestorativeScript(context);
        return NextResponse.json(script);
    } catch (error) {
        console.error('Error in restorative-reset route:', error);
        return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
    }
}
