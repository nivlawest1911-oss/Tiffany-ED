'use client';
import { useEffect, useState } from 'react';
import { firestore } from '@/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default function ResourceMap() {
  const [rankings, setRankings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(firestore, 'strategicAudits'));
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
    <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-lg border border-zinc-800">
      <div className="mb-6">
        <h4 className="text-lg font-bold flex items-center gap-2">?? Mobile County Resource Allocation Needs</h4>
        <p className="text-xs text-zinc-500 font-mono mt-1">Schools ranked by AI Audit frequency</p>
      </div>
      <div className="space-y-1">
        {rankings.map((item, index) => (
          <div key={item.name} className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 px-2 rounded-lg transition-colors">
            <span className="text-sm font-medium">{index + 1}. {item.name}</span>
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${item.count > 3 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {item.count} Active Audits
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
