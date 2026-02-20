'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RevenueDashboard() {
  const [mounted, setMounted] = useState(false);
  const [data] = useState([
    { name: 'CLC', value: 490, color: '#0070f3' },
    { name: 'Vigor High', value: 245, color: '#7000ff' },
    { name: 'Whistler Elem', value: 147, color: '#00d1ff' },
    { name: 'Prichard MS', value: 98, color: '#52c41a' }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full p-6"><div className="h-[300px] w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse" /></div>;

  return (
    <div className="w-full h-full">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">📊 District Strategic Investment (Monthly)</h3>
      <div className="h-[300px]" style={{ width: '100%', height: 300, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="value" radius={[8, 8, 8, 8]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-zinc-500 text-center mt-6 font-mono bg-zinc-100 dark:bg-zinc-800 py-2 rounded-lg">
        Total Professional Tier Revenue: .00 | Net Strategic Impact: +22% Compliance
      </p>
    </div>
  );
}
