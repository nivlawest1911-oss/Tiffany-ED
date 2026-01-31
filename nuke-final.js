const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src');
const filesToClean = ['.tsx', '.ts', '.css', '.js', '.json', '.html'];

function scrub(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['node_modules', '.next', '.vercel', 'scripts', '.git'].includes(file)) scrub(filePath);
        } else if (filesToClean.includes(path.extname(file))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                // Remove the exact patterns causing the Webpack '' failure
                const clean = content
                    .replace(/'/g, "'")
                    .replace(/&/g, "&")
                    .replace(/url\(['"]?.*?&.*?['"]?\)/g, "url('')") // Kills any URL with an ampersand
                    .replace(/\.\/&/g, ""); // Kill the specific ghost path

                if (content !== clean) {
                    fs.writeFileSync(filePath, clean, 'utf8');
                    console.log(`FIXED: ${filePath}`);
                }
            } catch (e) {
                // Skip files that might be binary or locked
            }
        }
    });
}

console.log("--- SCRUBBING ALL SOURCE FILES ---");
scrub(targetDir);
// Also scrub root config files but be careful with package.json manually if needed
// For now, let's just scrub the root files but not recursively into large dirs
const rootFiles = fs.readdirSync(__dirname);
rootFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.statSync(filePath).isFile() && filesToClean.includes(path.extname(file))) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const clean = content
                .replace(/'/g, "'")
                .replace(/&/g, "&")
                .replace(/url\(['"]?.*?&.*?['"]?\)/g, "url('')")
                .replace(/\.\/&/g, "");
            if (content !== clean) {
                fs.writeFileSync(filePath, clean, 'utf8');
                console.log(`FIXED ROOT FILE: ${filePath}`);
            }
        } catch (e) { }
    }
});

console.log("--- RESETTING CSS ---");
const globalsCssPath = path.join(__dirname, 'src/app/globals.css');
if (fs.existsSync(globalsCssPath)) {
    fs.writeFileSync(globalsCssPath, '@import "tailwindcss";', 'utf8');
}
console.log("--- COMPLETE ---");
