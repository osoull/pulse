export interface Communication {
  id: string;
  type: 'email' | 'message' | 'announcement';
  subject: string;
  content: string;
  sender: string;
  recipients: string[];
  status: 'draft' | 'sent' | 'scheduled';
  scheduledDate?: string;
  sentDate?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  metadata?: {
    readBy?: string[];
    deliveryStatus?: Record<string, 'delivered' | 'failed' | 'pending'>;
    [key: string]: any;
  };
}

export interface Template {
  id: string;
  name: string;
  type: 'email' | 'message' | 'announcement';
  subject: string;
  content: string;
  variables: string[];
  category: 'general' | 'investor' | 'fund' | 'reporting';
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationStats {
  total: number;
  sent: number;
  scheduled: number;
  draft: number;
  readRate: number;
  deliveryRate: number;
  byType: {
    email: number;
    message: number;
    announcement: number;
  };
}