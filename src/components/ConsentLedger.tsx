'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function ConsentLedger() {
  const [consents, setConsents] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'parental_consents'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConsents(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-12 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/10 bg-white/5">
        <h3 className="text-xl font-light tracking-tight text-blue-400">Prichard Node: Parental Consent Ledger</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-white/40 uppercase tracking-widest text-[10px] bg-white/5">
            <tr>
              <th className="px-6 py-4">Parent Name</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {consents.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-white/20">Awaiting first signature...</td></tr>
            ) : (
              consents.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.parentName}</td>
                  <td className="px-6 py-4 text-white/60">{item.studentName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px]">VERIFIED</span>
                  </td>
                  <td className="px-6 py-4 text-white/40">{new Date(item.timestamp?.seconds * 1000).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
