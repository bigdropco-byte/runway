/**
 * Pure TypeScript Calculation Engine for Runway Calculator
 * 
 * Provides robust financial calculations for:
 * - Gross Burn vs Net Burn
 * - Static and Growth-Compounded Runway (with linear interpolation)
 * - Month-by-month cash trajectory projections
 * - Break-even thresholds and required revenue
 * - "What If?" scenario impact analysis
 */

export interface RunwayInputs {
  cashBalance: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  revenueGrowthRate?: number; // e.g. 5 for 5%
  expenseGrowthRate?: number; // e.g. 2 for 2%
  oneTimeExpense?: number;
  oneTimeExpenseMonth?: number; // Month index (1-based, default: 1)
  additionalFunding?: number;
  additionalFundingMonth?: number; // Month index (1-based, default: 1)
}

export interface MonthlyProjectionPoint {
  month: number;
  dateLabel: string;
  startingCash: number;
  revenue: number;
  expenses: number;
  netCashFlow: number;
  endingCash: number;
  isDepleted: boolean;
}

export interface RunwayMetrics {
  grossBurn: number;
  netBurn: number;
  netCashFlow: number;
  runwayMonths: number | 'infinite';
  runwayMonthsFormatted: string;
  isBreakEven: boolean;
  isProfitable: boolean;
  runwayStatus: 'healthy' | 'moderate' | 'critical' | 'profitable' | 'zero-cash' | 'zero-burn';
  statusMessage: string;
  depletionDateFormatted: string;
  requiredBreakEvenRevenue: number;
  breakEvenRevenueGap: number;
  cashAt3Months: number;
  cashAt6Months: number;
  cashAt12Months: number;
  monthlyProjections: MonthlyProjectionPoint[];
}

export interface ScenarioItem {
  id: string;
  category: 'expense_reduction' | 'revenue_increase' | 'funding';
  title: string;
  description: string;
  newRunwayMonths: number | 'infinite';
  newRunwayFormatted: string;
  deltaMonths: number | 'infinite';
  deltaFormatted: string;
  newNetBurn: number;
  isSustainable: boolean;
}

