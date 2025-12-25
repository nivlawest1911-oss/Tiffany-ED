'use client';

export default function FitnessGrowthMap() {
  const data = [
    { area: 'Cognitive', score: 82, trend: '+5%', color: '#0070f3' },
    { area: 'Emotional', score: 74, trend: '+12%', color: '#00d1b2' },
    { area: 'Leadership', score: 91, trend: '+2%', color: '#d4af37' }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px', border: '1px solid #333' }}>
      <h3 className="gradient-text">District Tri-Intelligence Growth Map</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        {data.map(d => (
          <div key={d.area} style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '100px', height: '100px', borderRadius: '50%', 
              border: `4px solid ${d.color}`, display: 'flex', 
              alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' 
            }}>
              {d.score}%
            </div>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{d.area}</p>
            <span style={{ color: '#00d1b2', fontSize: '0.8rem' }}>{d.trend} Growth</span>
          </div>
        ))}
      </div>
    </div>
  );
}
