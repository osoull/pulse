import { KYCReview, KYCDocument, KYCRiskLevel } from '../types/kyc';
import { mockData } from '../lib/mockData';

const defaultMetrics = {
  approved: 0,
  pendingReview: 0,
  highRisk: 0,
  expiringSoon: 0
};

const defaultRiskDistribution = {
  high: 0,
  medium: 0,
  low: 0
};

export async function getKYCMetrics() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.kyc?.reviews) {
      console.warn('No KYC data found, using default metrics');
      return defaultMetrics;
    }

    const reviews = mockData.kyc.reviews;
    
    return {
      approved: reviews.filter(r => r.status === 'Approved').length,
      pendingReview: reviews.filter(r => r.status === 'Pending Review').length,
      highRisk: reviews.filter(r => r.risk_level === 'High').length,
      expiringSoon: reviews.reduce((count, review) => {
        const expiringDocs = review.documents?.filter(doc => {
          if (!doc.expiry_date) return false;
          const daysUntilExpiry = Math.ceil(
            (new Date(doc.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
        });
        return count + (expiringDocs?.length || 0);
      }, 0)
    };
  } catch (error) {
    console.error('Error fetching KYC metrics:', error);
    return defaultMetrics;
  }
}

export async function getKYCReviews() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.kyc?.reviews || [];
  } catch (error) {
    console.error('Error fetching KYC reviews:', error);
    return [];
  }
}

export async function createKYCReview(data: {
  investor_id: string;
  risk_level: KYCRiskLevel;
  status: string;
  next_review_date: string;
  comments?: string;
}) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const investor = mockData.investors?.find(i => i.id === data.investor_id);
    if (!investor) throw new Error('Investor not found');

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      investor: {
        name: investor.name,
        type: investor.type
      },
      last_review_date: new Date().toISOString(),
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (!mockData.kyc) {
      mockData.kyc = { reviews: [] };
    }

    mockData.kyc.reviews.push(newReview);
    return newReview;
  } catch (error) {
    console.error('Error creating KYC review:', error);
    throw error;
  }
}

export async function updateKYCReview(id: string, data: Partial<KYCReview>) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.kyc?.reviews) {
      throw new Error('No KYC reviews found');
    }

    const index = mockData.kyc.reviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Review not found');

    mockData.kyc.reviews[index] = {
      ...mockData.kyc.reviews[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    return mockData.kyc.reviews[index];
  } catch (error) {
    console.error('Error updating KYC review:', error);
    throw error;
  }
}

export async function uploadKYCDocument(reviewId: string, file: File, metadata: {
  type: string;
  expiry_date?: string;
  comments?: string[];
}) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.kyc?.reviews) {
      throw new Error('No KYC reviews found');
    }

    const review = mockData.kyc.reviews.find(r => r.id === reviewId);
    if (!review) throw new Error('Review not found');

    const newDocument: KYCDocument = {
      id: Math.random().toString(36).substr(2, 9),
      review_id: reviewId,
      name: file.name,
      type: metadata.type,
      url: URL.createObjectURL(file),
      expiry_date: metadata.expiry_date,
      comments: metadata.comments,
      status: 'Valid',
      created_at: new Date().toISOString()
    };

    if (!review.documents) {
      review.documents = [];
    }

    review.documents.push(newDocument);
    return newDocument;
  } catch (error) {
    console.error('Error uploading KYC document:', error);
    throw error;
  }
}

export async function getRiskDistribution() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.kyc?.reviews) {
      console.warn('No KYC data found, using default risk distribution');
      return defaultRiskDistribution;
    }

    const reviews = mockData.kyc.reviews;
    return {
      high: reviews.filter(r => r.risk_level === 'High').length,
      medium: reviews.filter(r => r.risk_level === 'Medium').length,
      low: reviews.filter(r => r.risk_level === 'Low').length
    };
  } catch (error) {
    console.error('Error fetching risk distribution:', error);
    return defaultRiskDistribution;
  }
}

export async function getRecentActivity(limit = 10) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.kyc?.reviews) {
      return [];
    }

    return mockData.kyc.reviews
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}