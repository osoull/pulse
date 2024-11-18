import React from 'react';
import { Mail, MessageCircle, Bell, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Communication } from '../../types/communications';
import { useCommunications } from '../../hooks/useCommunications';

interface CommunicationsListProps {
  type?: string;
}

export default function CommunicationsList({ type = 'all' }: CommunicationsListProps) {
  const { communications, loading } = useCommunications();

  const filteredCommunications = type === 'all' 
    ? communications 
    : communications?.filter(comm => comm.type === type);

  const getIcon = (type: Communication['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      case 'announcement':
        return <Bell className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Recent Communications</h2>
      
      <div className="space-y-4">
        {filteredCommunications?.map((comm) => (
          <div
            key={comm.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                {getIcon(comm.type)}
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{comm.subject}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {comm.recipients.length} recipients
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(comm.sentDate || comm.scheduledDate || ''), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                comm.status === 'sent'
                  ? 'bg-green-100 text-green-800'
                  : comm.status === 'scheduled'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {comm.status.charAt(0).toUpperCase() + comm.status.slice(1)}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {(!filteredCommunications || filteredCommunications.length === 0) && (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No communications found</p>
          </div>
        )}
      </div>
    </div>
  );
}