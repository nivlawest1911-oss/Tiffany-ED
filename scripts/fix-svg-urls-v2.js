const fs = require('fs');
const path = require('path');

const rootDir = path.join(process.cwd(), 'src');
const ignore = ['.git', '.next', 'node_modules', '.vercel', 'dist'];

function fixFile(fullPath) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const original = content;

    // Fix 1: Remove quotes from url(#fragment) - common source of SVG/CSS parsing errors
    // matches url("#id"), url('#id'), url(\"#id\"), etc.
    content = content.replace(/url\(\s*["']?(\\?["'])?#([^"'\s\)]+)(\\?["'])?["']?\s*\)/g, 'url(#$2)');

    // Fix 2: Ensure external URLs ARE quoted in CSS style objects/globals.css
    // but only if they are not already quoted and don't start with #
    if (fullPath.endsWith('.css')) {
        content = content.replace(/url\(\s*([^#"'%][^)]+)\s*\)/g, 'url("$1")');
    }

    if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`FIXED: ${fullPath}`);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (ignore.some(i => fullPath.includes(path.sep + i))) return;

        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (['.ts', '.tsx', '.css', '.js', '.jsx'].some(ext => file.endsWith(ext))) {
            fixFile(fullPath);
        }
    });
}

console.log('--- SVG URL CLEANUP STARTED ---');
walk(rootDir);
console.log('--- SVG URL CLEANUP FINISHED ---');
