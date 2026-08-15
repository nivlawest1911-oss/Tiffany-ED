try {
  require("dotenv/config");
} catch {
  // dotenv is optional in production/CI build environments where process.env is pre-set
}
import { defineConfig } from "prisma/config";

// Use DATABASE_URL if available, fallback to a dummy URL for prisma generate
const databaseUrl = process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  "postgresql://dummy:dummy@localhost:5432/dummy";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
