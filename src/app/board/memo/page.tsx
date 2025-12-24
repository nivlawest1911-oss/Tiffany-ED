'use client';
import { jsPDF } from 'jspdf';
import AdminGuard from '@/components/AdminGuard';

export default function LaunchMemo() {
  const generateLaunchPDF = () => {
    const doc = new jsPDF();
    
    // Header Logic
    doc.setFillColor(0, 51, 102); 
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text('EDINTEL STRATEGIC LAUNCH', 20, 25);
    doc.setFontSize(10);
    doc.text('PROJECT ALPHA V1.0 | EXECUTIVE SYSTEM OVERVIEW', 20, 35);

    // Metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('TO:', 20, 60); doc.setFont("helvetica", "normal"); doc.text('Mobile County Board of Education', 45, 60);
    doc.text('FROM:', 20, 67); doc.text('Dr. Alvin West, Executive Architect', 45, 67);
    doc.text('DATE:', 20, 74); doc.text(new Date().toLocaleDateString(), 45, 74);
    doc.line(20, 80, 190, 80);

    // Vision Statement
    doc.setFont("helvetica", "bold");
    doc.text('I. EXECUTIVE SUMMARY', 20, 90);
    doc.setFont("helvetica", "normal");
    const summary = "EdIntel v1.0 (Project Alpha) is officially operational. This platform integrates DBA-level fiscal logic with real-time AI modeling to stabilize district transitions, automate SB 101 compliance, and optimize resource allocation at the Continuous Learning Center (CLC).";
    doc.text(doc.splitTextToSize(summary, 170), 20, 98);

    // Technical Capabilities
    doc.setFont("helvetica", "bold");
    doc.text('II. CORE CAPABILITIES', 20, 125);
    doc.setFont("helvetica", "normal");
    const tech = "- AI Twin Logic: Hard-coded with Mobile County & Alabama Standards.\n- Compliance Shield: Automated AL SB 101 Parental Opt-in Gatekeeping.\n- Fiscal Engine: Revenue-tracking tiers for district sustainability.\n- Executive Vault: Time-stamped, refined strategic history.";
    doc.text(tech, 20, 133);

    // Strategic Roadmap
    doc.setFont("helvetica", "bold");
    doc.text('III. 2026 DISTRICT IMPACT GOALS', 20, 165);
    doc.setFont("helvetica", "normal");
    const roadmap = "1. 100% Digital Consent Compliance for Alternative Ed students.\n2. 15% Reduction in CLC recidivism via 'Warm Handoff' AI protocols.\n3. Expansion of the EdIntel Global Suite to neighboring districts.";
    doc.text(doc.splitTextToSize(roadmap, 170), 20, 173);

    // Signature
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text('Authorized for release by the Office of the Executive Architect.', 20, 270);
    doc.save('EdIntel_Project_Alpha_Launch_Memo.pdf');
  };

  return (
    <AdminGuard>
      <div style={{ padding: '100px', textAlign: 'center', backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Protocol Complete</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>EdIntel v1.0 is synced. Download the official launch brief below.</p>
        <button onClick={generateLaunchPDF} className="primary-btn" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
          📄 Download Strategic Memo
        </button>
      </div>
    </AdminGuard>
  );
}
