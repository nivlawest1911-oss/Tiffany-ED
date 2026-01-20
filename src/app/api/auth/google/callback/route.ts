import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { login } from '@/lib/auth';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || 'https://edintel-app.vercel.app'}/api/auth/google/callback`;

    if (!code) {
        return NextResponse.redirect(new URL('/login?error=Google_Auth_Failed', request.url));
    }

    try {
        // 1. Exchange Code for Token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID!,
                client_secret: GOOGLE_CLIENT_SECRET!,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();
        if (!tokenResponse.ok) {
            console.error('Google Token Error:', tokenData);
            throw new Error('Failed to exchange code');
        }

        // 2. Get User Profile
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const googleUser = await userResponse.json();
        const { email, name, picture, id: googleId } = googleUser;

        // 3. PROFESSIONAL HANDSHAKE: Check Stripe Status
        let detectedTier = 'free';
        if (stripe) {
            try {
                const customers = await stripe.customers.list({ email, limit: 1 });
                if (customers.data.length > 0) {
                    const subscriptions = await stripe.subscriptions.list({
                        customer: customers.data[0].id,
                        status: 'active',
                        expand: ['data.plan.product'],
                    });

                    if (subscriptions.data.length > 0) {
                        const sub = subscriptions.data[0];
                        const product = sub.items.data[0].plan.product as Stripe.Product;
                        const productName = product.name.toLowerCase();

                        if (productName.includes('vault') || productName.includes('lifetime')) detectedTier = 'Professional Vault';
                        else if (productName.includes('site') || productName.includes('command') || productName.includes('enterprise')) detectedTier = 'Site Command';
                        else if (productName.includes('director')) detectedTier = 'Director Pack';
                        else if (productName.includes('practitioner') || productName.includes('pro')) detectedTier = 'Practitioner';
                    }
                }
            } catch (stripeErr) {
                console.error("[PROFESSIONAL] Stripe metadata handshake failed:", stripeErr);
            }
        }

        // 4. Check/Create User in DB
        const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email = ${email}`;

        let user = existingUsers[0];

        if (!user) {
            const { rows: newUsers } = await sql`
                INSERT INTO users (email, name, role, subscriptionTier)
                VALUES (${email}, ${name}, 'educator', ${detectedTier})
                RETURNING id, email, name, role, subscriptionTier
            `;
            user = newUsers[0];
            console.log(`[PROFESSIONAL] New user created via Google: ${email} (Tier: ${detectedTier})`);
        } else {
            // Update tier if it changed in Stripe
            if (user.subscriptiontier !== detectedTier) {
                await sql`UPDATE users SET subscriptionTier = ${detectedTier} WHERE id = ${user.id}`;
                user.subscriptiontier = detectedTier;
                console.log(`[PROFESSIONAL] User tier synced with Stripe: ${email} -> ${detectedTier}`);
            }
        }

        // 5. Create Session
        await login({
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            tier: user.subscriptiontier || 'free'
        });

        return NextResponse.redirect(new URL('/', request.url));

    } catch (error) {
        console.error('Google Callback Error:', error);
        return NextResponse.redirect(new URL('/login?error=Auth_System_Failure', request.url));
    }
}
