import { PGlite } from '@electric-sql/pglite';

/**
 * Sovereign Contextual Edge: PGLite Synchronization
 * Enables a local, light-years-ahead relational context directly in the browser.
 */
export class SovereignEdgeDB {
    private static instance: SovereignEdgeDB;
    private db: PGlite | null = null;
    private isInitialized: boolean = false;

    private constructor() { }

    public static getInstance(): SovereignEdgeDB {
        if (!SovereignEdgeDB.instance) {
            SovereignEdgeDB.instance = new SovereignEdgeDB();
        }
        return SovereignEdgeDB.instance;
    }

    /**
     * Initializes the local PGLite database.
     */
    public async init() {
        if (this.isInitialized) return;

        try {
            console.log('[Sovereign-Edge] Powering up local PGLite engine...');
            this.db = new PGlite();

            // Create local schema for the 'Contextual Senses'
            await this.db.exec(`
                CREATE TABLE IF NOT EXISTS local_context (
                    id TEXT PRIMARY KEY,
                    key TEXT UNIQUE,
                    value JSONB,
                    last_synced TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS rapid_observations (
                    id TEXT PRIMARY KEY,
                    student_id TEXT,
                    content TEXT,
                    sentiment_label TEXT,
                    sentiment_score REAL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            this.isInitialized = true;
            console.log('[Sovereign-Edge] Neural Edge Database Online.');
        } catch (error) {
            console.error('[Sovereign-Edge] Initialization Failure:', error);
        }
    }

    /**
     * Syncs a subset of data from the Sovereign Cloud to the local Edge DB.
     * This follows the 'Data Dignity' principle by keeping specific context local.
     */
    public async syncSubset(key: string, data: any) {
        if (!this.db) await this.init();

        try {
            await this.db?.query(
                'INSERT INTO local_context (id, key, value) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
                [crypto.randomUUID(), key, JSON.stringify(data)]
            );
            console.log(`[Sovereign-Edge] Sync Complete for: ${key}`);
        } catch (error) {
            console.error('[Sovereign-Edge] Sync Error:', error);
        }
    }

    /**
     * Instant local retrieval for zero-latency UI grounding.
     */
    public async getLocalContext(key: string) {
        if (!this.db) return null;
        const result = await this.db.query('SELECT value FROM local_context WHERE key = $1', [key]);
        return result.rows[0]?.value || null;
    }

    /**
     * Logs a rapid observation locally before background syncing to cloud.
     */
    public async logLocalObservation(obs: { studentId: string; content: string; sentiment: any }) {
        if (!this.db) await this.init();
        await this.db?.query(
            'INSERT INTO rapid_observations (id, student_id, content, sentiment_label, sentiment_score) VALUES ($1, $2, $3, $4, $5)',
            [crypto.randomUUID(), obs.studentId, obs.content, obs.sentiment.label, obs.sentiment.score]
        );
    }
}

export const sovereignEdge = SovereignEdgeDB.getInstance();
