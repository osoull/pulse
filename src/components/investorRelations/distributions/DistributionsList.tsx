import React from 'react';
import { Banknote, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Distribution } from '../../../types/investorRelations';

interface DistributionsListProps {
  limit?: number;
}

const mockDistributions: Distribution[] = [
  {
    id: '1',
    fundId: '1',
    distributionNumber: 5,
    amount: 15000000,
    date: '2024-02-15',
    type: 'Capital Gain',
    description: 'Exit proceeds from TechCo investment',
    status: 'Completed',
    recipients: ['all'],
    documents: ['distribution_notice.pdf']
  },
  // Add more mock distributions as needed
];

export default function DistributionsList({ limit }: DistributionsListProps) {
  const distributions = limit ? mockDistributions.slice(0, limit) : mockDistributions;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Distributions</h2>
        <a href="/investor-relations/distributions" className="text-primary hover:text-primary-dark text-sm">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {distributions.map((distribution) => (
          <div
            key={distribution.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">
                  Distribution #{distribution.distributionNumber}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    ${(distribution.amount / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {distribution.type}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(distribution.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                distribution.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : distribution.status === 'Processed'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {distribution.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {distributions.length === 0 && (
          <div className="text-center py-8">
            <Banknote className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No distributions available</p>
          </div>
        )}
      </div>
    </div>
  );
}