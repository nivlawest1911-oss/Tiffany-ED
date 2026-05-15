// Prisma client singleton for Sovereign platform
// Using Neon serverless driver adapter for edge/serverless compatibility

import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

// Enable WebSocket support in serverless environments
neonConfig.webSocketConstructor = globalThis.WebSocket;

let _prisma: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  
  if (!connectionString) {
    throw new Error("Database connection string not found. Please set DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL environment variable.");
  }
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

/**
 * Lazy-loaded Prisma Client Proxy
 * This prevents the Prisma constructor from running during Next.js build-time 
 * telemetry/static analysis.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    // Handle special properties for internal checks
    if (prop === "isConfigured") return !!(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL);
    if (prop === "toJSON") return () => "PrismaClientProxy";
    
    // Lazy instantiate the real client upon first method call or access
    if (!_prisma) {
      _prisma = createPrismaClient();
      console.log(`[PRISMA_SENTINEL] Real client instantiated for property: ${String(prop)}`);
    }
    
    const value = (_prisma as any)[prop];
    return typeof value === "function" ? value.bind(_prisma) : value;
  }
});

export default prisma;
