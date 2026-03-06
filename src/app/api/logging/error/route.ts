import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        if (!supabase) {
            return NextResponse.json({ logged: false, reason: 'Supabase offline' }, { status: 503 });
        }

        const error = await request.json()

        // 🏛️ Institutional Logging: Save to institutional_error_logs
        const { error: dbError } = await supabase.from('error_logs').insert([
            {
                message: error.message,
                stack: error.stack,
                context: error.context,
                user_agent: request.headers.get('user-agent'),
                ip_address: request.headers.get('x-forwarded-for') || '0.0.0.0',
                timestamp: new Date().toISOString(),
            },
        ])

        if (dbError) {
            console.error('[SUPABASE_LOGGING_FAILED]', dbError);
            return NextResponse.json({ logged: false }, { status: 500 });
        }

        return NextResponse.json({ logged: true })
    } catch (err) {
        console.error('[LOGGING_API_CRASH]', err)
        return NextResponse.json({ logged: false }, { status: 500 })
    }
}
