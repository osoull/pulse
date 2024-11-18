import React from 'react';
import { useSettingsStore } from '../../../stores/settingsStore';

export default function NotificationSettings() {
  const { notifications, toggleNotification } = useSettingsStore();

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Notification Preferences</h2>
      
      <div className="space-y-6">
        <NotificationToggle
          title="Email Notifications"
          description="Receive email updates about your account activity"
          checked={notifications.email}
          onChange={() => toggleNotification('email')}
        />

        <NotificationToggle
          title="Push Notifications"
          description="Receive push notifications on your mobile device"
          checked={notifications.push}
          onChange={() => toggleNotification('push')}
        />

        <NotificationToggle
          title="Desktop Notifications"
          description="Receive notifications on your desktop"
          checked={notifications.desktop}
          onChange={() => toggleNotification('desktop')}
        />
      </div>
    </div>
  );
}

function NotificationToggle({ title, description, checked, onChange }: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}