'use client';
import { createCheckoutSession } from '@/app/actions/stripe';

export default function PricingSovereign() {
  const tiers = [
    { id: 'specialist', name: 'Individual Specialist', price: '$19', desc: 'Optimize your own IEP workflow.' },
    { id: 'practitioner', name: 'Clinical Practitioner', price: '$39', desc: 'Manage up to 30 neural student profiles.' },
    { id: 'sovereign', name: 'District Sovereign', price: 'Contact', desc: 'Full district-wide compliance governance.' }
  ];

  return (
    <div style={{ padding: '60px 20px', background: '#000', minHeight: '100vh' }}>
      <h1 className="gradient-text" style={{ textAlign: 'center', fontSize: '3rem' }}>Service Monetization Portal</h1>
      <div className="bento-grid" style={{ marginTop: '40px' }}>
        {tiers.map(tier => (
          <div key={tier.id} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
            <h2>{tier.name}</h2>
            <div style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 'bold' }}>{tier.price}</div>
            <p style={{ color: '#888', flexGrow: 1 }}>{tier.desc}</p>
            <button 
              onClick={() => createCheckoutSession(tier.id)}
              className="primary-btn" 
              style={{ background: tier.id === 'sovereign' ? '#444' : '#0070f3' }}
            >
              {tier.id === 'sovereign' ? 'Request Consultation' : 'Start Subscription'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
