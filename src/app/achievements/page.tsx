'use client';
'use client';
import { useState, useEffect } from 'react';

export default function StudentAchievement() {
  const [level, setLevel] = useState(12);
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(2450);

  return (
    <div style={{ padding: '40px', background: 'radial-gradient(circle at bottom, #001f3f 0%, #000 100%)', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Neural Architect Journey</h1>
        <p style={{ color: '#0070f3', letterSpacing: '2px' }}>STUDENT OPERATOR: CLC-DISTRICT-01</p>
      </header>

      <div className="bento-grid">
        {/* Level Card */}
        <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
          <h3 style={{ color: '#888' }}>Architect Level</h3>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', margin: '10px 0' }}>{level}</div>
          <div style={{ width: '100%', height: '10px', background: '#222', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #0070f3, #00d1b2)' }}></div>
          </div>
          <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#666' }}>650 XP until Level 13</p>
        </div>

        {/* Streak Card */}
        <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
          <h3 style={{ color: '#888' }}>Literacy Streak</h3>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffdd57', margin: '10px 0' }}>{streak} ??</div>
          <p>Consecutive days of Cognitive Fitness</p>
        </div>

        {/* Achievements Card */}
        <div className="glass-card" style={{ padding: '30px', gridColumn: 'span 2' }}>
          <h3>Neural Milestones</h3>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            {['Strategic Reader', 'Logic Master', 'Data Auditor'].map(m => (
              <div key={m} style={{ padding: '10px 20px', background: 'rgba(0,112,243,0.2)', border: '1px solid #0070f3', borderRadius: '20px', fontSize: '0.8rem' }}>
                ?? {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
