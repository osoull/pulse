import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, FileText, DollarSign, Calendar, Percent, Building2 } from 'lucide-react';
import RequiredLabel from '../common/RequiredLabel';
import FormError from '../common/FormError';

const investmentSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  sector: z.string().min(1, "Sector is required"),
  amount: z.number().min(1, "Investment amount is required"),
  ownership_percentage: z.number().min(0).max(100, "Percentage must be between 0 and 100"),
  investment_date: z.string().min(1, "Investment date is required"),
  valuation: z.number().min(1, "Valuation is required")
});

type InvestmentFormData = z.infer<typeof investmentSchema>;

interface CreateInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateInvestmentModal({
  isOpen,
  onClose,
  onSubmit
}: CreateInvestmentModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      company_name: '',
      sector: '',
      amount: 0,
      ownership_percentage: 0,
      investment_date: new Date().toISOString().split('T')[0],
      valuation: 0
    }
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: InvestmentFormData) => {
    const formattedData = {
      ...data,
      amount: Number(data.amount),
      ownership_percentage: Number(data.ownership_percentage),
      valuation: Number(data.valuation),
      files
    };
    onSubmit(formattedData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold dark:text-white">New Investment</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RequiredLabel text="Company Name" />
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('company_name')}
                  className="pl-10 input"
                  placeholder="Enter company name"
                />
              </div>
              <FormError message={errors.company_name?.message} />
            </div>

            <div>
              <RequiredLabel text="Sector" />
              <select
                {...register('sector')}
                className="input"
              >
                <option value="">Select sector</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Industry">Industry</option>
                <option value="Consumer">Consumer</option>
                <option value="Energy">Energy</option>
              </select>
              <FormError message={errors.sector?.message} />
            </div>

            <div>
              <RequiredLabel text="Investment Amount ($)" />
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
              <FormError message={errors.amount?.message} />
            </div>

            <div>
              <RequiredLabel text="Ownership Percentage (%)" />
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('ownership_percentage', { valueAsNumber: true })}
                  className="pl-10 input"
                  placeholder="Enter percentage"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <FormError message={errors.ownership_percentage?.message} />
            </div>

            <div>
              <RequiredLabel text="Investment Date" />
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  {...register('investment_date')}
                  className="pl-10 input"
                />
              </div>
              <FormError message={errors.investment_date?.message} />
            </div>

            <div>
              <RequiredLabel text="Initial Valuation ($)" />
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('valuation', { valueAsNumber: true })}
                  className="pl-10 input"
                  placeholder="Enter valuation"
                />
              </div>
              <FormError message={errors.valuation?.message} />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Initial Documents
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
                  PDF, DOC up to 10MB
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
              Create Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}