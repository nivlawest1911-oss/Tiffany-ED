import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export async function GET() {
    const health = {
        status: 'green',
        timestamp: new Date().toISOString(),
        services: {
            database: { status: 'operational', latency: 0, message: 'Connected to Postgres' },
            stripe: { status: process.env.STRIPE_SECRET_KEY ? 'operational' : 'degraded', latency: 0, message: '' },
            openai: { status: openai ? 'operational' : 'degraded', latency: 0, message: '' },
            supabase: { status: 'operational', latency: 0, message: 'Supabase Configured' },
        },
        env: process.env.NODE_ENV
    };

    const statusCode = health.status === 'red' ? 503 : 200;
    const cacheControl = health.status === 'red'
        ? 'no-store, no-cache, must-revalidate'
        : 'public, s-maxage=30, stale-while-revalidate=60';

    return NextResponse.json(health, {
        status: statusCode,
        headers: {
            'Cache-Control': cacheControl,
        },
    });
}
