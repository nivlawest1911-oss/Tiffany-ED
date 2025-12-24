'use client';
import { useState, useEffect } from 'react';

export default function TokenSovereign() {
  const [data, setData] = useState({ tokensUsed: 450000, capacity: 1000000 });
  const efficiencyRatio = (data.tokensUsed / 10000).toFixed(2); // Estimated hours saved

  return (
    <div className="glass-card" style={{ padding: '40px', borderLeft: '5px solid #d4af37' }}>
      <h2 className="gradient-text">Token Sovereignty & Throughput</h2>
      <p style={{ color: '#888' }}>Atomic Resource Consumption vs. District ROI</p>
      
      <div style={{ margin: '30px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Intelligence Reservoir</span>
          <span style={{ color: '#0070f3' }}>{data.tokensUsed.toLocaleString()} / {data.capacity.toLocaleString()} Tokens</span>
        </div>
        <div style={{ width: '100%', height: '20px', background: '#111', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #d4af37, #f1c40f)' }}></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div className="glass-card" style={{ background: 'rgba(0,209,178,0.05)', padding: '20px' }}>
          <h4 style={{ margin: 0, color: '#00d1b2' }}>Cognitive ROI</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{efficiencyRatio}x</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Return on "Unit of Thought"</p>
        </div>
        <div className="glass-card" style={{ background: 'rgba(212,175,55,0.05)', padding: '20px' }}>
          <h4 style={{ margin: 0, color: '#d4af37' }}>Labor Deflection</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>$8,420</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Cost Avoidance this Quarter</p>
        </div>
      </div>
    </div>
  );
}
