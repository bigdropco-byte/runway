/**
 * Advanced Financial Runway Calculators
 * 
 * 1. Hiring Runway Impact Calculator
 * 2. Default Alive vs. Default Dead Calculator (Paul Graham Framework)
 * 3. SAFE & Dilution Runway Calculator
 */

import { formatCurrency } from './runwayCalculator';

/* ============================================================
   1. HIRING RUNWAY IMPACT CALCULATOR
   ============================================================ */
export interface HireRole {
  id: string;
  title: string;
  count: number;
  annualSalary: number;
  benefitsMultiplier: number; // e.g. 1.25 for +25% taxes/benefits
}

export interface HiringRunwayInputs {
  cashBalance: number;
  monthlyRevenue: number;
  currentMonthlyExpenses: number;
  hires: HireRole[];
}

export interface HiringRunwayResults {
  baselineNetBurn: number;
  baselineRunwayMonths: number | 'infinite';
  addedMonthlyBurn: number;
  newGrossExpenses: number;
  newNetBurn: number;
  newRunwayMonths: number | 'infinite';
  runwayReductionMonths: number;
  totalAnnualHiringCost: number;
}

export function calculateHiringRunway(inputs: HiringRunwayInputs): HiringRunwayResults {
  const cash = Math.max(0, inputs.cashBalance || 0);
  const rev = Math.max(0, inputs.monthlyRevenue || 0);
  const baseExp = Math.max(0, inputs.currentMonthlyExpenses || 0);

  const baselineNetBurn = baseExp - rev;
  const baselineRunwayMonths = baselineNetBurn > 0 
    ? Number((cash / baselineNetBurn).toFixed(1)) 
    : 'infinite';

  // Calculate added payroll burn
  let totalAnnualHiringCost = 0;
  for (const hire of inputs.hires) {
    const fullyLoadedSalary = hire.annualSalary * (hire.benefitsMultiplier || 1.2);
    totalAnnualHiringCost += fullyLoadedSalary * hire.count;
  }

  const addedMonthlyBurn = Math.round(totalAnnualHiringCost / 12);
  const newGrossExpenses = baseExp + addedMonthlyBurn;
  const newNetBurn = newGrossExpenses - rev;

  const newRunwayMonths = newNetBurn > 0 
    ? Number((cash / newNetBurn).toFixed(1)) 
    : 'infinite';

  let runwayReductionMonths = 0;
  if (typeof baselineRunwayMonths === 'number' && typeof newRunwayMonths === 'number') {
    runwayReductionMonths = Math.max(0, Number((baselineRunwayMonths - newRunwayMonths).toFixed(1)));
  }

  return {
    baselineNetBurn,
    baselineRunwayMonths,
    addedMonthlyBurn,
    newGrossExpenses,
    newNetBurn,
    newRunwayMonths,
    runwayReductionMonths,
    totalAnnualHiringCost
  };
}

/* ============================================================
   2. DEFAULT ALIVE VS. DEFAULT DEAD CALCULATOR
   ============================================================ */
export interface DefaultAliveInputs {
  cashBalance: number;
  monthlyExpenses: number;
  monthlyRevenue: number;
  monthlyRevenueGrowthRate: number; // e.g. 7%
  monthlyExpenseGrowthRate?: number; // e.g. 1%
}

export interface DefaultAlivePoint {
  month: number;
  revenue: number;
  expenses: number;
  netBurn: number;
  endingCash: number;
}

export interface DefaultAliveResults {
  isDefaultAlive: boolean;
  statusHeadline: string;
  explanation: string;
  crossoverMonth: number | null; // Month when revenue >= expenses
  lowestCashTrough: number; // Lowest cash balance reached before profitability
  cashRemainingAtCrossover: number;
  depletionMonth: number | null; // Month cash hits 0 if default dead
  projectionPoints: DefaultAlivePoint[];
}

