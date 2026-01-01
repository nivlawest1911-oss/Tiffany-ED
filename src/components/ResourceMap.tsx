'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default function ResourceMap() {
  const [rankings, setRankings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'strategicAudits'));
      const counts: Record<string, number> = {};
      
      snapshot.docs.forEach(doc => {
        const school = doc.data().targetSchool || 'District Wide';
        counts[school] = (counts[school] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      
      setRankings(sorted);
    };
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '12px' }}>
      <h4>?? Mobile County Resource Allocation Needs</h4>
      <p style={{ fontSize: '0.8rem', color: '#888' }}>Schools ranked by AI Audit frequency</p>
      {rankings.map((item, index) => (
        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333' }}>
          <span>{index + 1}. {item.name}</span>
          <span style={{ color: item.count > 3 ? '#ff4d4f' : '#52c41a' }}>
            {item.count} Active Audits
          </span>
        </div>
      ))}
    </div>
  );
}
