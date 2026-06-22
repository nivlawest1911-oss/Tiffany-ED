import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

const stripeInit = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is missing');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-12-15.clover' as any,
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
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, stripe_customer_id: true, name: true }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Mock package details to bypass missing model in schema
        const tokenPackage = {
            id: packageId || 'pkg-2',
            name: 'Sovereign Professional',
            priceCents: 4900,
            tokenAmount: 2000,
            bonusTokens: 400,
            tierLevel: 'premium'
        };

        const stripe = stripeInit();

        // Create or retrieve Stripe customer
        let stripeCustomerId = user.stripe_customer_id;

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name || undefined,
                metadata: {
                    userId: user.id,
                    district: 'Mobile County Schools',
                },
            });

            stripeCustomerId = customer.id;

            // Update user with Stripe customer ID
            await prisma.user.update({
                where: { id: userId },
                data: { stripe_customer_id: stripeCustomerId }
            });
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: tokenPackage.priceCents,
            currency: 'usd',
            customer: stripeCustomerId,
            metadata: {
                userId: user.id,
                packageId: tokenPackage.id,
                tokenAmount: tokenPackage.tokenAmount.toString(),
                bonusTokens: tokenPackage.bonusTokens.toString(),
                tierLevel: tokenPackage.tierLevel,
            },
            description: `EdIntel ${tokenPackage.name} - ${tokenPackage.tokenAmount} tokens`,
        });

        // Mock pending purchase record
        const purchase = {
            id: crypto.randomUUID()
        };

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            purchaseId: purchase.id,
            package: {
                name: tokenPackage.name,
                tokens: tokenPackage.tokenAmount,
                bonusTokens: tokenPackage.bonusTokens,
                totalTokens: tokenPackage.tokenAmount + tokenPackage.bonusTokens,
                price: tokenPackage.priceCents / 100,
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

export async function GET(_request: NextRequest) {
    try {
        // Mock packages to bypass missing model in schema
        const packages = [
            { id: 'pkg-1', name: 'Starter Tier', description: 'Remediation Starter Package', tokenAmount: 500, bonusTokens: 50, priceCents: 1500, tierLevel: 'basic', isFeatured: false, displayOrder: 1, badgeText: '' },
            { id: 'pkg-2', name: 'Sovereign Professional', description: 'Science of Reading Alignment Pack', tokenAmount: 2000, bonusTokens: 400, priceCents: 4900, tierLevel: 'premium', isFeatured: true, displayOrder: 2, badgeText: 'MOST POPULAR' },
            { id: 'pkg-3', name: 'District Enterprise', description: 'Enterprise Command Fleet License', tokenAmount: 10000, bonusTokens: 3000, priceCents: 19900, tierLevel: 'enterprise', isFeatured: false, displayOrder: 3, badgeText: 'BEST VALUE' }
        ];

        const formattedPackages = packages.map((pkg: any) => ({
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            tokens: pkg.tokenAmount,
            bonusTokens: pkg.bonusTokens,
            totalTokens: pkg.tokenAmount + pkg.bonusTokens,
            price: pkg.priceCents / 100,
            priceCents: pkg.priceCents,
            tierLevel: pkg.tierLevel,
            isFeatured: pkg.isFeatured,
            badgeText: pkg.badgeText,
            pricePerToken: (pkg.priceCents / (pkg.tokenAmount + pkg.bonusTokens) / 100).toFixed(2),
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
