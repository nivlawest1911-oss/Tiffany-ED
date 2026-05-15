// Prisma client singleton for Sovereign platform
// Using Neon serverless driver adapter for edge/serverless compatibility

import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

// Enable WebSocket support in serverless environments
if (typeof globalThis.WebSocket !== 'undefined') {
  neonConfig.webSocketConstructor = globalThis.WebSocket;
}

let _prisma: PrismaClient | null = null;
let _connectionError: Error | null = null;

function getConnectionString(): string | null {
  return process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || null;
}

function createPrismaClient(): PrismaClient | null {
  const connectionString = getConnectionString();
  
  if (!connectionString) {
    _connectionError = new Error("Database connection string not found. Please set DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL environment variable.");
    return null;
  }
  
  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  } catch (error) {
    _connectionError = error as Error;
    return null;
  }
}

/**
 * Lazy-loaded Prisma Client Proxy
 * This prevents the Prisma constructor from running during Next.js build-time 
 * telemetry/static analysis.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    // Handle special properties for internal checks
    if (prop === "isConfigured") return !!getConnectionString();
    if (prop === "connectionError") return _connectionError?.message || null;
    if (prop === "toJSON") return () => "PrismaClientProxy";
    if (prop === "then") return undefined; // Prevent Promise-like behavior
    
    // Lazy instantiate the real client upon first method call or access
    if (!_prisma && !_connectionError) {
      _prisma = createPrismaClient();
      if (_prisma) {
        console.log(`[PRISMA_SENTINEL] Real client instantiated for property: ${String(prop)}`);
      }
    }
    
    // If we have a connection error, throw it on actual database operations
    if (!_prisma) {
      if (_connectionError) {
        throw _connectionError;
      }
      throw new Error("Prisma client not initialized");
    }
    
    const value = (_prisma as any)[prop];
    return typeof value === "function" ? value.bind(_prisma) : value;
  }
});

export default prisma;
