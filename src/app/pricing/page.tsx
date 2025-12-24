'use client';
import { useState } from 'react';

export default function PricingIntelligence() {
  const [studentCount, setStudentCount] = useState(500);
  
  // Logic from our deep chat: 
  // Each student creates ~12 hours of IEP/Compliance paperwork per year.
  // AI reduces this by 60%.
  const hoursSaved = Math.floor(studentCount * 12 * 0.60);
  const dollarValue = (hoursSaved * 45).toLocaleString(); // $45/hr avg educator rate

  const tiers = [
    { name: 'Pilot (CLC)', price: '$499', focus: 'Single Site Intelligence', features: ['IEP Architect', 'SB 101 Guard', 'Trail Mode'] },
    { name: 'District Pro', price: '$2,499', focus: 'Multi-School Governance', features: ['Neural Achievement Dashboard', 'Board ROI Reports', 'Executive Vault'] },
    { name: 'State Sovereign', price: 'Custom', focus: 'Full Infrastructure Layer', features: ['WebGPU Spectral Shielding', 'Hardware Orchestration', '24/7 Priority Sync'] }
  ];

  return (
    <div style={{ padding: '60px 20px', background: '#000', color: '#fff' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Strategic Scaling Intelligence</h1>
        <p style={{ color: '#888' }}>Quantifying the Fiscal Impact of EdIntel Infrastructure</p>
      </header>

      {/* ROI CALCULATOR COMPONENT */}
      <div className="glass-card" style={{ padding: '40px', marginBottom: '50px', border: '1px solid #d4af37' }}>
        <h3>District ROI Projection</h3>
        <input 
          type="range" min="100" max="5000" step="100" 
          value={studentCount} 
          onChange={(e) => setStudentCount(parseInt(e.target.value))}
          style={{ width: '100%', margin: '20px 0' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p style={{ color: '#888' }}>Student Population</p>
            <h2 style={{ color: '#d4af37' }}>{studentCount} Students</h2>
          </div>
          <div>
            <p style={{ color: '#888' }}>Projected Annual Savings</p>
            <h2 style={{ color: '#00d1b2' }}>${dollarValue}</h2>
          </div>
        </div>
      </div>

      <div className="bento-grid">
        {tiers.map(tier => (
          <div key={tier.name} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '5px' }}>{tier.name}</h2>
            <p style={{ color: '#0070f3', fontSize: '0.9rem' }}>{tier.focus}</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>{tier.price}<span style={{fontSize: '1rem', color: '#444'}}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, flexGrow: 1 }}>
              {tier.features.map(f => <li key={f} style={{ color: '#aaa', marginBottom: '10px' }}>✓ {f}</li>)}
            </ul>
            <button className="primary-btn" style={{ marginTop: '20px' }}>Deploy Infrastructure</button>
          </div>
        ))}
      </div>
    </div>
  );
}
