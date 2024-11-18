import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { generateAnalyticsReport } from '../../services/analyticsService';
import { useAnalytics } from '../../hooks/useAnalytics';

const COLORS = ['#1A1B5D', '#2D2E7F', '#4F50A9', '#7172D2', '#9495EC'];

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('year');
  const [loading, setLoading] = useState(false);
  const { data, loading: dataLoading, error } = useAnalytics();

  const handleExport = async () => {
    if (!data) return;
    
    try {
      setLoading(true);
      await generateAnalyticsReport({
        performanceData: data.performanceData,
        sectorData: data.sectorData,
        dateRange,
        exportDate: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading analytics data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Performance overview and metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input py-1"
          >
            <option value="year">Current Year</option>
            <option value="quarter">Current Quarter</option>
            <option value="month">Current Month</option>
            <option value="all">All Data</option>
          </select>
          <button 
            onClick={handleExport}
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{loading ? 'Exporting...' : 'Export'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Historical Performance</h2>
            </div>
            <div className="text-sm text-gray-500">
              {format(new Date(), 'MMM yyyy')}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'irr' ? `${value}%` : value,
                    name === 'irr' ? 'IRR' : 'Multiple'
                  ]}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="irr" 
                  stroke="#1A1B5D" 
                  name="IRR (%)" 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="multiple" 
                  stroke="#C5A572" 
                  name="Multiple (x)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Sector Distribution</h2>
            </div>
            <div className="text-sm text-gray-500">
              Total: {(data.metrics.totalAUM / 1000000).toFixed(0)}M€
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${(props.payload.amount / 1000000).toFixed(0)}M€`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AUM Evolution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <BarChartIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">AUM Evolution</h2>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B€`}
                />
                <Tooltip 
                  formatter={(value) => [`${(value / 1000000000).toFixed(2)}B€`, 'AUM']}
                />
                <Bar 
                  dataKey="aum" 
                  fill="#1A1B5D"
                  name="AUM"
                >
                  {data.performanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            <MetricCard
              title="Total AUM"
              value={`${(data.metrics.totalAUM / 1000000000).toFixed(1)}B€`}
              change="+15.2%"
              positive={true}
            />
            <MetricCard
              title="Average IRR"
              value={`${data.metrics.averageIRR.toFixed(1)}%`}
              change="-0.5%"
              positive={false}
            />
            <MetricCard
              title="Average Multiple"
              value={`${data.metrics.averageMultiple.toFixed(1)}x`}
              change="+0.2x"
              positive={true}
            />
            <MetricCard
              title="Investments"
              value={data.metrics.totalInvestments.toString()}
              change="+3"
              positive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, positive }: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className={`text-sm mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change} {positive ? '↑' : '↓'}
      </p>
    </div>
  );
}