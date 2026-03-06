const { execSync } = require('child_process');
const fs = require('fs');

const envLocal = fs.readFileSync('.env.local', 'utf8');
const lines = envLocal.split('\n');

const pkLine = lines.find(l => l.startsWith('GOOGLE_PRIVATE_KEY='));
if (pkLine) {
    const pk = pkLine.split('=')[1].replace(/^"|"$/g, '').replace(/\\n/g, '\n');
    fs.writeFileSync('pk.txt', pk);
    try { execSync('npx vercel env rm GOOGLE_PRIVATE_KEY production --yes', { stdio: 'ignore' }); } catch (e) { }
    console.log("Adding GOOGLE_PRIVATE_KEY from file...");
    execSync('npx vercel env add GOOGLE_PRIVATE_KEY production < pk.txt', { stdio: 'inherit', shell: true });
}

const credLine = lines.find(l => l.startsWith('GOOGLE_CREDENTIALS_JSON='));
if (credLine) {
    const creds = credLine.substring(credLine.indexOf('=') + 1).replace(/^'|'$/g, '');
    fs.writeFileSync('creds.txt', creds);
    try { execSync('npx vercel env rm GOOGLE_CREDENTIALS_JSON production --yes', { stdio: 'ignore' }); } catch (e) { }
    console.log("Adding GOOGLE_CREDENTIALS_JSON from file...");
    execSync('npx vercel env add GOOGLE_CREDENTIALS_JSON production < creds.txt', { stdio: 'inherit', shell: true });
}

console.log('Cleanup...');
if (fs.existsSync('pk.txt')) fs.unlinkSync('pk.txt');
if (fs.existsSync('creds.txt')) fs.unlinkSync('creds.txt');
console.log('Done!');
