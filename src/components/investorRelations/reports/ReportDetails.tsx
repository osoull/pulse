import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Download, Calendar, Users, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { InvestorReport } from '../../../types/investorRelations';
import { useReport } from '../../../hooks/useReport';

interface ReportDetailsProps {
  report: InvestorReport;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportDetails({
  report,
  isOpen,
  onClose
}: ReportDetailsProps) {
  const { generateReport, isExporting } = useReport();

  const handleDownload = async () => {
    try {
      await generateReport({
        metadata: {
          title: report.title,
          subtitle: `${report.type} Report - ${format(new Date(report.date), 'MMMM yyyy')}`,
          orientation: 'portrait',
          date: new Date()
        },
        sections: [
          {
            title: 'Executive Summary',
            content: 'Performance summary for the period...'
          }
        ],
        tables: [
          {
            title: 'Key Metrics',
            headers: ['Metric', 'Value', 'Change'],
            rows: [
              ['AUM', '$2.4B', '+15%'],
              ['IRR', '25.3%', '+2.1%'],
              ['Multiple', '2.1x', '+0.2x']
            ]
          }
        ]
      });
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                {report.title}
              </Dialog.Title>
              <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                report.status === 'Published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {report.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="mt-1 text-lg font-medium">{report.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="mt-1 flex items-center text-lg">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    {format(new Date(report.date), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Recipients</label>
                  <p className="mt-1 flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-gray-400" />
                    {report.recipients.includes('all') ? 'All Investors' : 'Selected Investors'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Attachments</label>
                  <div className="mt-1 space-y-2">
                    {report.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        {attachment}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}