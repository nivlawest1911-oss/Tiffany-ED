import { sql } from '@/lib/db';
import Stripe from 'stripe';
import { TokenService } from './token-service';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

const EXECUTIVE_WHITELIST = [
    'nivlawest1911@gmail.com',
    'dralvinwest@transcendholisticwellness.com'
];

export class UserService {
    /**
     * Determine tier based on Whitelist and Stripe.
     */
    static async determineTier(email: string): Promise<{ tier: string, stripeCustomerId: string | null }> {
        let detectedTier = 'free'; // Default
        let stripeCustomerId: string | null = null;

        // 1. Executive Whitelist
        if (EXECUTIVE_WHITELIST.includes(email.toLowerCase())) {
            return { tier: 'Site Command', stripeCustomerId: null };
        }

        // 2. Stripe Check
        if (stripe) {
            try {
                const customers = await stripe.customers.list({ email, limit: 1 });
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
                    }
                }
            } catch (err) {
                console.error('[UserService] Stripe check failed:', err);
            }
        }

        return { tier: detectedTier, stripeCustomerId };
    }

    /**
     * Sync user to public users table and initialize balance.
     */
    static async syncUser(
        id: string,
        email: string,
        name: string,
        picture?: string,
        googleId?: string
    ) {
        const { tier, stripeCustomerId } = await this.determineTier(email);

        // Check if user exists
        const { rows: existingUsers } = await sql`SELECT * FROM users WHERE id = ${id}`; // Changed to query by ID first for Supabase auth consistency
        // Actually, generic auth callback has ID. Google callback might not have ID yet if we purely query by email to link accounts.

        // Let's stick to email matching for account linking if ID not found, but prioritize ID.
        let user = existingUsers[0];

        if (!user) {
            // Fallback: check by email to link legacy accounts
            const { rows: byEmail } = await sql`SELECT * FROM users WHERE email = ${email}`;
            user = byEmail[0];

            if (user) {
                // HEALING: Update the legacy ID to the new Supabase Auth ID to ensure profile continuity
                try {
                    console.log(`[EdIntel SYNC] Migrating user identity [${email}] from ${user.id} to ${id}`);
                    await sql`UPDATE users SET id = ${id}, updated_at = NOW() WHERE email = ${email}`;
                    user.id = id; // Update local reference
                } catch (migrationError) {
                    console.error(`[EdIntel SYNC] Identity migration failed. Foreign key constraints may exist.`, migrationError);
                    // If migration fails, we might create a duplicate or just fail? 
                    // We'll proceed to update the existing record (using old ID) but warn.
                    // Ideally, we want to migrate.
                }
            }
        }

        if (!user) {
            // Create new
            await sql`
                INSERT INTO users (
                    id, email, name, role, subscription_tier, stripe_customer_id, google_id, avatar_url, trial_ends_at, created_at, updated_at
                ) VALUES (
                    ${id}, ${email}, ${name}, 'educator', ${tier}, ${stripeCustomerId}, ${googleId}, ${picture},
                    ${(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).toISOString()}, -- 30 day trial default
                    NOW(), NOW()
                )
                ON CONFLICT (id) DO UPDATE SET
                    email = EXCLUDED.email,
                    updated_at = NOW()
            `;
        } else {
            // Update
            await sql`
                UPDATE users SET
                    subscription_tier = ${tier},
                    stripe_customer_id = ${stripeCustomerId},
                    google_id = COALESCE(users.google_id, ${googleId}),
                    avatar_url = COALESCE(${picture}, users.avatar_url),
                    updated_at = NOW()
                WHERE id = ${user.id}
            `;
        }

        // Initialize Token Balance using the definitive ID (resolved to heal ID if successful)
        const targetId = user ? user.id : id;
        await TokenService.initializeBalance(targetId, tier);

        return { id: targetId, email, tier };
    }
}
