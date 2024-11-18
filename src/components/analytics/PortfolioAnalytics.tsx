import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, TrendingUp, DollarSign, Target, Download } from 'lucide-react';
import { useReport } from '../../hooks/useReport';

const COLORS = ['#1A1B5D', '#2D2E7F', '#4F50A9', '#7172D2', '#9495EC'];

export default function PortfolioAnalytics() {
  const { generateReport, isExporting } = useReport();
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const portfolioData = {
    sectorAllocation: [
      { name: 'Technology', value: 35 },
      { name: 'Healthcare', value: 25 },
      { name: 'Consumer', value: 20 },
      { name: 'Industry', value: 15 },
      { name: 'Energy', value: 5 }
    ],
    companyPerformance: [
      { name: 'TechCo', revenue: 120, ebitda: 25, growth: 45 },
      { name: 'HealthTech', revenue: 85, ebitda: 18, growth: 32 },
      { name: 'ConsumerBrands', revenue: 95, ebitda: 20, growth: 28 },
      { name: 'IndustrialTech', revenue: 75, ebitda: 15, growth: 22 }
    ]
  };

  // Calculate metrics
  const avgGrowth = portfolioData.companyPerformance.reduce((acc, curr) => acc + curr.growth, 0) / portfolioData.companyPerformance.length;
  const growthChange = 5.2; // Example value
  const avgOwnership = 35; // Example value
  const ownershipChange = 2.5; // Example value

  const handleExport = async () => {
    try {
      await generateReport({
        metadata: {
          title: 'Portfolio Analytics Report',
          subtitle: `${selectedPeriod === 'year' ? 'Annual' : 'Quarterly'} Portfolio Performance Analysis`,
          orientation: 'landscape',
          date: new Date()
        },
        sections: [
          {
            title: 'Portfolio Overview',
            content: 'Comprehensive analysis of portfolio company performance and sector allocation.'
          }
        ],
        tables: [
          {
            title: 'Company Performance',
            headers: ['Company', 'Revenue ($M)', 'EBITDA ($M)', 'Growth (%)'],
            rows: portfolioData.companyPerformance.map(company => [
              company.name,
              company.revenue.toFixed(1),
              company.ebitda.toFixed(1),
              `${company.growth.toFixed(1)}%`
            ])
          },
          {
            title: 'Sector Allocation',
            headers: ['Sector', 'Allocation (%)'],
            rows: portfolioData.sectorAllocation.map(sector => [
              sector.name,
              `${sector.value.toFixed(1)}%`
            ])
          }
        ]
      });
    } catch (error) {
      console.error('Error exporting portfolio analytics:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Detailed analysis of portfolio performance</p>
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
          title="Portfolio Companies"
          value="12"
          icon={<Building2 className="w-6 h-6" />}
          change="+2 this year"
          positive={true}
        />
        <MetricCard
          title="Avg. Revenue Growth"
          value={`${avgGrowth.toFixed(2)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          change={`+${growthChange.toFixed(2)}% YoY`}
          positive={true}
        />
        <MetricCard
          title="Total Value"
          value="$2.4B"
          icon={<DollarSign className="w-6 h-6" />}
          change="+$450M"
          positive={true}
        />
        <MetricCard
          title="Avg. Ownership"
          value={`${avgOwnership.toFixed(2)}%`}
          icon={<Target className="w-6 h-6" />}
          change={`+${ownershipChange.toFixed(2)}%`}
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Sector Allocation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData.sectorAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioData.sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Company Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioData.companyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" name="Revenue ($M)" fill="#1A1B5D" />
                <Bar dataKey="ebitda" name="EBITDA ($M)" fill="#C5A572" />
                <Bar dataKey="growth" name="Growth (%)" fill="#4F50A9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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