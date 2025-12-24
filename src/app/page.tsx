'use client';
import { useState } from 'react';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';

export default function EdIntelGlobalSuite() {
  const [prompt, setPrompt] = useState('');
  const [role, setRole] = useState('Teacher');
  const [loc, setLoc] = useState('Mobile County, AL');
  const [type, setType] = useState('Public');
  const [cat, setCat] = useState('Special Needs');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const triggerAudit = async () => {
    setLoading(true);
    setResult('EdIntel Engine Synthesizing...');
    try {
      const response = await fetch('https://generateiep-fqwxpzrnba-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: prompt, role, location: loc, schoolType: type, category: cat })
      });
      const resData = await response.json();
      setResult(resData.data);
    } catch (error) {
      setResult('System Error: Re-establishing link...');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto', backgroundColor: '#f4f7f6' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#003366' }}>EdIntel Strategic Suite</h1>
        <p>Global Intelligence: From Whistler & Prichard to the 50 States</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <select onChange={(e) => setRole(e.target.value)} style={{ padding: '10px' }}>
          <option>District Leader</option><option>Administrator</option><option>Teacher</option><option>Parent</option><option>Personnel</option>
        </select>
        <input placeholder="Location (City, State)" value={loc} onChange={(e) => setLoc(e.target.value)} style={{ padding: '10px' }} />
        <select onChange={(e) => setType(e.target.value)} style={{ padding: '10px' }}>
          <option>Public</option><option>Private</option><option>Charter</option>
        </select>
        <select onChange={(e) => setCat(e.target.value)} style={{ padding: '10px' }}>
          <option>Special Needs</option><option>Gifted</option><option>ESL</option><option>General Education</option>
        </select>
      </div>

      <textarea 
        style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '10px', border: '1px solid #ccc' }}
        placeholder="Describe the strategic challenge or audit requirement..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button 
        onClick={triggerAudit} 
        disabled={loading}
        style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#003366', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {loading ? 'Synthesizing...' : 'Trigger Strategic AI Audit'}
      </button>

      <AuditChart />
      <ResourceMap />

      <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '25px', borderRadius: '12px', borderLeft: '8px solid #003366' }}>
        <strong>Strategic Output:</strong>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{result}</p>
      </div>
    </div>
  );
}
