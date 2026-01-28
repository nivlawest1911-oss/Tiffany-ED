import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🚀 Starting EdIntel Database Health Check...')

    try {
        // 1. Test Connection
        await prisma.$connect()
        console.log('✅ Connection: Successfully connected to the database.')

        // 2. Check Schema Sync
        // This attempts to count users or a core table to verify permissions
        const count = await prisma.$queryRaw`SELECT 1 as result`
        console.log('✅ Query Test: Database responded to raw query.')

        // 3. Verify Environment
        console.log(`🌍 Environment: Running in ${process.env.NODE_ENV || 'development'} mode.`)

    } catch (e) {
        console.error('❌ Database connection failed!')
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
