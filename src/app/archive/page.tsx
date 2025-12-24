'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

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
    
    // Document Header
    doc.setFontSize(22);
    doc.setTextColor(0, 112, 243); // EdIntel Blue
    doc.text('EdIntel Strategic Memo', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('CONFIDENTIAL - FOR DISTRICT LEADERSHIP ONLY', 20, 28);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Origin: Dr. West AI Twin (Project Alpha)', 20, 38);
    doc.text('Date: ' + date, 20, 45);
    doc.line(20, 50, 190, 50);

    // Audit Parameters
    doc.setFont("helvetica", "bold");
    doc.text('Audit Parameters:', 20, 60);
    doc.setFont("helvetica", "normal");
    const promptLines = doc.splitTextToSize(audit.executivePrompt, 170);
    doc.text(promptLines, 20, 68);

    // Strategic Output
    const responseStart = 68 + (promptLines.length * 7) + 10;
    doc.setFont("helvetica", "bold");
    doc.text('AI Strategic Analysis:', 20, responseStart);
    doc.setFont("helvetica", "normal");
    const strategyLines = doc.splitTextToSize(audit.strategicOutput, 170);
    doc.text(strategyLines, 20, responseStart + 8);

    doc.save('EdIntel_Audit_' + date.replace(/\//g, '-') + '.pdf');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>??? Executive Strategic Archive</h1>
        <a href="/" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>? Return to Suite</a>
      </div>
      <p style={{ color: '#666' }}>Secure History for Mobile County District Leadership</p>
      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Retrieving secure district records...</p>
        </div>
      ) : audits.length === 0 ? (
        <p>No audits found in the archive.</p>
      ) : (
        audits.map((audit) => (
          <div key={audit.id} style={{ 
            padding: '25px', 
            border: '1px solid #eee', 
            backgroundColor: '#fff',
            marginBottom: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            <small style={{ color: '#888' }}>{audit.timestamp?.toDate().toLocaleString()}</small>
            <button 
              onClick={() => downloadPDF(audit)}
              style={{ 
                position: 'absolute', 
                right: '25px', 
                top: '25px', 
                padding: '10px 18px', 
                cursor: 'pointer', 
                backgroundColor: '#333', 
                color: '#fff', 
                borderRadius: '6px', 
                border: 'none',
                fontWeight: 'bold'
              }}
            >
              ?? Download Memo
            </button>
            <h3 style={{ marginTop: '15px', color: '#1a1a1a' }}>Prompt: {audit.executivePrompt}</h3>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              color: '#444', 
              marginTop: '15px', 
              fontSize: '0.95rem',
              lineHeight: '1.6',
              backgroundColor: '#fcfcfc',
              padding: '15px',
              borderRadius: '8px',
              border: '1px inset #f0f0f0'
            }}>
              <strong>Strategic Output:</strong>
              <p>{audit.strategicOutput}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
