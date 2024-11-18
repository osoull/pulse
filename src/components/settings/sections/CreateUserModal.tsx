import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, AlertTriangle } from 'lucide-react';
import { useUsers } from '../../../hooks/useUsers';
import { USER_ROLES, UserRole } from '../../../types/user';
import { generateInvestorId } from '../../../utils/idGenerator';
import RequiredLabel from '../../common/RequiredLabel';
import FormError from '../../common/FormError';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { addUser } = useUsers();
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedRole = watch('role');
  const userName = watch('name');

  // Generate investor ID when name changes and role is investor
  React.useEffect(() => {
    if (selectedRole === 'investor' && userName) {
      const generatedId = generateInvestorId(userName);
      setValue('investorId', generatedId);
    }
  }, [selectedRole, userName, setValue]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      await addUser(data);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <RequiredLabel text="Name" />
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="input"
                placeholder="Enter user's name"
              />
              <FormError message={errors.name?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Email" />
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="input"
                placeholder="Enter user's email"
              />
              <FormError message={errors.email?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Role" />
              <select
                {...register('role', { required: 'Role is required' })}
                className="input"
              >
                <option value="">Select role</option>
                {Object.entries(USER_ROLES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <FormError message={errors.role?.message?.toString()} />
            </div>

            {selectedRole === 'investor' && (
              <div>
                <RequiredLabel text="Investor ID" />
                <input
                  type="text"
                  {...register('investorId', {
                    required: 'Investor ID is required for investor users'
                  })}
                  className="input bg-gray-100"
                  readOnly
                />
                <p className="mt-1 text-sm text-gray-500">
                  Auto-generated ID based on user name
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                {...register('department')}
                className="input"
                placeholder="Enter user's department"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                {...register('title')}
                className="input"
                placeholder="Enter user's title"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding User...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}