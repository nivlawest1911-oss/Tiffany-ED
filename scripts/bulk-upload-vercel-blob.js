const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const MEDIA_DIR = './edintel-media';
const MANIFEST_FILE = './media-manifest.json';

async function bulkUploadWithLogging() {
    if (!fs.existsSync(MEDIA_DIR)) {
        console.log(`📁 Creating media directory: ${MEDIA_DIR}`);
        fs.mkdirSync(MEDIA_DIR, { recursive: true });
        console.log(`\n✨ Please add your media files to ${MEDIA_DIR} and run this script again.`);
        return;
    }

    const files = fs.readdirSync(MEDIA_DIR);
    const manifest = [];

    if (files.length === 0) {
        console.log(`\n⚠️  No files found in ${MEDIA_DIR}`);
        console.log(`Please add your images and videos to this folder.`);
        return;
    }

    console.log(`🚀 Processing ${files.length} assets for EdIntel...`);

    for (const file of files) {
        const filePath = path.join(MEDIA_DIR, file);
        const stats = fs.statSync(filePath);

        if (!stats.isFile()) continue;

        const fileStream = fs.createReadStream(filePath);

        try {
            const blob = await put(`edintel/assets/${file}`, fileStream, {
                access: 'public',
                contentType: getContentType(file),
                multipart: true,
            });

            // Capture data for your database import
            const entry = {
                fileName: file,
                url: blob.url,
                uploadedAt: new Date().toISOString(),
                type: file.match(/\.(mp4|mov|webm)$/i) ? 'video' : 'image',
                size: stats.size
            };

            manifest.push(entry);
            console.log(`✅ ${file} uploaded successfully.`);
            console.log(`   URL: ${blob.url}`);

        } catch (err) {
            console.error(`❌ Error uploading ${file}:`, err.message);
        }
    }

    // Save the manifest file
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log(`\n✨ Success! Manifest created at ${MANIFEST_FILE}`);
    console.log(`📊 Total uploaded: ${manifest.length} files`);
    console.log(`\nYou can now import this file into your EdIntel database.`);
}

function getContentType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    if (['.mp4', '.mov', '.webm'].includes(ext)) return 'video/mp4';
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return 'image/jpeg';
    if (['.gif'].includes(ext)) return 'image/gif';
    return 'application/octet-stream';
}

bulkUploadWithLogging();
