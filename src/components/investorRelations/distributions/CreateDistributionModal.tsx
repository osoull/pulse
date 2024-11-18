import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Banknote, Calendar, Users, Calculator } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const distributionSchema = z.object({
  fundId: z.string().min(1, 'Fund is required'),
  type: z.enum(['Capital Gain', 'Income', 'Return of Capital']),
  amount: z.number().min(1, 'Amount is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  recipients: z.array(z.string()).min(1, 'At least one recipient is required'),
  notes: z.string().optional()
});

interface CreateDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateDistributionModal({
  isOpen,
  onClose,
  onSubmit
}: CreateDistributionModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(distributionSchema)
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                New Distribution
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Create a new distribution notice
              </p>
            </div>
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
                  Fund
                </label>
                <div className="mt-1 relative">
                  <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    {...register('fundId')}
                    className="pl-10 input"
                  >
                    <option value="">Select fund</option>
                    <option value="fund1">Growth Fund I</option>
                    <option value="fund2">Buyout Fund II</option>
                  </select>
                </div>
                {errors.fundId && (
                  <p className="mt-1 text-sm text-red-600">{errors.fundId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Distribution Type
                </label>
                <select
                  {...register('type')}
                  className="mt-1 input"
                >
                  <option value="Capital Gain">Capital Gain</option>
                  <option value="Income">Income</option>
                  <option value="Return of Capital">Return of Capital</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount ($)
                </label>
                <div className="mt-1 relative">
                  <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                    className="pl-10 input"
                    placeholder="Enter amount"
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Distribution Date
                </label>
                <div className="mt-1 relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    {...register('date')}
                    className="pl-10 input"
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 input"
                  placeholder="Enter distribution description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recipients
                </label>
                <div className="mt-1 relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    multiple
                    {...register('recipients')}
                    className="pl-10 input"
                    size={4}
                  >
                    <option value="all">All Fund Investors</option>
                    <option value="group1">Group 1 Investors</option>
                    <option value="group2">Group 2 Investors</option>
                  </select>
                </div>
                {errors.recipients && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipients.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="mt-1 input"
                  placeholder="Add any additional notes..."
                />
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
                className="btn-primary"
              >
                Create Distribution
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}