'use client';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const tiers = [
    {
      id: 'specialist',
      name: 'Individual Specialist',
      price: billingCycle === 'monthly' ? '19' : '180',
      stripeId: 'price_specialist_monthly', // REPLACE WITH YOUR ACTUAL STRIPE ID
      desc: 'Optimized for the solo educator or clinician.',
      features: ['Personal IEP Architect', 'Voice Dictation Mode', 'Circadian Vision Shield', '100k Token Reservoir'],
      color: '#0070f3'
    },
    {
      id: 'practitioner',
      name: 'Clinical Practitioner',
      price: billingCycle === 'monthly' ? '39' : '390',
      stripeId: 'price_practitioner_monthly', // REPLACE WITH YOUR ACTUAL STRIPE ID
      desc: 'For lead coaches managing multiple profiles.',
      features: ['30 Student Neural Profiles', 'Cognitive Coach AI', 'District ROI Export', '250k Token Reservoir'],
      color: '#d4af37'
    },
    {
      id: 'sovereign',
      name: 'Sovereign District',
      price: 'Custom',
      stripeId: 'price_sovereign_enterprise',
      desc: 'Infrastructure-level governance for full districts.',
      features: ['SB 101 Compliance Guard', 'Board Oversight Hub', 'Whitelabel Domain', 'Infinite Scaling'],
      color: '#00d1b2'
    }
  ];

  return (
    <div style={{ padding: '60px 20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>Intelligence Subscriptions</h1>
        <p style={{ color: '#888', maxWidth: '600px', margin: 'auto' }}>
          Select the tier that aligns with your professional or district-wide cognitive goals.
        </p>

        <div style={{ marginTop: '30px', display: 'inline-flex', background: '#111', padding: '5px', borderRadius: '30px' }}>
          <button onClick={() => setBillingCycle('monthly')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: billingCycle === 'monthly' ? '#0070f3' : 'transparent', color: '#fff' }}>Monthly</button>
          <button onClick={() => setBillingCycle('annual')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: billingCycle === 'annual' ? '#0070f3' : 'transparent', color: '#fff' }}>Annual (Save 20%)</button>
        </div>
      </header>

      <div className="bento-grid" style={{ maxWidth: '1200px', margin: 'auto' }}>
        {tiers.map((tier) => (
          <div key={tier.id} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${tier.color}` }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{tier.name}</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>{tier.desc}</p>
            
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '30px' }}>
              {tier.price !== 'Custom' && '$'}{tier.price}
              <span style={{ fontSize: '1rem', color: '#444' }}>{tier.price !== 'Custom' ? (billingCycle === 'monthly' ? '/mo' : '/yr') : ''}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, flexGrow: 1, marginBottom: '40px' }}>
              {tier.features.map(f => (
                <li key={f} style={{ marginBottom: '12px', color: '#aaa', fontSize: '0.95rem' }}>✓ {f}</li>
              ))}
            </ul>

            <button 
              style={{ 
                background: tier.color, color: '#000', fontWeight: 'bold', 
                padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer' 
              }}
              onClick={() => window.location.href = `/api/checkout?priceId=${tier.stripeId}`}
            >
              {tier.id === 'sovereign' ? 'Contact Executive Sales' : 'Activate Intelligence'}
            </button>
          </div>
        ))}
      </div>
      
      <footer style={{ textAlign: 'center', marginTop: '60px', opacity: 0.5 }}>
        <p>Payments secured by Stripe. District-wide billing available via invoice.</p>
      </footer>
    </div>
  );
}
