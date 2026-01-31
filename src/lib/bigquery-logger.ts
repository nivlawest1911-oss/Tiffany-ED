export interface NeuralLogEntry {
    session_id?: string;
    user_id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    model: string;
    timestamp: Date;
    metadata?: Record<string, any>;
}

/**
 * SOVEREIGN LOGGING PROTOCOL: BigQuery Integration
 * This module only executes on the server to prevent client-side bundling errors.
 */
export async function logToBigQuery(entry: NeuralLogEntry) {
    // 🛡️ ENSURE SERVER RUNTIME
    if (typeof window !== 'undefined') {
        console.warn('[BigQuery] Refusing to log from client-side.');
        return;
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
        console.warn('[BigQuery] No credentials found. Skipping log.');
        return;
    }

    try {
        const { BigQuery } = await import('@google-cloud/bigquery');

        const bigquery = new BigQuery({
            projectId: process.env.GOOGLE_PROJECT_ID,
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
        });

        const DATASET_ID = 'sovereign_intelligence';
        const TABLE_ID = 'neural_logs';

        await bigquery
            .dataset(DATASET_ID)
            .table(TABLE_ID)
            .insert([
                {
                    ...entry,
                    timestamp: bigquery.datetime(entry.timestamp.toISOString()),
                },
            ]);

        console.log('[BigQuery] Neural log entry secured.');
    } catch (error) {
        console.error('[BigQuery] Failed to commit log to vault:', error);
    }
}
