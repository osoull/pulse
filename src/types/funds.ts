export interface FundStructure {
  targetSize: number;
  managementFee: number;
  hurdleRate: number;
  carryRate: number;
  investmentPeriod: number;
  fundTerm: number;
  catchupRate: number;
  expectedDeployment: number[];
  expectedReturns: {
    multiple: number;
    irr: number;
  };
}

export interface YearlyProjection {
  capitalCalled: number;
  invested: number;
  managementFee: number;
  portfolioValue: number;
  distributions: number;
}

export interface FundProjections {
  yearlyProjections: YearlyProjection[];
  totalManagementFees: number;
  expectedCarry: number;
  fundMultiple: number;
  netIRR: number;
}

export interface Fund {
  id: string;
  name: string;
  strategy: string;
  aum: number;
  vintage: number;
  irr: number;
  multiple: number;
  status: 'Active' | 'Fully Invested' | 'Harvesting' | 'Closed';
}