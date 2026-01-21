const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MEDIA_DIR = './edintel-media';
const MANIFEST_FILE = './cloudinary-manifest.json';

async function uploadToCloudinary() {
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
        return;
    }

    console.log(`🎬 Found ${files.length} files. Starting Cloudinary upload...`);
    console.log(`📦 Uploading to folder: edintel_assets\n`);

    for (const file of files) {
        const filePath = path.join(MEDIA_DIR, file);
        const stats = fs.statSync(filePath);

        if (!stats.isFile()) continue;

        try {
            // Upload with auto-optimization
            const result = await cloudinary.uploader.upload(filePath, {
                folder: "edintel_assets",
                resource_type: "auto",
                use_filename: true,
                unique_filename: false,
                transformation: [
                    { quality: "auto", fetch_format: "auto" }
                ]
            });

            const entry = {
                fileName: file,
                url: result.secure_url,
                publicId: result.public_id,
                uploadedAt: new Date().toISOString(),
                type: result.resource_type,
                format: result.format,
                size: result.bytes,
                width: result.width,
                height: result.height
            };

            manifest.push(entry);
            console.log(`✅ Uploaded: ${file}`);
            console.log(`   URL: ${result.secure_url}`);
            console.log(`   Size: ${(result.bytes / 1024 / 1024).toFixed(2)} MB\n`);

        } catch (error) {
            console.error(`❌ Upload failed for ${file}:`, error.message);
        }
    }

    // Save manifest
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log(`\n✨ Upload complete!`);
    console.log(`📊 Total uploaded: ${manifest.length} files`);
    console.log(`📝 Manifest saved: ${MANIFEST_FILE}`);
}

uploadToCloudinary();
