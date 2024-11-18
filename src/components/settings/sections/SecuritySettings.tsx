import React from 'react';
import { useForm } from 'react-hook-form';
import { Shield, Key, Smartphone } from 'lucide-react';

export default function SecuritySettings() {
  const { register, handleSubmit } = useForm();

  const onChangePassword = (data: any) => {
    console.log('Password change:', data);
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Security Settings</h2>
      
      <div className="space-y-8">
        <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Change Password
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                {...register('currentPassword')}
                className="mt-1 input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                {...register('newPassword')}
                className="mt-1 input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="mt-1 input"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </div>
        </form>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Smartphone className="w-5 h-5 mr-2" />
            Two-Factor Authentication
          </h3>
          
          <button className="btn-secondary">
            Enable 2FA
          </button>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Shield className="w-5 h-5 mr-2" />
            Security Log
          </h3>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              View your recent security activity and manage your active sessions.
            </p>
            <button className="mt-2 text-primary hover:text-primary-dark font-medium text-sm">
              View Security Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}