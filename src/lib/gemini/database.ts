/**
 * EdIntel SOVEREIGN - Gemini Workspace Database Service
 * Simplified database operations for Gemini workspace content
 */

import { sql } from '@vercel/postgres';

/**
 * Database-specific content interface
 */
export interface GeminiContentRecord {
    id: number;
    user_id: string;
    content_id: string;
    title: string;
    content_type: string;
    category: string | null;
    tags: string[];
    content_text: string;
    media_url: string | null;
    media_type: string | null;
    ai_summary: string | null;
    ai_keywords: string[];
    suggested_features: string[];
    sentiment_score: number | null;
    workflow_steps: any;
    source: string;
    import_date: Date;
    last_modified: Date;
    view_count: number;
    last_viewed: Date | null;
    is_favorite: boolean;
    is_archived: boolean;
}

/**
 * Simplified Gemini Workspace Database Service
 */
export class GeminiWorkspaceDB {
    /**
     * Save imported content to database
     */
    static async saveContent(
        userId: string,
        data: {
            contentId: string;
            title: string;
            type: string;
            category?: string;
            tags?: string[];
            content: string;
            mediaUrl?: string;
            mediaType?: string;
            aiSummary?: string;
            aiKeywords?: string[];
            suggestedFeatures?: string[];
            sentimentScore?: number;
            workflowSteps?: any;
            source?: string;
        }
    ): Promise<GeminiContentRecord> {
        const result = await sql`
            INSERT INTO gemini_workspace_content (
                user_id, content_id, title, content_type, category, tags,
                content_text, media_url, media_type,
                ai_summary, ai_keywords, suggested_features, sentiment_score,
                workflow_steps, source
            ) VALUES (
                ${userId},
                ${data.contentId},
                ${data.title},
                ${data.type},
                ${data.category || null},
                ${JSON.stringify(data.tags || [])},
                ${data.content},
                ${data.mediaUrl || null},
                ${data.mediaType || null},
                ${data.aiSummary || null},
                ${JSON.stringify(data.aiKeywords || [])},
                ${JSON.stringify(data.suggestedFeatures || [])},
                ${data.sentimentScore || null},
                ${data.workflowSteps ? JSON.stringify(data.workflowSteps) : null},
                ${data.source || 'gemini'}
            )
            RETURNING *
        `;

        return result.rows[0] as GeminiContentRecord;
    }

    /**
     * Get user's content with filters
     */
    static async getUserContent(
        userId: string,
        filters?: {
            type?: string;
            category?: string;
            favorites?: boolean;
            archived?: boolean;
            limit?: number;
            offset?: number;
        }
    ): Promise<GeminiContentRecord[]> {
        let query = 'SELECT * FROM gemini_workspace_content WHERE user_id = $1';
        const params: any[] = [userId];
        let paramIndex = 2;

        if (filters?.type) {
            query += ` AND content_type = $${paramIndex}`;
            params.push(filters.type);
            paramIndex++;
        }

        if (filters?.category) {
            query += ` AND category = $${paramIndex}`;
            params.push(filters.category);
            paramIndex++;
        }

        if (filters?.favorites !== undefined) {
            query += ` AND is_favorite = $${paramIndex}`;
            params.push(filters.favorites);
            paramIndex++;
        }

        if (filters?.archived !== undefined) {
            query += ` AND is_archived = $${paramIndex}`;
            params.push(filters.archived);
            paramIndex++;
        }

        query += ' ORDER BY last_modified DESC';

        if (filters?.limit) {
            query += ` LIMIT $${paramIndex}`;
            params.push(filters.limit);
            paramIndex++;
        }

        if (filters?.offset) {
            query += ` OFFSET $${paramIndex}`;
            params.push(filters.offset);
        }

        const result = await sql.query(query, params);
        return result.rows as GeminiContentRecord[];
    }

    /**
     * Get content by ID
     */
    static async getContentById(
        contentId: string,
        userId: string
    ): Promise<GeminiContentRecord | null> {
        const result = await sql`
            SELECT * FROM gemini_workspace_content
            WHERE content_id = ${contentId} AND user_id = ${userId}
        `;

        if (result.rows.length === 0) return null;

        // Increment view count
        await sql`
            UPDATE gemini_workspace_content
            SET view_count = view_count + 1, last_viewed = CURRENT_TIMESTAMP
            WHERE content_id = ${contentId}
        `;

        return result.rows[0] as GeminiContentRecord;
    }

