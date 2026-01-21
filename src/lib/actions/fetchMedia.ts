'use server';
import { sql } from '@vercel/postgres';

export async function getEdIntelMedia(query?: string) {
    try {
        if (query) {
            const { rows } = await sql`
        SELECT * FROM edintel_media 
        WHERE file_name ILIKE ${'%' + query + '%'}
        ORDER BY uploaded_at DESC
      `;
            return rows;
        }

        const { rows } = await sql`
      SELECT * FROM edintel_media 
      ORDER BY uploaded_at DESC
    `;
        return rows;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function syncMediaToDatabase(manifestPath: string) {
    try {
        const fs = require('fs');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        console.log(`🗄️  Syncing ${manifest.length} items to Vercel Postgres...`);

        for (const item of manifest) {
            try {
                await sql`
          INSERT INTO edintel_media (file_name, url, media_type, size, uploaded_at)
          VALUES (${item.fileName}, ${item.url}, ${item.type}, ${item.size || 0}, ${item.uploadedAt})
          ON CONFLICT (url) DO UPDATE SET
            file_name = EXCLUDED.file_name,
            media_type = EXCLUDED.media_type,
            size = EXCLUDED.size
        `;
                console.log(`✅ Synced: ${item.fileName}`);
            } catch (err: any) {
                console.error(`❌ Sync error for ${item.fileName}:`, err.message);
            }
        }

        console.log('🚀 Database sync complete!');
        return { success: true, count: manifest.length };
    } catch (error: any) {
        console.error('Sync failed:', error);
        return { success: false, error: error.message };
    }
}
