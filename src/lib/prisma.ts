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
            // Institutional Check: Ensure we aren't trying to run this on the client
            if (typeof window !== 'undefined') {
                return undefined;
            }

            try {
                const { PrismaClient } = require("@/generated/prisma");
                _prisma = new PrismaClient({
                    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
                });
            } catch (_error) {
                console.warn('[PRISMA_SENTINEL] Deferred Initialization Error. Database might be unreachable.');
                // Return a proxy that throws on any actual method call
                return (..._args: any[]) => {
                    throw new Error('DATABASE_CONNECTION_ERROR: The Sovereign Data Plane is currently unreachable.');
                };
            }
        }
        
        const value = _prisma ? _prisma[prop] : undefined;
        if (value === undefined) {
             return (..._args: any[]) => {
                throw new Error('DATABASE_CONNECTION_ERROR: The Sovereign Data Plane is currently unreachable.');
            };
        }
        return typeof value === 'function' ? value.bind(_prisma) : value;
    }
});

export default prisma;
