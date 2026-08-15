import Stripe from 'stripe';
import { priceIdToTier, checkoutTierMetadata, normalizeTierId } from '@/lib/rbac-stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', {
  // Keep flexible for Stripe SDK version drift during build
  apiVersion: (process.env.STRIPE_API_VERSION as any) || '2024-11-20.acacia',
  typescript: true,
});

export const PRICING_PLANS = {
  starter: {
    name: 'EdIntel Starter',
    sku: 'novice_educator',
    price: 0,
    priceId: null as string | null,
    tierId: 'sovereign-initiate' as const,
    description: 'Basic AI tools for individual teachers exploring AI.',
    features: [
      'Basic Chat Agents',
      '5 AI Lesson Plans / mo',
      '1GB Secure Storage',
      'Standard AI Model (Flash)',
      'Community Support',
    ],
    metadata: {
      ai_model: 'Standard',
      lesson_plans: '5',
      agents: 'Basic',
    },
  },
  pro: {
    name: 'School Site Pro',
    sku: 'school_site_license',
    price: 79.0,
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_school_site_pro_79',
    tierId: 'director-pack' as const,
    description:
      'Complete Site License for Mobile County Schools. Includes 30-Day Full Access Trial.',
    features: [
      'Unlimited Teacher Accounts',
      'Full Agent Access (IEP, Grader, Behavior)',
      'Unlimited AI Lesson Plans',
      'Priority District Support',
      'FERPA/COPPA Compliant',
      'Advanced Model (GPT-4/Gemini Pro)',
    ],
    metadata: {
      ai_model: 'Advanced',
      license_type: 'Site License',
      trial: '30 Days',
      district: 'Mobile County Schools',
    },
  },
  campus: {
    name: 'EdIntel Campus',
    sku: 'district_admin',
    price: 'Custom' as const,
    priceId: process.env.STRIPE_CAMPUS_PRICE_ID || 'price_campus_custom',
    tierId: 'site-command' as const,
    description: 'For Multi-School Deployments. Includes Central Dashboard.',
    features: [
      'Volume Pricing ($15/seat for 10+)',
      'SSO Enabled',
      'Admin Analytics Dashboard',
      'FERPA/COPPA Compliance Signed',
      'Priority Support',
    ],
    metadata: {
      sso: 'Enabled',
      admin_dashboard: 'Enabled',
      privacy_compliance: 'FERPA/COPPA',
    },
  },
  token_tiers: {
    starter: {
      name: 'Token Refill: Starter',
      price: 12.0,
      amount: 1000,
      priceId: process.env.STRIPE_TOKEN_STARTER_ID || 'price_token_1k_12',
      description: '1,000 Tokens for essential tasks.',
    },
    pro: {
      name: 'Token Refill: Growth',
      price: 49.0,
      amount: 5000,
      priceId: process.env.STRIPE_TOKEN_GROWTH_ID || 'price_token_5k_49',
      description: '5,000 Tokens for heavy media generation.',
    },
    elite: {
      name: 'Token Refill: Elite',
      price: 99.0,
      amount: 15000,
      priceId: process.env.STRIPE_TOKEN_ELITE_ID || 'price_token_15k_99',
      description: '15,000 Tokens for district-wide usage.',
    },
  },
};

function resolveCheckoutTierId(priceId: string, explicit?: string) {
  if (explicit) return normalizeTierId(explicit);
  return priceIdToTier(priceId) || normalizeTierId('director-pack');
}

/** Subscription checkout with RBAC tier metadata for webhooks */
export async function createCheckoutSession(
  priceId: string,
  userId: string,
  successUrl: string,
  cancelUrl: string,
  opts?: { tierId?: string; customerEmail?: string }
) {
  if (!priceId) throw new Error('priceId is required');
  if (!userId) throw new Error('userId is required');

  const tierId = resolveCheckoutTierId(priceId, opts?.tierId);
  const tierMeta = checkoutTierMetadata(userId, tierId);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 30,
      metadata: {
        ...tierMeta,
        source: 'EdIntel Site License',
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    consent_collection: {
      terms_of_service: 'required',
    },
    phone_number_collection: {
      enabled: true,
    },
    allow_promotion_codes: true,
    client_reference_id: userId,
    customer_email: opts?.customerEmail,
    metadata: {
      ...tierMeta,
      environment: process.env.NODE_ENV || 'development',
      source: 'EdIntel Professional App',
      district_target: 'Mobile County Schools',
    },
  });

  return session;
}

export async function createTopupSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!priceId) throw new Error('priceId is required');
  if (!userId) throw new Error('userId is required');

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
      orgId: userId,
      type: 'token_topup',
      source: 'Quantum Studio Token Wallet',
    },
  });

  return session;
}

export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  if (!customerId) throw new Error('customerId is required');
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session;
}

export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

export async function getSubscriptionStatus(customerId: string) {
  if (!customerId) return null;
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });
  return subscriptions.data[0] || null;
}

export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const itemId = subscription.items.data[0]?.id;
  if (!itemId) throw new Error('Subscription has no items');
  return await stripe.subscriptions.update(subscriptionId, {
    items: [{ id: itemId, price: newPriceId }],
    metadata: {
      ...subscription.metadata,
      tierId: priceIdToTier(newPriceId) || subscription.metadata?.tierId || '',
    },
  });
}
