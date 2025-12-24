'use client';
import { useState } from 'react';

export default function ArchitectStudio() {
  const [mode, setMode] = useState('IEP'); // IEP or GRANT
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const generateDraft = async () => {
    setLoading(true);
    // This calls the Genkit Function generateIEP or generateGrant
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ type: mode, data: input })
      });
      const result = await response.json();
      setOutput(result.text);
    } catch (e) {
      setOutput("Architect connection error. Verify Secret Manager.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="glass-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setMode('IEP')} className="primary-btn" style={{ opacity: mode === 'IEP' ? 1 : 0.5 }}>IEP Architect</button>
          <button onClick={() => setMode('GRANT')} className="primary-btn" style={{ opacity: mode === 'GRANT' ? 1 : 0.5 }}>Grant Assistant</button>
        </div>
        
        <h2 className="gradient-text">{mode === 'IEP' ? 'IEP Strategic Architect' : 'Strategic Grant Architect'}</h2>
        <textarea 
          placeholder={mode === 'IEP' ? "Enter student cognitive goals and assessment data..." : "Enter grant objectives and funding requirements..."}
          style={{ width: '100%', height: '200px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid #333', borderRadius: '10px', padding: '15px', marginTop: '10px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={generateDraft} className="primary-btn" style={{ marginTop: '20px', width: '100%' }} disabled={loading}>
          {loading ? 'AI Architecting...' : 'Generate Strategic Draft'}
        </button>
      </div>

      {output && (
        <div className="glass-card" style={{ marginTop: '30px', padding: '30px', animation: 'fadeIn 0.5s ease' }}>
          <h3 style={{ color: '#0070f3' }}>Draft Output</h3>
          <div style={{ whiteSpace: 'pre-wrap', color: '#ccc' }}>{output}</div>
        </div>
      )}
    </div>
  );
}
