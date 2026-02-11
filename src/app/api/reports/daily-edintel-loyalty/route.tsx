import { Resend } from 'resend';
import { renderToBuffer } from '@react-pdf/renderer';
import DailyEdIntelPDF from '@/components/reports/DailyEdIntelPDF';
import React from 'react';

// Lazy initialization for build resilience
const getResend = () => new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export const runtime = 'nodejs'; // PDF rendering needs Node.js APIs

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isTest = searchParams.get('test') === 'true';

    // 1. Security Check (Only Vercel Cron or specific auth can call this)
    const authHeader = request.headers.get('authorization');
    const isCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
    const isDev = process.env.NODE_ENV === 'development';

    // Allow testing if CRON_SECRET is provided as a query param for easier manual testing
    const testSecret = searchParams.get('secret');
    const isAuthorizedTest = isTest && testSecret === process.env.CRON_SECRET;

    if (!isCron && !isDev && !isAuthorizedTest) {
        return new Response('Unauthorized - EdIntel clearance required.', { status: 401 });
    }

    try {
        const resend = getResend();
        // 2. Generate PDF Buffer
        // In a real app, you'd fetch real data from Supabase here
        const data = {
            uptime: "99.98%",
            wellness: "84/100",
            district: "Mobile County"
        };

        const pdfBuffer = await renderToBuffer(<DailyEdIntelPDF data={data} />);

        // 3. Send Email via Resend
        const result = await resend.emails.send({
            from: 'EdIntel Intelligence <reports@edintel.app>',
            to: ['superintendent@mcpss.com', 'alvin.west@edintel.app'], // Sending to user as well if available
            subject: `Daily Identity Report | ${data.district} | ${new Date().toLocaleDateString()}`,
            attachments: [
                {
                    filename: `EdIntel_Report_${data.district.replace(/\s+/g, '_')}.pdf`,
                    content: pdfBuffer,
                },
            ],
            text: `Your daily leadership and neuro-resilience metrics for ${data.district} are now available. View the attached Identity Report.`,
        });

        return Response.json({ success: true, id: result.data?.id });
    } catch (error: any) {
        console.error('[REPORT_ERROR]', error);

        // Failure Recovery Alert for the EdIntel Team
        try {
            const resend = getResend();
            await resend.emails.send({
                from: 'Operations Center <alerts@edintel.app>',
                to: 'alvin.west@edintel.app',
                subject: 'ALERT: Daily Identity Report Transmission Failure',
                text: `
                    Attention EdIntel Command Center,

                    The Daily Identity Report for Mobile County failed to transmit.

                    Error Details: ${error.message}

                    Potential Infrastructure Blocks Identified:
                    1. Google Cloud Project 'edintel-EdIntel-2026' may be suspended.
                    2. Supabase Project 'mpitiluamiidbjqmvbir' may be discouraged or paused.
                    3. Resend API Key invalid or expired.

                    Immediate Action Required:
                    Please verify terminal logs and infrastructure health status. The Superintendent's reporting SLA is currently at risk.

                    [Antigravity Recovery Node active]
                `
            });
        } catch (alertError) {
            console.error('[CRITICAL_FAILURE] Alert system also failed:', alertError);
        }

        return Response.json({ error: 'Identity Report failed to synthesize.', details: error.message }, { status: 500 });
    }
}
