'use client';
export default function RevenueCommandCenter() {
  const streams = [
    { source: 'Subscriptions', amount: '$4,200', trend: '+12%', color: '#0070f3' },
    { source: 'Token Refills', amount: '$850', trend: '+25%', color: '#d4af37' },
    { source: 'Grant Studio Unlocks', amount: '$1,200', trend: '+5%', color: '#00d1b2' },
    { source: 'Affiliate Payouts', amount: '-$450', trend: 'N/A', color: '#ff3860' }
  ];

  return (
    <div style={{ padding: '40px', background: '#000', color: '#fff' }}>
      <h2 className="gradient-text" style={{ fontSize: '2.5rem' }}>Revenue Command Center</h2>
      <div className="bento-grid" style={{ marginTop: '30px' }}>
        {streams.map(s => (
          <div key={s.source} className="glass-card" style={{ padding: '30px', borderLeft: `4px solid ${s.color}` }}>
            <p style={{ color: '#888', marginBottom: '10px' }}>{s.source}</p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{s.amount}</div>
            <span style={{ fontSize: '0.8rem', color: s.trend.includes('+') ? '#00d1b2' : '#ff3860' }}>
              {s.trend} from last month
            </span>
          </div>
        ))}
      </div>
      
      <div className="glass-card" style={{ marginTop: '40px', padding: '30px' }}>
        <h3>Strategic Growth Vector</h3>
        <p style={{ color: '#666' }}>Individual Specialist tier ($19) is currently outperforming District Sovereign by 3x in volume. Recommendation: Increase Affiliate bounty for individual referrals.</p>
      </div>
    </div>
  );
}
