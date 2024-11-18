import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { InvestorPreference } from '../../../types/investorRelations';

interface InvestorPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<InvestorPreference>) => void;
  preferences: InvestorPreference | null;
  investorId: string;
}

export default function InvestorPreferencesModal({
  isOpen,
  onClose,
  onSubmit,
  preferences,
  investorId
}: InvestorPreferencesModalProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: preferences || {
      investorId,
      communicationFrequency: 'Monthly',
      preferredMethod: 'Email',
      reportFormat: 'PDF',
      subscriptions: {
        performance: true,
        capitalCalls: true,
        distributions: true,
        meetings: true
      }
    }
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <Dialog.Title className="text-xl font-semibold dark:text-white">
              Communication Preferences
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Communication Frequency
                </label>
                <select
                  {...register('communicationFrequency')}
                  className="mt-1 input"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preferred Method
                </label>
                <select
                  {...register('preferredMethod')}
                  className="mt-1 input"
                >
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Portal">Portal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Report Format
                </label>
                <select
                  {...register('reportFormat')}
                  className="mt-1 input"
                >
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Subscriptions
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('subscriptions.performance')}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Performance Updates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('subscriptions.capitalCalls')}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Capital Calls</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('subscriptions.distributions')}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Distributions</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('subscriptions.meetings')}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Meeting Invitations</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}