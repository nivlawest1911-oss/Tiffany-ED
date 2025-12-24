'use client';
export default function ROIDashboard() {
  const stats = [
    { label: 'Staff Hours Saved', value: '420 hrs', sub: 'Per Month Across District' },
    { label: 'Compliance Accuracy', value: '99.8%', sub: 'SB 101 Strategic Alignment' },
    { label: 'Operational ROI', value: '$12,400', sub: 'Estimated Monthly Value' }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h2 className="gradient-text">District Oversight & ROI Intelligence</h2>
      <div className="bento-grid" style={{ marginBottom: '30px' }}>
        {stats.map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#888', marginBottom: '10px' }}>{s.label}</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0070f3' }}>{s.value}</div>
            <p style={{ fontSize: '0.8rem', color: '#555' }}>{s.sub}</p>
          </div>
        ))}
      </div>
      
      <div className="glass-card" style={{ padding: '30px' }}>
        <h3>Efficiency Progression (AI Integration)</h3>
        <div style={{ height: '300px', width: '100%', background: 'linear-gradient(transparent 90%, rgba(0,112,243,0.1) 100%)', display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '20px' }}>
          {[40, 65, 55, 85, 95, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'rgba(0,112,243,0.6)', borderRadius: '5px 5px 0 0' }}></div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#666', fontSize: '0.8rem' }}>
          <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan (Proj)</span>
        </div>
      </div>
    </div>
  );
}
