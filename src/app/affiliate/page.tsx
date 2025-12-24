'use client';
import { useState, useEffect } from 'react';

export default function AffiliatePortal() {
  const [refLink, setRefLink] = useState('');
  const [stats, setStats] = useState({ clicks: 12, conversions: 2, earnings: 150 });

  useEffect(() => {
    // Generate a unique ID based on the user's CLC credentials
    const userId = "WEST-CLC-01"; // Placeholder for real Auth ID
    setRefLink(`https://edintelus.web.app/pricing?ref=${userId}`);
  }, []);

  return (
    <div className="glass-card" style={{ padding: '40px', marginTop: '30px', border: '1px solid #00d1b2' }}>
      <h2 className="gradient-text">Affiliate Sovereign Portal</h2>
      <p style={{ color: '#888' }}>Earn a 10% Governance Credit for every district you onboard.</p>
      
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', margin: '20px 0', border: '1px dashed #444' }}>
        <code style={{ color: '#00d1b2' }}>{refLink}</code>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>Strategic Clicks</p>
          <h3 style={{ margin: 0 }}>{stats.clicks}</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>District Conversions</p>
          <h3 style={{ margin: 0 }}>{stats.conversions}</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>Total Commissions</p>
          <h3 style={{ margin: 0, color: '#00d1b2' }}>${stats.earnings}</h3>
        </div>
      </div>
    </div>
  );
}
