import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const isDatabaseConfigured = !!(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL);
        
        let databaseStatus = 'unconfigured';
        if (isDatabaseConfigured) {
            try {
                // Try a very simple query to verify connectivity
                // @ts-ignore
                await prisma.$queryRaw`SELECT 1`;
                databaseStatus = 'connected';
            } catch (err: any) {
                console.error('[HealthCheck] Database connectivity failed:', err.message);
                databaseStatus = 'error';
            }
        }

        const health = {
            status: databaseStatus === 'connected' ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            services: {
                database: {
                    configured: isDatabaseConfigured,
                    status: databaseStatus,
                },
                environment: process.env.NODE_ENV,
            }
        };

        return NextResponse.json(health, {
            status: databaseStatus === 'connected' ? 200 : 503
        });
    } catch (error: any) {
        return NextResponse.json({ 
            status: 'error', 
            message: error.message 
        }, { status: 500 });
    }
}
