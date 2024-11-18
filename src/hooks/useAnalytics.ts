import { useState, useEffect } from 'react';
import { getAnalyticsData, AnalyticsData } from '../services/analyticsService';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const analyticsData = await getAnalyticsData();
      setData(analyticsData);
    } catch (err) {
      console.error('Error loading analytics data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load analytics data'));
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    refresh: loadAnalyticsData 
  };
}