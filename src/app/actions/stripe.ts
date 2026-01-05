'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Map tiers to Price IDs (stored in env vars or fallback to hardcoded)
const PRICE_MAPPING: Record<string, string> = {
  STRIPE_PRICE_PRACTITIONER_MONTHLY: 'price_1SleigJZzJ2JsTizzhcHtd36',
  STRIPE_PRICE_SITE_COMMAND_MONTHLY: 'price_1SleihJZzJ2JsTizmaXKM4ow',
  // Tokens
  STRIPE_PRICE_TOKEN_1K: 'price_1SleijJZzJ2JsTizToken1K', // Replace with real ID if available, otherwise this will fail in Stripe
  STRIPE_PRICE_TOKEN_5K: 'price_1SleikJZzJ2JsTizToken5K',
  STRIPE_PRICE_TOKEN_10K: 'price_1SleilJZzJ2JsTizToken10K',
};

function getPriceId(tierId: string, isAnnual: boolean): string | undefined {
  if (tierId.includes('Token')) {
    // Quick token lookup
    if (tierId.includes('10K')) return process.env.STRIPE_PRICE_TOKEN_10K;
    if (tierId.includes('5K')) return process.env.STRIPE_PRICE_TOKEN_5K;
    return process.env.STRIPE_PRICE_TOKEN_1K;
  }

  const key = `STRIPE_PRICE_${tierId.toUpperCase().replace(' ', '_')}_${isAnnual ? 'ANNUAL' : 'MONTHLY'}`;
  console.log(`Looking up price for key: ${key}`);
  return process.env[key] || PRICE_MAPPING[key];
}

// 1. SESSION ACTION: For new subscriptions (Professional/Enterprise) or One-Time Tokens
export async function createCheckoutSession(priceIdOrTierId: string, isAnnual: boolean, mode: 'subscription' | 'payment' = 'subscription') {
  let priceId = '';

  if (priceIdOrTierId.startsWith('price_')) {
    priceId = priceIdOrTierId;
  } else {
    // ... (lookup logic)
    const lookupId = getPriceId(priceIdOrTierId, isAnnual);
    if (!lookupId) {
      // Fallback for Tokens if not in env (For now using placeholders or relying on passed ID)
      console.error(`No price ID found for: ${priceIdOrTierId}`);
      throw new Error("Pricing configuration error. Please contact support.");
    }
    priceId = lookupId;
  }

  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: mode,
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
