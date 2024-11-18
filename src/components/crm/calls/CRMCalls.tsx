import React, { useState } from 'react';
import { Phone, Search, Calendar, Clock, ChevronRight, Plus, User } from 'lucide-react';
import { format } from 'date-fns';
import { useCRM } from '../../../hooks/useCRM';
import CreateCallModal from './CreateCallModal';

export default function CRMCalls() {
  const { calls, loading, error, createCall } = useCRM();
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
        Error loading calls. Please try again later.
      </div>
    );
  }

  const handleCreateCall = async (data: any) => {
    try {
      await createCall(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating call:', error);
    }
  };

  const filteredCalls = calls?.filter(call => {
    const matchesSearch = call.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && isToday(new Date(call.scheduledAt))) ||
                       (dateFilter === 'week' && isThisWeek(new Date(call.scheduledAt)));
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calls</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track investor calls</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Call</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search calls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input w-full"
          />
        </div>
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
          {filteredCalls?.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{call.subject}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500 flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {call.contactName}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(call.scheduledAt), 'MMM d, yyyy')}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(new Date(call.scheduledAt), 'h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  call.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  call.status === 'completed' ? 'bg-green-100 text-green-800' :
                  call.status === 'missed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}

          {filteredCalls?.length === 0 && (
            <div className="text-center py-8">
              <Phone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No calls found</p>
            </div>
          )}
        </div>
      </div>

      <CreateCallModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCall}
      />
    </div>
  );
}