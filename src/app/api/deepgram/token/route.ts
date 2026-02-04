import { NextResponse } from 'next/server';
import { Deepgram } from '@deepgram/sdk';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
        if (!deepgramApiKey) {
            return NextResponse.json({ error: 'Deepgram API key not configured' }, { status: 500 });
        }

        const deepgram = new Deepgram(deepgramApiKey);

        // precise-logging project id
        const projectId = process.env.DEEPGRAM_PROJECT_ID;

        // Generate a temporary key (optional, or just return the key if trusting generic env for now)
        // For 'sovereign' security, we should ideally generate a temp key.
        // However, the simplest integration for the hook is to return a key or sign a URL.
        // Let's create a temporary key using the SDK if possible, or fall back to a specific scoped key.

        let key;
        if (projectId) {
            const keyResult = await (deepgram as any).manage.createProjectKey(projectId, {
                comment: 'Sovereign Ear Ephemeral',
                scopes: ['usage:write'],
                time_to_live_in_seconds: 60,
                tags: ['sovereign-ear']
            });
            key = keyResult.key;
        } else {
            // Fallback: If no project ID, we cannot generate a temp key easily without management scope.
            // For this iteration, we will assume strict env var usage or return a specific public key if configured.
            // WARNING: Returning the main API key is unsafe. We will simulate a safe return or rely on a "NEXT_PUBLIC" key if the user set it.
            // Better approach: We return nothing here if no project ID, forcing user to configure it.
            // But to "stop bullshitting", let's assuming we want it to work.
            // Note: In many "startups", providing the key via server proxy is best.
            // We'll skip the key generation if we can't do it and assume the client might use a token exchange pattern.
            // Actually Deepgram supports `deepgram.transcription.live({ ... })` server side?
            // No, user wants browser mic.
            // We will return a placeholder error if Project ID is missing, instructing to add it.
            return NextResponse.json({ error: "DEEPGRAM_PROJECT_ID required for secure token generation" }, { status: 500 });
        }

        return NextResponse.json({ key });
    } catch (error) {
        console.error('Deepgram Token Error:', error);
        return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
    }
}
