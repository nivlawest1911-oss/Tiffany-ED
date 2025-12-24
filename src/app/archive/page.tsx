'use client';
import { useState } from 'react';

export default function ExecutiveVault() {
  const [isLocked, setIsLocked] = useState(true);
  const records = [
    { id: 'IEP-2025-001', date: 'Dec 24, 2025', status: 'Audit Passed', hash: 'sha256-a78b...' },
    { id: 'GRANT-AL-2026', date: 'Dec 20, 2025', status: 'Drafting', hash: 'sha256-f29e...' },
    { id: 'SB101-CONSENT-01', date: 'Dec 15, 2025', status: 'Verified', hash: 'sha256-c11d...' }
  ];

  return (
    <div style={{ padding: '40px', background: '#000', minHeight: '100vh', fontFamily: 'monospace' }}>
      <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>INTERNAL REPOSITORY: VAULT</h1>
      
      {isLocked ? (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', marginTop: '50px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <h3>Encrypted Environment</h3>
          <p style={{ color: '#444' }}>Authorization required for CLC Executive access.</p>
          <button onClick={() => setIsLocked(false)} className="primary-btn">Bypass with Biometrics</button>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '30px', marginTop: '30px', animation: 'fadeIn 0.5s ease' }}>
          <table style={{ width: '100%', color: '#aaa', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222' }}>
                <th style={{ textAlign: 'left', padding: '15px' }}>RECORD ID</th>
                <th style={{ textAlign: 'left', padding: '15px' }}>DATE</th>
                <th style={{ textAlign: 'left', padding: '15px' }}>INTEGRITY HASH</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #111' }}>
                  <td style={{ padding: '15px', color: '#0070f3' }}>{r.id}</td>
                  <td style={{ padding: '15px' }}>{r.date}</td>
                  <td style={{ padding: '15px', fontSize: '0.7rem', opacity: 0.5 }}>{r.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
