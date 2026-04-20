import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

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
            select: { id: true, email: true, stripeCustomerId: true, name: true }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Get package details
        const tokenPackage = await prisma.tokenPackage.findFirst({
            where: { id: packageId, isActive: true }
        });

        if (!tokenPackage) {
            return NextResponse.json(
                { error: 'Package not found or inactive' },
                { status: 404 }
            );
        }

        const stripe = stripeInit();

        // Create or retrieve Stripe customer
        let stripeCustomerId = user.stripeCustomerId;

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
                data: { stripeCustomerId: stripeCustomerId }
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

        // Create pending purchase record in database
        const purchase = await prisma.tokenPurchase.create({
            data: {
                userId: userId,
                packageId: packageId,
                tokensPurchased: tokenPackage.tokenAmount,
                pricePaidCents: tokenPackage.priceCents,
                bonusTokens: tokenPackage.bonusTokens,
                stripePaymentIntentId: paymentIntent.id,
                stripeCustomerId: stripeCustomerId,
                status: 'pending',
                ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
                userAgent: request.headers.get('user-agent') || 'unknown'
            }
        });

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
        const packages = await prisma.tokenPackage.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: 'asc' }
        });

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

