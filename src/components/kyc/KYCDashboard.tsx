import React, { useState } from 'react';
import { Shield, Download } from 'lucide-react';
import { useKYC } from '../../hooks/useKYC';
import KYCMetricCard from './KYCMetricCard';
import KYCReviewList from './KYCReviewList';
import KYCRiskMatrix from './KYCRiskMatrix';
import KYCTimeline from './KYCTimeline';
import CreateKYCReviewModal from './CreateKYCReviewModal';

export default function KYCDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { 
    metrics, 
    reviews, 
    riskDistribution,
    recentActivity,
    loading, 
    error,
    createReview
  } = useKYC();

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading KYC data. Please try again later.
      </div>
    );
  }

  const handleCreateReview = async (data: any) => {
    try {
      await createReview(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating KYC review:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KYC Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor KYC compliance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>New KYC Review</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KYCMetricCard
          title="Approved"
          value={metrics?.approved || 0}
          trend="+2 this month"
          type="approved"
        />
        <KYCMetricCard
          title="Pending Review"
          value={metrics?.pendingReview || 0}
          trend="1 urgent"
          type="pending"
        />
        <KYCMetricCard
          title="High Risk"
          value={metrics?.highRisk || 0}
          trend="Requires attention"
          type="risk"
        />
        <KYCMetricCard
          title="Expiring Soon"
          value={metrics?.expiringSoon || 0}
          trend="Next 30 days"
          type="expiring"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <KYCReviewList reviews={reviews} />
        </div>
        <div className="space-y-6">
          <KYCRiskMatrix distribution={riskDistribution} />
          <KYCTimeline activity={recentActivity} />
        </div>
      </div>

      <CreateKYCReviewModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReview}
      />
    </div>
  );
}