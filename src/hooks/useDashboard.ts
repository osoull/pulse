import { useState, useEffect } from 'react';
import { getDashboardMetrics, DashboardMetrics } from '../services/dashboardService';

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadDashboardMetrics();
  }, []);

  const loadDashboardMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      console.error('Error loading dashboard metrics:', err);
      setError(err instanceof Error ? err : new Error('Failed to load dashboard metrics'));
    } finally {
      setLoading(false);
    }
  };

  return { 
    metrics, 
    loading, 
    error, 
    refresh: loadDashboardMetrics 
  };
}