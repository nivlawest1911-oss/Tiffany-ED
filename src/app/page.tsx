'use client';
import { useState } from 'react';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import Link from 'next/link';

export default function EdIntelModernHub() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '40px 20px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', alignItems: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '1.8rem' }}>EdIntel v1.0</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/pricing" style={{ color: '#888', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/board" style={{ color: '#888', textDecoration: 'none' }}>Board</Link>
          <Link href="/archive" className="primary-btn" style={{ textDecoration: 'none', padding: '10px 20px' }}>Archive</Link>
        </div>
      </nav>

      <ExecutiveDashboard />

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <section className="glass-card" style={{ padding: '40px' }}>
          <h2 style={{ marginTop: 0 }}>Strategic Workstation</h2>
          <p style={{ color: '#888' }}>Analyze Whistler, Prichard, CLC, and Global Trends.</p>
          
          <textarea 
            className="glass-card" 
            style={{ width: '100%', height: '200px', padding: '20px', color: '#fff', fontSize: '1rem', marginTop: '20px' }}
            placeholder="Input executive directive..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button className="primary-btn" style={{ width: '100%', marginTop: '30px', fontSize: '1.1rem' }}>
            Trigger AI Strategic Audit
          </button>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '25px' }}>
            <ResourceMap />
          </div>
          <div className="glass-card" style={{ padding: '25px' }}>
            <AuditChart />
          </div>
        </section>
      </div>

      {result && (
        <div className="glass-card" style={{ marginTop: '40px', padding: '40px', borderLeft: '4px solid #0070f3' }}>
          <h3 className="gradient-text">AI Analysis Complete</h3>
          <p style={{ lineHeight: '1.8', color: '#ccc' }}>{result}</p>
        </div>
      )}
    </div>
  );
}
