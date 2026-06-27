const fs = require('fs');
const { execSync } = require('child_process');

// Read DIRECT_URL from .env
const envLines = fs.readFileSync('.env', 'utf8').split('\n');
const directUrlLine = envLines.find(l => l.startsWith('DIRECT_URL='));
if (!directUrlLine) { console.error('DIRECT_URL not found in .env'); process.exit(1); }

const directUrl = directUrlLine.split('=').slice(1).join('=').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
console.log('Using DIRECT_URL (masked):', directUrl.split('@')[1] || '[hidden]');

const sql = `
CREATE TABLE IF NOT EXISTS "lti_line_items" (
  "id" TEXT NOT NULL,
  "platformId" TEXT NOT NULL,
  "resourceLinkId" TEXT,
  "lineItemUrl" TEXT,
  "label" TEXT NOT NULL,
  "scoreMaximum" DOUBLE PRECISION NOT NULL DEFAULT 100,
  "resourceId" TEXT,
  "tag" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "lti_line_items_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "lti_line_items_platformId_fkey"
    FOREIGN KEY ("platformId") REFERENCES "lti_platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "lti_line_items_platformId_idx" ON "lti_line_items"("platformId");
CREATE INDEX IF NOT EXISTS "lti_line_items_resourceLinkId_idx" ON "lti_line_items"("resourceLinkId");
`;

// Write SQL to a temp file
fs.writeFileSync('scratch/lti_line_items.sql', sql);
console.log('SQL written. Running prisma db execute...');

try {
  const result = execSync(
    `npx prisma db execute --file scratch/lti_line_items.sql --url "${directUrl}"`,
    { encoding: 'utf8', stdio: 'pipe' }
  );
  console.log('✅ Migration result:', result || '(no output — success)');
} catch (e) {
  console.log('stdout:', e.stdout);
  console.error('stderr:', e.stderr);
  process.exit(1);
}
