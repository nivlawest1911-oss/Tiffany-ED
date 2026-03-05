import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const projectRoot = join(import.meta.dirname, '..');
const lockfilePath = join(projectRoot, 'package-lock.json');

// Remove stale lockfile if it exists
if (existsSync(lockfilePath)) {
  unlinkSync(lockfilePath);
  console.log('Removed stale package-lock.json');
}

// Run npm install to generate a fresh lockfile
console.log('Running npm install to generate fresh package-lock.json...');
try {
  execSync('npm install --legacy-peer-deps', {
    cwd: projectRoot,
    stdio: 'inherit',
    timeout: 300000
  });
  console.log('Successfully generated fresh package-lock.json');
} catch (error) {
  console.error('Failed to generate lockfile:', error.message);
  process.exit(1);
}
