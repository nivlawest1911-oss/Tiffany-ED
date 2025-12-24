'use client';
export default function HolisticProfile() {
  const metrics = [
    { label: 'Literacy Progression', value: '88%', trend: '+4%', status: 'Advanced' },
    { label: 'Emotional Regulation', value: '72%', trend: '-2%', status: 'Stable' },
    { label: 'Cognitive Fitness', value: 'Level 14', trend: '+1', status: 'Rising' }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Student Neural Architect</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '30px' }}>
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3>Core Bio-Metrics</h3>
          {metrics.map(m => (
            <div key={m.label} style={{ marginBottom: '20px' }}>
              <p style={{ color: '#888', margin: 0 }}>{m.label}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{m.value}</span>
                <span style={{ color: m.trend.includes('+') ? '#00d1b2' : '#ff3860' }}>{m.trend}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3>Predictive Success Timeline</h3>
          <div style={{ height: '200px', borderLeft: '2px solid #0070f3', marginLeft: '20px', paddingLeft: '20px' }}>
            <div style={{ marginBottom: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-27px', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: '#0070f3' }}></div>
              <p><strong>Current:</strong> Foundational Literacy Mastery</p>
            </div>
            <div style={{ opacity: 0.5 }}>
              <p><strong>Predicted (3 Months):</strong> Independent Strategic Auditing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
