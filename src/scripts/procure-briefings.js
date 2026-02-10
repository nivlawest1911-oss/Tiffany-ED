
import fs from 'fs';
import path from 'path';
import https from 'https';

// ------------------------------------------------------------------
// EdIntel BRIEFING PROCURER
// ------------------------------------------------------------------
// Downloads placeholder "Talking Avatar" briefings for the UI.
// These are high-quality, royalty-free stock videos of professionals
// speaking, to simulate the "Delegate Briefing" experience.
// ------------------------------------------------------------------

const TARGET_DIR = path.join(process.cwd(), 'public', 'videos', 'briefings');

const ASSETS = [
    {
        name: 'principal_briefing.mp4',
        // Executive Male Speaker
        url: 'https://assets.mixkit.co/videos/preview/mixkit-business-man-making-a-presentation-3349-large.mp4'
    },
    {
        name: 'counselor_briefing.mp4',
        // Female Educator/Counselor
        url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-teacher-giving-an-online-class-4813-large.mp4'
    },
    {
        name: 'data_briefing.mp4',
        // Analyst/Team (The previous one worked, but let's standardize)
        url: 'https://assets.mixkit.co/videos/preview/mixkit-analyst-looking-at-multiple-screens-4147-large.mp4'
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

    console.log(`⬇️  Downloading Briefing Protocol: ${filename}...`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                console.error(`❌ Failed: ${filename} (Status ${response.statusCode})`);
                fs.unlink(dest, () => { });
                resolve(false);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`🗣️ Briefing Online: ${filename}`);
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            console.error(`❌ Failed: ${filename}`, err.message);
            resolve(false);
        });
    });
}

async function procure() {
    console.log("📡 ESTABLISHING UPLINK TO DELEGATE NETWORK...");
    for (const asset of ASSETS) {
        await downloadFile(asset.url, asset.name);
    }
    console.log("\n✅ ALL DELEGATES READY FOR BRIEFING.");
}

procure();
