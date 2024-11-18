import React from 'react';
import { ValuationResult } from '../../../services/openaiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ValuationResultsProps {
  result: ValuationResult;
}

export default function ValuationResults({ result }: ValuationResultsProps) {
  const comparablesData = result.comparables.map(comp => ({
    name: comp.company,
    multiple: comp.multiple
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Valuation Analysis Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Pre-Money Valuation</h3>
          <p className="text-3xl font-bold text-primary">
            ${(result.preMoney / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Post-Money Valuation</h3>
          <p className="text-3xl font-bold text-primary">
            ${(result.postMoney / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Methodology</h3>
          <p className="text-gray-600 dark:text-gray-300">{result.methodology}</p>
        </div>

        {(result.multiples.revenue || result.multiples.ebitda) && (
          <div>
            <h3 className="text-lg font-medium mb-2">Applied Multiples</h3>
            <div className="grid grid-cols-2 gap-4">
              {result.multiples.revenue && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500">Revenue Multiple</p>
                  <p className="text-xl font-semibold">{result.multiples.revenue}x</p>
                </div>
              )}
              {result.multiples.ebitda && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500">EBITDA Multiple</p>
                  <p className="text-xl font-semibold">{result.multiples.ebitda}x</p>
                </div>
              )}
            </div>
          </div>
        )}

        {result.comparables.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Comparable Companies Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparablesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="multiple" fill="#1A1B5D" name="Multiple" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium mb-2">Valuation Rationale</h3>
          <p className="text-gray-600 dark:text-gray-300">{result.rationale}</p>
        </div>
      </div>
    </div>
  );
}