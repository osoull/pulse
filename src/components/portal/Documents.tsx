import React, { useState } from 'react';
import { FileText, Download, Calendar, Tag, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  status: 'New' | 'Read';
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Q4 2023 Performance Report',
    type: 'Report',
    date: '2024-01-15',
    size: '2.4 MB',
    status: 'New'
  },
  {
    id: '2',
    title: 'Capital Call Notice #5',
    type: 'Notice',
    date: '2024-01-10',
    size: '1.2 MB',
    status: 'Read'
  },
  {
    id: '3',
    title: 'Distribution Notice #3',
    type: 'Notice',
    date: '2024-01-05',
    size: '1.1 MB',
    status: 'Read'
  }
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Access your investment documents and reports
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input w-full"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="input w-48"
        >
          <option value="all">All Types</option>
          <option value="Report">Reports</option>
          <option value="Notice">Notices</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">{doc.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(doc.date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-sm">
                        <Tag className="w-4 h-4 mr-1" />
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {doc.type}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{doc.size}</span>
                      {doc.status === 'New' && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No documents found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}