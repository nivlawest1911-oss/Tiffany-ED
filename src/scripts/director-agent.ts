import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Replicate from 'replicate';

// Load from .env.local explicitly
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// ------------------------------------------------------------------
// THE EdIntel ANIMATOR AGENT (V2)
// ------------------------------------------------------------------
// This agent breathes life into our EdIntel Assets.
// It takes an existing image and uses SVD to create a cinematic loop.
// ------------------------------------------------------------------

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'features');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'videos', 'features');

if (!REPLICATE_API_TOKEN) {
    console.error('\n❌ CRITICAL: Animator Agent requires a REPLICATE_API_TOKEN.');
    process.exit(1);
}

const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
});

async function animateAsset(imageFilename: string, outputFilename: string) {
    console.log(`\n🎬 ANIMATOR AGENT: Initializing...`);
    console.log(`   Source: ${imageFilename} `);
    console.log(`   Target: ${outputFilename} `);

    // 1. Locate Source Image
    const imagePath = path.join(IMAGE_DIR, imageFilename);
    if (!fs.existsSync(imagePath)) {
        console.error(`❌ Source Not Found: ${imagePath} `);
        return;
    }

    // 2. Prepare Output
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // 3. Convert Image to Base64 URI
    console.log(`   🎨 Encoding Visual Data...`);
    const bitmap = fs.readFileSync(imagePath);
    const base64Image = Buffer.from(bitmap).toString('base64');
    const dataUri = `data: image / png; base64, ${base64Image} `;

    try {
        console.log(`   🚀 Transmitting to Neural Core (SVD)...`);

        // 4. Fetch Latest Model Version
        const model = await replicate.models.get("stability-ai", "stable-video-diffusion");
        const versionId = model.latest_version.id;

        console.log(`   💎 Using Model Version: ${versionId}`);

        // 5. Run Model
        const output = await replicate.run(
            `stability-ai/stable-video-diffusion:${versionId}`,
            {
                input: {
                    input_image: dataUri,
                    frames_per_second: 6,
                    motion_bucket_id: 127
                }
            }
        );

        console.log("   ✅ Rendering Complete!");
        console.log("   📝 Output URL:", output);

        // 5. Download Result
        // Output from SVD is usually a URL string (or array of 1 URL)
        // Check if output is standard
        const videoUrl = String(output);

        console.log(`   ⬇️  Downloading Motion Asset...`);
        const videoRes = await fetch(videoUrl);
        const buffer = await videoRes.arrayBuffer();

        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`   🎉 ASSET SECURED: ${outputFilename} `);

    } catch (error: any) {
        console.error(`\n❌ Animator Agent Failed: ${error.message} `);
    }
}

// CLI Argument Handling
const imageArg = process.argv[2];
const outputArg = process.argv[3];

if (!imageArg || !outputArg) {
    console.log("\nUsage: npm run director <image_filename> <output_filename.mp4>");
    console.log("Example: npm run director EdIntel_iep.png iep-demo.mp4\n");
} else {
    animateAsset(imageArg, outputArg);

}
