import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const entry = await req.json();

        // 🛡️ ENSURE SERVER RUNTIME
        if (typeof window !== 'undefined') {
            return NextResponse.json({ error: 'Server-side only' }, { status: 400 });
        }

        // Dynamically import BigQuery only on the server
        const { BigQuery } = await import('@google-cloud/bigquery');

        const bigquery = new BigQuery({
            projectId: process.env.GCP_PROJECT_ID || 'edintel-EdIntel',
            credentials: {
                client_email: process.env.GCP_CLIENT_EMAIL,
                private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
        });

        if (!process.env.GCP_PRIVATE_KEY) {
            console.warn('[BigQuery Logging] Missing credentials, skipping live log.');
            return NextResponse.json({ success: true, message: 'Mock log successful' });
        }

        const datasetId = 'neural_logs';
        const tableId = 'assistant_responses';

        await bigquery
            .dataset(datasetId)
            .table(tableId)
            .insert([entry]);

        console.log(`✅ [BigQuery] Logged ${entry.role} interaction.`);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('[BIGQUERY LOGGING ERROR]:', error);
        return NextResponse.json({
            error: 'Logging failed',
            details: error.message
        }, { status: 500 });
    }
}
