import { execSync } from 'child_process';

console.log('Regenerating package-lock.json...');
try {
  execSync('npm install --package-lock-only --ignore-scripts', { 
    stdio: 'inherit',
    cwd: '/vercel/share/v0-project'
  });
  console.log('package-lock.json regenerated successfully!');
} catch (error) {
  console.error('Failed to regenerate lock file:', error.message);
  process.exit(1);
}
