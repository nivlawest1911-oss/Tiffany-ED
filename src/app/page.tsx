'use client';
import { useState } from 'react';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';

export default function EdIntelSuite() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const triggerAudit = async () => {
    setLoading(true);
    setResult('AI Twin analyzing district data...');
    try {
      const response = await fetch('https://generateiep-fqwxpzrnba-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: prompt })
      });
      
      const resData = await response.json();
      // This line extracts the text from the { data: "..." } object
      setResult(resData.data || 'No strategic data returned.');
    } catch (error) {
      setResult('Connection Error: Check Secret Manager or Cloud Logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>EdIntel Strategic Suite</h1>
      <h3>Dr. West AI Twin: Project Alpha v1.0</h3>
      
      <textarea 
        style={{ width: '100%', height: '100px', marginBottom: '20px', padding: '10px' }}
        placeholder="Enter strategic audit parameters..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      
      <button 
        onClick={triggerAudit}
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Analyzing...' : 'Trigger AI Audit'}
      </button>

      <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap', borderTop: '1px solid #eaeaea', paddingTop: '20px' }}>
        <strong>Strategic Output:</strong>
<AuditChart />
<ResourceMap />
        <p>{result}</p>
      </div>
    </div>
  );
}
