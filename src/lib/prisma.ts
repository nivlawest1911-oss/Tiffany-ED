// Prisma client singleton for Sovereign platform
// Optimized with Lazy Instantiation to prevent build-time engine validation errors

let _prisma: any = null;

/**
 * Lazy-loaded Prisma Client Proxy
 * This prevents the Prisma constructor from running during Next.js build-time 
 * telemetry/static analysis, which often causes engine misidentification.
 */
export const prisma = new Proxy({} as any, {
    get(target, prop) {
        // Handle special properties for internal checks
        if (prop === 'isConfigured') return !!(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL);
        if (prop === 'toJSON') return () => 'PrismaClientProxy';
        
        // Lazy instantiate the real client upon first method call or access
        if (!_prisma) {
            const { PrismaClient } = require("@/generated/prisma/client");
            _prisma = new PrismaClient({
                log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
            });
            console.log(`[PRISMA_SENTINEL] Real client instantiated for property: ${String(prop)}`);
        }
        
        const value = _prisma[prop];
        return typeof value === 'function' ? value.bind(_prisma) : value;
    }
});

export default prisma;
