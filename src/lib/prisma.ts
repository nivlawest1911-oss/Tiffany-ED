import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient(): PrismaClient {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL
    
    if (!url) {
        if (process.env.NODE_ENV === 'production') {
            console.error('❌ [CRITICAL] DATABASE_URL is missing in production environment.')
        } else {
            console.warn('⚠️ [Prisma] DATABASE_URL is not set. Database operations will fail if invoked.')
        }
        
        // Return a proxy that will only throw when a method is actually called
        return new PrismaClient({
            log: ['error'],
        })
    }

    return new PrismaClient({
        datasources: {
            db: { url },
        },
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
}

/**
 * Global Prisma instance with lazy initialization
 */
export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        if (prop === 'isConfigured') {
            return !!(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL)
        }
        if (!globalForPrisma.prisma) {
            globalForPrisma.prisma = createPrismaClient()
        }
        return Reflect.get(globalForPrisma.prisma, prop)
    },
}) as PrismaClient & { isConfigured: boolean }

export default prisma
