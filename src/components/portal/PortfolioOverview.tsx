import React from 'react';
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockPortfolioData = {
  totalInvested: 25000000,
  currentValue: 35000000,
  unrealizedGain: 10000000,
  irr: 25.3,
  multiple: 1.4,
  distributions: 5000000,
  investments: [
    {
      fundName: 'Growth Fund I',
      invested: 15000000,
      currentValue: 22500000,
      ownership: 2.5,
      vintage: 2020,
      performance: [
        { quarter: 'Q1 2023', value: 18000000 },
        { quarter: 'Q2 2023', value: 19500000 },
        { quarter: 'Q3 2023', value: 21000000 },
        { quarter: 'Q4 2023', value: 22500000 }
      ]
    },
    {
      fundName: 'Buyout Fund II',
      invested: 10000000,
      currentValue: 12500000,
      ownership: 1.8,
      vintage: 2021,
      performance: [
        { quarter: 'Q1 2023', value: 10500000 },
        { quarter: 'Q2 2023', value: 11000000 },
        { quarter: 'Q3 2023', value: 12000000 },
        { quarter: 'Q4 2023', value: 12500000 }
      ]
    }
  ]
};

export default function PortfolioOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Overview</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Your investment performance and holdings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Invested"
          value={`$${(mockPortfolioData.totalInvested / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="w-6 h-6" />}
          change="+15% YTD"
          positive={true}
        />
        <MetricCard
          title="Current Value"
          value={`$${(mockPortfolioData.currentValue / 1000000).toFixed(1)}M`}
          icon={<PieChart className="w-6 h-6" />}
          change="+40% YTD"
          positive={true}
        />
        <MetricCard
          title="IRR"
          value={`${mockPortfolioData.irr.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          change="+2.3% QoQ"
          positive={true}
        />
        <MetricCard
          title="Multiple"
          value={`${mockPortfolioData.multiple.toFixed(1)}x`}
          icon={<ArrowUpRight className="w-6 h-6" />}
          change="+0.2x YTD"
          positive={true}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Your Investments</h2>
        <div className="space-y-6">
          {mockPortfolioData.investments.map((investment, index) => (
            <div key={index} className="border-t first:border-t-0 pt-6 first:pt-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{investment.fundName}</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Invested</p>
                      <p className="font-medium">${(investment.invested / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Value</p>
                      <p className="font-medium">${(investment.currentValue / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ownership</p>
                      <p className="font-medium">{investment.ownership}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vintage</p>
                      <p className="font-medium">{investment.vintage}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-medium">
                    +{(((investment.currentValue - investment.invested) / investment.invested) * 100).toFixed(1)}%
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investment.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Value']}
                    />
                    <Bar dataKey="value" fill="#1A1B5D" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Distributions</h2>
          <span className="text-sm text-gray-500">
            Total: ${(mockPortfolioData.distributions / 1000000).toFixed(1)}M
          </span>
        </div>
        <div className="h-64">
          <div className="flex items-center justify-center h-full text-gray-500">
            Distribution chart will be displayed here
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