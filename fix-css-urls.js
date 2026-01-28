const fs = require('fs');
const path = require('path');

const targetFile = path.join(process.cwd(), 'src', 'app', 'globals.css');

if (fs.existsSync(targetFile)) {
    console.log(`Fixing unquoted URLs in ${targetFile}...`);
    let content = fs.readFileSync(targetFile, 'utf8');

    // Replace url(https://...) with url("https://...") if not already quoted
    content = content.replace(/url\(([^"'][^)]+)\)/g, 'url("$1")');

    // Clean up trailing ampersands at the end of quoted URLs
    content = content.replace(/&"\)/g, '")');

    fs.writeFileSync(targetFile, content);
    console.log('✅ Fix applied successfully.');
} else {
    console.error(`Error: ${targetFile} not found.`);
    process.exit(1);
}
