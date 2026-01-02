'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Map tiers to Price IDs (stored in env vars or fallback to hardcoded)
const PRICE_MAPPING: Record<string, string> = {
  STRIPE_PRICE_PRACTITIONER_MONTHLY: 'price_1Sh8dYJZzJ2JsTizXhKtULfh',
  STRIPE_PRICE_SITE_COMMAND_MONTHLY: 'price_1Sh8hnJZzJ2JsTizcbRWqkLV',
  // Add annual IDs here when available
};

function getPriceId(tierId: string, isAnnual: boolean): string | undefined {
  const key = `STRIPE_PRICE_${tierId.toUpperCase().replace(' ', '_')}_${isAnnual ? 'ANNUAL' : 'MONTHLY'}`;
  // Debug log (remove in prod)
  console.log(`Looking up price for key: ${key}`);
  return process.env[key] || PRICE_MAPPING[key];
}

// 1. SESSION ACTION: For new subscriptions (Professional/Enterprise)
export async function createCheckoutSession(priceIdOrTierId: string, isAnnual: boolean) {
  let priceId = '';

  if (priceIdOrTierId.startsWith('price_')) {
    priceId = priceIdOrTierId;
  } else {
    const lookupId = getPriceId(priceIdOrTierId, isAnnual);
    if (!lookupId) {
      console.error(`No price ID found for tier: ${priceIdOrTierId}, annual: ${isAnnual}`);
      throw new Error("Pricing configuration error. Please contact support.");
    }
    priceId = lookupId;
  }

  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${origin}/archive?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    automatic_tax: { enabled: true },
    customer_update: { address: 'auto' },
  });

  if (session.url) {
    redirect(session.url);
  }
}

// 2. PORTAL ACTION: For existing users to manage billing/invoices
export async function createPortalSession() {
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  // We look up the customer by the Admin/User email stored in environment
  // TODO: In a multi-user app, get the email from the authenticated user
  const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!email) {
    console.error("NEXT_PUBLIC_ADMIN_EMAIL is not set");
    return;
  }

  const user = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  let customerId = user.data[0]?.id;

  if (!customerId) {
    console.error("No Stripe customer found for this email.");
    return;
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/archive`,
  });

  if (session.url) {
    redirect(session.url);
  }
}
