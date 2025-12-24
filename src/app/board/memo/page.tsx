'use client';
import { jsPDF } from 'jspdf';
import AdminGuard from '@/components/AdminGuard';

export default function LaunchMemo() {
  const generateLaunchPDF = () => {
    const doc = new jsPDF();
    
    // Header Logic - Executive Presentation
    doc.setFillColor(0, 51, 102); // Mobile County Navy
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('EDINTEL STRATEGIC LAUNCH', 20, 25);
    doc.setFontSize(10);
    doc.text('PROJECT ALPHA V1.0 | EXECUTIVE SUMMARY', 20, 33);

    // Metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('TO:', 20, 55); doc.setFont("helvetica", "normal"); doc.text('Mobile County Board of Education', 45, 55);
    doc.setFont("helvetica", "bold");
    doc.text('FROM:', 20, 62); doc.setFont("helvetica", "normal"); doc.text('Dr. Alvin West, Executive Architect', 45, 62);
    doc.setFont("helvetica", "bold");
    doc.text('DATE:', 20, 69); doc.setFont("helvetica", "normal"); doc.text(new Date().toLocaleDateString(), 45, 69);
    doc.line(20, 75, 190, 75);

    // Section 1: The Vision
    doc.setFont("helvetica", "bold");
    doc.text('I. EXECUTIVE VISION & PHILOSOPHY', 20, 85);
    doc.setFont("helvetica", "normal");
    const vision = "Project Alpha represents a paradigm shift in district intelligence. Rooted in Whistler and Prichard, our AI Twin technology automates complex behavioral re-entry logic for the Continuous Learning Center (CLC), ensuring that every student transition is data-driven, equitable, and legally compliant.";
    doc.text(doc.splitTextToSize(vision, 170), 20, 92);

    // Section 2: Legal Safeguards
    doc.setFont("helvetica", "bold");
    doc.text('II. COMPLIANCE & RISK MITIGATION', 20, 125);
    doc.setFont("helvetica", "normal");
    const compliance = "The suite features a 'Compliance Shield' hard-coded for Alabama SB 101. It enforces mandatory annual parental opt-ins for students under 16, protecting the district from liability under Act 2024-123 and ensuring 100% adherence to mental health coordinator mandates.";
    doc.text(doc.splitTextToSize(compliance, 170), 20, 132);

    // Section 3: Financial ROI
    doc.setFont("helvetica", "bold");
    doc.text('III. FISCAL SUSTAINABILITY (STRIPE INTEGRATION)', 20, 165);
    doc.setFont("helvetica", "normal");
    const fiscal = "Via our Professional and Global Enterprise tiers, the platform is self-sustaining. Our Revenue Intelligence Dashboard shows that the CLC pilot has already identified potential out-of-district cost savings exceeding 15% through optimized behavioral stabilization.";
    doc.text(doc.splitTextToSize(fiscal, 170), 20, 172);

    // Footer Signature
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text('This strategic briefing was generated securely via the EdIntel Executive Vault.', 20, 280);
    
    doc.save('EdIntel_Strategic_Launch_Memo.pdf');
  };

  return (
    <AdminGuard>
      <div style={{ padding: '100px', textAlign: 'center', backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Final Launch Protocol</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>Ready to generate the official Board of Education Strategic Memo.</p>
        <button onClick={generateLaunchPDF} className="primary-btn" style={{ padding: '25px 50px', fontSize: '1.5rem' }}>
          ?? Generate Board Memo (PDF)
        </button>
      </div>
    </AdminGuard>
  );
}
