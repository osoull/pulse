import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Upload, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const reportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['Quarterly', 'Annual', 'Capital Call', 'Distribution', 'Other']),
  fundId: z.string().min(1, 'Fund is required'),
  date: z.string().min(1, 'Date is required'),
  recipients: z.array(z.string()).min(1, 'At least one recipient is required')
});

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateReportModal({
  isOpen,
  onClose,
  onSubmit
}: CreateReportModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(reportSchema)
  });

  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      files
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
                Create New Report
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Create and distribute investor report
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
                  Report Title
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="mt-1 input"
                  placeholder="Enter report title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Report Type
                </label>
                <select
                  {...register('type')}
                  className="mt-1 input"
                >
                  <option value="">Select type</option>
                  <option value="Quarterly">Quarterly Report</option>
                  <option value="Annual">Annual Report</option>
                  <option value="Capital Call">Capital Call Notice</option>
                  <option value="Distribution">Distribution Notice</option>
                  <option value="Other">Other</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fund
                </label>
                <select
                  {...register('fundId')}
                  className="mt-1 input"
                >
                  <option value="">Select fund</option>
                  <option value="1">Growth Fund I</option>
                  <option value="2">Buyout Fund II</option>
                </select>
                {errors.fundId && (
                  <p className="mt-1 text-sm text-red-600">{errors.fundId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Report Date
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
                  Recipients
                </label>
                <select
                  multiple
                  {...register('recipients')}
                  className="mt-1 input"
                  size={3}
                >
                  <option value="all">All Investors</option>
                  <option value="lpac">LPAC Members Only</option>
                  <option value="custom">Custom Selection</option>
                </select>
                {errors.recipients && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipients.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Attachments
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
                          accept=".pdf,.doc,.docx,.xlsx"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, Word, or Excel files up to 50MB
                    </p>
                  </div>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {file.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
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
                Create Report
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}