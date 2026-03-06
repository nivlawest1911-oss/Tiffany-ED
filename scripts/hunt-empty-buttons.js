
const fs = require('fs');
const path = require('path');

function scanDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                scanDir(filePath, fileList);
            }
        } else {
            if (/\.tsx?$/.test(file)) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

const srcDir = path.join(process.cwd(), 'src');
const allFiles = scanDir(srcDir);

console.log('Scanning for empty buttons and links...');

allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        // Check for empty onClick
        if (/onClick=\{\s*\(\)\s*=>\s*\{\s*\}\s*\}/.test(line) || /onClick=\{\s*\(\)\s*=>\s*console\.log/.test(line)) {
            console.log(`[EMPTY BUTTON] ${file}:${index + 1}`);
            console.log(`  Line: ${line.trim()}`);
        }
        // Check for href="#"
        if (/href="#"/.test(line) || /href='#'/.test(line)) {
            console.log(`[DEAD LINK] ${file}:${index + 1}`);
            console.log(`  Line: ${line.trim()}`);
        }
    });
});

console.log('Scan complete.');
