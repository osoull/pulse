export type KYCRiskLevel = 'Low' | 'Medium' | 'High';
export type KYCStatus = 'Approved' | 'Pending Review' | 'Rejected';

export interface KYCDocument {
  id: string;
  review_id: string;
  name: string;
  type: string;
  url: string;
  status: 'Valid' | 'Expired' | 'Pending Review' | 'Rejected';
  expiry_date?: string;
  comments?: string[];
  created_at: string;
}

export interface KYCReview {
  id: string;
  investor_id: string;
  investor?: {
    name: string;
    type: string;
  };
  risk_level: KYCRiskLevel;
  status: KYCStatus;
  last_review_date: string;
  next_review_date: string;
  documents?: KYCDocument[];
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface KYCMetrics {
  approved: number;
  pendingReview: number;
  highRisk: number;
  expiringSoon: number;
}

export interface RiskDistribution {
  high: number;
  medium: number;
  low: number;
}