import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    if (!supabase) {
        return NextResponse.json({ error: 'Database uplink offline' }, { status: 503 });
    }

    try {
        const { data: logs, error } = await supabase
            .from('usage_analytics')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(20);

        if (error) throw error;

        return NextResponse.json(logs || []);
    } catch (error: any) {
        console.error('[EdIntel_TELEMETRY_API] Sync error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
