export type DueDiligenceStatus = 'Not Started' | 'In Progress' | 'Under Review' | 'Completed';
export type DueDiligencePriority = 'High' | 'Medium' | 'Low';
export type DueDiligenceType = 'Initial Investment' | 'Follow-on Investment' | 'Exit';

export interface DueDiligenceDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface DueDiligenceComment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface DueDiligenceItem {
  id: string;
  companyName: string;
  type: DueDiligenceType;
  startDate: string;
  dueDate: string;
  status: DueDiligenceStatus;
  priority: DueDiligencePriority;
  assignedTo: string;
  progress: number;
  documents: DueDiligenceDocument[];
  comments: DueDiligenceComment[];
  updatedAt?: string;
}

export interface DueDiligenceFilters {
  search?: string;
  status?: DueDiligenceStatus;
  priority?: DueDiligencePriority;
  assignedTo?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}