import { embed } from 'ai';
import { google } from '@ai-sdk/google';

/**
 * Generates a vector embedding for the given text.
 * Default model: text-embedding-004 (Google Vertex AI / Gemini)
 * Dimensions: 1536 (matching the Prisma Unsupported("vector(1536)") schema)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const { embedding } = await embed({
            model: google.textEmbeddingModel('text-embedding-004'),
            value: text,
        });
        return embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw new Error('Failed to generate vector embedding');
    }
}

/**
 * Generates multiple embeddings for a batch of texts.
 */
export async function generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map(text => generateEmbedding(text)));
}
