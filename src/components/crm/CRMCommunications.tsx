import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Calendar, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useCRM } from '../../hooks/useCRM';
import CreateCommunicationModal from './CreateCommunicationModal';

export default function CRMCommunications() {
  const { activities, loading, error, createActivity } = useCRM();
  const [selectedType, setSelectedType] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  // Filter activities that are communications (email, call, meeting)
  const communications = activities.filter(activity => 
    ['email', 'call', 'meeting'].includes(activity.type)
  );

  const filteredCommunications = selectedType === 'all'
    ? communications
    : communications.filter(comm => comm.type === selectedType);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'call':
        return <Phone className="w-5 h-5" />;
      case 'meeting':
        return <Calendar className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCommunication = async (data: any) => {
    try {
      await createActivity({
        ...data,
        type: data.type.toLowerCase(),
        status: data.scheduledDate ? 'scheduled' : 'completed'
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating communication:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Communications</h1>
          <p className="text-sm text-gray-500 mt-1">Track all investor communications</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input py-2 px-4 min-w-[160px]"
          >
            <option value="all">All Types</option>
            <option value="email">Email</option>
            <option value="call">Call</option>
            <option value="meeting">Meeting</option>
          </select>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary h-10 px-4 flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>New Communication</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          {filteredCommunications.map(communication => (
            <div
              key={communication.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  {getInteractionIcon(communication.type)}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{communication.subject}</h3>
                  {communication.description && (
                    <p className="text-sm text-gray-500 mt-1">{communication.description}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-gray-500">
                      {format(new Date(communication.date), 'MMM d, yyyy h:mm a')}
                    </span>
                    {communication.duration && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          {communication.duration} min
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(communication.status)}`}>
                  {communication.status.charAt(0).toUpperCase() + communication.status.slice(1)}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}

          {filteredCommunications.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No communications found</p>
            </div>
          )}
        </div>
      </div>

      <CreateCommunicationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCommunication}
      />
    </div>
  );
}