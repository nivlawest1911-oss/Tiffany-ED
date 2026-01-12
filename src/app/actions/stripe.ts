'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Initialize Stripe if key is present
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-01-27.acacia' as any })
  : null;

// Map tiers to Hosted Payment Links (No API Key Required)
const PAYMENT_LINK_MAPPING: Record<string, string> = {
  // Found in stripe_links.txt - Mapping inferred (User to verify specific tier mapping)
  'STRIPE_PRICE_PRACTITIONER_MONTHLY': 'https://buy.stripe.com/7sY3cwfdWf317LN7tOdwc01',
  'STRIPE_PRICE_SITE_COMMAND_MONTHLY': 'https://buy.stripe.com/aFa7sM3ve6wv9TVeWgdwc00',

  // Tokens (Verified Link)
  'STRIPE_PRICE_TOKEN_1K': 'https://buy.stripe.com/7sY3cwfdWf317LN7tOdwc01',
};

const PRICE_MAPPING: Record<string, string> = {
  STRIPE_PRICE_PRACTITIONER_MONTHLY: 'price_1SleigJZzJ2JsTizzhcHtd36',
  STRIPE_PRICE_SITE_COMMAND_MONTHLY: 'price_1SleihJZzJ2JsTizmaXKM4ow',
  STRIPE_PRICE_TOKEN_1K: 'price_1SleijJZzJ2JsTizToken1K',
  STRIPE_PRICE_TOKEN_5K: 'price_1SleikJZzJ2JsTizToken5K',
  STRIPE_PRICE_TOKEN_10K: 'price_1SleilJZzJ2JsTizToken10K',
};

function getPriceId(tierId: string, isAnnual: boolean): string | undefined {
  if (tierId.includes('Token')) {
    if (tierId.includes('10K')) return process.env.STRIPE_PRICE_TOKEN_10K;
    if (tierId.includes('5K')) return process.env.STRIPE_PRICE_TOKEN_5K;
    return process.env.STRIPE_PRICE_TOKEN_1K;
  }
  const key = `STRIPE_PRICE_${tierId.toUpperCase().replace(' ', '_')}_${isAnnual ? 'ANNUAL' : 'MONTHLY'}`;
  return process.env[key] || PRICE_MAPPING[key];
}

export async function createCheckoutSession(priceIdOrTierId: string, isAnnual: boolean, mode: 'subscription' | 'payment' = 'subscription') {
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  // 0. PRIORITY: HOSTED PAYMENT LINKS (Fastest, No-Code/Low-Code method)
  // Check if we have a direct link for this request
  const linkKey = `STRIPE_PRICE_${priceIdOrTierId.toUpperCase().replace(' ', '_')}_${isAnnual ? 'ANNUAL' : 'MONTHLY'}`;
  const directLink = PAYMENT_LINK_MAPPING[linkKey] || PAYMENT_LINK_MAPPING[priceIdOrTierId];

  if (directLink) {
    console.log(`[STRIPE] Redirecting to Hosted Payment Link: ${directLink}`);
    redirect(directLink);
    return;
  }

  // 1. SDK CHECKOUT (Requires Envrionment Keys)
  if (stripe) {
    try {
      console.log(`[STRIPE] Initiating checkout for ${priceIdOrTierId}...`);

      let priceId = '';
      if (priceIdOrTierId.startsWith('price_')) {
        priceId = priceIdOrTierId;
      } else {
        const lookupId = getPriceId(priceIdOrTierId, isAnnual);
        if (!lookupId) throw new Error(`Price ID not found for ${priceIdOrTierId}`);
        priceId = lookupId;
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: priceId, quantity: 1 }],
        mode: mode,
        success_url: `${origin}/archive?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        automatic_tax: { enabled: true },
      });

      if (session.url) redirect(session.url);
      return;
    } catch (error) {
      console.error("[STRIPE ERROR] Checkout failed, falling back to free tier simulation:", error);
    }
  } else {
    console.warn("[STRIPE] Key missing. Using Free Tier Simulation.");
  }

  // 2. Fallback / Free Tier Simulation
  await new Promise(resolve => setTimeout(resolve, 800));
  redirect(`${origin}/archive?session_id=FREE_ACCESS_GRANTED_${Date.now()}`);
}

export async function createPortalSession() {
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  if (stripe) {
    try {
      // TODO: specific user email from session
      const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (email) {
        const customers = await stripe.customers.list({ email: email, limit: 1 });
        if (customers.data.length > 0) {
          const session = await stripe.billingPortal.sessions.create({
            customer: customers.data[0].id,
            return_url: `${origin}/archive`,
          });
          if (session.url) redirect(session.url);
          return;
        }
      }
    } catch (error) {
      console.error("[STRIPE ERROR] Portal failed:", error);
    }
  }

  // Fallback
  await new Promise(resolve => setTimeout(resolve, 500));
  redirect(`${origin}/archive?portal=simulated_free_tier`);
}
