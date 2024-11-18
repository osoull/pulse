import React, { useState } from 'react';
import { Calendar, Mail, Phone, FileText, ChevronRight, Plus, User, Search, Clock } from 'lucide-react';
import { CRMActivity } from '../../types/crm';
import { format, isToday, isThisWeek } from 'date-fns';
import { useCRM } from '../../hooks/useCRM';
import AddActivityModal from './AddActivityModal';

export default function CRMActivities() {
  const { activities, calls, loading, error, createActivity, createCall } = useCRM();
  const [selectedType, setSelectedType] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

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
        Error loading activities. Please try again later.
      </div>
    );
  }

  // Combine activities and calls into a single list
  const allActivities = [
    ...activities,
    ...(calls?.map(call => ({
      id: call.id,
      type: 'call',
      subject: call.subject,
      description: `Call with ${call.contactName}`,
      date: call.scheduledAt,
      duration: call.duration,
      status: call.status || 'scheduled',
      contactName: call.contactName
    })) || [])
  ];

  const activityTypes = ['all', 'call', 'email', 'meeting', 'note'];

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = (activity.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.contactName?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && isToday(new Date(activity.date))) ||
                       (dateFilter === 'week' && isThisWeek(new Date(activity.date)));
    return matchesSearch && matchesType && matchesDate;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'call':
        return <Phone className="w-5 h-5" />;
      case 'meeting':
        return <Calendar className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatStatus = (status: string) => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Pending';
  };

  const handleCreateActivity = async (data: any) => {
    try {
      if (data.type === 'call') {
        await createCall(data);
      } else {
        await createActivity(data);
      }
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activities</h1>
          <p className="text-sm text-gray-500 mt-1">Track all investor interactions</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Activity</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input w-full"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="input w-48"
        >
          {activityTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </option>
          ))}
        </select>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="input w-48"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{activity.subject}</h3>
                  {activity.description && (
                    <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-1">
                    {activity.contactName && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {activity.contactName}
                      </span>
                    )}
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(activity.date), 'MMM d, yyyy')}
                    </span>
                    {activity.duration && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.duration} min
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                  {formatStatus(activity.status)}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No activities found</p>
            </div>
          )}
        </div>
      </div>

      <AddActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateActivity}
      />
    </div>
  );
}