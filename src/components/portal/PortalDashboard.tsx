import React from 'react';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  ArrowUpRight,
  FileText,
  Calendar,
  Bell
} from 'lucide-react';
import { format } from 'date-fns';

const mockMetrics = {
  totalInvested: 25000000,
  currentValue: 35000000,
  unrealizedGain: 10000000,
  irr: 25.3,
  multiple: 1.4,
  distributions: 5000000,
  commitments: {
    total: 50000000,
    called: 25000000,
    remaining: 25000000
  }
};

const mockActivity = [
  {
    type: 'report',
    title: 'Q4 2023 Report Available',
    description: 'The quarterly performance report is now available',
    date: '2024-02-15'
  },
  {
    type: 'capital-call',
    title: 'Capital Call Notice',
    description: 'New capital call for Growth Fund I',
    date: '2024-02-10'
  },
  {
    type: 'distribution',
    title: 'Distribution Notice',
    description: 'Distribution from Tech Fund II exit',
    date: '2024-02-05'
  }
];

const mockEvents = [
  {
    title: 'Annual Investor Meeting',
    date: '2024-03-15',
    time: '09:00 AM'
  },
  {
    title: 'Q1 2024 Results Call',
    date: '2024-04-20',
    time: '02:00 PM'
  }
];

export default function PortalDashboard() {
  const { user } = usePortalAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Here's an overview of your investment performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Invested"
          value={`$${(mockMetrics.totalInvested / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="w-6 h-6" />}
          change="+15% YTD"
          positive={true}
        />
        <MetricCard
          title="Current Value"
          value={`$${(mockMetrics.currentValue / 1000000).toFixed(1)}M`}
          icon={<PieChart className="w-6 h-6" />}
          change="+40% YTD"
          positive={true}
        />
        <MetricCard
          title="IRR"
          value={`${mockMetrics.irr.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          change="+2.3% QoQ"
          positive={true}
        />
        <MetricCard
          title="Multiple"
          value={`${mockMetrics.multiple.toFixed(1)}x`}
          icon={<ArrowUpRight className="w-6 h-6" />}
          change="+0.2x YTD"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Capital Account</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Commitment</span>
              <span className="font-medium">${(mockMetrics.commitments.total / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Called Capital</span>
              <span className="font-medium">${(mockMetrics.commitments.called / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Remaining Commitment</span>
              <span className="font-medium">${(mockMetrics.commitments.remaining / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Distributions</span>
              <span className="font-medium">${(mockMetrics.distributions / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                date={activity.date}
                type={activity.type}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {mockEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(event.date), 'MMM d, yyyy')} at {event.time}
                  </p>
                </div>
              </div>
              <button className="btn-secondary text-sm">Add to Calendar</button>
            </div>
          ))}
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

function ActivityItem({ 
  title, 
  description, 
  date, 
  type 
}: { 
  title: string;
  description: string;
  date: string;
  type: 'report' | 'capital-call' | 'distribution';
}) {
  const getIcon = () => {
    switch (type) {
      case 'report':
        return <FileText className="w-5 h-5" />;
      case 'capital-call':
        return <DollarSign className="w-5 h-5" />;
      case 'distribution':
        return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-primary/10 text-primary rounded-lg flex-shrink-0">
        {getIcon()}
      </div>
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{format(new Date(date), 'MMM d, yyyy')}</p>
      </div>
    </div>
  );
}