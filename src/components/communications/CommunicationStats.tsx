import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CommunicationStats as CommunicationStatsType } from '../../types/communications';

const COLORS = ['#1A1B5D', '#2D2E7F', '#4F50A9'];

interface CommunicationStatsProps {
  stats: CommunicationStatsType | null;
}

export default function CommunicationStats({ stats }: CommunicationStatsProps) {
  if (!stats) return null;

  const typeData = [
    { name: 'Email', value: stats.byType.email },
    { name: 'Message', value: stats.byType.message },
    { name: 'Announcement', value: stats.byType.announcement }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Communication Analytics</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Distribution by Type</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Read Rate</p>
                <p className="text-2xl font-bold text-primary">
                  {stats.readRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Delivery Rate</p>
                <p className="text-2xl font-bold text-primary">
                  {stats.deliveryRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Sent</span>
                <span className="font-medium">{stats.sent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Scheduled</span>
                <span className="font-medium">{stats.scheduled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Draft</span>
                <span className="font-medium">{stats.draft}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}