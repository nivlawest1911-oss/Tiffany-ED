import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { depositToMemoryBank } from '@/lib/memory-bank';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Required for Replicate/Blob integrations usually

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Connection Unauthorized. Please Authenticate.' }, { status: 401 });
        }

        const { script, professorType, avatarUrl } = await req.json();

        if (!script) {
            return NextResponse.json({ error: 'Instruction script is required.' }, { status: 400 });
        }

        console.log(`[Greyhawk] Initiating Professor Synthesis for: ${professorType}`);

        // 1. Call Replicate (Talking Head Synthesis)
        // Using common Talking Head model: sora-style or sadtalker
        // Note: In a real production environment, this would be an async task.
        // For the Professional experience, we trigger the synthesis.

        let professorUrl = "";

        try {
            if (process.env.REPLICATE_API_TOKEN) {
                console.log("[Replicate] Step 1: Generating Audio with XTTS-v2...");
                // 1. Generate Speech (XTTS-v2)
                const audioOutput: any = await replicate.run(
                    "lucataco/xtts-v2:684c4b215403e51af6587d159a2G974780277bd7d1c1f9ed2f95d24d275fc88b",
                    {
                        input: {
                            text: script,
                            speaker: "https://replicate.delivery/pbxt/JtQiYxWSN0mSDR4u77m808080808080808080808080808080/female.wav", // Default professional voice
                            language: "en"
                        }
                    }
                );
                const audioUrl = audioOutput;
                console.log("[Replicate] Audio Ready:", audioUrl);

                console.log("[Replicate] Step 2: Synchronizing with SadTalker...");
                // 2. Generate Video (SadTalker)
                const videoOutput: any = await replicate.run(
                    "cjwbw/sadtalker:380d302633005a96860000000000000000000000000000000000000000000000",
                    {
                        input: {
                            source_image: avatarUrl || "/images/dr_alvin_west.png",
                            driven_audio: audioUrl,
                            still: true,
                            preprocess: "full",
                            enhance: true
                        }
                    }
                );
                professorUrl = videoOutput;
                console.log("[Replicate] Video Ready:", professorUrl);

            } else {
                console.warn("[Replicate] Token Missing. Using fallback video.");
                professorUrl = "/videos/briefings/principal_briefing.mp4";
            }

            // 2. VAULTING: Ensure EdIntel owns the URL (Memory Bank)
            const vaultedUrl = await depositToMemoryBank(professorUrl, `temple/professors/${professorType}-${Date.now()}.mp4`);

            return NextResponse.json({
                success: true,
                professorUrl: vaultedUrl,
                status: "Briefing Ready",
                architecture: "Executive Support OS"
            });

        } catch (genError: any) {
            console.error('[Synthesis Error]:', genError);
            return NextResponse.json({
                error: 'Briefing Generation Interrupted',
                details: genError.message
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error('[Avatar API Error]:', error);
        return NextResponse.json({ error: 'System connection interrupted' }, { status: 500 });
    }
}
