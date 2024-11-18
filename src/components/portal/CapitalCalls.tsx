import React from 'react';
import { DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { CapitalCall } from '../../types/capitalCalls';

const mockCapitalCalls: CapitalCall[] = [
  {
    id: '1',
    fundId: '1',
    callNumber: 3,
    amount: 500000,
    dueDate: '2024-03-15',
    purpose: 'Investment in TechCo',
    status: 'Pending',
    totalCommitment: 2000000,
    percentageCalled: 75,
    recipients: ['all'],
    documents: ['capital_call_notice_3.pdf'],
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    fundId: '1',
    callNumber: 2,
    amount: 750000,
    dueDate: '2024-02-01',
    purpose: 'Follow-on Investment',
    status: 'Paid',
    totalCommitment: 2000000,
    percentageCalled: 50,
    recipients: ['all'],
    documents: ['capital_call_notice_2.pdf'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export default function CapitalCalls() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Capital Calls</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          View and manage your capital call notices
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">
                ${(2000000).toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Commitment</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">
                ${(1250000).toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Called</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">
                ${(750000).toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Commitment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Capital Calls List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="space-y-4">
            {mockCapitalCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
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
                        ${call.amount.toLocaleString()}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        Due: {format(new Date(call.dueDate), 'MMM d, yyyy')}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {call.purpose}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    call.status === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : call.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {call.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}

            {mockCapitalCalls.length === 0 && (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No capital calls</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}