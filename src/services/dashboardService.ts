import { mockData } from '../lib/mockData';

export interface DashboardMetrics {
  totalAUM: number;
  averageIRR: number;
  activeInvestments: number;
  realizedMultiple: number;
  dryPowder: number;
  avgHoldingPeriod: number;
  portfolioCompanies: number;
  avgOwnership: number;
  performanceData: {
    year: number;
    irr: number;
    multiple: number;
    aum: number;
  }[];
  portfolioStatus: {
    name: string;
    value: number;
  }[];
  investmentActivity: {
    period: string;
    invested: number;
    realized: number;
  }[];
  dealPipeline: {
    name: string;
    stage: string;
    size: number;
    sector: string;
    probability: number;
  }[];
  recentActivity: {
    title: string;
    description: string;
    date: string;
    icon: React.ReactNode;
    color: string;
  }[];
  upcomingEvents: {
    title: string;
    type: string;
    date: string;
    time: string;
  }[];
}

const defaultMetrics: DashboardMetrics = {
  totalAUM: 0,
  averageIRR: 0,
  activeInvestments: 0,
  realizedMultiple: 0,
  dryPowder: 0,
  avgHoldingPeriod: 0,
  portfolioCompanies: 0,
  avgOwnership: 0,
  performanceData: [],
  portfolioStatus: [],
  investmentActivity: [],
  dealPipeline: [],
  recentActivity: [],
  upcomingEvents: []
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      ...defaultMetrics,
      ...mockData.dashboard,
      dryPowder: 350000000,
      avgHoldingPeriod: 4.5,
      portfolioCompanies: 12,
      avgOwnership: 35,
      portfolioStatus: [
        { name: 'Growth', value: 45 },
        { name: 'Mature', value: 30 },
        { name: 'Early Stage', value: 15 },
        { name: 'Exit Ready', value: 10 }
      ],
      investmentActivity: [
        { period: 'Q1 2023', invested: 120, realized: 80 },
        { period: 'Q2 2023', invested: 150, realized: 100 },
        { period: 'Q3 2023', invested: 180, realized: 130 },
        { period: 'Q4 2023', invested: 200, realized: 160 }
      ],
      dealPipeline: [
        {
          name: 'Tech Growth Fund II',
          stage: 'Due Diligence',
          size: 500000000,
          sector: 'Technology',
          probability: 75
        },
        {
          name: 'Healthcare Innovation',
          stage: 'Initial Review',
          size: 75000000,
          sector: 'Healthcare',
          probability: 45
        },
        {
          name: 'Consumer Brands Exit',
          stage: 'Final Negotiations',
          size: 300000000,
          sector: 'Consumer',
          probability: 90
        }
      ],
      recentActivity: [
        {
          title: 'New Investment Completed',
          description: 'Completed $75M investment in Healthcare Innovation Fund',
          date: '2024-02-15',
          icon: null, // Icons will be rendered in the component
          color: 'bg-blue-500'
        },
        {
          title: 'Due Diligence Started',
          description: 'Initiated due diligence for Tech Growth Fund II',
          date: '2024-02-14',
          icon: null,
          color: 'bg-purple-500'
        },
        {
          title: 'KYC Review Completed',
          description: 'Annual KYC review completed for major LP',
          date: '2024-02-13',
          icon: null,
          color: 'bg-green-500'
        },
        {
          title: 'Exit Process Initiated',
          description: 'Started exit process for Consumer Brands portfolio company',
          date: '2024-02-12',
          icon: null,
          color: 'bg-red-500'
        }
      ],
      upcomingEvents: [
        {
          title: 'Annual LP Meeting',
          type: 'Investor Relations',
          date: '2024-03-15',
          time: '09:00 AM'
        },
        {
          title: 'Board Meeting - Tech Growth',
          type: 'Portfolio Management',
          date: '2024-03-10',
          time: '02:00 PM'
        },
        {
          title: 'Investment Committee',
          type: 'Deal Review',
          date: '2024-03-05',
          time: '10:00 AM'
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch dashboard metrics');
  }
}