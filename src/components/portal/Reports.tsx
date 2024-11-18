import React, { useState } from 'react';
import { FileText, Download, Calendar, Tag, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  title: string;
  type: 'Quarterly' | 'Annual' | 'Monthly' | 'Special';
  date: string;
  size: string;
  status: 'New' | 'Read';
  fund: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Q4 2023 Performance Report',
    type: 'Quarterly',
    date: '2024-01-15',
    size: '2.4 MB',
    status: 'New',
    fund: 'Growth Fund I'
  },
  {
    id: '2',
    title: 'Annual Report 2023',
    type: 'Annual',
    date: '2024-02-28',
    size: '5.1 MB',
    status: 'New',
    fund: 'Growth Fund I'
  },
  {
    id: '3',
    title: 'Monthly Update - January 2024',
    type: 'Monthly',
    date: '2024-02-05',
    size: '1.8 MB',
    status: 'Read',
    fund: 'Growth Fund I'
  },
  {
    id: '4',
    title: 'ESG Report 2023',
    type: 'Special',
    date: '2024-01-20',
    size: '3.2 MB',
    status: 'Read',
    fund: 'Growth Fund I'
  }
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFund, setSelectedFund] = useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesFund = selectedFund === 'all' || report.fund === selectedFund;
    return matchesSearch && matchesType && matchesFund;
  });

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'Quarterly':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Annual':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Monthly':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Special':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Access your investment reports and documents
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input w-full"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="input min-w-[150px]"
        >
          <option value="all">All Types</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Annual">Annual</option>
          <option value="Monthly">Monthly</option>
          <option value="Special">Special</option>
        </select>
        <select
          value={selectedFund}
          onChange={(e) => setSelectedFund(e.target.value)}
          className="input min-w-[150px]"
        >
          <option value="all">All Funds</option>
          <option value="Growth Fund I">Growth Fund I</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">{report.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(report.date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-sm">
                        <Tag className="w-4 h-4 mr-1" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{report.size}</span>
                      {report.status === 'New' && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200">
                  <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No reports found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}