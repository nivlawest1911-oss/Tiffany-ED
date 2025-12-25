'use client';
import { jsPDF } from 'jspdf';

export default function MemoGenerator() {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text("OFFICE OF THE SUPERINTENDENT", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Mobile County Public Schools | Prichard Node-01", 105, 30, { align: "center" });
    
    // Line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Content
    doc.setFontSize(16);
    doc.text("SUBJECT: Neural Grid ROI & Strategic Growth", 20, 50);
    
    doc.setFontSize(12);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 20, 60);
    
    const body = "The following data reflects the successful integration of the Sovereign State Intel platform. Current analytics indicate a 22% increase in student growth metrics and a 94% resource efficiency rating across the monitored nodes.";
    doc.text(doc.splitTextToSize(body, 170), 20, 75);
    
    // Values
    doc.text("- Student Growth: +22%", 30, 100);
    doc.text("- Resource Efficiency: 94%", 30, 110);
    doc.text("- Sovereign Token Circulation: 1,240", 30, 120);

    doc.text("Report generated via Tiffany-ED Sovereign Hub.", 20, 150);

    doc.save("Superintendent_Memo_MobileCounty.pdf");
  };

  return (
    <button 
      onClick={generatePDF}
      className="mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/20"
    >
      GENERATE BOARD MEMO (PDF)
    </button>
  );
}
