/**
 * Additional Financial Calculators & Excel Generation Engine
 * 
 * - Cash Runway Calculator
 * - Burn Rate Calculator
 * - Runway Extension Calculator (Reverse target solver)
 * - Runway Excel / CSV Generator
 */

import { formatCurrency } from './runwayCalculator';

/* ============================================================
   1. CASH RUNWAY CALCULATOR
   ============================================================ */
export interface CashRunwayInputs {
  cashBalance: number;
  monthlyOperatingExpenses: number;
  monthlyCashInflows: number;
  emergencyBufferPercent: number; // e.g. 20%
}

export interface CashRunwayResults {
  grossMonthlyBurn: number;
  netMonthlyBurn: number;
  netCashFlow: number;
  grossRunwayMonths: number;
  netRunwayMonths: number | 'infinite';
  emergencyBufferAmount: number;
  usableCashBalance: number;
  usableRunwayMonths: number | 'infinite';
  status: 'healthy' | 'caution' | 'critical' | 'sustainable';
  statusMessage: string;
}

export function calculateCashRunway(inputs: CashRunwayInputs): CashRunwayResults {
  const cash = Math.max(0, inputs.cashBalance || 0);
  const expenses = Math.max(0, inputs.monthlyOperatingExpenses || 0);
  const inflows = Math.max(0, inputs.monthlyCashInflows || 0);
  const bufferPct = Math.min(50, Math.max(0, inputs.emergencyBufferPercent || 0)) / 100;

  const grossMonthlyBurn = expenses;
  const netMonthlyBurn = expenses - inflows;
  const netCashFlow = inflows - expenses;

  const emergencyBufferAmount = Math.round(cash * bufferPct);
  const usableCashBalance = Math.max(0, cash - emergencyBufferAmount);

  const grossRunwayMonths = expenses > 0 ? Number((cash / expenses).toFixed(1)) : 999;
  
  let netRunwayMonths: number | 'infinite' = 'infinite';
  let usableRunwayMonths: number | 'infinite' = 'infinite';

  if (netMonthlyBurn > 0) {
    netRunwayMonths = Number((cash / netMonthlyBurn).toFixed(1));
    usableRunwayMonths = Number((usableCashBalance / netMonthlyBurn).toFixed(1));
  }

  let status: CashRunwayResults['status'] = 'healthy';
  let statusMessage = '';

  if (netRunwayMonths === 'infinite') {
    status = 'sustainable';
    statusMessage = 'Your cash inflows cover or exceed expenses. Cash reserves are preserved.';
  } else if (netRunwayMonths < 3) {
    status = 'critical';
    statusMessage = `Critical cash position: ${netRunwayMonths} months until depletion. Immediate cost cuts or financing needed.`;
  } else if (netRunwayMonths < 6) {
    status = 'caution';
    statusMessage = `Moderate cash position: ${netRunwayMonths} months remaining (${usableRunwayMonths} months with reserve buffer).`;
  } else {
    status = 'healthy';
    statusMessage = `Strong liquidity: ${netRunwayMonths} months of total cash runway.`;
  }

  return {
    grossMonthlyBurn,
    netMonthlyBurn,
    netCashFlow,
    grossRunwayMonths,
    netRunwayMonths,
    emergencyBufferAmount,
    usableCashBalance,
    usableRunwayMonths,
    status,
    statusMessage
  };
}

/* ============================================================
   2. BURN RATE CALCULATOR
   ============================================================ */
export interface BurnRateInputs {
  cashBalance: number;
  grossMonthlyExpenses: number;
  monthlyRevenue: number;
  netNewARR?: number; // Optional for burn multiple
}

export interface BurnRateResults {
  grossBurnRate: number;
  netBurnRate: number;
  monthlyBurnPercentage: number; // % of total cash consumed per month
  runwayMonths: number | 'infinite';
  burnMultiple?: number; // Net Burn / Net New ARR
  burnMultipleRating?: 'Excellent' | 'Good' | 'Fair' | 'High Risk';
  annualizedGrossBurn: number;
  annualizedNetBurn: number;
}

export function calculateBurnRate(inputs: BurnRateInputs): BurnRateResults {
  const cash = Math.max(0, inputs.cashBalance || 0);
  const gross = Math.max(0, inputs.grossMonthlyExpenses || 0);
  const rev = Math.max(0, inputs.monthlyRevenue || 0);
  const netBurn = gross - rev;

  const monthlyBurnPercentage = cash > 0 && netBurn > 0 
    ? Number(((netBurn / cash) * 100).toFixed(1)) 
    : 0;

  const runwayMonths = netBurn > 0 
    ? Number((cash / netBurn).toFixed(1)) 
    : 'infinite';

  let burnMultiple: number | undefined;
  let burnMultipleRating: BurnRateResults['burnMultipleRating'];

  if (inputs.netNewARR && inputs.netNewARR > 0 && netBurn > 0) {
    const annualNetBurn = netBurn * 12;
    burnMultiple = Number((annualNetBurn / inputs.netNewARR).toFixed(2));
    if (burnMultiple < 1.0) burnMultipleRating = 'Excellent';
    else if (burnMultiple <= 1.5) burnMultipleRating = 'Good';
    else if (burnMultiple <= 2.0) burnMultipleRating = 'Fair';
    else burnMultipleRating = 'High Risk';
  }

  return {
    grossBurnRate: gross,
    netBurnRate: netBurn,
    monthlyBurnPercentage,
    runwayMonths,
    burnMultiple,
    burnMultipleRating,
    annualizedGrossBurn: gross * 12,
    annualizedNetBurn: Math.max(0, netBurn * 12)
  };
}

