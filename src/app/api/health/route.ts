import { NextResponse } from 'next/server';

export async function GET() {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        variables: {
            NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PRESENT' : 'MISSING',
            DATABASE_URL: !!process.env.DATABASE_URL ? 'PRESENT' : 'MISSING',
            POSTGRES_URL: !!process.env.POSTGRES_URL ? 'PRESENT' : 'MISSING',
            GOOGLE_API_KEY: (!!process.env.GOOGLE_API_KEY || !!process.env.GOOGLE_GENERATIVE_AI_API_KEY) ? 'PRESENT' : 'MISSING',
            TOGETHER_API_KEY: !!process.env.TOGETHER_API_KEY ? 'PRESENT' : 'MISSING',
            JWT_SECRET: !!process.env.JWT_SECRET ? 'PRESENT' : 'MISSING',
        },
        status: 'SYSTEM_DIAGNOSTIC_ACTIVE',
        uplink: (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ? 'ONLINE' : 'OFFLINE',
    };

    return NextResponse.json(diagnostics);
}
