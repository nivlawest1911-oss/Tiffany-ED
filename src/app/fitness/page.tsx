'use client';
export default function FitnessLibrary() {
  const strategies = [
    { title: 'The Circadian Shield', focus: 'Neurological Recovery', prompt: 'Audit my schedule for blue-light exposure...' },
    { title: 'Cognitive Load Reduction', focus: 'Executive Efficiency', prompt: 'Consolidate these 5 IEP data points into one narrative...' }
  ];
  return (
    <div style={{ padding: '40px' }}>
      <h2 className="gradient-text">Leadership Fitness Library</h2>
      <div className="bento-grid">
        {strategies.map(s => (
          <div key={s.title} className="glass-card" style={{ padding: '25px' }}>
            <span style={{ fontSize: '0.8rem', color: '#0070f3', fontWeight: 'bold' }}>{s.focus}</span>
            <h3 style={{ margin: '10px 0' }}>{s.title}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>{s.prompt}</p>
            <button className="primary-btn" style={{ fontSize: '0.8rem' }}>Activate Protocol</button>
          </div>
        ))}
      </div>
    </div>
  );
}
