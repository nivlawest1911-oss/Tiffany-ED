import { execSync } from 'child_process';

console.log('Regenerating package-lock.json...');
execSync('cd /vercel/share/v0-project && npm install --package-lock-only', { stdio: 'inherit' });
console.log('Done! package-lock.json has been regenerated.');
