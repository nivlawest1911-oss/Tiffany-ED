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

// Executive whitelist for automatic Site Command access
const EXECUTIVE_WHITELIST = [
    'nivlawest1911@gmail.com',
    'dralvinwest@transcendholisticwellness.com'
];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || 'https://edintel-app.vercel.app'}/api/auth/google/callback`;

    // Handle OAuth errors
    if (error) {
        console.error(`[GOOGLE AUTH] OAuth error: ${error}`);
        return NextResponse.redirect(new URL(`/login?error=oauth_${error}`, request.url));
    }

    if (!code) {
        console.error('[GOOGLE AUTH] No authorization code received');
        return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        console.error('[GOOGLE AUTH] Missing OAuth credentials');
        return NextResponse.redirect(new URL('/login?error=config_error', request.url));
    }

    try {
        // 1. Exchange Code for Token with retry logic
        let tokenData: any;
        let retries = 3;

        while (retries > 0) {
            try {
                const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        code,
                        client_id: GOOGLE_CLIENT_ID,
                        client_secret: GOOGLE_CLIENT_SECRET,
                        redirect_uri: REDIRECT_URI,
                        grant_type: 'authorization_code',
                    }),
                });

                tokenData = await tokenResponse.json();

                if (!tokenResponse.ok) {
                    throw new Error(tokenData.error_description || 'Token exchange failed');
                }

                break; // Success
            } catch (err) {
                retries--;
                if (retries === 0) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
            }
        }

        // 2. Get User Profile
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const googleUser = await userResponse.json();
        const { email, name, picture, id: googleId } = googleUser;

        console.log(`[GOOGLE AUTH] User authenticated: ${email}`);

        // 3. Determine Tier (Executive Whitelist + Stripe Sync)
        let detectedTier = 'free';
        let stripeCustomerId: string | null = null;

        // Executive Whitelist Check
        if (EXECUTIVE_WHITELIST.includes(email.toLowerCase())) {
            detectedTier = 'Site Command';
            console.log(`[SOVEREIGN] Executive access granted: ${email}`);
        } else if (stripe) {
            // Stripe Subscription Check
            try {
                const customers = await stripe.customers.list({
                    email,
                    limit: 1
                });

                if (customers.data.length > 0) {
                    const customer = customers.data[0];
                    stripeCustomerId = customer.id;

                    const subscriptions = await stripe.subscriptions.list({
                        customer: customer.id,
                        status: 'active',
                        expand: ['data.plan.product'],
                        limit: 1,
                    });

                    if (subscriptions.data.length > 0) {
                        const sub = subscriptions.data[0];
                        const product = sub.items.data[0].plan.product as Stripe.Product;
                        const productName = product.name.toLowerCase();
                        const metadata = sub.metadata;

                        // Tier detection priority: metadata > product name
                        if (metadata?.tier) {
                            detectedTier = metadata.tier;
                        } else if (productName.includes('vault') || productName.includes('lifetime')) {
                            detectedTier = 'Professional Vault';
                        } else if (productName.includes('site') || productName.includes('command') || productName.includes('enterprise')) {
                            detectedTier = 'Site Command';
                        } else if (productName.includes('director')) {
                            detectedTier = 'Director Pack';
                        } else if (productName.includes('practitioner') || productName.includes('pro')) {
                            detectedTier = 'Practitioner';
                        }

                        console.log(`[STRIPE SYNC] Tier detected: ${detectedTier} for ${email}`);
                    }
                }
            } catch (stripeErr: any) {
                console.error('[STRIPE SYNC] Error:', stripeErr.message);
                // Continue with free tier if Stripe check fails
            }
        }

        // 4. Check/Create User in Database
        const { rows: existingUsers } = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        let user = existingUsers[0];

        if (!user) {
            // Create new user
            const newId = crypto.randomUUID();
            const { rows: newUsers } = await sql`
                INSERT INTO users (
                    id,
                    email, 
                    name, 
                    role, 
                    subscription_tier,
                    stripe_customer_id,
                    google_id,
                    avatar_url,
                    trial_ends_at,
                    created_at,
                    updated_at
                )
                VALUES (
                    ${newId},
                    ${email}, 
                    ${name}, 
                    'educator', 
                    ${detectedTier},
                    ${stripeCustomerId},
                    ${googleId},
                    ${picture},
                    ${(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)).toISOString()},
                    NOW(),
                    NOW()
                )
                RETURNING id, email, name, role, subscription_tier as "subscriptionTier"
            `;
            user = newUsers[0];
            console.log(`[DATABASE] New user created: ${email} (${detectedTier})`);
        } else {
            // Update existing user
            const updates: string[] = [];
            const needsUpdate =
                user.subscription_tier !== detectedTier ||
                user.stripe_customer_id !== stripeCustomerId ||
                user.google_id !== googleId ||
                user.avatar_url !== picture;

            if (needsUpdate) {
                await sql`
                    UPDATE users 
                    SET 
                        subscription_tier = ${detectedTier},
                        stripe_customer_id = ${stripeCustomerId},
                        google_id = ${googleId},
                        avatar_url = ${picture},
                        updated_at = NOW()
                    WHERE id = ${user.id}
                `;
                user.subscriptionTier = detectedTier; // Keep camelCase for session logic
                console.log(`[DATABASE] User updated: ${email} -> ${detectedTier}`);
            }
        }

        // 5. Create Secure Session
        await login({
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            tier: user.subscriptionTier || user.subscription_tier || 'free'
        });

        console.log(`[SESSION] Created for ${email}`);

        // 6. Redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard?login=success', request.url));

    } catch (error: any) {
        console.error('[GOOGLE AUTH] Callback error:', error);
        return NextResponse.redirect(
            new URL(`/login?error=auth_failed&message=${encodeURIComponent(error.message || 'Unknown error')}`, request.url)
        );
    }
}
