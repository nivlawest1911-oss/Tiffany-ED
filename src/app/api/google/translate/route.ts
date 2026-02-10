import { NextRequest, NextResponse } from 'next/server';
import { TranslationServiceClient } from '@google-cloud/translate';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { text, targetLanguage = 'es' } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const client = new TranslationServiceClient();
        const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'edintel-EdIntel';
        const location = 'global';

        const request = {
            parent: `projects/${projectId}/locations/${location}`,
            contents: [text],
            mimeType: 'text/plain',
            targetLanguageCode: targetLanguage,
        };

        const [response] = await client.translateText(request as any) as any;

        return NextResponse.json({
            translatedText: response.translations[0].translatedText,
            detectedLanguage: response.translations[0].detectedLanguageCode,
            message: 'Translation successful',
            source: 'Google Cloud Translation API'
        });

    } catch (error: any) {
        console.error('[GOOGLE TRANSLATE ERROR]:', error);
        return NextResponse.json({
            error: 'Translation failed',
            details: error.message
        }, { status: 500 });
    }
}
