import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';

// Initialize OpenAI client if key is present
const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export async function GET() {
    console.log('🏥 Health Check Initiated...');

    const health = {
        status: 'green', // optimistic default
        timestamp: new Date().toISOString(),
        services: {
            database: { status: 'unknown', latency: 0, message: '' },
            stripe: { status: 'unknown', latency: 0, message: '' },
            openai: { status: 'unknown', latency: 0, message: '' },
            supabase: { status: 'unknown', latency: 0, message: '' },
        },
        env: process.env.NODE_ENV
    };

    // 1. Database Check (Prisma)
    const dbStart = Date.now();
    try {
        await prisma.$queryRaw`SELECT 1`;
        health.services.database = {
            status: 'operational',
            latency: Date.now() - dbStart,
            message: 'Connected to Postgres'
        };
    } catch (error: any) {
        console.error('Database Health Check Failed:', error);
        health.status = 'red';
        health.services.database = {
            status: 'failure',
            latency: Date.now() - dbStart,
            message: error.message
        };
    }

    // 2. Stripe Check
    const stripeStart = Date.now();
    try {
        if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY missing');
        // Lightweight call to check API access
        await stripe.paymentIntents.list({ limit: 1 });
        health.services.stripe = {
            status: 'operational',
            latency: Date.now() - stripeStart,
            message: 'Stripe API Accessible'
        };
    } catch (error: any) {
        console.error('Stripe Health Check Failed:', error);
        // Don't mark global red for stripe unless it's critical, strictly speaking app can run without it
        // But for "Maximally Optimized", it should be red.
        health.status = 'red';
        health.services.stripe = {
            status: 'failure',
            latency: Date.now() - stripeStart,
            message: error.message
        };
    }

    // 3. OpenAI Check
    const aiStart = Date.now();
    try {
        if (!openai) throw new Error('OPENAI_API_KEY missing');
        await openai.models.list();
        health.services.openai = {
            status: 'operational',
            latency: Date.now() - aiStart,
            message: 'OpenAI Models Listable'
        };
    } catch (error: any) {
        console.error('OpenAI Health Check Failed:', error);
        health.status = 'red';
        health.services.openai = {
            status: 'failure',
            latency: Date.now() - aiStart,
            message: error.message
        };
    }

    // 4. Supabase Check
    const sbStart = Date.now();
    try {
        const supabase = await createClient(); // Use server-side client creator

        if (!supabase) {
            throw new Error('Supabase client failed to initialize (Missing Config)');
        }

        const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

        if (error && error.code !== 'PGRST116') { // Ignore "no rows" errors, focusing on connection
            // If table doesn't exist or connection fails
            throw error;
        }

        health.services.supabase = {
            status: 'operational',
            latency: Date.now() - sbStart,
            message: 'Supabase Connection Valid'
        };
    } catch (error: any) {
        console.error('Supabase Health Check Failed:', error);
        health.status = 'red'; // Critical
        health.services.supabase = {
            status: 'failure',
            latency: Date.now() - sbStart,
            message: error.message || 'Connection failed'
        };
    }

    // Return 200 even if red, to allow debugging the JSON response
    // const statusCode = health.status === 'red' ? 503 : 200;
    return NextResponse.json(health, { status: 200 });
}
