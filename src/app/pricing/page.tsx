'use client';
import React from 'react';

const tiers = [
  {
    name: 'Community',
    price: 'Free',
    description: 'Empowering Parents and individual Teachers in Whistler & Prichard.',
    features: ['5 Strategic Audits / mo', 'Alabama Standards Logic', 'Basic PDF Export'],
    color: '#888'
  },
  {
    name: 'Professional',
    price: '',
    description: 'Advanced compliance intelligence for Administrators and Support Staff.',
    features: ['Unlimited Audits', 'Secure Archive Access', 'Executive PDF Memos', 'Priority Support'],
    color: '#0070f3',
    popular: true
  },
  {
    name: 'Global Enterprise',
    price: 'Custom',
    description: 'Strategic oversight for District and State Leaders across all 50 States.',
    features: ['Multi-User Licenses', 'District Resource Mapping', 'Custom Fine-Tuned Persona', 'Board-Ready Reporting'],
    color: '#7000ff'
  }
];

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', background: 'linear-gradient(to right, #0070f3, #7000ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Strategic Scaling
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#888' }}>Select your tier of District Intelligence.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: 'auto' }}>
        {tiers.map((tier) => (
          <div key={tier.name} style={{ padding: '40px', borderRadius: '30px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(15px)' }}>
            {tier.popular && <div style={{ color: '#0070f3', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '10px' }}>RECOMMENDED</div>}
            <h2>{tier.name}</h2>
            <div style={{ fontSize: '3rem', margin: '20px 0' }}>{tier.price}</div>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>{tier.description}</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {tier.features.map(f => <li key={f} style={{ marginBottom: '10px' }}>? {f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
