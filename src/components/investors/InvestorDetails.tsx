import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Building2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import InvestorInteractionsList from '../investorRelations/interactions/InvestorInteractionsList';
import { format } from 'date-fns';

interface InvestorDetailsProps {
  investor: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestorDetails({
  investor,
  isOpen,
  onClose
}: InvestorDetailsProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                {investor.name}
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">{investor.type}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Investor Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span>{investor.type}</span>
                </div>
                {investor.email && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${investor.email}`} className="hover:text-primary">
                      {investor.email}
                    </a>
                  </div>
                )}
                {investor.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${investor.phone}`} className="hover:text-primary">
                      {investor.phone}
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{investor.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Since {format(new Date(investor.created_at), 'MMMM yyyy')}</span>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Commitment</p>
                  <p className="text-xl font-semibold mt-1">
                    ${(investor.investmentCapacity / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Active Investments</p>
                  <p className="text-xl font-semibold mt-1">
                    {investor.activeInvestments || 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Funds</p>
                  <p className="text-xl font-semibold mt-1">
                    {investor.totalFunds || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactions List */}
            <InvestorInteractionsList
              investorId={investor.id}
              investorName={investor.name}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}