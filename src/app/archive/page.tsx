'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import AdminGuard from '@/components/AdminGuard'; // ?? Import the guard

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

  const downloadPDF = (audit: any) => {
    const doc = new jsPDF();
    const date = audit.timestamp?.toDate().toLocaleDateString() || 'N/A';
    doc.setFontSize(22);
    doc.setTextColor(0, 112, 243);
    doc.text('EdIntel Strategic Memo', 20, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('CONFIDENTIAL - FOR DISTRICT LEADERSHIP ONLY', 20, 28);
    doc.save('EdIntel_Audit_' + date.replace(/\//g, '-') + '.pdf');
  };

  return (
    <AdminGuard> { /* ?? Wrap the entire UI in the Guard */ }
      <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>??? Executive Strategic Archive</h1>
          <a href="/" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>? Return to Suite</a>
        </div>
        <hr />
        {loading ? (
          <p>Retrieving secure district records...</p>
        ) : (
          audits.map((audit) => (
            <div key={audit.id} style={{ padding: '25px', border: '1px solid #eee', marginBottom: '25px', borderRadius: '12px', position: 'relative' }}>
              <button onClick={() => downloadPDF(audit)} style={{ position: 'absolute', right: '25px', top: '25px', padding: '10px', backgroundColor: '#333', color: '#fff', borderRadius: '6px' }}>?? Download Memo</button>
              <small>{audit.timestamp?.toDate().toLocaleString()}</small>
              <h3>Prompt: {audit.executivePrompt}</h3>
              <p>{audit.strategicOutput}</p>
            </div>
          ))
        )}
      </div>
    </AdminGuard>
  );
}
