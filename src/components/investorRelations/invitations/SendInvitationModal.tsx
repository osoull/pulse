import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const invitationSchema = z.object({
  type: z.enum(['Fund', 'Meeting', 'Report', 'Other']),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  expiryDate: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

interface SendInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  investorId: string;
  investorName: string;
}

export default function SendInvitationModal({
  isOpen,
  onClose,
  onSubmit,
  investorId,
  investorName
}: SendInvitationModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(invitationSchema)
  });

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      investorId
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                Send Invitation
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                To: {investorName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Invitation Type
                </label>
                <select
                  {...register('type')}
                  className="mt-1 input"
                >
                  <option value="Fund">Fund Subscription</option>
                  <option value="Meeting">Meeting Invitation</option>
                  <option value="Report">Report Access</option>
                  <option value="Other">Other</option>
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
                  placeholder="Enter invitation subject"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="mt-1 input"
                  placeholder="Enter invitation message"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  {...register('expiryDate')}
                  className="mt-1 input"
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
                className="btn-primary flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Invitation</span>
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}