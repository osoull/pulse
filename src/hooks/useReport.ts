import { useState } from 'react';
import { ReportContent } from '../types/reports';
import { ReportGenerator } from '../services/reportService';

export function useReport() {
  const [isExporting, setIsExporting] = useState(false);

  const generateReport = async (content: ReportContent) => {
    try {
      setIsExporting(true);
      const report = new ReportGenerator(content.metadata);

      // Add tables
      content.tables?.forEach(table => {
        report.addTable(table.headers, table.rows, {
          title: table.title,
          headerColor: table.headerColor
        });
      });

      // Add charts
      content.charts?.forEach(chart => {
        report.addChart(chart.data, {
          title: chart.type
        });
      });

      // Add sections
      content.sections?.forEach(section => {
        report.addSection(section.title, section.content);
      });

      // Generate filename from title
      const filename = content.metadata.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      report.save(filename);
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    generateReport
  };
}