import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const activitySchema = z.object({
  type: z.enum(['call', 'email', 'meeting', 'note']),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  duration: z.number().min(0).optional(),
  outcome: z.string().optional()
});

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  contactName: string;
}

export default function AddActivityModal({
  isOpen,
  onClose,
  onSubmit,
  contactName
}: AddActivityModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      type: 'note',
      date: new Date().toISOString().split('T')[0]
    }
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                Add Activity
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Record activity for {contactName}
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activity Type
                </label>
                <select
                  {...register('type')}
                  className="mt-1 input"
                >
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="note">Note</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  {...register('subject')}
                  className="mt-1 input"
                  placeholder="Enter activity subject"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
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
                  placeholder="Add activity details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="mt-1 input"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    {...register('duration', { valueAsNumber: true })}
                    className="mt-1 input"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Outcome
                </label>
                <input
                  type="text"
                  {...register('outcome')}
                  className="mt-1 input"
                  placeholder="Optional outcome or result"
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
                Add Activity
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}