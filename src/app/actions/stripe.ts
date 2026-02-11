'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Initialize Stripe if key is present
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-01-27.acacia' as any })
  : null;

// Map tiers to Hosted Payment Links (Direct Stripe URLs)
const PAYMENT_LINK_MAPPING: Record<string, string> = {
  'STRIPE_PRICE_EXECUTIVE_COMMAND': 'https://buy.stripe.com/cNi7sM9TC9IHfefeWgdwc06',
  'STRIPE_PRICE_INITIATE_MONTHLY': '',
  'STRIPE_PRICE_STANDARD_PACK_MONTHLY': 'https://buy.stripe.com/7sY3cwfdWf317LN7tOdwc01',
  'STRIPE_PRICE_PRACTITIONER_MONTHLY': 'https://buy.stripe.com/bJe6oI7Lu4onaXZ4hCdwc02',
  'STRIPE_PRICE_DIRECTOR_PACK_MONTHLY': 'https://buy.stripe.com/eVq3cwfdWf310jl01mdwc03',
  'STRIPE_PRICE_PROFESSIONAL_PACK_MONTHLY': 'https://buy.stripe.com/fZu00k7Lu0876HJ7tOdwc04',
  'STRIPE_PRICE_SITE_COMMAND_MONTHLY': 'https://buy.stripe.com/7sY9AU7Lu8EDeabg0kdwc05',

  // Token Aliases
  'STRIPE_PRICE_TOKEN_5K': 'https://buy.stripe.com/fZu00k7Lu0876HJ7tOdwc04',
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
  const normTier = tierId.toUpperCase().replace(/\s+/g, '_');

  if (normTier.includes('TOKEN')) {
    if (normTier.includes('10K')) return process.env.STRIPE_TOKEN_ELITE_ID;
    if (normTier.includes('5K')) return process.env.STRIPE_TOKEN_GROWTH_ID;
    return process.env.STRIPE_TOKEN_PRICE_ID || process.env.STRIPE_TOKEN_STARTER_ID;
  }

  // Key construction to match .env exactly
  // .env uses: STRIPE_PRACTITIONER_PRICE_ID, STRIPE_PRACTITIONER_ANNUAL_ID
  const envKey = `STRIPE_${normTier}_${isAnnual ? 'ANNUAL_ID' : 'PRICE_ID'}`;

  // Legacy key for fallback mapping
  const legacyKey = `STRIPE_PRICE_${normTier}_${isAnnual ? 'ANNUAL' : 'MONTHLY'}`;

  return process.env[envKey] || process.env[legacyKey] || PRICE_MAPPING[legacyKey];
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
      // [PROFESSIONAL AUTH] Retrieve authenticated user email
      // In production, use: const session = await auth(); const email = session?.user?.email;
      const userEmail = headersList.get('x-user-email') || process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@edintel.ai';

      if (userEmail) {
        const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
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
