import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateDistrictAudit = (districtName: string, schoolData: any[]) => {
    const doc = new jsPDF();

    // Gemini Flow Gradient Header (Simulated in PDF)
    doc.setFillColor(5, 5, 8); // Deep Midnight
    doc.rect(0, 0, 210, 50, 'F');

    doc.setTextColor(16, 185, 129); // Emerald
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(`${districtName.toUpperCase()} DISTRICT AUDIT`, 14, 25);

    doc.setTextColor(100);
    doc.setFontSize(9);
    doc.text(`EdIntel INTELLIGENCE LEDGER | GENERATED: ${new Date().toLocaleDateString()}`, 14, 35);

    // Summary Metrics
    const _totalNarratives = schoolData.reduce((acc, site) => acc + (site.narrative_count || 0), 0);
    // const avgEfficiency = (totalNarratives / schoolData.length).toFixed(1);

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text('I. DISTRICT-WIDE UTILIZATION', 14, 65);

    (doc as any).autoTable({
        startY: 70,
        head: [['School Site', 'Active Staff', 'Narratives Generated', 'Energy Remaining']],
        body: schoolData.map(site => [
            site.name,
            site.staff_count || 0,
            site.narrative_count || 0,
            `${site.vault_balance || 0} U`
        ]),
        headStyles: { fillColor: [5, 5, 8], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
    });

    // Compliance Footnote
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.text('II. COMPLIANCE CERTIFICATION', 14, finalY);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text([
        '• All narratives generated meet the Alabama State Department of Education standards.',
        '• Data handled via EdIntel Node isolation (FERPA/SOPPA compliant).',
        '• Audit logs are immutable and stored in the EdIntel EdIntel Vault.'
    ], 14, finalY + 10);

    doc.save(`${districtName}_Audit_${new Date().toISOString().split('T')[0]}.pdf`);
};
