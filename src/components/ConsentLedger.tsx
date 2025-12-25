'use client';
'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
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
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6">
      <h3 className="text-xl text-blue-400 mb-4 font-light">Prichard Node: Live Ledger</h3>
      <div className="text-sm text-white/60 font-mono italic">
        {consents.length === 0 ? "Awaiting first signature..." : `Tracking ${consents.length} verified responses`}
      </div>
    </div>
  );
}
