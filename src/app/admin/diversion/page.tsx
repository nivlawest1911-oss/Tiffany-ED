'use client';
export default function AdminDiversionHub() {
  const diversionData = [
    { school: 'CLC North', incidents: 42, diverted: 38, rate: '90%' },
    { school: 'CLC South', incidents: 28, diverted: 25, rate: '89%' },
    { school: 'District West', incidents: 55, diverted: 49, rate: '89%' }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px', background: '#000' }}>
      <h2 className="gradient-text">Suspension Diversion & Cognitive Growth</h2>
      <p style={{ color: '#888' }}>Tracking the transition from punitive measures to Cognitive Fitness.</p>
      
      <div style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: '#0070f3', borderBottom: '2px solid #222' }}>
              <th style={{ padding: '15px' }}>Location</th>
              <th style={{ padding: '15px' }}>Incidents</th>
              <th style={{ padding: '15px' }}>Diverted to Fitness</th>
              <th style={{ padding: '15px' }}>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {diversionData.map((d) => (
              <tr key={d.school} style={{ borderBottom: '1px solid #111', color: '#aaa' }}>
                <td style={{ padding: '15px' }}>{d.school}</td>
                <td style={{ padding: '15px' }}>{d.incidents}</td>
                <td style={{ padding: '15px', color: '#00d1b2' }}>{d.diverted}</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{d.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card" style={{ marginTop: '30px', padding: '20px', background: 'rgba(212,175,55,0.05)' }}>
        <h4 style={{ color: '#d4af37', margin: 0 }}>Strategic ROI Insight</h4>
        <p style={{ fontSize: '0.9rem' }}>
          Diversion from suspension has saved the district an estimated **$14,200** in alternative placement costs this month.
        </p>
      </div>
    </div>
  );
}
