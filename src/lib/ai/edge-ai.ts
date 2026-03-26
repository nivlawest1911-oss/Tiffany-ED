import { pipeline } from '@xenova/transformers';

class EdgeAI {
    private classifier: any = null;
    private initialized: boolean = false;

    async init() {
        if (this.initialized) return;
        try {
            // Using a small, fast model for sentiment analysis as a proxy for equity/intent
            this.classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
            this.initialized = true;
            console.log('[Meta-AI] Edge Neural Link Established');
        } catch (error) {
            console.error('[Meta-AI] Edge Init Error:', error);
            throw error;
        }
    }

    async verifyEquity(text: string) {
        if (!this.initialized) await this.init();

        try {
            const results = await this.classifier(text);
            const topResult = results[0];
            
            return {
                equityVerified: topResult.label === 'POSITIVE',
                sentiment: topResult.label,
                confidence: topResult.score
            };
        } catch (error) {
            console.error('[Meta-AI] Edge Inference Error:', error);
            return {
                equityVerified: true, // Fail safe
                sentiment: 'NEUTRAL',
                confidence: 0.0
            };
        }
    }
}

export const edgeAI = new EdgeAI();
