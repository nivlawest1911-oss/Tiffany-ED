import { NextResponse } from 'next/server';

const check = (key: string) => !!process.env[key] ? 'PRESENT' : 'MISSING';

export async function GET() {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        uplink: (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ? 'ONLINE' : 'OFFLINE',
        status: 'SYSTEM_DIAGNOSTIC_ACTIVE',
        services: {
            // Auth & Identity
            supabase_url: check('NEXT_PUBLIC_SUPABASE_URL'),
            supabase_anon_key: check('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
            supabase_service_key: check('SUPABASE_SERVICE_ROLE_KEY'),
            jwt_secret: check('JWT_SECRET'),
            // Databases
            postgres_url: check('POSTGRES_URL') || check('DATABASE_URL'),
            // AI - Google
            google_ai_key: (!!process.env.GOOGLE_API_KEY || !!process.env.GOOGLE_GENERATIVE_AI_API_KEY) ? 'PRESENT' : 'MISSING',
            google_project_id: check('GOOGLE_PROJECT_ID'),
            google_credentials: check('GOOGLE_CREDENTIALS_JSON'),
            // AI - Meta / Together
            together_api_key: check('TOGETHER_API_KEY'),
            // AI - Media
            elevenlabs_key: check('ELEVENLABS_API_KEY'),
            heygen_key: check('HEYGEN_API_KEY'),
            replicate_token: check('REPLICATE_API_TOKEN'),
            // Payments
            stripe_secret: check('STRIPE_SECRET_KEY'),
            stripe_webhook_secret: check('STRIPE_WEBHOOK_SECRET'),
            // Storage
            vercel_blob: check('BLOB_READ_WRITE_TOKEN'),
        },
    };

    const missingCount = Object.values(diagnostics.services).filter(v => v === 'MISSING').length;
    const httpStatus = missingCount > 5 ? 503 : 200;

    return NextResponse.json({ ...diagnostics, missingServicesCount: missingCount }, { status: httpStatus });
}

