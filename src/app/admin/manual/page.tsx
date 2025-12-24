'use client';
export default function TrainingManual() {
  const sections = [
    { title: 'The Cognitive Catalyst', content: 'How to use Neural Hooks to bypass learning resistance.' },
    { title: 'The EQ Sentry', content: 'Recognizing interaction friction before a crisis occurs.' },
    { title: 'The Sovereign Leader', content: 'Using data to advocate for restorative district funding.' }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px', background: '#050505' }}>
      <h1 className="gradient-text">CLC Operational Manual</h1>
      <p style={{ color: '#888' }}>Confidential: District Sovereign Tier Only</p>
      
      <div style={{ marginTop: '30px' }}>
        {sections.map(s => (
          <details key={s.title} style={{ marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
            <summary style={{ fontSize: '1.2rem', color: '#d4af37', cursor: 'pointer', fontWeight: 'bold' }}>
              {s.title}
            </div>
            <p style={{ padding: '15px', color: '#aaa' }}>{s.content}</p>
          </details>
        ))}
      </div>
      
      <button className="primary-btn" style={{ marginTop: '30px' }}>Download PDF Version</button>
    </div>
  );
}
