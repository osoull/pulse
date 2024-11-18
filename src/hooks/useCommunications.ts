import { useState, useEffect } from 'react';
import { Communication, CommunicationStats } from '../types/communications';
import { 
  getCommunications, 
  getCommunicationStats,
  createCommunication,
  updateCommunication,
  deleteCommunication
} from '../services/communicationService';

export function useCommunications() {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [stats, setStats] = useState<CommunicationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [commsData, statsData] = await Promise.all([
        getCommunications(),
        getCommunicationStats()
      ]);
      setCommunications(commsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading communications:', err);
      setError(err instanceof Error ? err : new Error('Failed to load communications'));
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: Partial<Communication>) => {
    try {
      const newComm = await createCommunication(data);
      await loadData();
      return newComm;
    } catch (error) {
      console.error('Error creating communication:', error);
      throw error;
    }
  };

  const update = async (id: string, data: Partial<Communication>) => {
    try {
      const updatedComm = await updateCommunication(id, data);
      await loadData();
      return updatedComm;
    } catch (error) {
      console.error('Error updating communication:', error);
      throw error;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteCommunication(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting communication:', error);
      throw error;
    }
  };

  return {
    communications,
    stats,
    loading,
    error,
    refresh: loadData,
    create,
    update,
    remove
  };
}