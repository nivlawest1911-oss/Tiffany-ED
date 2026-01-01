'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AuditChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'strategicAudits'), orderBy('timestamp', 'asc'));
      const snapshot = await getDocs(q);
      
      // Group audits by date
      const counts: Record<string, number> = {};
      snapshot.docs.forEach(doc => {
        const date = doc.data().timestamp?.toDate().toLocaleDateString() || 'Pending';
        counts[date] = (counts[date] || 0) + 1;
      });

      const formattedData = Object.keys(counts).map(date => ({
        date,
        audits: counts[date]
      }));
      
      setData(formattedData);
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, marginTop: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
      <h4 style={{ marginBottom: '20px', color: '#333' }}>District Audit Velocity</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{fill: '#f5f5f5'}} />
          <Bar dataKey="audits" fill="#0070f3" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
