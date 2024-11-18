import React from 'react';
import { Shield } from 'lucide-react';

const riskCategories = [
  { level: 'High', count: 2, color: 'bg-red-500' },
  { level: 'Medium', count: 5, color: 'bg-yellow-500' },
  { level: 'Low', count: 15, color: 'bg-green-500' }
];

export default function KYCRiskMatrix() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Risk Distribution</h2>
        <Shield className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {riskCategories.map((category) => (
          <div key={category.level}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{category.level} Risk</span>
              <span className="text-sm text-gray-500">{category.count} investors</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${category.color}`}
                style={{ width: `${(category.count / 22) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Risk Factors</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Jurisdiction</p>
            <p className="font-medium">30%</p>
          </div>
          <div>
            <p className="text-gray-500">Business Type</p>
            <p className="font-medium">25%</p>
          </div>
          <div>
            <p className="text-gray-500">Transaction Volume</p>
            <p className="font-medium">25%</p>
          </div>
          <div>
            <p className="text-gray-500">History</p>
            <p className="font-medium">20%</p>
          </div>
        </div>
      </div>
    </div>
  );
}