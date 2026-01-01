'use client';
import { useEffect, useState } from 'react';
import { db, auth } from '@/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import AdminGuard from '@/components/AdminGuard';
import SuccessBadge from '@/components/SuccessBadge';
import { Suspense } from 'react';

export default function ExecutiveArchive() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const fetchAudits = async () => {
    const q = query(collection(db, 'strategicAudits'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAudits(data);
    setLoading(false);
  };

  useEffect(() => { fetchAudits(); }, []);

  const clearHistory = async () => {
    if (!confirm('?? CRITICAL: Are you sure you want to permanently delete all archived audits? This cannot be undone.')) return;
    
    setLoading(true);
    const q = query(collection(db, 'strategicAudits'));
    const querySnapshot = await getDocs(q);
    
    const batch = writeBatch(db);
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    alert('Strategic Vault Reset Successfully.');
    fetchAudits();
  };

  const saveFeedback = async (id: string) => {
    const auditRef = doc(db, 'strategicAudits', id);
    await updateDoc(auditRef, { executiveCorrection: feedbackText, lastRefined: new Date() });
    setEditingId(null);
    fetchAudits();
  };

  const downloadPDF = (audit: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('EdIntel Strategic Memo', 20, 20);
    const strategy = doc.splitTextToSize(audit.strategicOutput, 170);
    doc.text(strategy, 20, 50);
    doc.save('Audit_Export.pdf');
  };

  return (
    <AdminGuard>
<Suspense fallback={null}><SuccessBadge /></Suspense>
      <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>??? Executive Strategic Archive</h1>
          <button onClick={clearHistory} style={{ height: '40px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            ??? Reset Vault
          </button>
        </div>
        <hr />
        {loading ? <p>Processing records...</p> : audits.map((audit) => (
          <div key={audit.id} style={{ padding: '25px', border: '1px solid #eee', marginBottom: '25px', borderRadius: '12px', backgroundColor: '#fff' }}>
            <small>{audit.timestamp?.toDate().toLocaleString()} | Target: {audit.targetSchool || 'District Office'}</small>
            <h3>Prompt: {audit.executivePrompt}</h3>
            <p>{audit.strategicOutput}</p>
            <button onClick={() => { setEditingId(audit.id); setFeedbackText(audit.executiveCorrection || ''); }}>?? Refine</button>
            <button onClick={() => downloadPDF(audit)} style={{ marginLeft: '10px' }}>?? Export</button>
            {editingId === audit.id && (
              <div style={{ marginTop: '10px' }}>
                <textarea style={{ width: '100%' }} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
                <button onClick={() => saveFeedback(audit.id)}>Save</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminGuard>
  );
}
