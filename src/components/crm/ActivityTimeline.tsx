import React from 'react';
import { Mail, Phone, Calendar, FileText } from 'lucide-react';
import { CRMActivity } from '../../types/crm';
import { format } from 'date-fns';

interface ActivityTimelineProps {
  activities: CRMActivity[];
  filter: string;
}

export default function ActivityTimeline({ activities, filter }: ActivityTimelineProps) {
  const filteredActivities = activities
    .filter(activity => filter === 'all' || activity.source?.toLowerCase() === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const getActivityIcon = (type: CRMActivity['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
      
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="relative">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-primary/10 text-primary flex-shrink-0`}>
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{activity.subject}</h3>
                {activity.description && (
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                )}
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                  <span>{format(new Date(activity.date), 'MMM d, yyyy h:mm a')}</span>
                  {activity.duration && (
                    <span>• {activity.duration} min</span>
                  )}
                </div>
                {activity.outcome && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Outcome:</span> {activity.outcome}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activities</p>
          </div>
        )}
      </div>
    </div>
  );
}