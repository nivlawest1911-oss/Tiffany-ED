'use client';
import { useState, useEffect } from 'react';

export default function DistrictROI() {
  const [savings, setSavings] = useState({ hours: 0, dollars: 0 });

  useEffect(() => {
    // Logic: Every IEP Architect use saves 4 hours of staff time
    // Average Special Ed teacher hourly rate: $45
    const auditCount = parseInt(localStorage.getItem('iep_audit_count') || '0');
    setSavings({
      hours: auditCount * 4,
      dollars: auditCount * 4 * 45
    });
  }, []);

  return (
    <div className="glass-card" style={{ padding: '40px', marginTop: '20px' }}>
      <h2 className="gradient-text">District Efficiency Report</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888' }}>Administrative Hours Saved</p>
          <h3 style={{ fontSize: '2.5rem', color: '#00d1b2' }}>{savings.hours} hrs</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888' }}>Budgetary Reallocation</p>
          <h3 style={{ fontSize: '2.5rem', color: '#d4af37' }}>${savings.dollars}</h3>
        </div>
      </div>
      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
        <p style={{ fontSize: '0.9rem', color: '#666 italic' }}>
          *Data represents AI-assisted drafting efficiency for the Continuous Learning Center.
        </p>
      </div>
    </div>
  );
}
