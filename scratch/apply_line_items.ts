import "dotenv/config";
import { prisma } from "./src/lib/prisma";

const sql_lti_line_items = `
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
    CONSTRAINT "lti_line_items_platformId_fkey" FOREIGN KEY ("platformId")
        REFERENCES "lti_platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
`;

const indexes = [
  `CREATE INDEX IF NOT EXISTS "lti_line_items_platformId_idx" ON "lti_line_items"("platformId");`,
  `CREATE INDEX IF NOT EXISTS "lti_line_items_resourceLinkId_idx" ON "lti_line_items"("resourceLinkId");`,
];

async function main() {
  console.log("Creating lti_line_items table...");
  try {
    await prisma.$executeRawUnsafe(sql_lti_line_items);
    console.log("✅ lti_line_items table created (or already exists).");
    for (const idx of indexes) {
      await prisma.$executeRawUnsafe(idx);
      console.log("  ✅ Index applied.");
    }
    console.log("All done.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit(0);
  }
}

main();
