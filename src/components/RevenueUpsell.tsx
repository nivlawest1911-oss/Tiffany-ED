'use client';
export default function RevenueUpsell() {
  return (
    <div className="glass-card" style={{ padding: '30px', border: '1px solid #d4af37', marginTop: '20px' }}>
      <h3 style={{ color: '#d4af37' }}>Elevate Your Intelligence</h3>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>You are currently at 85% Token Capacity.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <button className="primary-btn" style={{ fontSize: '0.8rem' }}>Refill Reservoir ($15)</button>
        <button className="primary-btn" style={{ fontSize: '0.8rem', background: '#d4af37', color: '#000' }}>Unlock Grant Studio ($49)</button>
      </div>
    </div>
  );
}
