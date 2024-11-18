import React, { useState } from 'react';
import { Calculator, AlertTriangle } from 'lucide-react';
import { analyzeFundSizing, FundSizingParams, FundSizingResult } from '../../../services/openaiService';

interface FundSizingAnalysisProps {
  onAnalysisComplete: (result: FundSizingResult) => void;
}

export default function FundSizingAnalysis({ onAnalysisComplete }: FundSizingAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FundSizingParams>({
    strategy: '',
    sector: '',
    region: '',
    targetDeals: 10,
    avgDealSize: 50000000,
    investmentPeriod: 5,
    marketConditions: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeFundSizing(formData);
      onAnalysisComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze fund sizing');
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (field: keyof FundSizingParams, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">AI-Powered Fund Sizing Analysis</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Investment Strategy
            </label>
            <select
              value={formData.strategy}
              onChange={(e) => setFormData(prev => ({ ...prev, strategy: e.target.value }))}
              className="mt-1 input"
              required
            >
              <option value="">Select strategy</option>
              <option value="Growth Equity">Growth Equity</option>
              <option value="Buyout">Buyout</option>
              <option value="Venture Capital">Venture Capital</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Sector
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
              <option value="Industrial">Industrial</option>
              <option value="Financial Services">Financial Services</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Geographic Region
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Number of Deals
            </label>
            <input
              type="number"
              value={formData.targetDeals || ''}
              onChange={(e) => handleNumberChange('targetDeals', e.target.value)}
              className="mt-1 input"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Average Deal Size ($M)
            </label>
            <input
              type="number"
              value={(formData.avgDealSize / 1000000) || ''}
              onChange={(e) => handleNumberChange('avgDealSize', String(Number(e.target.value) * 1000000))}
              className="mt-1 input"
              min="1"
              step="0.1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={formData.investmentPeriod || ''}
              onChange={(e) => handleNumberChange('investmentPeriod', e.target.value)}
              className="mt-1 input"
              min="1"
              max="10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Market Conditions (Optional)
          </label>
          <textarea
            value={formData.marketConditions}
            onChange={(e) => setFormData(prev => ({ ...prev, marketConditions: e.target.value }))}
            className="mt-1 input"
            rows={3}
            placeholder="Describe current market conditions, trends, or specific considerations..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Analyzing...' : 'Analyze Fund Size'}
          </button>
        </div>
      </form>
    </div>
  );
}