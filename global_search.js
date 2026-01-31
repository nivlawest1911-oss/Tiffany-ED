const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const ignore = ['.git', '.next', 'node_modules', '.vercel', 'dist'];

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (ignore.some(i => fullPath.includes(path.sep + i))) return;
        if (file.endsWith('.log')) return;
        if (file.endsWith('.txt')) return;

        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walk(fullPath);
            } else {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (content.includes('photo-1557804506-669a67965ba0') || content.includes('carbon-fibre')) {
                    console.log(`FOUND IN: ${fullPath}`);
                    content.split('\n').forEach((line, i) => {
                        if (line.includes('photo-1557804506-669a67965ba0') || line.includes('carbon-fibre')) {
                            console.log(`  Line ${i + 1}: ${line.trim()}`);
                        }
                    });
                }
            }
        } catch (e) { }
    });
}

console.log('Searching...');
walk(rootDir);
console.log('Done.');
