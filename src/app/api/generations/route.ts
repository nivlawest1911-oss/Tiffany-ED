import { NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';

export const runtime = 'edge';

// Save a generation to the database
export async function POST(request: NextRequest) {
    try {
        const { userId, generatorId, prompt, content, metadata, professorVideoUrl } = await request.json();

        if (!userId || !generatorId || !prompt || !content) {
            return new Response(JSON.stringify({
                error: 'Missing required fields'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if Postgres is configured
        if (!process.env.POSTGRES_URL) {
            return new Response(JSON.stringify({
                error: 'Database not configured',
                message: 'Set up Vercel Postgres in your dashboard'
            }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Save generation
        const result = await sql`
      INSERT INTO generations (user_id, generator_id, prompt, content, metadata, professor_video_url)
      VALUES (${userId}, ${generatorId}, ${prompt}, ${content}, ${JSON.stringify(metadata || {})}, ${professorVideoUrl || null})
      RETURNING id, created_at
    `;

        // Update usage stats
        await sql`
      INSERT INTO usage_stats (user_id, generator_id, date, count)
      VALUES (${userId}, ${generatorId}, CURRENT_DATE, 1)
      ON CONFLICT (user_id, generator_id, date)
      DO UPDATE SET count = usage_stats.count + 1
    `;

        return new Response(JSON.stringify({
            success: true,
            id: result.rows[0].id,
            created_at: result.rows[0].created_at
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('[SAVE ERROR]:', error);

        return new Response(JSON.stringify({
            error: 'Failed to save generation',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Get user's generation history
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const generatorId = searchParams.get('generatorId');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!userId) {
            return new Response(JSON.stringify({
                error: 'userId is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if Postgres is configured
        if (!process.env.POSTGRES_URL) {
            return new Response(JSON.stringify({
                error: 'Database not configured',
                generations: []
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let result;
        if (generatorId) {
            result = await sql`
        SELECT id, generator_id, prompt, content, metadata, professor_video_url, created_at
        FROM generations
        WHERE user_id = ${userId} AND generator_id = ${generatorId}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
        } else {
            result = await sql`
        SELECT id, generator_id, prompt, content, metadata, professor_video_url, created_at
        FROM generations
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
        }

        return new Response(JSON.stringify({
            generations: result.rows
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('[GET ERROR]:', error);

        return new Response(JSON.stringify({
            error: 'Failed to fetch generations',
            details: error.message,
            generations: []
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
