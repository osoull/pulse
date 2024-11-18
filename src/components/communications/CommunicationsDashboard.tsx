import React, { useState } from 'react';
import { Mail, MessageCircle, Bell, Calendar, Plus } from 'lucide-react';
import CommunicationsList from './CommunicationsList';
import CommunicationStats from './CommunicationStats';
import CreateCommunicationModal from './CreateCommunicationModal';
import { useCommunications } from '../../hooks/useCommunications';

export default function CommunicationsDashboard() {
  const { stats, loading, error } = useCommunications();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading communications. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Communications</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all investor communications</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Communication</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Communications"
          value={stats?.total || 0}
          icon={<Mail className="w-6 h-6" />}
          change={`${stats?.sent || 0} sent this month`}
          color="bg-blue-500"
        />
        <MetricCard
          title="Read Rate"
          value={`${stats?.readRate.toFixed(1)}%`}
          icon={<MessageCircle className="w-6 h-6" />}
          change={`${stats?.deliveryRate.toFixed(1)}% delivered`}
          color="bg-green-500"
        />
        <MetricCard
          title="Scheduled"
          value={stats?.scheduled || 0}
          icon={<Calendar className="w-6 h-6" />}
          change={`${stats?.draft || 0} drafts`}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CommunicationsList type={selectedType} />
        </div>
        <div>
          <CommunicationStats stats={stats} />
        </div>
      </div>

      <CreateCommunicationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon, 
  change, 
  color 
}: { 
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4">
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-sm mt-1 text-gray-500">{change}</p>
        </div>
      </div>
    </div>
  );
}