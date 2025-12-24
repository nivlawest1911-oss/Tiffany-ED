'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import AdminGuard from '@/components/AdminGuard';

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

  const saveFeedback = async (id: string) => {
    const auditRef = doc(db, 'strategicAudits', id);
    await updateDoc(auditRef, { 
      executiveCorrection: feedbackText,
      lastRefined: new Date()
    });
    setEditingId(null);
    fetchAudits(); // Refresh list
  };

  const downloadPDF = (audit: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('EdIntel Strategic Memo', 20, 20);
    doc.setFontSize(12);
    doc.text('Strategic Analysis:', 20, 40);
    const strategy = doc.splitTextToSize(audit.strategicOutput, 170);
    doc.text(strategy, 20, 50);
    
    if (audit.executiveCorrection) {
      const correctionStart = 60 + (strategy.length * 7);
      doc.setFont("helvetica", "bold");
      doc.text('Executive Refinements:', 20, correctionStart);
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(audit.executiveCorrection, 170), 20, correctionStart + 10);
    }
    doc.save('Audit_Export.pdf');
  };

  return (
    <AdminGuard>
      <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: 'auto' }}>
        <h1>??? Executive Strategic Archive</h1>
        <p>Review and Refine AI Outputs for Project Alpha</p>
        <hr />
        {loading ? <p>Loading district history...</p> : audits.map((audit) => (
          <div key={audit.id} style={{ padding: '25px', border: '1px solid #eee', marginBottom: '25px', borderRadius: '12px', backgroundColor: '#fff' }}>
            <small>{audit.timestamp?.toDate().toLocaleString()}</small>
            <h3>Prompt: {audit.executivePrompt}</h3>
            <p style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>{audit.strategicOutput}</p>
            
            {audit.executiveCorrection && (
              <div style={{ marginTop: '10px', padding: '10px', borderLeft: '4px solid #0070f3', backgroundColor: '#eef6ff' }}>
                <strong>Executive Refinement:</strong>
                <p>{audit.executiveCorrection}</p>
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              {editingId === audit.id ? (
                <>
                  <textarea 
                    style={{ width: '100%', height: '80px', marginBottom: '10px' }}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Add your corrections or leadership notes here..."
                  />
                  <button onClick={() => saveFeedback(audit.id)} style={{ marginRight: '10px' }}>Save Refinement</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setEditingId(audit.id); setFeedbackText(audit.executiveCorrection || ''); }} style={{ marginRight: '10px' }}>?? Refine Audit</button>
                  <button onClick={() => downloadPDF(audit)}>?? Export PDF</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminGuard>
  );
}
