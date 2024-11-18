import { FundStructure, FundProjections, YearlyProjection } from '../types/funds';

function calculatePortfolioValue(
  totalInvested: number,
  structure: FundStructure,
  year: number,
  isInvestmentPeriod: boolean
): number {
  if (totalInvested === 0) return 0;
  
  // Use expected multiple to calculate annual growth rate
  const targetMultiple = structure.expectedReturns.multiple;
  const yearsToTarget = structure.fundTerm;
  const annualGrowthRate = Math.pow(targetMultiple, 1/yearsToTarget) - 1;
  
  // During investment period, adjust growth rate
  const effectiveRate = isInvestmentPeriod ? annualGrowthRate * 0.7 : annualGrowthRate;
  
  return totalInvested * Math.pow(1 + effectiveRate, year);
}

function calculateDistributions(
  portfolioValue: number,
  totalInvested: number,
  year: number,
  structure: FundStructure
): number {
  // No distributions during investment period
  if (year <= structure.investmentPeriod) return 0;
  
  // Calculate potential distribution based on portfolio value growth
  const valueGain = portfolioValue - totalInvested;
  if (valueGain <= 0) return 0;
  
  // Distribution rate increases after investment period
  const yearsAfterInvestment = year - structure.investmentPeriod;
  const distributionRate = Math.min(0.8, 0.2 + (yearsAfterInvestment * 0.1));
  
  return valueGain * distributionRate;
}

function calculateFundMultiple(
  totalDistributions: number,
  remainingValue: number,
  totalInvested: number
): number {
  if (totalInvested === 0) return 0;
  return (totalDistributions + remainingValue) / totalInvested;
}

function calculateNetIRR(
  yearlyProjections: YearlyProjection[], 
  totalInvested: number,
  structure: FundStructure
): number {
  if (yearlyProjections.length === 0 || totalInvested === 0) return 0;

  const cashFlows = [];
  let cumulativeInvested = 0;

  // Add initial investment as negative cash flow
  yearlyProjections.forEach((year, index) => {
    const yearNumber = index + 1;
    
    // Add capital calls as negative cash flows
    if (year.capitalCalled > 0) {
      cashFlows.push({
        amount: -year.capitalCalled,
        year: yearNumber
      });
      cumulativeInvested += year.capitalCalled;
    }

    // Add distributions as positive cash flows
    if (year.distributions > 0) {
      cashFlows.push({
        amount: year.distributions,
        year: yearNumber
      });
    }
  });

  // Add final portfolio value as last cash flow
  const finalValue = yearlyProjections[yearlyProjections.length - 1].portfolioValue;
  if (finalValue > 0) {
    cashFlows.push({
      amount: finalValue,
      year: structure.fundTerm
    });
  }

  // Calculate IRR using Newton's method
  let irr = 0.15; // Initial guess
  const maxIterations = 100;
  const tolerance = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivativeNpv = 0;

    cashFlows.forEach(cf => {
      const factor = Math.pow(1 + irr, cf.year);
      npv += cf.amount / factor;
      derivativeNpv -= cf.year * cf.amount / (factor * (1 + irr));
    });

    const newIrr = irr - npv / derivativeNpv;
    if (Math.abs(newIrr - irr) < tolerance) {
      irr = newIrr;
      break;
    }
    irr = newIrr;
  }

  return Math.max(0, irr * 100); // Convert to percentage, minimum 0%
}

function calculateCarry(
  totalDistributions: number,
  remainingValue: number,
  totalInvested: number,
  structure: FundStructure
): number {
  const totalValue = totalDistributions + remainingValue;
  const totalProfit = totalValue - totalInvested;
  
  if (totalProfit <= 0) return 0;
  
  // Calculate hurdle amount
  const hurdleAmount = totalInvested * (structure.hurdleRate / 100);
  
  if (totalProfit <= hurdleAmount) return 0;
  
  // Calculate excess return above hurdle
  const excessReturn = totalProfit - hurdleAmount;
  
  // Calculate catch-up if applicable
  if (structure.catchupRate > 0) {
    const catchupAmount = Math.min(
      excessReturn,
      (hurdleAmount * structure.carryRate) / (100 - structure.carryRate)
    );
    return (catchupAmount + excessReturn) * (structure.carryRate / 100);
  }
  
  // Standard carry calculation
  return excessReturn * (structure.carryRate / 100);
}

export function calculateFundProjections(structure: FundStructure): FundProjections {
  if (!structure.targetSize || structure.targetSize <= 0) {
    return {
      yearlyProjections: Array(structure.fundTerm).fill({
        capitalCalled: 0,
        invested: 0,
        managementFee: 0,
        portfolioValue: 0,
        distributions: 0
      }),
      totalManagementFees: 0,
      expectedCarry: 0,
      fundMultiple: 0,
      netIRR: 0
    };
  }

  const yearlyProjections: YearlyProjection[] = [];
  let totalInvested = 0;
  let totalDistributions = 0;
  let totalManagementFees = 0;
  let cumulativePortfolioValue = 0;
  let undrawnCapital = structure.targetSize;

  // Calculate yearly projections
  for (let year = 1; year <= structure.fundTerm; year++) {
    const isInvestmentPeriod = year <= structure.investmentPeriod;
    
    // Calculate capital called based on deployment schedule
    const deploymentIndex = year - 1;
    const capitalCalledPct = isInvestmentPeriod && deploymentIndex < structure.expectedDeployment.length 
      ? structure.expectedDeployment[deploymentIndex] 
      : 0;
    
    const capitalCalled = Math.min((structure.targetSize * capitalCalledPct) / 100, undrawnCapital);
    undrawnCapital = Math.max(0, undrawnCapital - capitalCalled);
    
    // Net invested amount after organizational expenses
    const invested = capitalCalled * 0.98;
    totalInvested += invested;

    // Calculate management fees
    const managementFeeBase = isInvestmentPeriod ? structure.targetSize : totalInvested;
    const managementFee = (managementFeeBase * structure.managementFee) / 100;
    totalManagementFees += managementFee;

    // Calculate portfolio value using target multiple and IRR
    const portfolioValue = calculatePortfolioValue(
      totalInvested,
      structure,
      year,
      isInvestmentPeriod
    );

    // Calculate distributions
    const distributions = calculateDistributions(
      portfolioValue,
      totalInvested,
      year,
      structure
    );
    
    totalDistributions += distributions;
    cumulativePortfolioValue = Math.max(0, portfolioValue - distributions);

    yearlyProjections.push({
      capitalCalled,
      invested,
      managementFee,
      portfolioValue: cumulativePortfolioValue,
      distributions
    });
  }

  // Calculate fund metrics
  const fundMultiple = calculateFundMultiple(
    totalDistributions, 
    cumulativePortfolioValue, 
    totalInvested
  );
  
  const netIRR = calculateNetIRR(
    yearlyProjections, 
    totalInvested,
    structure
  );
  
  const expectedCarry = calculateCarry(
    totalDistributions, 
    cumulativePortfolioValue, 
    totalInvested,
    structure
  );

  return {
    yearlyProjections,
    totalManagementFees,
    expectedCarry,
    fundMultiple,
    netIRR
  };
}