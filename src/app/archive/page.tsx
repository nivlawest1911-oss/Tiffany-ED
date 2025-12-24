'use client';
import { useEffect, useState, Suspense } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import AdminGuard from '@/components/AdminGuard';
import SuccessBadge from '@/components/SuccessBadge';

export default function ExecutiveArchive() {
  const [consents, setConsents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConsents = async () => {
    try {
      const q = query(collection(db, 'parentalConsents'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConsents(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchConsents(); }, []);

  const toggleVerify = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'VERIFIED' ? 'ACTIVE' : 'VERIFIED';
    await updateDoc(doc(db, 'parentalConsents', id), { status: newStatus });
    fetchConsents();
  };

  return (
    <AdminGuard>
      <Suspense fallback={null}><SuccessBadge /></Suspense>
      <div style={{ padding: '40px', maxWidth: '1100px', margin: 'auto' }}>
        <h1 className="gradient-text">Executive Strategic Vault</h1>
        
        <section style={{ marginTop: '40px' }}>
          <h2>🛡️ SB 101 Compliance Feed (Live)</h2>
          {loading ? <p>Syncing with District records...</p> : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {consents.map(c => (
                <div key={c.id} className="glass-card" style={{ 
                  padding: '20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderLeft: c.status === 'VERIFIED' ? '6px solid #52c41a' : '6px solid #faad14' 
                }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem' }}>{c.studentName}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {c.school} | Signed by: {c.parentName}
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleVerify(c.id, c.status)}
                    style={{
                      padding: '8px 15px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: c.status === 'VERIFIED' ? '#52c41a' : '#333',
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {c.status === 'VERIFIED' ? '✅ MHC Verified' : 'Mark Verified'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminGuard>
  );
}
