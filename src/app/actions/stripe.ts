export const handleCheckout = async (priceId: string) => {
  // Define stripeLinks with an explicit index signature [key: string]: string
  const stripeLinks: Record<string, string> = {
    specialist: 'https://buy.stripe.com/test_specialist_link',
    practitioner: 'https://buy.stripe.com/test_practitioner_link',
  };

  // Safe access with fallback to satisfy 'noImplicitAny'
  const targetLink = stripeLinks[priceId] || '/pricing';
  
  if (typeof window !== 'undefined') {
    window.location.href = targetLink;
  }
};
