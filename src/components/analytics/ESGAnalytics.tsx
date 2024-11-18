import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { Leaf, Users, Shield, Download, Filter } from 'lucide-react';
import { useReport } from '../../hooks/useReport';

const COLORS = ['#1A1B5D', '#2D2E7F', '#4F50A9', '#7172D2', '#9495EC'];

export default function ESGAnalytics() {
  const { generateReport, isExporting } = useReport();
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedFund, setSelectedFund] = useState('all');

  const getScoreForFund = (metric: 'environmentalScore' | 'socialScore' | 'governanceScore') => {
    const scores = {
      environmentalScore: 83.33,
      socialScore: 81.67,
      governanceScore: 91.67
    };
    return scores[metric];
  };

  const getChangeForFund = (metric: 'environmentalChange' | 'socialChange' | 'governanceChange') => {
    const changes = {
      environmentalChange: '+5.2%',
      socialChange: '+4.8%',
      governanceChange: '+3.2%'
    };
    return changes[metric] + ' YoY';
  };

  const esgData = {
    environmentalMetrics: [
      { name: 'Carbon Emissions', value: 75.00, target: 85.00 },
      { name: 'Energy Efficiency', value: 82.00, target: 90.00 },
      { name: 'Waste Management', value: 68.00, target: 75.00 },
      { name: 'Water Usage', value: 78.00, target: 80.00 }
    ],
    socialMetrics: [
      { name: 'Employee Satisfaction', value: 85.00 },
      { name: 'Community Impact', value: 72.00 },
      { name: 'Diversity & Inclusion', value: 78.00 },
      { name: 'Health & Safety', value: 90.00 }
    ],
    governanceMetrics: [
      { name: 'Board Independence', value: 95.00 },
      { name: 'Ethics & Compliance', value: 88.00 },
      { name: 'Risk Management', value: 85.00 },
      { name: 'Shareholder Rights', value: 92.00 }
    ],
    trends: [
      { year: '2020', score: 72.00 },
      { year: '2021', score: 78.00 },
      { year: '2022', score: 83.00 },
      { year: '2023', score: 88.00 }
    ]
  };

  const handleExport = async () => {
    try {
      const fundName = selectedFund === 'all' 
        ? 'All Funds' 
        : 'Selected Fund';

      await generateReport({
        metadata: {
          title: 'ESG Analytics Report',
          subtitle: `${selectedPeriod === 'year' ? 'Annual' : 'Quarterly'} ESG Performance Analysis`,
          orientation: 'landscape',
          date: new Date()
        },
        sections: [
          {
            title: 'ESG Overview',
            content: 'Comprehensive analysis of Environmental, Social, and Governance performance.'
          }
        ],
        tables: [
          {
            title: 'Environmental Metrics',
            headers: ['Metric', 'Current', 'Target', 'Gap'],
            rows: esgData.environmentalMetrics.map(metric => [
              metric.name,
              `${metric.value.toFixed(2)}%`,
              `${metric.target?.toFixed(2) || 'N/A'}%`,
              metric.target ? `${(metric.target - metric.value).toFixed(2)}%` : 'N/A'
            ])
          },
          {
            title: 'Social Metrics',
            headers: ['Metric', 'Score'],
            rows: esgData.socialMetrics.map(metric => [
              metric.name,
              `${metric.value.toFixed(2)}%`
            ])
          }
        ]
      });
    } catch (error) {
      console.error('Error exporting ESG report:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ESG Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Environmental, Social & Governance Analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
              className="input py-1"
            >
              <option value="all">All Funds</option>
              <option value="fund1">Growth Fund I</option>
              <option value="fund2">Buyout Fund II</option>
            </select>
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">
                {getScoreForFund('environmentalScore').toFixed(2)}%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Environmental Score</p>
              <p className="text-sm text-green-600">
                {getChangeForFund('environmentalChange')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">
                {getScoreForFund('socialScore').toFixed(2)}%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Social Score</p>
              <p className="text-sm text-blue-600">
                {getChangeForFund('socialChange')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">
                {getScoreForFund('governanceScore').toFixed(2)}%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Governance Score</p>
              <p className="text-sm text-purple-600">
                {getChangeForFund('governanceChange')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Environmental Metrics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={esgData.environmentalMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Value" dataKey="value" stroke="#1A1B5D" fill="#1A1B5D" fillOpacity={0.6} />
                <Radar name="Target" dataKey="target" stroke="#C5A572" fill="#C5A572" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Social Impact</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={esgData.socialMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1A1B5D">
                  {esgData.socialMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">ESG Score Evolution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={esgData.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#1A1B5D" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}