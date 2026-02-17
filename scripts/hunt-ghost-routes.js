
const fs = require('fs');
const path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory());
}

function isLeaf(dir) {
    const subdirs = getDirectories(dir);
    return subdirs.length === 0;
}

function hasPageOrRoute(dir) {
    const files = fs.readdirSync(dir);
    return files.some(file => file === 'page.tsx' || file === 'route.ts' || file === 'layout.tsx' || file === 'loading.tsx' || file === 'error.tsx' || file === 'not-found.tsx');
}

function scanForGhostRoutes(dir) {
    const subdirs = getDirectories(dir);
    subdirs.forEach(subdir => {
        // Skip special folders like components inside app if any, or api
        const dirname = path.basename(subdir);
        if (dirname.startsWith('_') || dirname.startsWith('.')) return;

        if (isLeaf(subdir)) {
            if (!hasPageOrRoute(subdir)) {
                console.log(`[GHOST ROUTE] ${subdir}`);
            }
        } else {
            scanForGhostRoutes(subdir);
        }
    });
}

const appDir = path.join(process.cwd(), 'src/app');
console.log('Scanning for ghost routes in src/app...');
scanForGhostRoutes(appDir);
console.log('Scan complete.');
