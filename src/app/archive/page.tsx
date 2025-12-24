'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase'; // Using your existing config
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function ExecutiveArchive() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const q = query(collection(db, 'strategicAudits'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAudits(data);
      } catch (error) {
        console.error("Archive Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudits();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: 'auto' }}>
      <h1>??? Executive Strategic Archive</h1>
      <p>Project Alpha History for Mobile County</p>
      <hr />
      {loading ? (
        <p>Loading district history...</p>
      ) : (
        audits.map((audit) => (
          <div key={audit.id} style={{ 
            padding: '20px', 
            borderBottom: '2px solid #eee', 
            backgroundColor: '#f9f9f9',
            marginBottom: '20px',
            borderRadius: '8px'
          }}>
            <small>{audit.timestamp?.toDate().toLocaleString()}</small>
            <h3>Prompt: {audit.executivePrompt}</h3>
            <div style={{ whiteSpace: 'pre-wrap', color: '#444' }}>
              <strong>AI Strategy:</strong>
              <p>{audit.strategicOutput}</p>
            </div>
          </div>
        ))
      )}
      <a href="/" style={{ color: '#0070f3' }}>? Return to Strategic Suite</a>
    </div>
  );
}
