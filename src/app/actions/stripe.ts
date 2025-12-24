'use client';

export async function createCheckoutSession(priceId: string) {
  // In a real production environment, this calls your backend 
  // to generate a Stripe Checkout URL
  console.log(`[Stripe] Initializing secure portal for: ${priceId}`);
  
  // Example of redirecting to your Stripe Payment Link
  const stripeLinks = {
    'specialist': 'https://buy.stripe.com/test_51...your_link',
    'practitioner': 'https://buy.stripe.com/test_51...your_link',
  };

  window.location.href = stripeLinks[priceId] || '/pricing';
}
