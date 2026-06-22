// Prisma client singleton for Sovereign platform
// Using Neon serverless driver adapter for edge/serverless compatibility

import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";
import { Pool as PgPool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Enable WebSocket support in serverless environments
neonConfig.webSocketConstructor = globalThis.WebSocket;

let _prisma: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  
  if (!connectionString) {
    throw new Error("Database connection string not found. Please set DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL environment variable.");
  }
  
  // If it's a Neon connection string, use the serverless Neon driver adapter
  if (connectionString.includes("neon.tech")) {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool as any);
    
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }

  // For non-Neon databases (such as Supabase), instantiate standard PrismaClient with PgPool and PrismaPg adapter
  const pool = new PgPool({ connectionString });
  const adapter = new PrismaPg(pool as any);
  
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
      // Institutional Check: Ensure we aren't trying to run this on the client
      if (typeof window !== "undefined") {
        return undefined;
      }

      try {
        _prisma = createPrismaClient();
        console.log(`[PRISMA_SENTINEL] Real client instantiated for property: ${String(prop)}`);
      } catch (error: any) {
        console.warn("[PRISMA_SENTINEL] Deferred Initialization Error:", error);
        // Return a proxy that dynamically throws a clear error for any method call (resolves "create is not a function" error)
        return new Proxy({}, {
          get(target, method) {
            return (...args: any[]) => {
              throw new Error(`DATABASE_CONNECTION_ERROR: The database could not be initialized. Original error: ${error?.message || error}`);
            };
          }
        });
      }
    }
    
    const value = (_prisma as any)[prop];
    if (value === undefined) {
      return undefined;
    }
    return typeof value === "function" ? value.bind(_prisma) : value;
  }
});

export default prisma;
