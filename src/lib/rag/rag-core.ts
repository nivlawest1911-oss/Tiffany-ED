import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { generateEmbedding } from '../ai/embedding';
import { prisma } from '../prisma';

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

        // 1. Generate Hypothetical Document (The "Ideal" Answer)
        const { text: hypotheticalDoc } = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: `
                Explain the Alabama educational protocol or legal standard related to the following query. 
                Write this as if it were a section of a school district's official compliance manual.
                
                Query: ${query}
                
                Compliance Protocol:
            `,
        });

        console.log(`[RAG-Core] Hypothetical Document Generated: "${hypotheticalDoc.substring(0, 50)}..."`);

        // 2. Generate Embedding for the Hypothetical Answer
        const hypotheticalEmbedding = await generateEmbedding(hypotheticalDoc);
        const vectorStr = `[${hypotheticalEmbedding.join(',')}]`;

        // 3. Search Sovereign Vault (Prisma Documents) using vector similarity
        const matches: any[] = await prisma.$queryRaw`
            SELECT title, content, 1 - (embedding <=> ${vectorStr}::vector) as similarity
            FROM documents
            WHERE 1 - (embedding <=> ${vectorStr}::vector) > 0.6
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
