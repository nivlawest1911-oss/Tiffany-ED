'use client';
import { useState } from 'react';

export default function PricingIntelligence() {
  const [studentCount, setStudentCount] = useState(500);
  
  // Logic: 1 student = 12 hours of annual compliance labor. 
  // AI deflects 65% of that labor.
  const hoursSaved = Math.floor(studentCount * 12 * 0.65);
  const laborValue = (hoursSaved * 48).toLocaleString(); // $48/hr loaded rate

  return (
    <div style={{ padding: '60px 20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem' }}>Global Scaling & Token Sovereignty</h1>
        <p style={{ color: '#888', maxWidth: '700px', margin: 'auto' }}>
          Transitioning District Infrastructure from an Expense Center to an Intelligence Utility.
        </p>
      </header>

      {/* ROI DYNAMIC PROJECTOR */}
      <div className="glass-card" style={{ padding: '40px', marginBottom: '60px', border: '1px solid #d4af37' }}>
        <h3 style={{ color: '#d4af37' }}>District ROI Calculator</h3>
        <p style={{ color: '#666' }}>Adjust student population to see Labor Deflection value:</p>
        <input 
          type="range" min="100" max="10000" step="100" 
          value={studentCount} 
          onChange={(e) => setStudentCount(parseInt(e.target.value))}
          style={{ width: '100%', margin: '30px 0', accentColor: '#d4af37' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <p style={{ color: '#888', margin: 0 }}>Projected Labor Hours Recovered</p>
            <h2 style={{ fontSize: '2.5rem' }}>{hoursSaved.toLocaleString()} hrs</h2>
          </div>
          <div>
            <p style={{ color: '#888', margin: 0 }}>Annual Budgetary Reallocation</p>
            <h2 style={{ fontSize: '2.5rem', color: '#00d1b2' }}>${laborValue}</h2>
          </div>
        </div>
      </div>

      <div className="bento-grid">
        <div className="glass-card" style={{ padding: '30px', borderTop: '4px solid #444' }}>
          <h3>Pilot Tier</h3>
          <p style={{ color: '#888' }}>Single-site implementation for the CLC.</p>
          <div style={{ fontSize: '2rem', margin: '20px 0' }}>$499<span style={{fontSize: '1rem'}}> /mo</span></div>
          <ul style={{ color: '#aaa', paddingLeft: '20px' }}>
            <li>IEP Strategic Architect</li>
            <li>SB 101 Compliance Guard</li>
            <li>Trail Mode (Offline Cache)</li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '30px', borderTop: '4px solid #0070f3' }}>
          <h3 style={{ color: '#0070f3' }}>Sovereign District</h3>
          <p style={{ color: '#888' }}>Full governance for multi-school districts.</p>
          <div style={{ fontSize: '2rem', margin: '20px 0' }}>$2,850<span style={{fontSize: '1rem'}}> /mo</span></div>
          <ul style={{ color: '#aaa', paddingLeft: '20px' }}>
            <li>Everything in Pilot</li>
            <li>Student Neural Profiles</li>
            <li>Executive ROI Dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
