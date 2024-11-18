import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Phone, Calendar, Clock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const callSchema = z.object({
  contactId: z.string().min(1, 'Contact is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  subject: z.string().min(1, 'Subject is required'),
  scheduledAt: z.string().min(1, 'Date and time are required'),
  duration: z.number().min(1, 'Duration is required'),
  notes: z.string().optional()
});

interface CreateCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateCallModal({
  isOpen,
  onClose,
  onSubmit
}: CreateCallModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(callSchema)
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                Schedule Call
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Schedule a call with an investor
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
                  Contact
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    {...register('contactId')}
                    className="pl-10 input"
                  >
                    <option value="">Select contact</option>
                    <option value="1">John Smith - Global Pension Fund</option>
                    <option value="2">Sarah Johnson - Family Office</option>
                  </select>
                </div>
                {errors.contactId && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register('subject')}
                    className="pl-10 input"
                    placeholder="Enter call subject"
                  />
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date and Time
                </label>
                <div className="mt-1 relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="datetime-local"
                    {...register('scheduledAt')}
                    className="pl-10 input"
                  />
                </div>
                {errors.scheduledAt && (
                  <p className="mt-1 text-sm text-red-600">{errors.scheduledAt.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration (minutes)
                </label>
                <div className="mt-1 relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    {...register('duration', { valueAsNumber: true })}
                    className="pl-10 input"
                    placeholder="Enter duration in minutes"
                    min="15"
                    step="15"
                  />
                </div>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="mt-1 input"
                  placeholder="Add any call notes or agenda items..."
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
                Schedule Call
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}