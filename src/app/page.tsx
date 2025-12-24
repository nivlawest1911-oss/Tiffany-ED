'use client';
import { useState } from 'react';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import Link from 'next/link';

export default function EdIntelGlobalSuite() {
  const [prompt, setPrompt] = useState('');
  const [role, setRole] = useState('District Leader');
  const [loc, setLoc] = useState('Mobile County, AL');
  const [type, setType] = useState('Public');
  const [cat, setCat] = useState('Special Needs');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const triggerAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://generateiep-fqwxpzrnba-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: prompt, role, location: loc, schoolType: type, category: cat })
      });
      const resData = await response.json();
      setResult(resData.data);
    } catch (error) { setResult('System Sync required...'); } finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1100px', margin: '0 auto 40px auto' }}>
        <strong>EdIntel v1.0 | Project Alpha</strong>
        <div>
          <Link href="/board" style={{ margin: '0 15px', color: '#666', textDecoration: 'none' }}>Board Trends</Link>
          <Link href="/archive" style={{ margin: '0 15px', color: '#666', textDecoration: 'none' }}>Executive Archive</Link>
          <Link href="/pricing" style={{ padding: '8px 20px', backgroundColor: '#003366', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Pricing</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: 'auto', backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}>
        <h1>Global Strategic Suite</h1>
        <p style={{ color: '#64748b' }}>Serving Whistler, Prichard, and the 50 States.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px' }}>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '12px' }}>
            <option>District Leader</option><option>Administrator</option><option>Teacher</option><option>Parent</option><option>Support Staff</option>
          </select>
          <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="City, State" style={{ padding: '12px' }} />
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '12px' }}>
            <option>Public</option><option>Private</option><option>Charter</option>
          </select>
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ padding: '12px' }}>
            <option>Special Needs</option><option>Gifted</option><option>ESL</option><option>General Ed</option>
          </select>
        </div>

        <textarea 
          style={{ width: '100%', height: '150px', marginTop: '20px', padding: '20px', borderRadius: '12px', fontSize: '1rem' }}
          placeholder="Input strategic parameters..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={triggerAudit} disabled={loading} style={{ width: '100%', marginTop: '20px', padding: '18px', backgroundColor: '#003366', color: '#fff', borderRadius: '12px', fontWeight: 'bold' }}>
          {loading ? 'Synthesizing Data...' : 'Trigger Global AI Audit'}
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '40px auto' }}>
        <ResourceMap />
        <AuditChart />
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '16px', borderLeft: '10px solid #003366' }}>
        <strong>Strategic Output:</strong>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{result || 'Standby for executive analysis...'}</p>
      </div>
    </div>
  );
}
