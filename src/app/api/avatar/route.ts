import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { depositToMemoryBank } from '@/lib/memory-bank';
import { getSession } from '@/lib/auth';
import { withResilience } from '@/lib/ai-resilience';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

        let professorUrl = "";

        try {
            if (process.env.REPLICATE_API_TOKEN) {
                console.log("[Replicate] Step 1: Generating Audio with XTTS-v2...");
                const audioUrl: any = await withResilience(async () => {
                    return await replicate.run(
                        "lucataco/xtts-v2:684c4b215403e51af6587d159a2G974780277bd7d1c1f9ed2f95d24d275fc88b",
                        {
                            input: {
                                text: script,
                                speaker: "https://replicate.delivery/pbxt/JtQiYxWSN0mSDR4u77m808080808080808080808080808080/female.wav",
                                language: "en"
                            }
                        }
                    );
                });
                console.log("[Replicate] Audio Ready:", audioUrl);

                console.log("[Replicate] Step 2: Synchronizing with SadTalker...");
                const videoOutput: any = await withResilience(async () => {
                    return await replicate.run(
                        "cjwbw/sadtalker:380d302633005a96860000000000000000000000000000000000000000000000",
                        {
                            input: {
                                source_image: avatarUrl || "/images/avatars/dr_alvin_west_premium.png",
                                driven_audio: audioUrl,
                                still: true,
                                preprocess: "full",
                                enhance: true
                            }
                        }
                    );
                });
                professorUrl = videoOutput;
                console.log("[Replicate] Video Ready:", professorUrl);

            } else {
                console.warn("[Replicate] Token Missing. Using fallback video.");
                professorUrl = "";
            }

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
