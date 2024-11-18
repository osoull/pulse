import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { InvestorQuery } from '../../../types/investorRelations';

interface InvestorQueriesProps {
  limit?: number;
}

const mockQueries: InvestorQuery[] = [
  {
    id: '1',
    investorId: '1',
    subject: 'Q4 Performance Clarification',
    description: 'Request for additional details on Q4 performance metrics',
    category: 'Performance',
    priority: 'High',
    status: 'Open',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
    assignedTo: 'sarah.johnson@osoul.partners',
    responses: []
  },
  // Add more mock queries as needed
];

export default function InvestorQueries({ limit }: InvestorQueriesProps) {
  const queries = limit ? mockQueries.slice(0, limit) : mockQueries;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Investor Queries</h2>
        <a href="/investor-relations/queries" className="text-primary hover:text-primary-dark text-sm">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {queries.map((query) => (
          <div
            key={query.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{query.subject}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {query.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(query.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                query.priority === 'High'
                  ? 'bg-red-100 text-red-800'
                  : query.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {query.priority}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                query.status === 'Open'
                  ? 'bg-blue-100 text-blue-800'
                  : query.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : query.status === 'Resolved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {query.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {queries.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No queries found</p>
          </div>
        )}
      </div>
    </div>
  );
}