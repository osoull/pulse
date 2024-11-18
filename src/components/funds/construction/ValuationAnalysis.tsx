import React, { useState } from 'react';
import { Calculator, AlertTriangle } from 'lucide-react';
import { analyzeValuation, ValuationResult } from '../../../services/openaiService';

interface ValuationAnalysisProps {
  onAnalysisComplete: (result: ValuationResult) => void;
}

export default function ValuationAnalysis({ onAnalysisComplete }: ValuationAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    stage: '',
    sector: '',
    region: '',
    metrics: {
      revenue: 0,
      ebitda: 0,
      growth: 0,
      margins: 0
    },
    comparables: ['']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeValuation(formData);
      onAnalysisComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze valuation');
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [field]: numValue
      }
    }));
  };

  const handleComparableChange = (index: number, value: string) => {
    const newComparables = [...formData.comparables];
    newComparables[index] = value;
    setFormData(prev => ({
      ...prev,
      comparables: newComparables
    }));
  };

  const addComparable = () => {
    setFormData(prev => ({
      ...prev,
      comparables: [...prev.comparables, '']
    }));
  };

  const removeComparable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      comparables: prev.comparables.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Valuation Analysis</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Investment Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
              className="mt-1 input"
              required
            >
              <option value="">Select stage</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Growth">Growth</option>
              <option value="Pre-IPO">Pre-IPO</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sector
            </label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
              className="mt-1 input"
              required
            >
              <option value="">Select sector</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Consumer">Consumer</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Region
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
              className="mt-1 input"
              required
            >
              <option value="">Select region</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Middle East">Middle East</option>
              <option value="Global">Global</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Revenue ($M)
            </label>
            <input
              type="number"
              value={formData.metrics.revenue || ''}
              onChange={(e) => handleNumberChange('revenue', e.target.value)}
              className="mt-1 input"
              placeholder="Enter annual revenue"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              EBITDA ($M)
            </label>
            <input
              type="number"
              value={formData.metrics.ebitda || ''}
              onChange={(e) => handleNumberChange('ebitda', e.target.value)}
              className="mt-1 input"
              placeholder="Enter EBITDA"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Growth Rate (%)
            </label>
            <input
              type="number"
              value={formData.metrics.growth || ''}
              onChange={(e) => handleNumberChange('growth', e.target.value)}
              className="mt-1 input"
              placeholder="Enter growth rate"
              min="0"
              max="1000"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Margins (%)
            </label>
            <input
              type="number"
              value={formData.metrics.margins || ''}
              onChange={(e) => handleNumberChange('margins', e.target.value)}
              className="mt-1 input"
              placeholder="Enter margins"
              min="-100"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Comparable Companies
            </label>
            <button
              type="button"
              onClick={addComparable}
              className="text-primary hover:text-primary-dark text-sm"
            >
              + Add Company
            </button>
          </div>
          <div className="space-y-2">
            {formData.comparables.map((comparable, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={comparable}
                  onChange={(e) => handleComparableChange(index, e.target.value)}
                  className="input flex-1"
                  placeholder="Enter comparable company name"
                />
                {formData.comparables.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeComparable(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Analyzing...' : 'Analyze Valuation'}
          </button>
        </div>
      </form>
    </div>
  );
}