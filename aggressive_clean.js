const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const ignore = ['.git', '.next', 'node_modules', '.vercel', 'dist'];

function clean(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (ignore.some(i => fullPath.includes(path.sep + i))) return;

        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                clean(fullPath);
            } else {
                let content = fs.readFileSync(fullPath, 'utf8');
                let modified = false;

                if (content.includes('carbon-fibre.png')) {
                    console.log(`CLEANED carbon-fibre: ${fullPath}`);
                    content = content.replace(/carbon-fibre\.png&/g, 'carbon-fibre.png');
                    modified = true;
                }

                if (content.includes('photo-1557804506-669a67965ba0?')) {
                    console.log(`CLEANED unsplash: ${fullPath}`);
                    content = content.replace(/photo-1557804506-669a67965ba0\?[^"'\s\)]+/g, 'photo-1557804506-669a67965ba0');
                    modified = true;
                }

                if (modified) {
                    fs.writeFileSync(fullPath, content);
                }
            }
        } catch (e) { }
    });
}

console.log('Cleaning all files...');
clean(rootDir);
console.log('Done.');
