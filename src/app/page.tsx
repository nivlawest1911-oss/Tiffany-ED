'use client';
import { useState } from 'react';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import Link from 'next/link';

export default function EdIntelGlobalHub() {
  const [prompt, setPrompt] = useState('');
  const [role, setRole] = useState('District Leader');
  const [loc, setLoc] = useState('Mobile, AL');
  const [type, setType] = useState('Public');
  const [cat, setCat] = useState('Behavioral Health');
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
    } catch (err) { setResult('Re-syncing with EdIntel Cloud...'); } finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto 40px auto', padding: '15px 30px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <strong style={{ color: '#003366', fontSize: '1.4rem' }}>EdIntel v1.0 | Project Alpha</strong>
        <div>
          <Link href="/board" style={{ margin: '0 15px', color: '#666', textDecoration: 'none' }}>Board Summary</Link>
          <Link href="/archive" style={{ margin: '0 15px', color: '#666', textDecoration: 'none' }}>Executive Vault</Link>
          <Link href="/pricing" style={{ padding: '10px 20px', backgroundColor: '#003366', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Pricing</Link>
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: 'auto' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '5px' }}>Strategic Workstation</h2>
          <p style={{ color: '#888', marginBottom: '30px' }}>Analyzing Continuous Learning Center & Global District Data</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>User Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <option>District Leader</option><option>Administrator</option><option>Teacher</option><option>Parent</option><option>Stakeholder</option>
              </select>
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Geography</label>
              <input value={loc} onChange={(e) => setLoc(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
          </div>

          <textarea 
            style={{ width: '100%', height: '160px', padding: '20px', borderRadius: '15px', border: '1px solid #ddd', fontSize: '1rem', lineHeight: '1.6' }}
            placeholder="Describe the challenge (e.g., 'Analyze CLC re-entry compliance' or 'Gifted identification gaps in Prichard')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button onClick={triggerAudit} disabled={loading} style={{ width: '100%', marginTop: '25px', padding: '20px', backgroundColor: '#003366', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Generating Strategic Analysis...' : 'Trigger Global AI Audit'}
          </button>
        </div>

        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <ResourceMap />
          <AuditChart />
        </div>

        <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '35px', borderRadius: '20px', borderLeft: '12px solid #003366', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Strategic Insight:</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: '#333', fontSize: '1.05rem', lineHeight: '1.8' }}>{result || 'The EdIntel engine is standing by for your executive input.'}</p>
        </div>
      </main>
    </div>
  );
}
