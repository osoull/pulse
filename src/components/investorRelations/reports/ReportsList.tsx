import React, { useState } from 'react';
import { FileText, Calendar, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { InvestorReport } from '../../../types/investorRelations';
import CreateReportModal from './CreateReportModal';
import ReportDetails from './ReportDetails';

interface ReportsListProps {
  limit?: number;
}

const mockReports: InvestorReport[] = [
  {
    id: '1',
    title: 'Q4 2023 Performance Report',
    type: 'Quarterly',
    date: '2024-01-15',
    fundId: '1',
    status: 'Published',
    recipients: ['all'],
    attachments: ['report.pdf']
  }
];

export default function ReportsList({ limit }: ReportsListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<InvestorReport | null>(null);
  const [reports, setReports] = useState<InvestorReport[]>(mockReports);

  const handleCreateReport = async (data: any) => {
    try {
      const newReport = {
        id: Math.random().toString(36).substr(2, 9),
        status: 'Draft',
        ...data,
        createdAt: new Date().toISOString()
      };
      setReports([...reports, newReport]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  const filteredReports = limit ? reports.slice(0, limit) : reports;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Investor Reports</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Report</span>
          </button>
          {!limit && (
            <a href="/investor-relations/reports" className="text-primary hover:text-primary-dark text-sm">
              View All
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{report.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {report.type}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(report.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                report.status === 'Published'
                  ? 'bg-green-100 text-green-800'
                  : report.status === 'Under Review'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {report.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No reports available</p>
          </div>
        )}
      </div>

      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReport}
      />

      {selectedReport && (
        <ReportDetails
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}