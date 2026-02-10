import { execSync } from 'child_process';

console.log('Generating fresh package-lock.json...');
try {
  execSync('npm install --package-lock-only --legacy-peer-deps', {
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit',
  });
  console.log('Done! package-lock.json generated successfully.');
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
