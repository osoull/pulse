import { useState, useEffect } from 'react';
import { 
  getKYCMetrics, 
  getKYCReviews, 
  getRiskDistribution, 
  getRecentActivity,
  createKYCReview,
  updateKYCReview,
  uploadKYCDocument
} from '../services/kycService';
import { KYCReview, KYCMetrics, RiskDistribution } from '../types/kyc';

export function useKYC() {
  const [metrics, setMetrics] = useState<KYCMetrics | null>(null);
  const [reviews, setReviews] = useState<KYCReview[]>([]);
  const [riskDistribution, setRiskDistribution] = useState<RiskDistribution | null>(null);
  const [recentActivity, setRecentActivity] = useState<KYCReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadKYCData();
  }, []);

  const loadKYCData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [metricsData, reviewsData, riskData, activityData] = await Promise.all([
        getKYCMetrics(),
        getKYCReviews(),
        getRiskDistribution(),
        getRecentActivity()
      ]);

      setMetrics(metricsData);
      setReviews(reviewsData || []);
      setRiskDistribution(riskData);
      setRecentActivity(activityData || []);
    } catch (err) {
      console.error('Error loading KYC data:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (data: any) => {
    try {
      await createKYCReview(data);
      await loadKYCData();
    } catch (err) {
      console.error('Error creating KYC review:', err);
      throw err;
    }
  };

  const updateReview = async (id: string, data: any) => {
    try {
      await updateKYCReview(id, data);
      await loadKYCData();
    } catch (err) {
      console.error('Error updating KYC review:', err);
      throw err;
    }
  };

  const uploadDocument = async (reviewId: string, file: File, metadata: any) => {
    try {
      await uploadKYCDocument(reviewId, file, metadata);
      await loadKYCData();
    } catch (err) {
      console.error('Error uploading KYC document:', err);
      throw err;
    }
  };

  return {
    metrics,
    reviews,
    riskDistribution,
    recentActivity,
    loading,
    error,
    refresh: loadKYCData,
    createReview,
    updateReview,
    uploadDocument
  };
}