/* ============================================================
   3. RUNWAY EXTENSION CALCULATOR (Reverse Target Solver)
   ============================================================ */
export interface ExtensionInputs {
  currentCash: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  targetRunwayMonths: number; // e.g. 18 months
}

export interface ExtensionResults {
  currentRunwayMonths: number | 'infinite';
  currentNetBurn: number;
  targetNetBurnAllowed: number;
  requiredMonthlyExpenseReduction: number;
  requiredExpenseReductionPercent: number;
  requiredMonthlyRevenueIncrease: number;
  requiredRevenueIncreasePercent: number;
  requiredCapitalInfusion: number;
  alreadyMeetsTarget: boolean;
}

export function calculateRunwayExtension(inputs: ExtensionInputs): ExtensionResults {
  const cash = Math.max(0, inputs.currentCash || 0);
  const rev = Math.max(0, inputs.monthlyRevenue || 0);
  const exp = Math.max(0, inputs.monthlyExpenses || 0);
  const targetMonths = Math.max(1, inputs.targetRunwayMonths || 12);

  const currentNetBurn = exp - rev;
  const currentRunway = currentNetBurn > 0 ? Number((cash / currentNetBurn).toFixed(1)) : 'infinite';

  // Target net burn allowed to make current cash last targetMonths
  const targetNetBurnAllowed = Math.round(cash / targetMonths);

  // If already profitable or current runway >= target
  const alreadyMeetsTarget = currentRunway === 'infinite' || (typeof currentRunway === 'number' && currentRunway >= targetMonths);

  if (alreadyMeetsTarget) {
    return {
      currentRunwayMonths: currentRunway,
      currentNetBurn,
      targetNetBurnAllowed,
      requiredMonthlyExpenseReduction: 0,
      requiredExpenseReductionPercent: 0,
      requiredMonthlyRevenueIncrease: 0,
      requiredRevenueIncreasePercent: 0,
      requiredCapitalInfusion: 0,
      alreadyMeetsTarget: true
    };
  }

  // To reach targetMonths:
  // Option 1: Reduce expenses so that (NewExpenses - rev) = targetNetBurnAllowed
  const targetExpenses = rev + targetNetBurnAllowed;
  const requiredMonthlyExpenseReduction = Math.max(0, exp - targetExpenses);
  const requiredExpenseReductionPercent = exp > 0 ? Number(((requiredMonthlyExpenseReduction / exp) * 100).toFixed(1)) : 0;

  // Option 2: Increase revenue so that (exp - NewRev) = targetNetBurnAllowed
  const targetRev = Math.max(0, exp - targetNetBurnAllowed);
  const requiredMonthlyRevenueIncrease = Math.max(0, targetRev - rev);
  const requiredRevenueIncreasePercent = rev > 0 ? Number(((requiredMonthlyRevenueIncrease / rev) * 100).toFixed(1)) : 100;

  // Option 3: Add capital to bridge current net burn for targetMonths
  const totalCashNeeded = currentNetBurn * targetMonths;
  const requiredCapitalInfusion = Math.max(0, totalCashNeeded - cash);

  return {
    currentRunwayMonths: currentRunway,
    currentNetBurn,
    targetNetBurnAllowed,
    requiredMonthlyExpenseReduction,
    requiredExpenseReductionPercent,
    requiredMonthlyRevenueIncrease,
    requiredRevenueIncreasePercent,
    requiredCapitalInfusion,
    alreadyMeetsTarget: false
  };
}

/* ============================================================
   4. RUNWAY EXCEL / CSV MODEL EXPORTER
   ============================================================ */
export function generateRunwayCsv(
  cash: number,
  monthlyRev: number,
  monthlyExp: number,
  revGrowthPct: number = 0,
  expGrowthPct: number = 0,
  months: number = 24
): string {
  const rows: string[] = [];
  rows.push('Runway Calculator Financial Model');
  rows.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
  rows.push('');
  rows.push('Parameters,Value');
  rows.push(`Initial Cash Balance,${cash}`);
  rows.push(`Monthly Revenue,${monthlyRev}`);
  rows.push(`Monthly Expenses,${monthlyExp}`);
  rows.push(`Monthly Revenue Growth Rate (%),${revGrowthPct}%`);
  rows.push(`Monthly Expense Growth Rate (%),${expGrowthPct}%`);
  rows.push('');
  rows.push('Month,Starting Cash,Revenue,Expenses,Net Cash Flow,Ending Cash,Runway Status');

  let currentCash = cash;
  let rev = monthlyRev;
  let exp = monthlyExp;

  for (let m = 1; m <= months; m++) {
    if (m > 1) {
      rev = rev * (1 + revGrowthPct / 100);
      exp = exp * (1 + expGrowthPct / 100);
    }
    const netFlow = rev - exp;
    const endingCash = currentCash + netFlow;
    const status = endingCash <= 0 ? 'DEPLETED' : endingCash < exp * 3 ? 'CRITICAL' : 'OK';

    rows.push(
      `Month ${m},${Math.round(currentCash)},${Math.round(rev)},${Math.round(exp)},${Math.round(netFlow)},${Math.round(Math.max(0, endingCash))},${status}`
    );
    currentCash = Math.max(0, endingCash);
  }

  return rows.join('\n');
}
