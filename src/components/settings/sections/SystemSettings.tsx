import React from 'react';
import { Download, Upload, Database, RefreshCw } from 'lucide-react';

export default function SystemSettings() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">System Settings</h2>
      
      <div className="space-y-6">
        <SystemCard
          icon={<Database className="w-5 h-5" />}
          title="Data Management"
          description="Manage your data storage and backup settings"
          action={
            <button className="btn-secondary">
              Configure
            </button>
          }
        />

        <SystemCard
          icon={<Download className="w-5 h-5" />}
          title="Export Data"
          description="Export your data in various formats"
          action={
            <button className="btn-secondary">
              Export
            </button>
          }
        />

        <SystemCard
          icon={<Upload className="w-5 h-5" />}
          title="Import Data"
          description="Import data from external sources"
          action={
            <button className="btn-secondary">
              Import
            </button>
          }
        />

        <SystemCard
          icon={<RefreshCw className="w-5 h-5" />}
          title="System Updates"
          description="Check and install system updates"
          action={
            <button className="btn-secondary">
              Check Updates
            </button>
          }
        />
      </div>
    </div>
  );
}

function SystemCard({ icon, title, description, action }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}