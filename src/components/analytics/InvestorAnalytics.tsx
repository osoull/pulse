import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Globe, Building2, TrendingUp, Download } from 'lucide-react';
import { useReport } from '../../hooks/useReport';

const COLORS = ['#1A1B5D', '#2D2E7F', '#4F50A9', '#7172D2', '#9495EC'];

export default function InvestorAnalytics() {
  const { generateReport, isExporting } = useReport();
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const investorData = {
    typeDistribution: [
      { name: 'Pension Funds', value: 40 },
      { name: 'Sovereign Wealth', value: 25 },
      { name: 'Family Offices', value: 20 },
      { name: 'Insurance', value: 10 },
      { name: 'Others', value: 5 }
    ],
    geographicDistribution: [
      { name: 'North America', value: 35 },
      { name: 'Europe', value: 30 },
      { name: 'Asia', value: 20 },
      { name: 'Middle East', value: 10 },
      { name: 'Others', value: 5 }
    ],
    commitmentTrends: [
      { year: '2020', newCommitments: 500, totalCommitments: 500 },
      { year: '2021', newCommitments: 750, totalCommitments: 1250 },
      { year: '2022', newCommitments: 1000, totalCommitments: 2250 },
      { year: '2023', newCommitments: 1200, totalCommitments: 3450 }
    ]
  };

  const handleExport = async () => {
    try {
      await generateReport({
        metadata: {
          title: 'Investor Analytics Report',
          subtitle: `${selectedPeriod === 'year' ? 'Annual' : 'Quarterly'} Analysis`,
          orientation: 'landscape',
          date: new Date()
        },
        sections: [
          {
            title: 'Investor Distribution Overview',
            content: 'Analysis of investor types and geographical distribution across the portfolio.'
          }
        ],
        tables: [
          {
            title: 'Investor Type Distribution',
            headers: ['Type', 'Allocation (%)', 'AUM ($M)'],
            rows: investorData.typeDistribution.map(item => [
              item.name,
              `${item.value.toFixed(2)}%`,
              `${(item.value * 24).toFixed(2)}M`
            ])
          },
          {
            title: 'Geographic Distribution',
            headers: ['Region', 'Allocation (%)', 'Number of Investors'],
            rows: investorData.geographicDistribution.map(item => [
              item.name,
              `${item.value.toFixed(2)}%`,
              Math.floor(item.value * 0.85).toString()
            ])
          }
        ]
      });
    } catch (error) {
      console.error('Error exporting analytics:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investor Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Analysis of investor base and commitments</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input py-1"
          >
            <option value="year">Annual</option>
            <option value="quarter">Quarterly</option>
          </select>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Investors"
          value="85"
          icon={<Users className="w-6 h-6" />}
          change="+12 this year"
          positive={true}
        />
        <MetricCard
          title="Geographic Regions"
          value="25"
          icon={<Globe className="w-6 h-6" />}
          change="+3 regions"
          positive={true}
        />
        <MetricCard
          title="Investor Types"
          value="8"
          icon={<Building2 className="w-6 h-6" />}
          change="+2 types"
          positive={true}
        />
        <MetricCard
          title="Avg. Commitment"
          value="$45M"
          icon={<TrendingUp className="w-6 h-6" />}
          change="+15% YoY"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Investor Type Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investorData.typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {investorData.typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Geographic Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investorData.geographicDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {investorData.geographicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Commitment Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={investorData.commitmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="newCommitments" name="New Commitments ($M)" fill="#1A1B5D" />
              <Bar dataKey="totalCommitments" name="Total Commitments ($M)" fill="#C5A572" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon, 
  change, 
  positive 
}: { 
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-sm mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        </div>
      </div>
    </div>
  );
}