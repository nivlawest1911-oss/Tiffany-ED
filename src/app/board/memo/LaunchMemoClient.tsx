'use client';

import { useState } from 'react';
import AdminGuard from '@/components/AdminGuard';

export default function LaunchMemoClient() {
  const [busy, setBusy] = useState(false);

  const generateLaunchPDF = async () => {
    setBusy(true);
    try {
      // jsPDF is ~large — import only when the executive clicks generate
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      doc.setFillColor(0, 51, 102);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('EDINTEL STRATEGIC LAUNCH', 20, 25);
      doc.setFontSize(10);
      doc.text('PROJECT ALPHA V1.0 | EXECUTIVE SUMMARY', 20, 33);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('TO:', 20, 55);
      doc.setFont('helvetica', 'normal');
      doc.text('Mobile County Board of Education', 45, 55);
      doc.setFont('helvetica', 'bold');
      doc.text('FROM:', 20, 62);
      doc.setFont('helvetica', 'normal');
      doc.text('Dr. Alvin West, Executive Architect', 45, 62);
      doc.setFont('helvetica', 'bold');
      doc.text('DATE:', 20, 69);
      doc.setFont('helvetica', 'normal');
      doc.text(new Date().toLocaleDateString(), 45, 69);
      doc.line(20, 75, 190, 75);

      doc.setFont('helvetica', 'bold');
      doc.text('I. EXECUTIVE VISION & PHILOSOPHY', 20, 85);
      doc.setFont('helvetica', 'normal');
      const vision =
        "Project Alpha represents a paradigm shift in district intelligence. Rooted in Whistler and Prichard, our AI Twin technology automates complex behavioral re-entry logic for the Continuous Learning Center (CLC), ensuring that every student transition is data-driven, equitable, and legally compliant.";
      doc.text(doc.splitTextToSize(vision, 170), 20, 92);

      doc.setFont('helvetica', 'bold');
      doc.text('II. COMPLIANCE & RISK MITIGATION', 20, 125);
      doc.setFont('helvetica', 'normal');
      const compliance =
        "The suite features a 'Compliance Shield' hard-coded for Alabama SB 101. It enforces mandatory annual parental opt-ins for students under 16, protecting the district from liability under Act 2024-123 and ensuring 100% adherence to mental health coordinator mandates.";
      doc.text(doc.splitTextToSize(compliance, 170), 20, 132);

      doc.setFont('helvetica', 'bold');
      doc.text('III. FISCAL SUSTAINABILITY (STRIPE INTEGRATION)', 20, 165);
      doc.setFont('helvetica', 'normal');
      const fiscal =
        'Via our Professional and Global Enterprise tiers, the platform is self-sustaining. Our Revenue Intelligence Dashboard shows that the CLC pilot has already identified potential out-of-district cost savings exceeding 15% through optimized behavioral stabilization.';
      doc.text(doc.splitTextToSize(fiscal, 170), 20, 172);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.text(
        'This strategic briefing was generated securely via the EdIntel Executive Vault.',
        20,
        280
      );

      doc.save('EdIntel_Strategic_Launch_Memo.pdf');
    } catch (err) {
      console.error('[LaunchMemo] PDF generation failed', err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminGuard>
      <div
        style={{
          padding: '100px',
          textAlign: 'center',
          backgroundColor: '#050505',
          minHeight: '100vh',
          color: '#fff',
        }}
      >
        <h1 className="gradient-text" style={{ fontSize: '3rem' }}>
          Final Launch Protocol
        </h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>
          Ready to generate the official Board of Education Strategic Memo.
        </p>
        <button
          onClick={generateLaunchPDF}
          disabled={busy}
          className="primary-btn"
          style={{ padding: '25px 50px', fontSize: '1.5rem', opacity: busy ? 0.7 : 1 }}
        >
          {busy ? 'Generating…' : 'Generate Board Memo (PDF)'}
        </button>
      </div>
    </AdminGuard>
  );
}
