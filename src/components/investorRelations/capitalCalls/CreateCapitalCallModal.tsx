import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, DollarSign, Calendar, Upload, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalCallSchema } from '../../../types/capitalCalls';

interface CreateCapitalCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateCapitalCallModal({
  isOpen,
  onClose,
  onSubmit
}: CreateCapitalCallModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(capitalCallSchema)
  });

  const [documents, setDocuments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      documents
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                New Capital Call
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Create a new capital call notice
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
                  Fund
                </label>
                <select
                  {...register('fundId')}
                  className="mt-1 input"
                >
                  <option value="">Select fund</option>
                  <option value="fund1">Growth Fund I</option>
                  <option value="fund2">Buyout Fund II</option>
                </select>
                {errors.fundId && (
                  <p className="mt-1 text-sm text-red-600">{errors.fundId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount ($)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
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
                  Due Date
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    {...register('dueDate')}
                    className="pl-10 input"
                  />
                </div>
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Purpose
                </label>
                <textarea
                  {...register('purpose')}
                  rows={3}
                  className="mt-1 input"
                  placeholder="Enter purpose of capital call"
                />
                {errors.purpose && (
                  <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recipients
                </label>
                <select
                  multiple
                  {...register('recipients')}
                  className="mt-1 input"
                  size={4}
                >
                  <option value="all">All Fund Investors</option>
                  <option value="group1">Group 1 Investors</option>
                  <option value="group2">Group 2 Investors</option>
                </select>
                {errors.recipients && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipients.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Supporting Documents
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF or Word documents up to 10MB each
                    </p>
                  </div>
                </div>
                {documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Selected files:</p>
                    <ul className="mt-1 text-sm text-gray-600">
                      {documents.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
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
                  placeholder="Enter any additional notes..."
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
                Create Capital Call
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}