'use client';
export default function ImpactDashboard() {
  const metrics = [
    { label: 'Suspension Reduction', value: '82%', detail: 'Since Cognitive Fitness Implementation' },
    { label: 'Literacy Gain', value: '+3.4 Grades', detail: 'Avg student improvement in 6 months' },
    { label: 'Staff Retention', value: '95%', detail: 'Reduction in burnout-related resignations' }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px', border: '1px solid #00d1b2' }}>
      <h2 className="gradient-text">The Catalyst Impact: Justice & Literacy</h2>
      <p style={{ color: '#888' }}>Tracking the elimination of the suspension-to-prison pipeline.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {metrics.map(m => (
          <div key={m.label} style={{ textAlign: 'center', padding: '20px', background: 'rgba(0,209,178,0.05)', borderRadius: '15px' }}>
            <h4 style={{ margin: 0, color: '#00d1b2' }}>{m.label}</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' }}>{m.value}</div>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
