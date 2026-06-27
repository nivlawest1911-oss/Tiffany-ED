
import "dotenv/config";
import * as fs from "fs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const sql = fs.readFileSync("scratch/diff_migration.sql", "utf8");
  console.log("Applying DDL SQL migrations statement-by-statement...");
  
  // Split statements by semicolon
  const rawStatements = sql.split(";");
  const statements: string[] = [];
  
  for (const raw of rawStatements) {
    const lines = raw.split("\n");
    const cleanLines = lines.filter(l => !l.trim().startsWith("--"));
    const trimmed = cleanLines.join("\n").trim();
    if (trimmed.length > 0) {
      statements.push(trimmed);
    }
  }

  console.log(`Found ${statements.length} SQL statements to process.`);

  let createdCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const stmt of statements) {
    const snippet = stmt.substring(0, 100).replace(/\n/g, " ") + "...";
    try {
      await prisma.$executeRawUnsafe(stmt);
      createdCount++;
    } catch (err: any) {
      const msg = err.message || "";
      if (msg.includes("already exists") || msg.includes("already a primary key") || msg.includes("already defined")) {
        // Table, enum, index, or constraint already exists
        skippedCount++;
      } else {
        console.error(`Statement failed: ${snippet}`);
        console.error("Reason:", msg);
        errorCount++;
      }
    }
  }
  
  console.log("Migration complete!");
  console.log(`Applied: ${createdCount}, Skipped (Already Exist): ${skippedCount}, Errors: ${errorCount}`);
  process.exit(0);
}

main();
