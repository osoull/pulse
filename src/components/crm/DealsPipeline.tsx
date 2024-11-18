import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { CRMDeal } from '../../types/crm';
import { format } from 'date-fns';

interface DealsPipelineProps {
  deals: CRMDeal[];
  filter: string;
}

export default function DealsPipeline({ deals, filter }: DealsPipelineProps) {
  const filteredDeals = deals
    .filter(deal => filter === 'all' || deal.source?.toLowerCase() === filter)
    .sort((a, b) => b.amount - a.amount);

  const stages = ['Qualification', 'Proposal', 'Negotiation', 'Closing'];
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Deals Pipeline</h2>
        <div className="text-sm text-gray-500">
          Total Value: ${(totalValue / 1000000).toFixed(1)}M
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const stageDeals = filteredDeals.filter(deal => deal.stage === stage);
          const stageValue = stageDeals.reduce((sum, deal) => sum + deal.amount, 0);
          
          return (
            <div key={stage} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{stage}</h3>
                <span className="text-sm text-gray-500">
                  ${(stageValue / 1000000).toFixed(1)}M
                </span>
              </div>

              {stageDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium dark:text-white">{deal.title}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${(deal.amount / 1000000).toFixed(1)}M
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {format(new Date(deal.expectedCloseDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded-full ${
                        deal.probability >= 70
                          ? 'bg-green-100 text-green-800'
                          : deal.probability >= 40
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {deal.probability}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {stageDeals.length === 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center text-sm text-gray-500">
                  No deals in this stage
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}