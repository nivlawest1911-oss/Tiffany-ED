import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { generateEmbedding } from '../ai/embedding';
import { prisma } from '../prisma';
import { kv } from '@vercel/kv';

export interface VaultDocument {
    id: string;
    title: string;
    content: string;
    tags: string[];
    relevance_score?: number;
}

/**
 * Retrieves relevant context from the Sovereign Vault using HyDE.
 */
export async function queryEdIntelVault(query: string): Promise<string> {
    try {
        console.log(`[RAG-Core] Starting HyDE flow for: "${query}"`);

        // 1. Generate/Retrieve Hypothetical Document (The "Ideal" Answer)
        const simpleHash = (str: string) => {
            let h = 0;
            for (let i = 0; i < str.length; i++) {
                h = (h << 5) - h + str.charCodeAt(i);
                h |= 0;
            }
            return Math.abs(h).toString(36);
        };
        const hash = simpleHash(query);
        const cacheKey = `hyde:${hash}`;
        let hypotheticalDoc: string | null = null;

        try {
            hypotheticalDoc = await kv.get<string>(cacheKey);
        } catch (e) {
            console.warn("[RAG-Core] HyDE Cache offline.");
        }

        if (hypotheticalDoc) {
            console.log(`[RAG-Core] HyDE Cache Hit [Key: ${cacheKey.substring(0, 10)}]`);
        } else {
            const { text } = await generateText({
                model: google('gemini-1.5-flash'),
                prompt: `
                    Explain the Alabama educational protocol or legal standard related to the following query. 
                    Write this as if it were a section of a school district's official compliance manual.
                    
                    Query: ${query}
                    
                    Compliance Protocol:
                `,
            });
            hypotheticalDoc = text;

            kv.set(cacheKey, hypotheticalDoc, { ex: 86400 }).catch(e => console.warn("HyDE Cache Write Failed", e));
        }

        console.log(`[RAG-Core] Hypothetical Document: "${hypotheticalDoc.substring(0, 50)}..."`);

        // 2. Generate Embedding for the Hypothetical Answer
        const hypotheticalEmbedding = await generateEmbedding(hypotheticalDoc);
        const vectorStr = `[${hypotheticalEmbedding.join(',')}]`;

        // 3. Search Sovereign Vault (Prisma Documents) using vector similarity
        const matches: any[] = await prisma.$queryRaw`
            SELECT title, content, 1 - (embedding <=> ${vectorStr}::vector) as similarity
            FROM documents
            WHERE 1 - (embedding <=> ${vectorStr}::vector) > 0.7
            ORDER BY similarity DESC
            LIMIT 3
        `;

        if (matches && matches.length > 0) {
            console.log(`[RAG-Core] Found ${matches.length} relevant documents in vault.`);
            return `SOVEREIGN VAULT CONTEXT (Grounded Evidence):\n${matches.map(d => `[Source: ${d.title}] ${d.content}`).join('\n')}`;
        }

        console.log(`[RAG-Core] No relevant matches found in vault.`);
        return "";
    } catch (error) {
        console.error('[RAG-Core] Error in HyDE flow:', error);
        return "";
    }
}
