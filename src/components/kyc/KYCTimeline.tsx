import React from 'react';
import { Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { format } from 'date-fns';

const timelineEvents = [
  {
    id: 1,
    type: 'review',
    title: 'KYC Review Completed',
    investor: 'Global Pension Fund',
    date: '2024-02-15',
    status: 'completed',
    description: 'Annual review completed successfully'
  },
  {
    id: 2,
    type: 'document',
    title: 'Document Expiring Soon',
    investor: 'Family Investment Office',
    date: '2024-02-14',
    status: 'warning',
    description: 'Tax certificate expires in 30 days'
  },
  {
    id: 3,
    type: 'alert',
    title: 'High Risk Alert',
    investor: 'Tech Ventures Ltd',
    date: '2024-02-13',
    status: 'alert',
    description: 'Risk level increased due to jurisdiction change'
  }
];

export default function KYCTimeline() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
      
      <div className="space-y-6">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative">
            {index !== timelineEvents.length - 1 && (
              <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-gray-200" />
            )}
            <div className="flex space-x-4">
              <div className="relative">
                <EventIcon type={event.type} status={event.status} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.investor}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventIcon({ type, status }: { type: string; status: string }) {
  const icons = {
    review: Clock,
    document: FileText,
    alert: AlertTriangle
  };

  const colors = {
    completed: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    alert: 'bg-red-100 text-red-600'
  };

  const Icon = icons[type] || CheckCircle;

  return (
    <div className={`p-2 rounded-full ${colors[status]}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
}