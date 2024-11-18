import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { fundSchema } from '../../validations/schemas';
import RequiredLabel from '../common/RequiredLabel';
import FormError from '../common/FormError';

interface CreateFundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateFundModal({ isOpen, onClose, onSubmit }: CreateFundModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(fundSchema)
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: any) => {
    // Convert monetary values to smallest unit (cents)
    const formattedData = {
      ...data,
      target_size: Number(data.target_size) * 1000000,
      hard_cap: Number(data.hard_cap) * 1000000,
      min_investment: Number(data.min_investment) * 1000000,
      max_investment: Number(data.max_investment) * 1000000,
      // Convert percentages to decimals
      management_fee: Number(data.management_fee) / 100,
      performance_fee: Number(data.performance_fee) / 100,
      hurdle_rate: data.hurdle_rate ? Number(data.hurdle_rate) / 100 : null,
      catch_up: data.catch_up ? Number(data.catch_up) / 100 : null,
      target_return: data.target_return ? Number(data.target_return) / 100 : null,
      max_ownership: data.max_ownership ? Number(data.max_ownership) / 100 : null
    };
    onSubmit(formattedData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Create New Fund</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RequiredLabel text="Fund Name" />
              <input
                type="text"
                {...register('name')}
                className="input"
                placeholder="Growth Fund I"
              />
              <FormError message={errors.name?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Strategy" />
              <select {...register('strategy')} className="input">
                <option value="">Select strategy</option>
                <option value="Growth Equity">Growth Equity</option>
                <option value="Buyout">Buyout</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Private Debt">Private Debt</option>
              </select>
              <FormError message={errors.strategy?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Target Size (M$)" />
              <input
                type="number"
                {...register('target_size', { valueAsNumber: true })}
                className="input"
                placeholder="500"
              />
              <FormError message={errors.target_size?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Hard Cap (M$)" />
              <input
                type="number"
                {...register('hard_cap', { valueAsNumber: true })}
                className="input"
                placeholder="750"
              />
              <FormError message={errors.hard_cap?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Vintage Year" />
              <input
                type="number"
                {...register('vintage', { valueAsNumber: true })}
                className="input"
                placeholder={new Date().getFullYear().toString()}
              />
              <FormError message={errors.vintage?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Investment Period (years)" />
              <input
                type="number"
                {...register('investment_period', { valueAsNumber: true })}
                className="input"
                placeholder="5"
              />
              <FormError message={errors.investment_period?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Fund Term (years)" />
              <input
                type="number"
                {...register('fund_term', { valueAsNumber: true })}
                className="input"
                placeholder="10"
              />
              <FormError message={errors.fund_term?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Management Fee (%)" />
              <input
                type="number"
                step="0.01"
                {...register('management_fee', { valueAsNumber: true })}
                className="input"
                placeholder="2.00"
              />
              <FormError message={errors.management_fee?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Performance Fee (%)" />
              <input
                type="number"
                step="0.01"
                {...register('performance_fee', { valueAsNumber: true })}
                className="input"
                placeholder="20.00"
              />
              <FormError message={errors.performance_fee?.message?.toString()} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Hurdle Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('hurdle_rate', { valueAsNumber: true })}
                className="input"
                placeholder="8.00"
              />
              <FormError message={errors.hurdle_rate?.message?.toString()} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Catch-up (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('catch_up', { valueAsNumber: true })}
                className="input"
                placeholder="100.00"
              />
              <FormError message={errors.catch_up?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Minimum Investment (M$)" />
              <input
                type="number"
                {...register('min_investment', { valueAsNumber: true })}
                className="input"
                placeholder="5"
              />
              <FormError message={errors.min_investment?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Maximum Investment (M$)" />
              <input
                type="number"
                {...register('max_investment', { valueAsNumber: true })}
                className="input"
                placeholder="50"
              />
              <FormError message={errors.max_investment?.message?.toString()} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Return (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('target_return', { valueAsNumber: true })}
                className="input"
                placeholder="25.00"
              />
              <FormError message={errors.target_return?.message?.toString()} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Maximum Ownership (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('max_ownership', { valueAsNumber: true })}
                className="input"
                placeholder="49.00"
              />
              <FormError message={errors.max_ownership?.message?.toString()} />
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
              Create Fund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}