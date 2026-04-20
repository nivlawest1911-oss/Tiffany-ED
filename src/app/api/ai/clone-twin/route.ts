import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const role = formData.get('role')?.toString() || 'Delegate';
        const photo = formData.get('photo') as File | null;
        const voice = formData.get('voice') as File | null;
        const video = formData.get('video') as File | null;

        if (!photo && !voice && !video) {
            return NextResponse.json({ error: 'No biometric data provided' }, { status: 400 });
        }

        const result: {
            success: boolean;
            elevenLabsVoiceId: string | null;
            heyGenAvatarId: string | null;
            role: string;
            errors: string[];
        } = {
            success: true,
            elevenLabsVoiceId: null,
            heyGenAvatarId: null,
            role,
            errors: []
        };

        // 1. ElevenLabs Voice Cloning
        if (voice) {
            const elKey = process.env.ELEVENLABS_API_KEY;
            if (!elKey) {
                result.errors.push('ElevenLabs API key is not configured.');
            } else {
                try {
                    const elFormData = new FormData();
                    elFormData.append('name', `Clone - ${role} - ${Date.now()}`);
                    elFormData.append('files', voice);

                    const elRes = await fetch('https://api.elevenlabs.io/v1/voices/add', {
                        method: 'POST',
                        headers: {
                            'xi-api-key': elKey
                        },
                        body: elFormData
                    });

                    if (elRes.ok) {
                        const elData = await elRes.json();
                        result.elevenLabsVoiceId = elData.voice_id;
                    } else {
                        const errText = await elRes.text();
                        console.error('[ElevenLabs Add Voice Error]', errText);
                        result.errors.push('ElevenLabs voice cloning failed. File may be too short.');
                    }
                } catch (e: any) {
                    console.error('[ElevenLabs Connectivity Error]', e);
                    result.errors.push('Error communicating with ElevenLabs network.');
                }
            }
        }

        // 2. HeyGen Avatar Upload
        // (Typically uploading an image to create an asset or taking a video to train an avatar)
        if (photo || video) {
            const heyGenKey = process.env.HEYGEN_API_KEY;
            if (!heyGenKey) {
                result.errors.push('HeyGen API key is not configured.');
            } else {
                try {
                    // HeyGen requires multipart/form-data to their asset endpoint for Talking Photos
                    // We simulate the flow connecting to HeyGen asset creation if photo exists
                    const targetFile = video || photo;
                    if (targetFile) {
                        // For a realistic technical pipeline, we simulate pushing it to HeyGen
                        // since undocumented V2 Upload endpoints require specific asset schemas.
                        console.log(`[HeyGen] Processing ${photo ? 'Photo' : 'Video'} Upload...`);

                        // NOTE: In a true production app, we would POST to https://upload.heygen.com/v1/asset
                        // with content-type tracking, etc. Here we simulate the network delay and ID generation.
                        // wait 1 second to simulate upload
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        result.heyGenAvatarId = `hg-clone-${Date.now()}`;
                    }
                } catch (e: any) {
                    console.error('[HeyGen Upload Error]', e);
                    result.errors.push('Error uploading assets to HeyGen.');
                }
            }
        }

        // 3. Database Updates (Simulated mapping to a database if connected)
        // In a real flow, we would save result.elevenLabsVoiceId and result.heyGenAvatarId to 
        // the user's Supabase profile using createRouteHandlerClient or similar.

        if (result.errors.length > 0 && !result.elevenLabsVoiceId && !result.heyGenAvatarId) {
            // Completely failed
            return NextResponse.json({ error: result.errors.join(' | ') }, { status: 500 });
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('API /clone-twin Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
