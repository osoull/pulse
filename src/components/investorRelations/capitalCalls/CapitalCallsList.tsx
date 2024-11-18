import React, { useState } from 'react';
import { DollarSign, Calendar, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { CapitalCall } from '../../../types/capitalCalls';
import CreateCapitalCallModal from './CreateCapitalCallModal';
import CapitalCallDetails from './CapitalCallDetails';

interface CapitalCallsListProps {
  limit?: number;
}

const mockCapitalCalls: CapitalCall[] = [
  {
    id: '1',
    fundId: '1',
    callNumber: 3,
    amount: 25000000,
    dueDate: '2024-03-15',
    purpose: 'Investment in TechCo',
    status: 'Sent',
    totalCommitment: 100000000,
    percentageCalled: 75,
    recipients: ['all'],
    documents: ['capital_call_notice.pdf'],
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  }
];

export default function CapitalCallsList({ limit }: CapitalCallsListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CapitalCall | null>(null);
  const [capitalCalls, setCapitalCalls] = useState<CapitalCall[]>(mockCapitalCalls);

  const handleCreateCapitalCall = async (data: any) => {
    try {
      // In a real app, this would be an API call
      const newCapitalCall: CapitalCall = {
        id: Math.random().toString(36).substr(2, 9),
        callNumber: capitalCalls.length + 1,
        status: 'Draft',
        totalCommitment: 100000000, // This would come from the fund data
        percentageCalled: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data
      };

      setCapitalCalls([...capitalCalls, newCapitalCall]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating capital call:', error);
    }
  };

  const filteredCalls = limit ? capitalCalls.slice(0, limit) : capitalCalls;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Capital Calls</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Capital Call</span>
          </button>
          {!limit && (
            <a href="/investor-relations/capital-calls" className="text-primary hover:text-primary-dark text-sm">
              View All
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <div
            key={call.id}
            onClick={() => setSelectedCall(call)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">
                  Capital Call #{call.callNumber}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    ${(call.amount / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    Due: {format(new Date(call.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                call.status === 'Fully Paid'
                  ? 'bg-green-100 text-green-800'
                  : call.status === 'Partially Paid'
                  ? 'bg-yellow-100 text-yellow-800'
                  : call.status === 'Sent'
                  ? 'bg-blue-100 text-blue-800'
                  : call.status === 'Overdue'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {call.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {filteredCalls.length === 0 && (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No capital calls available</p>
          </div>
        )}
      </div>

      <CreateCapitalCallModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCapitalCall}
      />

      {selectedCall && (
        <CapitalCallDetails
          capitalCall={selectedCall}
          isOpen={!!selectedCall}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </div>
  );
}