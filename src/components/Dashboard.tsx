import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, PieChart as PieChartIcon, ArrowUpRight, FileText, Calendar, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { useDashboard } from '../hooks/useDashboard';

const COLORS = ['#1A1B5D', '#2D2E7F', '#4F50A9', '#7172D2', '#9495EC'];

export default function Dashboard() {
  const { metrics, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PULSE Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Private Equity Portfolio Overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Assets Under Management"
          value={`$${(metrics.totalAUM / 1000000000).toFixed(2)}B`}
          icon={<DollarSign className="w-6 h-6" />}
          change="+15.2% YTD"
          positive={true}
        />
        <MetricCard
          title="Average IRR"
          value={`${metrics.averageIRR.toFixed(2)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          change="+2.3% QoQ"
          positive={true}
        />
        <MetricCard
          title="Multiple"
          value={`${metrics.realizedMultiple.toFixed(2)}x`}
          icon={<ArrowUpRight className="w-6 h-6" />}
          change="+0.2x YTD"
          positive={true}
        />
        <MetricCard
          title="Dry Powder"
          value={`$${(metrics.dryPowder / 1000000).toFixed(2)}M`}
          icon={<DollarSign className="w-6 h-6" />}
          change="-120M this quarter"
          positive={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Fund Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone"
                  dataKey="irr"
                  name="IRR (%)"
                  stroke="#1A1B5D"
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone"
                  dataKey="multiple"
                  name="Multiple (x)"
                  stroke="#C5A572"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Portfolio Overview</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Active Investments</p>
                <p className="text-2xl font-bold">{metrics.activeInvestments}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Holding Period</p>
                <p className="text-2xl font-bold">{metrics.avgHoldingPeriod.toFixed(2)} years</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Portfolio Companies</p>
                <p className="text-2xl font-bold">{metrics.portfolioCompanies}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Ownership</p>
                <p className="text-2xl font-bold">{metrics.avgOwnership.toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.portfolioStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {metrics.portfolioStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Investment Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.investmentActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="invested" 
                  stackId="1" 
                  stroke="#1A1B5D" 
                  fill="#1A1B5D" 
                  name="Capital Invested"
                />
                <Area 
                  type="monotone" 
                  dataKey="realized" 
                  stackId="2" 
                  stroke="#C5A572" 
                  fill="#C5A572" 
                  name="Capital Realized"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Deal Pipeline</h2>
          <div className="space-y-4">
            {metrics.dealPipeline.map((deal, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{deal.name}</h3>
                    <p className="text-sm text-gray-500">{deal.stage}</p>
                  </div>
                  <span className="text-sm font-medium">
                    ${(deal.size / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">{deal.sector}</span>
                  <span className={deal.probability >= 50 ? 'text-green-600' : 'text-yellow-600'}>
                    {deal.probability.toFixed(2)}% probability
                  </span>
                </div>
              </div>
            ))}
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