import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * 📵 STOP PROTOCOL: Universal Unsubscribe Node for EdIntel Alerts
 * Captures inbound WhatsApp 'STOP' commands and blacklists numbers in the global identity cluster.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate WhatsApp/Meta Webhook structure
        const messageObj = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        if (!messageObj) return NextResponse.json({ status: 'ignored' });

        const fromNumber = messageObj.from;
        const text = messageObj.text?.body?.trim()?.toUpperCase();

        if (text === 'STOP' || text === 'UNSUBSCRIBE' || text === 'EXIT') {
            // 🛰️ Execute Blacklist Synchronization
            const { error } = await supabase
                .from('communication_blacklist')
                .upsert({
                    phone_number: fromNumber,
                    source: 'WHATSAPP_WEBHOOK',
                    opt_out_date: new Date().toISOString()
                });

            if (error) {
                console.error('[STOP_PROTOCOL_ERROR]', error);
                return NextResponse.json({ error: 'Database handshake failed' }, { status: 500 });
            }

            console.log(`[EdIntel_COMPLIANCE] Number blacklisted: ${fromNumber}`);
        }

        return NextResponse.json({ status: 'processed' });
    } catch (err) {
        console.error('[WEBHOOK_ERROR]', err);
        return NextResponse.json({ error: 'Signal interrupted' }, { status: 500 });
    }
}
