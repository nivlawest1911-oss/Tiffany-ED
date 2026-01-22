
import { NextResponse } from 'next/server';
import { createHeyGenVideo, getHeyGenVideoStatus } from '@/lib/heygen';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { avatarId, text, action, videoId, voiceId } = await req.json();

        if (action === 'status' && videoId) {
            const status = await getHeyGenVideoStatus(videoId);
            return NextResponse.json({ status });
        }

        if (!avatarId || !text) {
            return NextResponse.json({ error: 'Missing avatarId or text' }, { status: 400 });
        }

        const newVideoId = await createHeyGenVideo(avatarId, text, voiceId);
        return NextResponse.json({ videoId: newVideoId });
    } catch (error: any) {
        console.error('HeyGen API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
