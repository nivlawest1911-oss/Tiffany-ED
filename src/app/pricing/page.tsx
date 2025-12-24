'use client';
import { createCheckoutSession } from '@/app/actions/stripe';

const tiers = [
  {
    name: 'Community',
    price: 'Free',
    description: 'Empowering Parents and individual Teachers in Whistler & Prichard.',
    features: ['5 Strategic Audits / mo', 'Alabama Standards Logic'],
    priceId: null
  },
  {
    name: 'Professional',
    price: '',
    description: 'Advanced compliance intelligence for Administrators and Support Staff.',
    features: ['Unlimited Audits', 'Secure Archive Access', 'Executive PDF Memos'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    popular: true
  },
  {
    name: 'Global Enterprise',
    price: 'Custom',
    description: 'Strategic oversight for District and State Leaders across all 50 States.',
    features: ['District Resource Mapping', 'Custom Fine-Tuned Persona', 'Board-Ready Reporting'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE
  }
];

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem' }}>Global Strategic Scaling</h1>
        <p style={{ color: '#888' }}>Select your tier of District Intelligence.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: 'auto' }}>
        {tiers.map((tier) => (
          <div key={tier.name} className="glass-card" style={{ padding: '40px' }}>
            <h2>{tier.name}</h2>
            <div style={{ fontSize: '3rem', margin: '20px 0' }}>{tier.price}</div>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>{tier.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
              {tier.features.map(f => <li key={f} style={{ marginBottom: '10px' }}>? {f}</li>)}
            </ul>
            <button 
              onClick={() => tier.priceId && createCheckoutSession(tier.priceId)}
              className="primary-btn" 
              style={{ width: '100%' }}
            >
              {tier.price === 'Custom' ? 'Contact Sales' : \Activate \\}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
