import { NextRequest, NextResponse } from 'next/server';
import { LanguageServiceClient } from '@google-cloud/language';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const client = new LanguageServiceClient();
        const document = {
            content: text,
            type: 'PLAIN_TEXT' as any,
        };

        // 1. Analyze Sentiment
        const [sentimentResult] = await client.analyzeSentiment({ document } as any) as any;
        const sentiment = sentimentResult.documentSentiment;

        // 2. Analyze Entities
        const [entitiesResult] = await client.analyzeEntities({ document } as any) as any;
        const entities = entitiesResult.entities;

        return NextResponse.json({
            sentiment: {
                score: sentiment.score,
                magnitude: sentiment.magnitude,
                resonance: sentiment.score > 0.25 ? 'Positive' : sentiment.score < -0.25 ? 'Negative' : 'Neutral'
            },
            entities: entities.slice(0, 5).map((e: any) => ({
                name: e.name,
                type: e.type,
                salience: e.salience
            })),
            message: 'Neural analysis successful',
            source: 'Google Cloud Natural Language API'
        });

    } catch (error: any) {
        console.error('[GOOGLE NLP ERROR]:', error);
        return NextResponse.json({
            error: 'Linguistic analysis failed',
            details: error.message
        }, { status: 500 });
    }
}
