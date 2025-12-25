export const handleCheckout = async (priceId: string) => {
  const stripeLinks: Record<string, string> = {
    specialist: 'https://buy.stripe.com/test_specialist_link',
    practitioner: 'https://buy.stripe.com/test_practitioner_link',
  };
  const targetLink = stripeLinks[priceId] || '/pricing';
  if (typeof window !== 'undefined') { window.location.href = targetLink; }
};
