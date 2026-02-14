import { pipeline, env } from '@xenova/transformers';

// Skip local checks for now since we are in a browser environment
env.allowLocalModels = false;
env.useBrowserCache = true;

class EdgeAI {
    private static instance: EdgeAI;
    private classifier: any = null;
    private isReady: boolean = false;

    private constructor() { }

    public static getInstance(): EdgeAI {
        if (!EdgeAI.instance) {
            EdgeAI.instance = new EdgeAI();
        }
        return EdgeAI.instance;
    }

    /**
     * Initialize the local sentiment analysis model
     */
    public async init() {
        if (this.isReady) return;

        try {
            console.log('[Edge-AI] Initializing Neural Edge...');

            // Using a lightweight sentiment model
            this.classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');

            this.isReady = true;
            console.log('[Edge-AI] Neural Edge Online.');
        } catch (error) {
            console.error('[Edge-AI] Model Load Failed, falling back to CPU:', error);
            try {
                this.classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
                this.isReady = true;
            } catch (fallbackError) {
                console.error('[Edge-AI] Critical Failure:', fallbackError);
            }
        }
    }

    /**
     * Check if the edge model is ready
     */
    public ready() {
        return this.isReady;
    }

    /**
     * Perform local sentiment analysis
     */
    public async analyzeSentiment(text: string) {
        if (!this.isReady || !this.classifier) {
            await this.init();
        }

        try {
            const results = await this.classifier(text);
            return results[0]; // { label: 'POSITIVE', score: 0.99 }
        } catch (error) {
            console.error('[Edge-AI] Analysis Error:', error);
            return null;
        }
    }

    /**
     * Check for potential bias or toxicity (simulated with keyword + sentiment)
     */
    public async verifyEquity(text: string) {
        const sentiment = await this.analyzeSentiment(text);

        // Pseudo-logic for equity verification
        // In a real scenario, we'd use a dedicated toxicity model
        const biasKeywords = ['bias', 'unfair', 'discriminate', 'illegal'];
        const hasFlags = biasKeywords.some(word => text.toLowerCase().includes(word));

        return {
            sentiment: sentiment?.label || 'NEUTRAL',
            confidence: sentiment?.score || 0,
            equityVerified: !hasFlags || (sentiment?.label === 'POSITIVE' && sentiment?.score > 0.8),
            localTimestamp: new Date().toISOString()
        };
    }
}

export const edgeAI = EdgeAI.getInstance();
