import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Mail, Phone, Calendar, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const interactionSchema = z.object({
  type: z.enum(['Email', 'Call', 'Meeting', 'Portal']),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  outcome: z.string().optional(),
  nextSteps: z.string().optional(),
  assignedTo: z.string().optional()
});

interface CreateInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  investorName: string;
}

export default function CreateInteractionModal({
  isOpen,
  onClose,
  onSubmit,
  investorName
}: CreateInteractionModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(interactionSchema),
    defaultValues: {
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
                Record Interaction
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                With: {investorName}
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
                  Interaction Type
                </label>
                <select
                  {...register('type')}
                  className="mt-1 input"
                >
                  <option value="Email">Email</option>
                  <option value="Call">Call</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Portal">Portal</option>
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
                  placeholder="Enter interaction subject"
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
                  placeholder="Enter interaction details"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

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
                  Outcome
                </label>
                <input
                  type="text"
                  {...register('outcome')}
                  className="mt-1 input"
                  placeholder="Optional outcome or result"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Next Steps
                </label>
                <input
                  type="text"
                  {...register('nextSteps')}
                  className="mt-1 input"
                  placeholder="Optional next steps"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assigned To
                </label>
                <select
                  {...register('assignedTo')}
                  className="mt-1 input"
                >
                  <option value="">Select team member</option>
                  <option value="john.smith">John Smith</option>
                  <option value="sarah.johnson">Sarah Johnson</option>
                  <option value="michael.brown">Michael Brown</option>
                </select>
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
                Record Interaction
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}