import React, { useState } from 'react';
import { Building2, DollarSign, Calendar, ChevronRight, Plus } from 'lucide-react';
import { CRMDeal } from '../../types/crm';
import { format } from 'date-fns';
import { useCRM } from '../../hooks/useCRM';
import CreateDealModal from './CreateDealModal';

export default function CRMDeals() {
  const { deals, loading, error, createDeal } = useCRM();
  const [selectedStage, setSelectedStage] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading deals. Please try again later.
      </div>
    );
  }

  const stages = ['Qualification', 'Proposal', 'Negotiation', 'Closing'];
  const filteredDeals = selectedStage === 'all' 
    ? deals 
    : deals.filter(deal => deal.stage === selectedStage);

  const handleCreateDeal = async (data: any) => {
    try {
      await createDeal(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating deal:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deals Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage investment opportunities</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="input py-2 px-4 min-w-[160px]"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary h-10 px-4 flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="space-y-6">
        {stages.map(stage => {
          const stageDeals = filteredDeals.filter(deal => deal.stage === stage);
          if (selectedStage !== 'all' && stage !== selectedStage) return null;

          return (
            <div key={stage} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{stage}</h2>
                <span className="text-sm text-gray-500">
                  {stageDeals.length} deals
                </span>
              </div>

              <div className="space-y-4">
                {stageDeals.map(deal => (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium dark:text-white">{deal.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">
                            ${(deal.amount / 1000000).toFixed(1)}M
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {deal.probability}% probability
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          Expected Close
                        </div>
                        <div className="font-medium">
                          {format(new Date(deal.expectedCloseDate || ''), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No deals in {stage} stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CreateDealModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateDeal}
      />
    </div>
  );
}