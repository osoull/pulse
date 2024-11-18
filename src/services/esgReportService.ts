import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface ESGReportData {
  fundName: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  environmentalMetrics: Array<{ name: string; value: number; target?: number }>;
  socialMetrics: Array<{ name: string; value: number }>;
  governanceMetrics: Array<{ name: string; value: number }>;
  trends: Array<{ year: string; score: number }>;
}

export function generateESGReport(data: ESGReportData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const primaryColor = [26, 27, 93]; // #1A1B5D
  const goldColor = [197, 165, 114]; // #C5A572

  // Header with branding
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('PULSE', 20, 20);
  doc.setFontSize(12);
  doc.text('by Osoul Capital Partners', 20, 30);

  // Report Title
  doc.setFontSize(20);
  doc.text('ESG Analytics Report', pageWidth / 2, 60, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(...goldColor);
  doc.text(data.fundName, pageWidth / 2, 70, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${format(new Date(), 'MMMM d, yyyy')}`, pageWidth / 2, 80, { align: 'center' });

  // ESG Scores Summary
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.text('ESG Scores Overview', 20, 100);

  const scores = [
    ['Environmental Score', `${data.environmentalScore}%`],
    ['Social Score', `${data.socialScore}%`],
    ['Governance Score', `${data.governanceScore}%`],
    ['Overall ESG Score', `${((data.environmentalScore + data.socialScore + data.governanceScore) / 3).toFixed(1)}%`]
  ];

  autoTable(doc, {
    startY: 110,
    head: [['Category', 'Score']],
    body: scores,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255]
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  // Environmental Metrics
  doc.setFontSize(16);
  doc.text('Environmental Metrics', 20, doc.lastAutoTable.finalY + 20);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [['Metric', 'Current', 'Target']],
    body: data.environmentalMetrics.map(m => [m.name, `${m.value}%`, m.target ? `${m.target}%` : '-']),
    theme: 'striped',
    headStyles: {
      fillColor: [46, 125, 50], // Green
      textColor: [255, 255, 255]
    }
  });

  // Social Metrics
  doc.addPage();
  doc.text('Social Metrics', 20, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Metric', 'Score']],
    body: data.socialMetrics.map(m => [m.name, `${m.value}%`]),
    theme: 'striped',
    headStyles: {
      fillColor: [25, 118, 210], // Blue
      textColor: [255, 255, 255]
    }
  });

  // Governance Metrics
  doc.text('Governance Metrics', 20, doc.lastAutoTable.finalY + 20);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [['Metric', 'Score']],
    body: data.governanceMetrics.map(m => [m.name, `${m.value}%`]),
    theme: 'striped',
    headStyles: {
      fillColor: [123, 31, 162], // Purple
      textColor: [255, 255, 255]
    }
  });

  // Historical Trends
  doc.text('ESG Score Evolution', 20, doc.lastAutoTable.finalY + 20);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [['Year', 'ESG Score']],
    body: data.trends.map(t => [t.year, `${t.score}%`]),
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255]
    }
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(`esg-report-${data.fundName.toLowerCase().replace(/\s+/g, '-')}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}