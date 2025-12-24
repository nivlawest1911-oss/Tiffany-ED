'use client';
import React from 'react';

const tiers = [
  {
    name: 'Community',
    price: 'Free',
    description: 'Perfect for Parents and individual Teachers in Whistler & Prichard.',
    features: ['5 Strategic Audits / mo', 'Standard AI Twin Logic', 'Basic PDF Export', 'Community Support'],
    color: '#888'
  },
  {
    name: 'Professional',
    price: '',
    description: 'Enhanced intelligence for School Administrators and Personnel.',
    features: ['Unlimited Audits', 'Advanced Alabama Standards Logic', 'Executive PDF Memos', 'Priority Email Support', 'Access to Archive'],
    color: '#0070f3',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale deployment for District Leaders across the 50 States.',
    features: ['Multi-User Licenses', 'District Resource Mapping', 'Custom Philosophical Training', 'White-Glove Integration', '24/7 Strategic Support'],
    color: '#7000ff'
  }
];

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', background: 'linear-gradient(to right, #0070f3, #7000ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Global Strategic Scaling
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#888' }}>Select the tier of intelligence required for your district.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: 'auto' }}>
        {tiers.map((tier) => (
          <div key={tier.name} style={{ 
            padding: '40px', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.05)', 
            border: tier.popular ? '2px solid #0070f3' : '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)', transition: 'transform 0.3s ease'
          }}>
            {tier.popular && <span style={{ backgroundColor: '#0070f3', padding: '5px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>MOST POPULAR</span>}
            <h2 style={{ fontSize: '1.8rem', margin: '10px 0' }}>{tier.name}</h2>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>{tier.price}<span style={{ fontSize: '1rem', color: '#888' }}>{tier.price !== 'Custom' ? '/mo' : ''}</span></div>
            <p style={{ color: '#bbb', marginBottom: '30px', minHeight: '60px' }}>{tier.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
              {tier.features.map(f => <li key={f} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>? <span style={{ marginLeft: '10px' }}>{f}</span></li>)}
            </ul>
            <button style={{ 
              width: '100%', padding: '15px', borderRadius: '12px', border: 'none', 
              backgroundColor: tier.popular ? '#0070f3' : '#fff', color: tier.popular ? '#fff' : '#000',
              fontWeight: 'bold', cursor: 'pointer'
            }}>
              Activate {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
