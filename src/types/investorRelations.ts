export interface InvestorReport {
  id: string;
  title: string;
  type: 'Quarterly' | 'Annual' | 'Capital Call' | 'Distribution';
  date: string;
  fundId: string;
  status: 'Draft' | 'Under Review' | 'Published';
  recipients: string[];
  attachments: string[];
}

export interface InvestorInvitation {
  id: string;
  investorId: string;
  type: 'Fund' | 'Meeting' | 'Report' | 'Other';
  status: 'Pending' | 'Accepted' | 'Declined';
  subject: string;
  message: string;
  sentDate: string;
  responseDate?: string;
  expiryDate?: string;
  metadata: {
    fundId?: string;
    meetingId?: string;
    reportId?: string;
    [key: string]: any;
  };
}

export interface InvestorInteraction {
  id: string;
  investorId: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Portal';
  date: string;
  subject: string;
  description: string;
  outcome?: string;
  nextSteps?: string;
  assignedTo?: string;
  status: 'Completed' | 'Pending' | 'Scheduled';
}

export interface InvestorPreference {
  id: string;
  investorId: string;
  communicationFrequency: 'Weekly' | 'Monthly' | 'Quarterly';
  preferredMethod: 'Email' | 'Phone' | 'Portal';
  reportFormat: 'PDF' | 'Excel' | 'Both';
  subscriptions: {
    performance: boolean;
    capitalCalls: boolean;
    distributions: boolean;
    meetings: boolean;
  };
  customFields: {
    [key: string]: any;
  };
}