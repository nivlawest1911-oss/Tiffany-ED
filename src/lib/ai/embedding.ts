import { embed } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';

/**
 * Generates a vector embedding for the given text.
 * Default model: text-embedding-004 (Google Vertex AI / Gemini)
 * Dimensions: 768 (matching the Supabase Vector Type)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const { embedding } = await embed({
            model: googleProvider.textEmbeddingModel(AI_MODELS.GOOGLE.EMBEDDING),
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
