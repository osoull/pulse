import React, { useState } from 'react';
import { Bell, Calendar, FileText, DollarSign, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { InvestorPortalNotification } from '../../types/portal';

const mockNotifications: InvestorPortalNotification[] = [
  {
    id: '1',
    type: 'report',
    title: 'Q4 2023 Report Available',
    description: 'The quarterly performance report for Q4 2023 is now available.',
    date: '2024-02-15T10:00:00Z',
    read: false,
    actionUrl: '/portal/documents'
  },
  {
    id: '2',
    type: 'capital-call',
    title: 'Capital Call Notice',
    description: 'A new capital call notice has been issued for Growth Fund I.',
    date: '2024-02-10T15:30:00Z',
    read: true,
    actionUrl: '/portal/documents'
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Annual Investor Meeting',
    description: 'You are invited to attend the annual investor meeting.',
    date: '2024-02-05T09:00:00Z',
    read: true,
    actionUrl: '/portal/meetings'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: InvestorPortalNotification['type']) => {
    switch (type) {
      case 'report':
        return <FileText className="w-5 h-5" />;
      case 'capital-call':
        return <DollarSign className="w-5 h-5" />;
      case 'meeting':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Stay updated with your investment activities
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 cursor-pointer ${
                  notification.read
                    ? 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'bg-primary/5 hover:bg-primary/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    notification.read
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      notification.read ? 'text-gray-900 dark:text-white' : 'text-primary'
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(notification.date), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {!notification.read && (
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No notifications</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}