import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Shield } from 'lucide-react';

interface KYCMetricCardProps {
  title: string;
  value: number;
  trend: string;
  type: 'approved' | 'pending' | 'risk' | 'expiring';
}

export default function KYCMetricCard({ title, value, trend, type }: KYCMetricCardProps) {
  const getMetricConfig = () => {
    switch (type) {
      case 'approved':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'bg-green-500',
          textColor: 'text-green-600'
        };
      case 'pending':
        return {
          icon: <Clock className="w-6 h-6" />,
          color: 'bg-yellow-500',
          textColor: 'text-yellow-600'
        };
      case 'risk':
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          color: 'bg-red-500',
          textColor: 'text-red-600'
        };
      case 'expiring':
        return {
          icon: <Shield className="w-6 h-6" />,
          color: 'bg-blue-500',
          textColor: 'text-blue-600'
        };
      default:
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'bg-gray-500',
          textColor: 'text-gray-600'
        };
    }
  };

  const { icon, color, textColor } = getMetricConfig();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-xs ${textColor} mt-1`}>{trend}</p>
        </div>
      </div>
    </div>
  );
}