'use client';
import { useState } from 'react';

export default function AdminDiversion() {
  const data = [
    { school: 'CLC North', incidents: 85, diverted: 72, savings: '$4,200' },
    { school: 'CLC South', incidents: 64, diverted: 58, savings: '$3,100' },
    { school: 'Alternative Academy', incidents: 112, diverted: 105, savings: '$9,800' }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px', background: '#000' }}>
      <h2 className="gradient-text" style={{ fontSize: '2rem' }}>Suspension Diversion & Fiscal ROI</h2>
      <p style={{ color: '#888' }}>Transitioning from Punitive Discipline to Cognitive Growth.</p>
      
      <div style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: '#0070f3', borderBottom: '2px solid #222' }}>
              <th style={{ padding: '15px' }}>School Site</th>
              <th style={{ padding: '15px' }}>Total Incidents</th>
              <th style={{ padding: '15px' }}>Diverted to Fitness</th>
              <th style={{ padding: '15px' }}>Legal/Admin Savings</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.school} style={{ borderBottom: '1px solid #111', color: '#aaa' }}>
                <td style={{ padding: '15px' }}>{row.school}</td>
                <td style={{ padding: '15px' }}>{row.incidents}</td>
                <td style={{ padding: '15px', color: '#00d1b2' }}>{row.diverted}</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{row.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
