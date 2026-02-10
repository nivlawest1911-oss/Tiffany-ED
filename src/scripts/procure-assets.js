
import fs from 'fs';
import path from 'path';
import https from 'https';

// ------------------------------------------------------------------
// EdIntel ASSET PROCURER
// ------------------------------------------------------------------
// Downloads high-quality placeholder feedback loops for the UI.
// ------------------------------------------------------------------

const TARGET_DIR = path.join(process.cwd(), 'public', 'videos', 'features');

// High-quality abstract tech backgrounds (Pexels Public Domain)
const ASSETS = [
    {
        name: 'iep-architect-demo.mp4',
        // Abstract Blue Data HUD
        url: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4'
    },
    {
        name: 'lesson-planner-demo.mp4',
        // Network/Connection Gold/Warm
        url: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4'
    },
    {
        name: 'data-analysis-demo.mp4',
        // Futuristic Purple/Blue Grid
        url: 'https://videos.pexels.com/video-files/5826629/5826629-uhd_3840_2160_24fps.mp4'
    }
];

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function downloadFile(url, filename) {
    const dest = path.join(TARGET_DIR, filename);
    if (fs.existsSync(dest)) {
        console.log(`✅ Cache Hit: ${filename}`);
        return;
    }

    console.log(`⬇️  Downloading EdIntel Asset: ${filename}...`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✨ Asset Deployed: ${filename}`);
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            console.error(`❌ Failed: ${filename}`, err.message);
            reject(err);
        });
    });
}

async function procure() {
    console.log("🎬 INITIALIZING ASSET PROCUREMENT...");
    for (const asset of ASSETS) {
        await downloadFile(asset.url, asset.name);
    }
    console.log("\n✅ ALL SYSTEMS ONLINE. VIDEO PLAYERS READY.");
}

procure();
