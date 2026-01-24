import { NextRequest, NextResponse } from 'next/server';
import { ImageAnnotatorClient } from '@google-cloud/vision';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const imageFile = formData.get('image') as Blob;

        if (!imageFile) {
            return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
        }

        const client = new ImageAnnotatorClient();
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const [result] = await client.textDetection(buffer) as any;
        const detections = result.textAnnotations;
        const fullText = detections.length > 0 ? detections[0].description : 'No text detected';

        return NextResponse.json({
            text: fullText,
            message: 'Document scan successful',
            source: 'Google Cloud Vision (OCR)'
        });

    } catch (error: any) {
        console.error('[GOOGLE VISION ERROR]:', error);
        return NextResponse.json({
            error: 'Document analysis failed',
            details: error.message
        }, { status: 500 });
    }
}
