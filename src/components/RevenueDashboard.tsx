'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RevenueDashboard() {
  const [data, setData] = useState([
    { name: 'CLC', value: 490, color: '#0070f3' },
    { name: 'Vigor High', value: 245, color: '#7000ff' },
    { name: 'Whistler Elem', value: 147, color: '#00d1ff' },
    { name: 'Prichard MS', value: 98, color: '#52c41a' }
  ]);

  return (
    <div className="glass-card" style={{ padding: '30px', marginTop: '30px' }}>
      <h3 style={{ marginBottom: '20px' }}>?? District Strategic Investment (Monthly)</h3>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={cell-} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '15px' }}>
        Total Professional Tier Revenue: .00 | Net Strategic Impact: +22% Compliance
      </p>
    </div>
  );
}
