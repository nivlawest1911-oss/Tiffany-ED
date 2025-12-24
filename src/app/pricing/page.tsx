'use client';
import { useState } from 'react';

export default function PricingSwitch() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [view, setView] = useState('individual'); // 'individual' or 'district'

  const plans = {
    individual: [
      { name: 'Specialist', price: isAnnual ? 19 : 25, tokens: '100k', feat: ['Personal IEP Architect', 'Fitness Library', 'Voice Interaction'] },
      { name: 'Practitioner', price: isAnnual ? 39 : 49, tokens: '250k', feat: ['30 Student Neural Profiles', 'Cognitive Coach', 'Custom Prompt Vault'] }
    ],
    district: [
      { name: 'Sovereign District', price: 'Custom', tokens: 'Unlimited', feat: ['SB 101 Compliance Guard', 'Board ROI Reporting', 'Executive Vault'] }
    ]
  };

  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem' }}>Optimized Cognitive Access</h2>
        <div style={{ marginTop: '20px', display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '30px' }}>
          <button onClick={() => setView('individual')} style={{ padding: '10px 20px', borderRadius: '25px', border: 'none', background: view === 'individual' ? '#0070f3' : 'transparent', color: '#fff' }}>Individual</button>
          <button onClick={() => setView('district')} style={{ padding: '10px 20px', borderRadius: '25px', border: 'none', background: view === 'district' ? '#0070f3' : 'transparent', color: '#fff' }}>District</button>
        </div>
      </div>

      <div className="bento-grid">
        {plans[view].map((plan) => (
          <div key={plan.name} className="glass-card" style={{ padding: '30px', position: 'relative' }}>
            {plan.name === 'Practitioner' && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#d4af37', color: '#000', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px' }}>MOST POPULAR</div>}
            <h3>{plan.name}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              ${plan.price}<span style={{ fontSize: '1rem', color: '#555' }}>/mo</span>
            </div>
            <p style={{ color: '#0070f3', fontSize: '0.8rem' }}>{plan.tokens} Token Reservoir</p>
            <ul style={{ padding: '20px 0', listStyle: 'none', fontSize: '0.9rem', color: '#aaa' }}>
              {plan.feat.map(f => <li key={f} style={{ marginBottom: '10px' }}>✓ {f}</li>)}
            </ul>
            <button className="primary-btn" style={{ width: '100%' }}>Activate Intelligence</button>
          </div>
        ))}
      </div>
    </div>
  );
}
