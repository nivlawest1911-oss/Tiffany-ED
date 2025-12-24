'use client';
import { useState } from 'react';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import Link from 'next/link';

export default function EdIntelGlobalSuite() {
  const [prompt, setPrompt] = useState('');
  const [role, setRole] = useState('Administrator');
  const [loc, setLoc] = useState('Prichard, AL');
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
    } catch (error) {
      setResult('Link reset required...');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1000px', margin: '0 auto 40px auto' }}>
        <strong style={{ fontSize: '1.5rem', color: '#0f172a' }}>EdIntel v1.0</strong>
        <div>
          <Link href="/board" style={{ margin: '0 15px', color: '#64748b', textDecoration: 'none' }}>Board View</Link>
          <Link href="/archive" style={{ margin: '0 15px', color: '#64748b', textDecoration: 'none' }}>Archive</Link>
          <Link href="/pricing" style={{ padding: '8px 20px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Pricing</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: 'auto', backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h1 style={{ marginBottom: '10px' }}>Dr. West AI Twin</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Global Strategic Suite: Empowering Parents, Teachers, and Leaders.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>District Leader</option><option>Administrator</option><option>Teacher</option><option>Parent</option><option>Support Staff</option>
          </select>
          <input value={loc} onChange={(e) => setLoc(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="City, State" />
        </div>

        <textarea 
          style={{ width: '100%', height: '150px', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
          placeholder="Input strategic parameters for audit..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={triggerAudit} disabled={loading} style={{ width: '100%', marginTop: '20px', padding: '18px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'Synthesizing Strategic Insight...' : 'Trigger Global AI Audit'}
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
        <ResourceMap />
        <AuditChart />
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '16px', borderLeft: '10px solid #0f172a' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Strategic Analysis:</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#334155' }}>{result || 'Waiting for executive prompt...'}</p>
      </div>
    </div>
  );
}
