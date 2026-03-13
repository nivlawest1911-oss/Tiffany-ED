import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient(): PrismaClient {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL
    
    // In some environments, we might want to skip initialization if URL is missing
    // or provide a dummy client for build-time static generation if needed.
    if (!url) {
        console.warn('⚠️ [Prisma] DATABASE_URL is not set. Database operations will fail if invoked.')
        // We return a client that will only error when a query is actually attempted
        return new PrismaClient({
            log: ['warn', 'error'],
        })
    }

    return new PrismaClient({
        datasources: {
            db: { url },
        },
        log: ['query'],
    })
}

export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        if (!globalForPrisma.prisma) {
            globalForPrisma.prisma = createPrismaClient()
        }
        return Reflect.get(globalForPrisma.prisma, prop)
    },
})

export default prisma
