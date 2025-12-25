'use client';
'use client';
import { useState, useEffect } from 'react';

export default function NeuralReset() {
  const [isActive, setIsActive] = useState(false);

  const triggerReset = () => {
    setIsActive(true);
    // Logic: In a real app, this would trigger the Audio API and Circadian Filter
    setTimeout(() => setIsActive(false), 30000); // 30-second reset
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isActive ? (
        <div className="glass-card" style={{ padding: '20px', border: '2px solid #00d1b2', animation: 'pulse 2s infinite' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#00d1b2' }}>?? COGNITIVE RESET ACTIVE</p>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Adjusting spectral warmth. Inhale for 4, hold for 4, exhale for 4...</p>
        </div>
      ) : (
        <button 
          onClick={triggerReset}
          style={{ background: '#111', color: '#666', border: '1px solid #333', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
          title="Manual Neural Reset"
        >
          ??
        </button>
      )}
    </div>
  );
}
