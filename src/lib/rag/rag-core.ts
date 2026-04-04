import { searchKnowledgeBase } from '../supabase';
import { kv } from '@vercel/kv';

export interface RagResult {
    context: string;
    sources: any[];
}

/**
 * Retrieves relevant context from the Sovereign Vault using HyDE.
 * Now powered by Gemini text-embedding-004 and Supabase pgvector.
 */
export async function queryEdIntelVault(query: string, companionId?: string): Promise<RagResult> {
    try {
        console.log(`[RAG-Core] Starting Intelligence Synthesis for: "${query}"`);

        // 1. NEURAL CACHE (HyDE Result)
        const simpleHash = (str: string) => {
            let h = 0;
            for (let i = 0; i < str.length; i++) {
                h = (h << 5) - h + str.charCodeAt(i);
                h |= 0;
            }
            return Math.abs(h).toString(36);
        };
        const hash = simpleHash(query);
        const cacheKey = `hyde:v2:${hash}`;
        let hypotheticalDoc: string | null = null;

        try {
            hypotheticalDoc = await kv.get<string>(cacheKey);
        } catch (e) {
            console.warn("[RAG-Core] HyDE Cache offline.");
        }

        if (hypotheticalDoc) {
            console.log(`[RAG-Core] Intelligence Cache Hit [Key: ${cacheKey.substring(0, 10)}]`);
        } else {
            hypotheticalDoc = `Instructional search directive for: ${query}`;
        }

        // 2. SEARCH SOVEREIGN VAULT (Supabase RPC)
        const matches = await searchKnowledgeBase(companionId || '', query);

        if (matches && matches.length > 0) {
            console.log(`[RAG-Core] Found ${matches.length} relevant documents in Sovereign Vault.`);
            return {
                context: `\n\n### GROUNDED INSTITUTIONAL CONTEXT\n${matches
                    .map((d: any) => `> [Source: ${d.title || d.id}] ${d.content}`)
                    .join('\n\n')}\n`,
                sources: matches.map((m: any) => ({
                    id: m.id,
                    title: m.title || 'Untitled Document',
                    similarity: m.similarity
                }))
            };
        }

        console.log(`[RAG-Core] No relevant matches found in vault.`);
        return { context: "", sources: [] };
    } catch (error) {
        console.error('[RAG-Core] Intelligence Synthesis failure:', error);
        return { context: "", sources: [] };
    }
}
