'use client';
export default function ParentPortal() {
  const studentStats = { level: 14, streak: 8, literacyGain: '+22%', status: 'Active Athlete' };

  return (
    <div className="glass-card" style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <h2 className="gradient-text">Parental Progress Portal</h2>
      <p style={{ color: '#888' }}>Your child's Cognitive Fitness Journey</p>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '1rem', color: '#0070f3' }}>NEURAL ARCHITECT LEVEL</div>
        <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>{studentStats.level}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
        <div className="glass-card" style={{ padding: '15px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#666' }}>Literacy Growth</p>
          <h3 style={{ color: '#00d1b2' }}>{studentStats.literacyGain}</h3>
        </div>
        <div className="glass-card" style={{ padding: '15px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#666' }}>Daily Streak</p>
          <h3 style={{ color: '#ffdd57' }}>{studentStats.streak} Days</h3>
        </div>
      </div>

      <button className="primary-btn" style={{ width: '100%', marginTop: '30px' }}>
        Message Cognitive Coach
      </button>
    </div>
  );
}
