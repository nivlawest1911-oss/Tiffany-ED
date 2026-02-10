import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const { to, subject, html, intent } = await req.json();

        // EdIntel Shield: Validate content before sending
        if (!to || !subject || !html) {
            return NextResponse.json({ error: 'Incomplete EdIntel Dispatch Protocol' }, { status: 400 });
        }

        if (!resend) {
            return NextResponse.json({ error: 'EdIntel Dispatch System Offline (Missing Key)' }, { status: 500 });
        }

        // Add EdIntel Header
        const EdIntelHtml = `
            <div style="font-family: sans-serif; border: 1px solid #d4af37; padding: 20px; border-radius: 8px;">
                <div style="text-transform: uppercase; letter-spacing: 2px; color: #d4af37; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
                    EdIntel EdIntel Dispatch // ${intent || 'General Protocol'}
                </div>
                ${html}
                <div style="margin-top: 30px; font-size: 10px; color: #888; text-transform: uppercase; text-align: center;">
                    Secured by EdIntel Shield Technology
                </div>
            </div>
        `;

        const data = await resend.emails.send({
            from: 'EdIntel Intel <system@edintel.app>', // Update with verified domain
            to: [to],
            subject: `[EdIntel] ${subject}`,
            html: EdIntelHtml,
            headers: {
                'X-Entity-Ref-ID': 'EdIntel-SHIELD-V1'
            }
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('EdIntel Shield Email Error:', error);
        return NextResponse.json({ error: 'Dispatch Failed' }, { status: 500 });
    }
}
