export interface Document {
  id: string;
  title: string;
  type: 'Legal' | 'Financial' | 'KYC' | 'Report';
  date: string;
  url: string;
  investor: string;
  project: string;
}