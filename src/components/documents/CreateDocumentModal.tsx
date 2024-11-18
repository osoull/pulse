import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import RequiredLabel from '../common/RequiredLabel';
import FormError from '../common/FormError';

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateDocumentModal({
  isOpen,
  onClose,
  onSubmit
}: CreateDocumentModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const handleFormSubmit = (data: any) => {
    onSubmit({ ...data, files });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold dark:text-white">Upload New Document</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="space-y-6">
            <div>
              <RequiredLabel text="Document Title" />
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="input"
                placeholder="Enter document title"
              />
              <FormError message={errors.title?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Document Type" />
              <select
                {...register('type', { required: 'Type is required' })}
                className="input"
              >
                <option value="">Select type</option>
                <option value="Legal">Legal</option>
                <option value="Financial">Financial</option>
                <option value="KYC">KYC</option>
                <option value="Report">Report</option>
              </select>
              <FormError message={errors.type?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Related Project" />
              <input
                type="text"
                {...register('project', { required: 'Project is required' })}
                className="input"
                placeholder="Enter related project"
              />
              <FormError message={errors.project?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Related Investor" />
              <input
                type="text"
                {...register('investor', { required: 'Investor is required' })}
                className="input"
                placeholder="Enter related investor"
              />
              <FormError message={errors.investor?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Document Files" />
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
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                </div>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{file.name}</span>
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
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}