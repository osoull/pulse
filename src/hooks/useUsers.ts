import { useState, useEffect } from 'react';
import { User, CreateUserInput } from '../types/user';
import { getUsers, createUser, updateUser, updateUserStatus } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error loading users:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (input: CreateUserInput) => {
    try {
      await createUser(input);
      await loadUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  };

  const editUser = async (id: string, data: Partial<User>) => {
    try {
      await updateUser(id, data);
      await loadUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  const toggleUserStatus = async (id: string, status: 'active' | 'inactive') => {
    try {
      await updateUserStatus(id, status);
      await loadUsers();
    } catch (err) {
      console.error('Error updating user status:', err);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    refresh: loadUsers,
    addUser,
    editUser,
    toggleUserStatus
  };
}