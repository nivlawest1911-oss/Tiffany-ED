'use client';
export default function VisionPage() {
  return (
    <div style={{ padding: '60px 20px', background: '#000', color: '#fff', maxWidth: '800px', margin: 'auto', lineHeight: '1.8' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', textAlign: 'center' }}>The Sovereign Vision</h1>
      <p style={{ fontSize: '1.2rem', color: '#d4af37', textAlign: 'center', marginBottom: '40px' }}>
        "Literacy is the ultimate de-escalation tool."
      </p>
      <section>
        <p>EdIntel (Tiffany-ED) was born from a simple truth: Behavioral outbursts are often cries for cognitive support. When a student cannot read, they cannot regulate. When a teacher is buried in paperwork, they cannot mentor.</p>
        <p>Our platform uses AI as a <strong>Cognitive Catalyst</strong> to bridge the gap between where a student is and where they need to be, ensuring that every interaction leads to growth rather than incarceration.</p>
      </section>
      <div className="glass-card" style={{ marginTop: '50px', padding: '30px', textAlign: 'center' }}>
        <h3>Join the Mission</h3>
        <p style={{ color: '#888' }}>Ready to bring Cognitive Sovereignty to your district?</p>
        <button className="primary-btn">Schedule a Strategic Briefing</button>
      </div>
    </div>
  );
}