export function calculateDefaultAlive(inputs: DefaultAliveInputs): DefaultAliveResults {
  const cash = Math.max(0, inputs.cashBalance || 0);
  let rev = Math.max(0, inputs.monthlyRevenue || 0);
  let exp = Math.max(0, inputs.monthlyExpenses || 0);
  const revGrowth = (inputs.monthlyRevenueGrowthRate || 0) / 100;
  const expGrowth = (inputs.monthlyExpenseGrowthRate || 0) / 100;

  // If already break-even or profitable
  if (rev >= exp) {
    return {
      isDefaultAlive: true,
      statusHeadline: 'Default Alive (Currently Profitable)',
      explanation: 'Your current monthly revenue already equals or exceeds monthly expenses. You do not depend on future fundraising to survive.',
      crossoverMonth: 1,
      lowestCashTrough: cash,
      cashRemainingAtCrossover: cash,
      depletionMonth: null,
      projectionPoints: []
    };
  }

  // Simulation over 60 months
  let currentCash = cash;
  let lowestCash = cash;
  let crossoverMonth: number | null = null;
  let depletionMonth: number | null = null;
  const points: DefaultAlivePoint[] = [];

  for (let m = 1; m <= 60; m++) {
    if (m > 1) {
      rev = rev * (1 + revGrowth);
      exp = exp * (1 + expGrowth);
    }
    const netCashFlow = rev - exp;
    const endCash = currentCash + netCashFlow;

    if (endCash < lowestCash) {
      lowestCash = Math.max(0, endCash);
    }

    // Check profitability crossover
    if (crossoverMonth === null && rev >= exp) {
      crossoverMonth = m;
    }

    // Check cash depletion
    if (depletionMonth === null && endCash <= 0) {
      depletionMonth = m;
    }

    points.push({
      month: m,
      revenue: Math.round(rev),
      expenses: Math.round(exp),
      netBurn: Math.round(-netCashFlow),
      endingCash: Math.round(Math.max(0, endCash))
    });

    currentCash = Math.max(0, endCash);
    if (endCash <= 0 && crossoverMonth === null) {
      break;
    }
  }

  const isDefaultAlive = crossoverMonth !== null && (depletionMonth === null || crossoverMonth < depletionMonth);

  let statusHeadline = '';
  let explanation = '';

  if (isDefaultAlive) {
    statusHeadline = 'Default Alive';
    explanation = `Based on your ${inputs.monthlyRevenueGrowthRate}% monthly growth rate, your revenue will surpass monthly expenses in Month ${crossoverMonth} with ${formatCurrency(lowestCash)} remaining in the bank. You can reach profitability without needing more capital.`;
  } else {
    statusHeadline = 'Default Dead';
    explanation = `At your current growth and burn rate, your cash will run out around Month ${depletionMonth || 'N/A'} before revenue catches up to expenses. You must raise capital or reduce expenses to reach sustainable break-even.`;
  }

  return {
    isDefaultAlive,
    statusHeadline,
    explanation,
    crossoverMonth,
    lowestCashTrough: Math.round(lowestCash),
    cashRemainingAtCrossover: crossoverMonth && points[crossoverMonth - 1] ? points[crossoverMonth - 1].endingCash : 0,
    depletionMonth,
    projectionPoints: points.slice(0, 24)
  };
}

/* ============================================================
   3. SAFE NOTE & DILUTION RUNWAY CALCULATOR
   ============================================================ */
export interface SafeRunwayInputs {
  currentCash: number;
  monthlyNetBurn: number;
  targetRunwayMonths: number; // e.g. 18 months
  valuationCap: number; // e.g. $5,000,000 post-money valuation cap
  discountPercent?: number; // e.g. 20%
}

export interface SafeRunwayResults {
  currentRunwayMonths: number | 'infinite';
  capitalNeededForTarget: number;
  recommendedRaiseAmount: number; // Capital needed + 15% contingency buffer
  postMoneyValuation: number;
  founderDilutionPercent: number;
  founderOwnershipRemainingPercent: number;
  newTotalRunwayMonths: number;
}

export function calculateSafeRunway(inputs: SafeRunwayInputs): SafeRunwayResults {
  const cash = Math.max(0, inputs.currentCash || 0);
  const netBurn = Math.max(1, inputs.monthlyNetBurn || 0);
  const targetMonths = Math.max(1, inputs.targetRunwayMonths || 18);
  const valCap = Math.max(100_000, inputs.valuationCap || 5_000_000);

  const currentRunwayMonths = Number((cash / netBurn).toFixed(1));

  // Capital needed to cover target months
  const totalCashNeeded = netBurn * targetMonths;
  const capitalNeededForTarget = Math.max(0, totalCashNeeded - cash);

  // Recommended raise: capital needed + 15% safety buffer
  const recommendedRaiseAmount = Math.round(capitalNeededForTarget * 1.15);

  // Post-money SAFE dilution = Investment Amount / Post-Money Valuation Cap
  const postMoneyValuation = valCap;
  const rawDilution = (recommendedRaiseAmount / postMoneyValuation) * 100;
  const founderDilutionPercent = Number(Math.min(99, Math.max(0, rawDilution)).toFixed(2));
  const founderOwnershipRemainingPercent = Number((100 - founderDilutionPercent).toFixed(2));

  const newTotalCash = cash + recommendedRaiseAmount;
  const newTotalRunwayMonths = Number((newTotalCash / netBurn).toFixed(1));

  return {
    currentRunwayMonths,
    capitalNeededForTarget,
    recommendedRaiseAmount,
    postMoneyValuation,
    founderDilutionPercent,
    founderOwnershipRemainingPercent,
    newTotalRunwayMonths
  };
}
