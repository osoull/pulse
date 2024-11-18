import React from 'react';
import { Save } from 'lucide-react';
import { FundStructure } from '../../../types/funds';

interface FundStructureFormProps {
  structure: FundStructure;
  onChange: (structure: FundStructure) => void;
  onSave: () => void;
  isSaving?: boolean;
}

export default function FundStructureForm({ 
  structure, 
  onChange,
  onSave,
  isSaving = false 
}: FundStructureFormProps) {
  const handleChange = (field: keyof FundStructure, value: any) => {
    onChange({
      ...structure,
      [field]: value
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Fund Structure</h2>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save & Calculate'}</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Target Size ($M)
          </label>
          <input
            type="number"
            value={structure.targetSize}
            onChange={(e) => handleChange('targetSize', Number(e.target.value))}
            className="mt-1 input"
            min="0"
            step="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Management Fee (%)
          </label>
          <input
            type="number"
            value={structure.managementFee}
            onChange={(e) => handleChange('managementFee', Number(e.target.value))}
            className="mt-1 input"
            min="0"
            max="5"
            step="0.25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Hurdle Rate (%)
          </label>
          <input
            type="number"
            value={structure.hurdleRate}
            onChange={(e) => handleChange('hurdleRate', Number(e.target.value))}
            className="mt-1 input"
            min="0"
            max="20"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Carry Rate (%)
          </label>
          <input
            type="number"
            value={structure.carryRate}
            onChange={(e) => handleChange('carryRate', Number(e.target.value))}
            className="mt-1 input"
            min="0"
            max="30"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Investment Period (Years)
          </label>
          <input
            type="number"
            value={structure.investmentPeriod}
            onChange={(e) => handleChange('investmentPeriod', Number(e.target.value))}
            className="mt-1 input"
            min="1"
            max="10"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fund Term (Years)
          </label>
          <input
            type="number"
            value={structure.fundTerm}
            onChange={(e) => handleChange('fundTerm', Number(e.target.value))}
            className="mt-1 input"
            min="5"
            max="15"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expected Multiple (x)
          </label>
          <input
            type="number"
            value={structure.expectedReturns.multiple}
            onChange={(e) => handleChange('expectedReturns', {
              ...structure.expectedReturns,
              multiple: Number(e.target.value)
            })}
            className="mt-1 input"
            min="1"
            max="5"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expected IRR (%)
          </label>
          <input
            type="number"
            value={structure.expectedReturns.irr}
            onChange={(e) => handleChange('expectedReturns', {
              ...structure.expectedReturns,
              irr: Number(e.target.value)
            })}
            className="mt-1 input"
            min="0"
            max="50"
            step="1"
          />
        </div>
      </div>
    </div>
  );
}