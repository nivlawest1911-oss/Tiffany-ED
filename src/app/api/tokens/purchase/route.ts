/**
 * EdIntel Professional - Token Purchase API
 * Stripe Payment Integration with Double-Entry Ledger
 * 
 * POST /api/tokens/purchase
 * Creates a Stripe Payment Intent for token purchase
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripeInit = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is missing');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-12-15.clover' as any, // Cast to any to avoid version conflict if types change
    });
};

export async function POST(request: NextRequest) {
    try {
        const { packageId, userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Get user details
        const { rows: users } = await sql`
      SELECT id, email, stripe_customer_id, name
      FROM users
      WHERE id = ${userId}
    `;

        if (users.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const user = users[0];

        // Get package details
        const { rows: packages } = await sql`
      SELECT id, name, description, token_amount, price_cents, bonus_tokens, tier_level
      FROM token_packages
      WHERE id = ${packageId} AND is_active = true
    `;

        if (packages.length === 0) {
            return NextResponse.json(
                { error: 'Package not found or inactive' },
                { status: 404 }
            );
        }

        const tokenPackage = packages[0];

        const stripe = stripeInit();

        // Create or retrieve Stripe customer
        let stripeCustomerId = user.stripe_customer_id;

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name || undefined,
                metadata: {
                    userId: user.id,
                    district: 'Mobile County Schools', // Can be dynamic
                },
            });

            stripeCustomerId = customer.id;

            // Update user with Stripe customer ID
            await sql`
        UPDATE users
        SET stripe_customer_id = ${stripeCustomerId}
        WHERE id = ${userId}
      `;
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: tokenPackage.price_cents,
            currency: 'usd',
            customer: stripeCustomerId,
            metadata: {
                userId: user.id,
                packageId: tokenPackage.id,
                tokenAmount: tokenPackage.token_amount.toString(),
                bonusTokens: tokenPackage.bonus_tokens.toString(),
                tierLevel: tokenPackage.tier_level,
            },
            description: `EdIntel ${tokenPackage.name} - ${tokenPackage.token_amount} tokens`,
        });

        // Create pending purchase record in database
        const { rows: purchases } = await sql`
      INSERT INTO token_purchases (
        user_id,
        package_id,
        tokens_purchased,
        price_paid_cents,
        bonus_tokens,
        stripe_payment_intent_id,
        stripe_customer_id,
        status,
        ip_address,
        user_agent
      )
      VALUES (
        ${userId},
        ${packageId},
        ${tokenPackage.token_amount},
        ${tokenPackage.price_cents},
        ${tokenPackage.bonus_tokens},
        ${paymentIntent.id},
        ${stripeCustomerId},
        'pending',
        ${request.headers.get('x-forwarded-for') || 'unknown'},
        ${request.headers.get('user-agent') || 'unknown'}
      )
      RETURNING id
    `;

        const purchaseId = purchases[0].id;

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            purchaseId,
            package: {
                name: tokenPackage.name,
                tokens: tokenPackage.token_amount,
                bonusTokens: tokenPackage.bonus_tokens,
                totalTokens: tokenPackage.token_amount + tokenPackage.bonus_tokens,
                price: tokenPackage.price_cents / 100,
            },
        });
    } catch (error: any) {
        console.error('Token purchase error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create payment intent' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/tokens/purchase
 * Get available token packages
 */
export async function GET(request: NextRequest) {
    try {
        const { rows: packages } = await sql`
      SELECT 
        id,
        name,
        description,
        token_amount,
        price_cents,
        bonus_tokens,
        tier_level,
        is_featured,
        badge_text,
        display_order
      FROM token_packages
      WHERE is_active = true
      ORDER BY display_order ASC
    `;

        const formattedPackages = packages.map((pkg: any) => ({
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            tokens: pkg.token_amount,
            bonusTokens: pkg.bonus_tokens,
            totalTokens: pkg.token_amount + pkg.bonus_tokens,
            price: pkg.price_cents / 100,
            priceCents: pkg.price_cents,
            tierLevel: pkg.tier_level,
            isFeatured: pkg.is_featured,
            badgeText: pkg.badge_text,
            pricePerToken: (pkg.price_cents / (pkg.token_amount + pkg.bonus_tokens) / 100).toFixed(2),
        }));

        return NextResponse.json({ packages: formattedPackages });
    } catch (error: any) {
        console.error('Error fetching packages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch token packages' },
            { status: 500 }
        );
    }
}
