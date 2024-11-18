// Add to existing file
export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Call {
  id: string;
  contactId: string;
  contactName: string;
  subject: string;
  scheduledAt: string;
  duration?: number;
  status: 'scheduled' | 'completed' | 'missed' | 'rescheduled';
  notes?: string;
  outcome?: string;
  createdAt: string;
  updatedAt: string;
}