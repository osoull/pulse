import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, DollarSign, Calendar, FileText, Users, Clock } from 'lucide-react';
import { CapitalCall } from '../../../types/capitalCalls';
import { format } from 'date-fns';

interface CapitalCallDetailsProps {
  capitalCall: CapitalCall;
  isOpen: boolean;
  onClose: () => void;
}

export default function CapitalCallDetails({
  capitalCall,
  isOpen,
  onClose
}: CapitalCallDetailsProps) {
  const getStatusColor = (status: CapitalCall['status']) => {
    switch (status) {
      case 'Fully Paid':
        return 'bg-green-100 text-green-800';
      case 'Partially Paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                Capital Call #{capitalCall.callNumber}
              </Dialog.Title>
              <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(capitalCall.status)}`}>
                {capitalCall.status}
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
                  <label className="text-sm font-medium text-gray-500">Amount</label>
                  <p className="mt-1 text-2xl font-semibold">
                    ${(capitalCall.amount / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <p className="mt-1 flex items-center text-lg">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    {format(new Date(capitalCall.dueDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Called</label>
                  <p className="mt-1 text-lg">
                    {capitalCall.percentageCalled}% of commitment
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2 text-gray-400" />
                    {format(new Date(capitalCall.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Purpose</h3>
                <p className="text-gray-600 dark:text-gray-300">{capitalCall.purpose}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Documents</h3>
                <div className="space-y-2">
                  {capitalCall.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <FileText className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {capitalCall.payments && capitalCall.payments.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Payments</h3>
                  <div className="space-y-2">
                    {capitalCall.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            ${(payment.amount / 1000000).toFixed(1)}M
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(payment.paymentDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          payment.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {capitalCall.notes && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <p className="text-gray-600 dark:text-gray-300">{capitalCall.notes}</p>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}