'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/archive?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    automatic_tax: { enabled: true },
    customer_update: { address: 'auto' },
  });

  redirect(session.url!);
}

export async function createPortalSession() {
  const user = await stripe.customers.list({
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    limit: 1,
  });

  if (!user.data[0]) return;

  const session = await stripe.billingPortal.sessions.create({
    customer: user.data[0].id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/archive`,
  });

  redirect(session.url);
}