export interface ScenarioResults {
  expenseReductions: ScenarioItem[];
  revenueIncreases: ScenarioItem[];
  fundingAdditions: ScenarioItem[];
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format date for month offset from reference date
 */
export function getMonthOffsetDate(monthsOffset: number, baseDate: Date = new Date()): { label: string; full: string; year: number; month: number } {
  const target = new Date(baseDate.getFullYear(), baseDate.getMonth() + Math.round(monthsOffset), 1);
  const monthName = MONTH_NAMES[target.getMonth()];
  const year = target.getFullYear();
  return {
    label: `${monthName.slice(0, 3)} ${year}`,
    full: `${monthName} ${year}`,
    year,
    month: target.getMonth() + 1
  };
}

/**
 * Format currency with locale options
 */
export function formatCurrency(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  
  if (compact && Math.abs(amount) >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (compact && Math.abs(amount) >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}k`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Format runway months into clear human-readable string
 */
export function formatRunway(months: number | 'infinite'): string {
  if (months === 'infinite') {
    return 'Sustainable / Infinite';
  }
  if (months <= 0) {
    return '0 months';
  }
  if (months < 1) {
    const days = Math.round(months * 30);
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }
  return `${months.toFixed(1)} months`;
}

/**
 * Main calculation engine
 */
export function calculateRunway(inputs: RunwayInputs, baseDate: Date = new Date()): RunwayMetrics {
  const cashBalance = Math.max(0, inputs.cashBalance || 0);
  const monthlyRevenue = Math.max(0, inputs.monthlyRevenue || 0);
  const monthlyExpenses = Math.max(0, inputs.monthlyExpenses || 0);
  
  const revGrowthRate = (inputs.revenueGrowthRate || 0) / 100;
  const expGrowthRate = (inputs.expenseGrowthRate || 0) / 100;
  const oneTimeExpense = Math.max(0, inputs.oneTimeExpense || 0);
  const oneTimeExpenseMonth = Math.max(1, inputs.oneTimeExpenseMonth || 1);
  const additionalFunding = Math.max(0, inputs.additionalFunding || 0);
  const additionalFundingMonth = Math.max(1, inputs.additionalFundingMonth || 1);

  // Core metrics
  const grossBurn = monthlyExpenses;
  const netBurn = monthlyExpenses - monthlyRevenue;
  const netCashFlow = monthlyRevenue - monthlyExpenses;
  const isBreakEven = netBurn === 0;
  const isProfitable = netBurn < 0;
  const requiredBreakEvenRevenue = monthlyExpenses;
  const breakEvenRevenueGap = Math.max(0, monthlyExpenses - monthlyRevenue);

  // Edge cases
  if (cashBalance === 0) {
    return {
      grossBurn,
      netBurn,
      netCashFlow,
      runwayMonths: 0,
      runwayMonthsFormatted: '0 months',
      isBreakEven,
      isProfitable,
      runwayStatus: 'zero-cash',
      statusMessage: 'Available cash balance is $0. Enter your cash balance to calculate runway.',
      depletionDateFormatted: 'Immediate (no cash balance)',
      requiredBreakEvenRevenue,
      breakEvenRevenueGap,
      cashAt3Months: 0,
      cashAt6Months: 0,
      cashAt12Months: 0,
      monthlyProjections: generateStaticProjections(0, monthlyRevenue, monthlyExpenses, 12, baseDate)
    };
  }

  if (grossBurn === 0) {
    return {
      grossBurn: 0,
      netBurn: -monthlyRevenue,
      netCashFlow: monthlyRevenue,
      runwayMonths: 'infinite',
      runwayMonthsFormatted: 'Sustainable / Infinite',
      isBreakEven: monthlyRevenue === 0,
      isProfitable: monthlyRevenue > 0,
      runwayStatus: 'zero-burn',
      statusMessage: 'Your monthly expenses are $0. Your available cash is not being depleted.',
      depletionDateFormatted: 'Indefinite',
      requiredBreakEvenRevenue: 0,
      breakEvenRevenueGap: 0,
      cashAt3Months: cashBalance + (monthlyRevenue * 3),
      cashAt6Months: cashBalance + (monthlyRevenue * 6),
      cashAt12Months: cashBalance + (monthlyRevenue * 12),
      monthlyProjections: generateStaticProjections(cashBalance, monthlyRevenue, 0, 12, baseDate)
    };
  }

  // Generate month-by-month compound projection up to 60 months
  const maxSimulationMonths = 60;
  const projections: MonthlyProjectionPoint[] = [];
  let currentCash = cashBalance;
  let simulatedRevenue = monthlyRevenue;
  let simulatedExpenses = monthlyExpenses;
  let exactRunwayMonths: number | 'infinite' = 'infinite';
  let depletionFound = false;

  for (let m = 1; m <= maxSimulationMonths; m++) {
    // Growth compounding occurs month over month
    if (m > 1) {
      simulatedRevenue = Math.max(0, simulatedRevenue * (1 + revGrowthRate));
      simulatedExpenses = Math.max(0, simulatedExpenses * (1 + expGrowthRate));
    }

    const startCashThisMonth = currentCash;
    let oneTimeExpDeduction = 0;
    if (oneTimeExpense > 0 && m === oneTimeExpenseMonth) {
      oneTimeExpDeduction = oneTimeExpense;
    }

    let fundingAddition = 0;
    if (additionalFunding > 0 && m === additionalFundingMonth) {
      fundingAddition = additionalFunding;
    }

    const monthlyFlow = simulatedRevenue - simulatedExpenses - oneTimeExpDeduction + fundingAddition;
    const endCashThisMonth = startCashThisMonth + monthlyFlow;

    const dateOffset = getMonthOffsetDate(m, baseDate);

    // Check if cash depletes during this month
    if (!depletionFound && endCashThisMonth <= 0) {
      depletionFound = true;
      // Linear interpolation: fraction of month until cash hits 0
      const monthlyDeficit = -monthlyFlow; // Positive value representing net cash drain
      if (monthlyDeficit > 0 && startCashThisMonth > 0) {
        const fraction = Math.min(1, Math.max(0, startCashThisMonth / monthlyDeficit));
        exactRunwayMonths = Number(((m - 1) + fraction).toFixed(1));
      } else {
        exactRunwayMonths = m - 1;
      }
    }

    const isDepleted = endCashThisMonth <= 0;
    projections.push({
      month: m,
      dateLabel: dateOffset.label,
      startingCash: Math.round(startCashThisMonth),
      revenue: Math.round(simulatedRevenue),
      expenses: Math.round(simulatedExpenses),
      netCashFlow: Math.round(monthlyFlow),
      endingCash: Math.round(Math.max(0, endCashThisMonth)),
      isDepleted
    });

    currentCash = Math.max(0, endCashThisMonth);
  }

  // If no growth parameters or simple static model
  const hasGrowth = revGrowthRate !== 0 || expGrowthRate !== 0 || oneTimeExpense > 0 || additionalFunding > 0;
  
  // If static and no depletion in simulation, verify static burn
  if (!hasGrowth) {
    if (netBurn <= 0) {
      exactRunwayMonths = 'infinite';
    } else {
      exactRunwayMonths = Number((cashBalance / netBurn).toFixed(1));
    }
  } else if (!depletionFound) {
    // If simulation didn't deplete within 60 months and net flow is positive
    const lastPoint = projections[projections.length - 1];
    if (lastPoint.netCashFlow >= 0) {
      exactRunwayMonths = 'infinite';
    } else {
      // Linear extrapolation beyond 60 months
      const remainingDeficit = -lastPoint.netCashFlow;
      exactRunwayMonths = Number((60 + (lastPoint.endingCash / remainingDeficit)).toFixed(1));
    }
  }

  // Format depletion date
  let depletionDateFormatted = 'Indefinite';
  if (exactRunwayMonths !== 'infinite') {
    const depletionDate = getMonthOffsetDate(exactRunwayMonths, baseDate);
    depletionDateFormatted = depletionDate.full;
  }

  // Cash at milestones (Month 3, Month 6, Month 12)
  const cashAt3Months = projections[2] ? projections[2].endingCash : 0;
  const cashAt6Months = projections[5] ? projections[5].endingCash : 0;
  const cashAt12Months = projections[11] ? projections[11].endingCash : 0;

  // Determine status & narrative message
  let runwayStatus: RunwayMetrics['runwayStatus'] = 'healthy';
  let statusMessage = '';

  if (exactRunwayMonths === 'infinite') {
    runwayStatus = 'profitable';
    if (isBreakEven) {
      statusMessage = 'Your business is operating at break-even. Monthly revenue matches your expenses.';
    } else {
      statusMessage = `You are generating positive net cash flow of ${formatCurrency(Math.abs(netBurn))}/month. Your cash balance is growing.`;
    }
  } else if (exactRunwayMonths < 3) {
    runwayStatus = 'critical';
    statusMessage = `Critical: You have ${formatRunway(exactRunwayMonths)} of runway left. Urgent capital extension or expense reductions recommended.`;
  } else if (exactRunwayMonths < 6) {
    runwayStatus = 'moderate';
    statusMessage = `Caution: You have ${formatRunway(exactRunwayMonths)} of runway remaining. It is time to start planning fundraising or cost optimizations.`;
  } else {
    runwayStatus = 'healthy';
    statusMessage = `Healthy: You have ${formatRunway(exactRunwayMonths)} of runway (${depletionDateFormatted}).`;
  }

  return {
    grossBurn,
    netBurn,
    netCashFlow,
    runwayMonths: exactRunwayMonths,
    runwayMonthsFormatted: formatRunway(exactRunwayMonths),
    isBreakEven,
    isProfitable,
    runwayStatus,
    statusMessage,
    depletionDateFormatted,
    requiredBreakEvenRevenue,
    breakEvenRevenueGap,
    cashAt3Months,
    cashAt6Months,
    cashAt12Months,
    monthlyProjections: projections.slice(0, 24) // Show up to 24 months in UI charts
  };
}

/**
 * Generate fallback projections for zero burn or zero cash
 */
function generateStaticProjections(
  cash: number,
  revenue: number,
  expenses: number,
  count: number,
  baseDate: Date
): MonthlyProjectionPoint[] {
  const points: MonthlyProjectionPoint[] = [];
  let currentCash = cash;
  for (let m = 1; m <= count; m++) {
    const netFlow = revenue - expenses;
    const endCash = Math.max(0, currentCash + netFlow);
    const dateOffset = getMonthOffsetDate(m, baseDate);
    points.push({
      month: m,
      dateLabel: dateOffset.label,
      startingCash: currentCash,
      revenue,
      expenses,
      netCashFlow: netFlow,
      endingCash: endCash,
      isDepleted: endCash <= 0 && cash === 0
    });
    currentCash = endCash;
  }
  return points;
}

/**
 * Generate "What If?" scenario analysis comparing base inputs against standard levers
 */
export function calculateScenarios(inputs: RunwayInputs, baseMetrics: RunwayMetrics, baseDate: Date = new Date()): ScenarioResults {
  const baseRunway = baseMetrics.runwayMonths;

  // 1. Expense Reductions: 5%, 10%, 20%
  const expenseReductions: ScenarioItem[] = [5, 10, 20].map((pct) => {
    const reducedExpenses = inputs.monthlyExpenses * (1 - pct / 100);
    const result = calculateRunway({
      ...inputs,
      monthlyExpenses: reducedExpenses
    }, baseDate);

    const isSustainable = result.runwayMonths === 'infinite';
    let deltaMonths: number | 'infinite' = 0;
    let deltaFormatted = '+0 mo';

    if (isSustainable || result.runwayMonths === 'infinite') {
      deltaMonths = 'infinite';
      deltaFormatted = 'Sustainable';
    } else if (baseRunway === 'infinite') {
      deltaMonths = 0;
      deltaFormatted = 'Sustainable';
    } else {
      const numResult = result.runwayMonths as number;
      const numBase = baseRunway as number;
      deltaMonths = Number((numResult - numBase).toFixed(1));
      deltaFormatted = deltaMonths >= 0 ? `+${deltaMonths} mo` : `${deltaMonths} mo`;
    }

    return {
      id: `exp-${pct}`,
      category: 'expense_reduction',
      title: `Reduce expenses by ${pct}%`,
      description: `Save ${formatCurrency(inputs.monthlyExpenses * (pct / 100))}/mo (new expenses: ${formatCurrency(reducedExpenses)}/mo)`,
      newRunwayMonths: result.runwayMonths,
      newRunwayFormatted: formatRunway(result.runwayMonths),
      deltaMonths,
      deltaFormatted,
      newNetBurn: result.netBurn,
      isSustainable
    };
  });

  // 2. Revenue Increases: 10%, 25%, 50%
  const revenueIncreases: ScenarioItem[] = [10, 25, 50].map((pct) => {
    const increasedRevenue = inputs.monthlyRevenue * (1 + pct / 100);
    const result = calculateRunway({
      ...inputs,
      monthlyRevenue: increasedRevenue
    }, baseDate);

    const isSustainable = result.runwayMonths === 'infinite';
    let deltaMonths: number | 'infinite' = 0;
    let deltaFormatted = '+0 mo';

    if (isSustainable || result.runwayMonths === 'infinite') {
      deltaMonths = 'infinite';
      deltaFormatted = 'Sustainable';
    } else if (baseRunway === 'infinite') {
      deltaMonths = 0;
      deltaFormatted = 'Sustainable';
    } else {
      const numResult = result.runwayMonths as number;
      const numBase = baseRunway as number;
      deltaMonths = Number((numResult - numBase).toFixed(1));
      deltaFormatted = deltaMonths >= 0 ? `+${deltaMonths} mo` : `${deltaMonths} mo`;
    }

    return {
      id: `rev-${pct}`,
      category: 'revenue_increase',
      title: `Increase revenue by ${pct}%`,
      description: `Add ${formatCurrency(inputs.monthlyRevenue * (pct / 100))}/mo (new revenue: ${formatCurrency(increasedRevenue)}/mo)`,
      newRunwayMonths: result.runwayMonths,
      newRunwayFormatted: formatRunway(result.runwayMonths),
      deltaMonths,
      deltaFormatted,
      newNetBurn: result.netBurn,
      isSustainable
    };
  });

  // 3. Additional Funding: $25k, $50k, $100k
  const fundingAdditions: ScenarioItem[] = [25_000, 50_000, 100_000].map((amount) => {
    const result = calculateRunway({
      ...inputs,
      cashBalance: inputs.cashBalance + amount
    }, baseDate);

    const isSustainable = result.runwayMonths === 'infinite';
    let deltaMonths: number | 'infinite' = 0;
    let deltaFormatted = '+0 mo';

    if (isSustainable || result.runwayMonths === 'infinite') {
      deltaMonths = 'infinite';
      deltaFormatted = 'Sustainable';
    } else if (baseRunway === 'infinite') {
      deltaMonths = 0;
      deltaFormatted = 'Sustainable';
    } else {
      const numResult = result.runwayMonths as number;
      const numBase = baseRunway as number;
      deltaMonths = Number((numResult - numBase).toFixed(1));
      deltaFormatted = deltaMonths >= 0 ? `+${deltaMonths} mo` : `${deltaMonths} mo`;
    }

    return {
      id: `fund-${amount}`,
      category: 'funding',
      title: `Add ${formatCurrency(amount, true)} in funding`,
      description: `Inject ${formatCurrency(amount)} to starting cash (total: ${formatCurrency(inputs.cashBalance + amount)})`,
      newRunwayMonths: result.runwayMonths,
      newRunwayFormatted: formatRunway(result.runwayMonths),
      deltaMonths,
      deltaFormatted,
      newNetBurn: result.netBurn,
      isSustainable
    };
  });

  return {
    expenseReductions,
    revenueIncreases,
    fundingAdditions
  };
}
