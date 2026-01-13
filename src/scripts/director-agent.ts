
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load from .env.local explicitly
dotenv.config({ path: '.env.local' });

// ------------------------------------------------------------------
// THE SOVEREIGN DIRECTOR AGENT
// ------------------------------------------------------------------
// This agent connects to Replicate (Stable Video Diffusion) to generate
// cinematic background assets for the EdIntel Platform.
// ------------------------------------------------------------------

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'videos', 'features');

if (!REPLICATE_API_TOKEN) {
    console.error('\n❌ CRITICAL: Director Agent requires a REPLICATE_API_TOKEN.');
    console.error('   Please get one at https://replicate.com/account and add it to your .env.local file.\n');
    process.exit(1);
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateVideo(prompt: string, filename: string) {
    console.log(`\n🎬 DIRECTOR AGENT: Initializing Scene...`);
    console.log(`   Prompt: "${prompt}"`);
    console.log(`   Target: ${filename}`);

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    try {
        // 1. Create Prediction
        const response = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // Using ZeroScope v2 (Text to Video)
                version: "9f747673945c62801b13b84701c783929c0ee784e47f94591561343d250ac1ac",
                input: {
                    prompt: prompt
                }
            }),
        });

        if (response.status !== 201) {
            let error = await response.text();
            throw new Error(`Replicate API Error: ${response.status} - ${error}`);
        }

        const prediction = await response.json();
        const predictionId = prediction.id;
        console.log(`   ✨ Production Started (ID: ${predictionId})`);

        // 2. Poll for Completion
        let outputUrl = null;
        while (!outputUrl) {
            process.stdout.write("."); // Loading dots
            await sleep(2000);

            const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
                headers: {
                    "Authorization": `Token ${REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            const statusJson = await pollResponse.json();

            if (statusJson.status === "succeeded") {
                outputUrl = statusJson.output; // SVD returns a string URL usually, or array
                console.log("\n   ✅ Rendering Complete!");
            } else if (statusJson.status === "failed") {
                throw new Error("Video Generation Failed during rendering.");
            }
        }

        // 3. Download Video
        console.log(`   ⬇️ Downloading Asset from Cloud...`);
        const videoUrl = Array.isArray(outputUrl) ? outputUrl[0] : outputUrl; // Handle potential array return

        const videoRes = await fetch(videoUrl);
        const buffer = await videoRes.arrayBuffer();
        const outputPath = path.join(OUTPUT_DIR, `${filename}.mp4`);

        fs.writeFileSync(outputPath, Buffer.from(buffer));

        console.log(`   🎉 ASSET SECURED: ${outputPath}`);
        console.log(`   Ready for deployment to UI.`);

    } catch (error: any) {
        console.error(`\n❌ Director Agent Failed: ${error.message}`);
    }
}

// CLI Argument Handling
const promptArg = process.argv[2];
const filenameArg = process.argv[3] || `generated_video_${Date.now()}`;

if (!promptArg) {
    console.log("\nUsage: npm run director \"<Your Prompt>\" <filename_optional>");
    console.log("Example: npm run director \"Cinematic futuristic education dashboard\" lesson_planner_demo\n");
} else {
    generateVideo(promptArg, filenameArg);
}
