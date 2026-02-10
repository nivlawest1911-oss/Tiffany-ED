
import fs from 'fs';
import path from 'path';
import https from 'https';

// ------------------------------------------------------------------
// EdIntel AUDIO PROCURER
// ------------------------------------------------------------------
// Downloads high-tech interface sounds for the "EdIntel" aesthetic.
// Sources: Pixabay (Royalty Free)
// ------------------------------------------------------------------

const TARGET_DIR = path.join(process.cwd(), 'public', 'sounds');

const ASSETS = [
    {
        name: 'hover_tech.mp3',
        // High Tech Digital Blip
        url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
    },
    {
        name: 'click_engage.mp3',
        // Mechanical Futuristic Click
        url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
    },
    {
        name: 'success_chime.mp3',
        // Positive Data Confirm
        url: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'
    },
    {
        name: 'ambient_hum.mp3',
        // Deep Space Drones
        url: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3'
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

    console.log(`⬇️  Downloading Audio Asset: ${filename}...`);

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
                console.log(`🔊 Audio Online: ${filename}`);
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
    console.log("🎧 INITIALIZING AUDIO SYSTEMS...");
    for (const asset of ASSETS) {
        await downloadFile(asset.url, asset.name);
    }
    console.log("\n✅ ALL AUDIO SYSTEMS ONLINE.");
}

procure();
