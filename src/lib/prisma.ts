import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient(): PrismaClient {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL
    if (!url) {
        throw new Error('DATABASE_URL is not set. Prisma cannot connect without a database URL.')
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