    /**
     * Update content
     */
    static async updateContent(
        contentId: string,
        userId: string,
        updates: {
            title?: string;
            content?: string;
            category?: string;
            tags?: string[];
        }
    ): Promise<GeminiContentRecord | null> {
        const setClauses: string[] = [];
        const params: any[] = [];
        let paramIndex = 1;

        if (updates.title) {
            setClauses.push(`title = $${paramIndex}`);
            params.push(updates.title);
            paramIndex++;
        }

        if (updates.content) {
            setClauses.push(`content_text = $${paramIndex}`);
            params.push(updates.content);
            paramIndex++;
        }

        if (updates.category) {
            setClauses.push(`category = $${paramIndex}`);
            params.push(updates.category);
            paramIndex++;
        }

        if (updates.tags) {
            setClauses.push(`tags = $${paramIndex}`);
            params.push(JSON.stringify(updates.tags));
            paramIndex++;
        }

        if (setClauses.length === 0) return null;

        setClauses.push(`last_modified = CURRENT_TIMESTAMP`);

        const query = `
            UPDATE gemini_workspace_content
            SET ${setClauses.join(', ')}
            WHERE content_id = $${paramIndex} AND user_id = $${paramIndex + 1}
            RETURNING *
        `;
        params.push(contentId, userId);

        const result = await sql.query(query, params);
        return result.rows[0] as GeminiContentRecord || null;
    }

    /**
     * Toggle favorite status
     */
    static async toggleFavorite(
        contentId: string,
        userId: string
    ): Promise<boolean> {
        const result = await sql`
            UPDATE gemini_workspace_content
            SET is_favorite = NOT is_favorite
            WHERE content_id = ${contentId} AND user_id = ${userId}
            RETURNING is_favorite
        `;

        return result.rows[0]?.is_favorite || false;
    }

    /**
     * Delete content
     */
    static async deleteContent(
        contentId: string,
        userId: string
    ): Promise<boolean> {
        const result = await sql`
            DELETE FROM gemini_workspace_content
            WHERE content_id = ${contentId} AND user_id = ${userId}
        `;

        return (result.rowCount || 0) > 0;
    }

    /**
     * Search content
     */
    static async searchContent(
        userId: string,
        searchQuery: string
    ): Promise<GeminiContentRecord[]> {
        const result = await sql`
            SELECT * FROM gemini_workspace_content
            WHERE user_id = ${userId}
            AND (
                title ILIKE ${`%${searchQuery}%`}
                OR content_text ILIKE ${`%${searchQuery}%`}
                OR ai_summary ILIKE ${`%${searchQuery}%`}
            )
            ORDER BY last_modified DESC
            LIMIT 50
        `;

        return result.rows as GeminiContentRecord[];
    }

    /**
     * Get user statistics
     */
    static async getUserStats(userId: string): Promise<{
        totalContent: number;
        favoriteCount: number;
        totalViews: number;
        lastImport?: Date;
    }> {
        const result = await sql`
            SELECT 
                COUNT(*) as total_content,
                COUNT(*) FILTER (WHERE is_favorite = TRUE) as favorite_count,
                SUM(view_count) as total_views,
                MAX(import_date) as last_import
            FROM gemini_workspace_content
            WHERE user_id = ${userId}
        `;

        if (result.rows.length === 0) {
            return {
                totalContent: 0,
                favoriteCount: 0,
                totalViews: 0
            };
        }

        const row = result.rows[0];
        return {
            totalContent: parseInt(row.total_content) || 0,
            favoriteCount: parseInt(row.favorite_count) || 0,
            totalViews: parseInt(row.total_views) || 0,
            lastImport: row.last_import ? new Date(row.last_import) : undefined
        };
    }

    /**
     * Track analytics event
     */
    static async trackEvent(
        userId: string,
        actionType: string,
        metadata?: {
            contentId?: string;
            sessionId?: string;
            durationMs?: number;
            success?: boolean;
            errorMessage?: string;
        }
    ): Promise<void> {
        await sql`
            INSERT INTO gemini_usage_analytics (
                user_id, action_type, content_id,
                session_id, duration_ms, success, error_message
            ) VALUES (
                ${userId},
                ${actionType},
                ${metadata?.contentId || null},
                ${metadata?.sessionId || null},
                ${metadata?.durationMs || null},
                ${metadata?.success !== undefined ? metadata.success : true},
                ${metadata?.errorMessage || null}
            )
        `;
    }
}
