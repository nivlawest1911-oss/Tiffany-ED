import { prisma } from '../prisma';
import { generateEmbedding } from './embedding';

/**
 * SemanticCache (Infinite Rhythm)
 * Prevents re-generating the same answers for common compliance and protocol queries.
 */
export class SemanticCache {
    private static SIMILARITY_THRESHOLD = 0.95;

    /**
     * Checks the cache for a semantically similar query.
     */
    static async get(query: string): Promise<string | null> {
        try {
            const embedding = await generateEmbedding(query);
            const vectorStr = `[${embedding.join(',')}]`;

            // Semantic Similarity Search using pgvector
            // Cosine similarity = 1 - (embedding <=> :vector)
            const matches: any[] = await prisma.$queryRaw`
                SELECT id, response, 1 - (embedding <=> ${vectorStr}::vector) as similarity
                FROM semantic_caches
                WHERE 1 - (embedding <=> ${vectorStr}::vector) > ${this.SIMILARITY_THRESHOLD}
                ORDER BY similarity DESC
                LIMIT 1
            `;

            if (matches && matches.length > 0) {
                const match = matches[0];
                console.log(`[SemanticCache] Hit! Similarity: ${match.similarity}`);

                // Track hits asynchronously
                prisma.semanticCache.update({
                    where: { id: match.id },
                    data: {
                        hitCount: { increment: 1 },
                        lastHitAt: new Date()
                    }
                }).catch(e => console.error('Error tracking cache hit:', e));

                return match.response;
            }

            return null;
        } catch (error) {
            console.error('[SemanticCache] Error:', error);
            return null;
        }
    }

    /**
     * Stores a response in the semantic cache.
     */
    static async set(query: string, response: string): Promise<void> {
        try {
            const embedding = await generateEmbedding(query);
            const vectorStr = `[${embedding.join(',')}]`;
            await prisma.$executeRaw`
                INSERT INTO semantic_caches (id, query, response, embedding)
                VALUES (${crypto.randomUUID()}, ${query}, ${response}, ${vectorStr}::vector)
            `;
            console.log(`[SemanticCache] Cached new response for: "${query.substring(0, 50)}..."`);
        } catch (error) {
            console.error('[SemanticCache] Cache Set Error:', error);
        }
    }
}
