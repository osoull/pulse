export interface InvestorPortalUser {
  id: string;
  email: string;
  name: string;
  investorId: string;
  role: 'investor';
  lastLogin?: string;
}

export interface InvestorDashboardMetrics {
  totalInvested: number;
  currentValue: number;
  unrealizedGain: number;
  irr: number;
  multiple: number;
  distributions: number;
  commitments: {
    total: number;
    called: number;
    remaining: number;
  };
}

export interface InvestorPortalNotification {
  id: string;
  type: 'report' | 'capital-call' | 'distribution' | 'document' | 'meeting';
  title: string;
  description: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}