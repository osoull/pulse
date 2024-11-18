import React from 'react';
import { Fund } from '../types';
import { TrendingUp, Activity } from 'lucide-react';

const funds: Fund[] = [
  {
    id: '1',
    name: 'Growth Fund I',
    strategy: 'Growth Equity',
    aum: 750000000,
    vintage: 2020,
    irr: 25.3,
    multiple: 2.1,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Buyout Fund III',
    strategy: 'LBO',
    aum: 1200000000,
    vintage: 2019,
    irr: 18.7,
    multiple: 1.8,
    status: 'Fully Invested'
  },
  {
    id: '3',
    name: 'Tech Opportunities',
    strategy: 'Growth Equity',
    aum: 550000000,
    vintage: 2021,
    irr: 31.2,
    multiple: 1.6,
    status: 'Active'
  }
];

export default function FundList() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Fonds d'Investissement</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Nouveau Fonds
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom du Fonds
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stratégie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AUM
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Millésime
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {funds.map((fund) => (
              <tr key={fund.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{fund.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{fund.strategy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {(fund.aum / 1000000).toFixed(0)}M€
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{fund.vintage}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">{fund.irr.toFixed(1)}% TRI</span>
                    <span className="text-sm text-gray-500">({fund.multiple.toFixed(1)}x)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={fund.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Fund['status'] }) {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Fully Invested': 'bg-blue-100 text-blue-800',
    'Harvesting': 'bg-yellow-100 text-yellow-800',
    'Closed': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
}