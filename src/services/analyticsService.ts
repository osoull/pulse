import { mockData } from '../lib/mockData';

export interface AnalyticsData {
  performanceData: {
    year: string;
    irr: number;
    multiple: number;
    aum: number;
  }[];
  sectorData: {
    name: string;
    value: number;
    amount: number;
  }[];
  metrics: {
    totalAUM: number;
    averageIRR: number;
    averageMultiple: number;
    totalInvestments: number;
  };
}

const defaultAnalytics: AnalyticsData = {
  performanceData: [
    { year: '2020', irr: 15.2, multiple: 1.3, aum: 500000000 },
    { year: '2021', irr: 18.5, multiple: 1.5, aum: 750000000 },
    { year: '2022', irr: 22.3, multiple: 1.8, aum: 1000000000 },
    { year: '2023', irr: 25.1, multiple: 2.1, aum: 1500000000 }
  ],
  sectorData: [
    { name: 'Technology', value: 35, amount: 525000000 },
    { name: 'Healthcare', value: 25, amount: 375000000 },
    { name: 'Consumer', value: 20, amount: 300000000 },
    { name: 'Industry', value: 15, amount: 225000000 },
    { name: 'Energy', value: 5, amount: 75000000 }
  ],
  metrics: {
    totalAUM: 1500000000,
    averageIRR: 20.3,
    averageMultiple: 1.8,
    totalInvestments: 12
  }
};

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.analytics) {
      console.warn('No analytics data found, using default data');
      return defaultAnalytics;
    }

    return {
      performanceData: mockData.analytics.performanceData || defaultAnalytics.performanceData,
      sectorData: mockData.analytics.sectorData || defaultAnalytics.sectorData,
      metrics: {
        totalAUM: mockData.analytics.metrics?.totalAUM || defaultAnalytics.metrics.totalAUM,
        averageIRR: mockData.analytics.metrics?.averageIRR || defaultAnalytics.metrics.averageIRR,
        averageMultiple: mockData.analytics.metrics?.averageMultiple || defaultAnalytics.metrics.averageMultiple,
        totalInvestments: mockData.analytics.metrics?.totalInvestments || defaultAnalytics.metrics.totalInvestments
      }
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return defaultAnalytics;
  }
}

export async function generateAnalyticsReport(data: {
  performanceData: any[];
  sectorData: any[];
  dateRange: string;
  exportDate: string;
}): Promise<boolean> {
  try {
    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would generate and save a report
    console.log('Generating report with data:', data);
    
    return true;
  } catch (error) {
    console.error('Error generating analytics report:', error);
    throw new Error('Failed to generate analytics report');
  }
}