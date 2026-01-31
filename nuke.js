const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        let filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.vercel') walk(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
            let content = fs.readFileSync(filePath, 'utf8');
            // This regex kills any url() or import path containing an ampersand or encoded quote
            let clean = content.replace(/url\(['"]?.*&.*['"]?\)/g, "url('')")
                .replace(/import.*&.*/g, "")
                .replace(/'/g, "'")
                .replace(/&/g, "&");
            if (content !== clean) {
                fs.writeFileSync(filePath, clean, 'utf8');
                console.log(`CLEANED: ${filePath}`);
            }
        }
    });
};

console.log("--- CLEANING SRC FOLDER ---");
walk(path.join(__dirname, 'src'));
console.log("--- RESETTING GLOBALS.CSS ---");
fs.writeFileSync(path.join(__dirname, 'src/app/globals.css'), '@import "tailwindcss";', 'utf8');
console.log("--- DONE ---");
