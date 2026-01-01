'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// 1. SESSION ACTION: For new subscriptions (Professional/Enterprise)
export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: \\/archive?session_id={CHECKOUT_SESSION_ID}\,
    cancel_url: \\/pricing\,
    automatic_tax: { enabled: true }, 
    customer_update: { address: 'auto' },
  });

  redirect(session.url!);
}

// 2. PORTAL ACTION: For existing users to manage billing/invoices
export async function createPortalSession() {
  // We look up the customer by the Admin/User email stored in environment
  const user = await stripe.customers.list({
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL, 
    limit: 1,
  });

  if (!user.data[0]) {
    console.error("No Stripe customer found for this email.");
    return;
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.data[0].id,
    return_url: \\/archive\,
  });

  redirect(session.url);
}
