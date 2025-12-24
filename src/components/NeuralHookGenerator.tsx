'use client';
import { useState } from 'react';

export default function NeuralHookGenerator() {
  const [interest, setInterest] = useState('');
  const [target, setTarget] = useState('Decoding Multi-syllabic Words');

  return (
    <div className="glass-card" style={{ padding: '40px', background: '#000', borderTop: '4px solid #d4af37' }}>
      <h2 className="gradient-text">Neural Hook Generator</h2>
      <p style={{ color: '#888' }}>Bridge student interests to literacy milestones.</p>
      
      <div style={{ marginTop: '30px' }}>
        <label style={{ color: '#666', fontSize: '0.8rem' }}>Student High-Interest Area (e.g., Gaming, Basketball)</label>
        <input 
          value={interest} 
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Enter interest..."
          style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', borderRadius: '10px', color: '#fff', marginTop: '10px' }}
        />
        
        <button className="primary-btn" style={{ width: '100%', marginTop: '20px' }}>
          Generate Scaffolding Bridge
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(212,175,55,0.05)', borderRadius: '15px' }}>
        <h4 style={{ color: '#d4af37', margin: 0 }}>Strategic Scaffolding Result:</h4>
        <p style={{ fontSize: '0.9rem', color: '#aaa' }}>
          {interest ? `Linking "${interest}" to "${target}" by creating a narrative audit of...` : "Waiting for input..."}
        </p>
      </div>
    </div>
  );
}
