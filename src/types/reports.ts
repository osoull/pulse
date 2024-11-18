export interface ReportMetadata {
  title: string;
  subtitle?: string;
  orientation?: 'portrait' | 'landscape';
  date?: Date;
}

export interface TableData {
  headers: string[];
  rows: any[][];
  title?: string;
  headerColor?: number[];
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie';
  data: any[];
  options?: any;
}

export interface SectionData {
  title: string;
  content: string;
}

export interface ReportContent {
  metadata: ReportMetadata;
  tables?: TableData[];
  charts?: ChartData[];
  sections?: SectionData[];
}