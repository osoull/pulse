import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAuth } from '../../context/AuthContext';
import { User, Bell, Lock, Globe, Users } from 'lucide-react';
import ProfileSettings from './sections/ProfileSettings';
import NotificationSettings from './sections/NotificationSettings';
import SecuritySettings from './sections/SecuritySettings';
import RegionalSettings from './sections/RegionalSettings';
import UserManagement from './sections/UserManagement';

export default function SettingsDashboard() {
  const { notifications } = useSettingsStore();
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile */}
        <SettingsCard
          icon={<User className="w-6 h-6" />}
          title="Profile"
          description="Manage your account information"
          content={<ProfileSettings />}
        />

        {/* Notifications */}
        <SettingsCard
          icon={<Bell className="w-6 h-6" />}
          title="Notifications"
          description="Manage your notifications"
          content={<NotificationSettings />}
        />

        {/* Security */}
        <SettingsCard
          icon={<Lock className="w-6 h-6" />}
          title="Security"
          description="Manage your security settings"
          content={<SecuritySettings />}
        />

        {/* Regional */}
        <SettingsCard
          icon={<Globe className="w-6 h-6" />}
          title="Regional"
          description="Manage your regional preferences"
          content={<RegionalSettings />}
        />

        {/* User Management - Only visible for admin users */}
        {user?.role === 'admin' && (
          <div className="md:col-span-2">
            <SettingsCard
              icon={<Users className="w-6 h-6" />}
              title="User Management"
              description="Manage users and permissions"
              content={<UserManagement />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsCard({ icon, title, description, content }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow-osoul p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {content}
    </div>
  );
}