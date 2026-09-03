/**
 * Input sanitization, validation, and helper types for Runway Calculator
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

/**
 * Clean a string input (removing commas, currency symbols, whitespace) and return a valid number
 */
export function sanitizeNumericInput(value: string | number | undefined | null, defaultValue: number = 0): number {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  if (typeof value === 'number') {
    return isNaN(value) || !isFinite(value) ? defaultValue : Math.max(0, value);
  }
  // Remove currency signs, commas, letters, spaces
  const clean = value.toString().replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(clean);
  if (isNaN(parsed) || !isFinite(parsed)) {
    return defaultValue;
  }
  return Math.max(0, parsed);
}

/**
 * Validate runway form inputs and provide clear, contextual feedback
 */
export function validateRunwayInputs(
  cash: number,
  revenue: number,
  expenses: number,
  revGrowth?: number,
  expGrowth?: number
): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  if (cash < 0) {
    errors.cash = 'Cash balance cannot be negative.';
  } else if (cash === 0) {
    warnings.cash = 'Enter your current available cash balance to calculate your runway.';
  }

  if (revenue < 0) {
    errors.revenue = 'Monthly revenue cannot be negative.';
  }

  if (expenses < 0) {
    errors.expenses = 'Monthly expenses cannot be negative.';
  } else if (expenses === 0) {
    warnings.expenses = 'With $0 in monthly expenses, standard burn rate cannot be calculated.';
  }

  if (revGrowth !== undefined && revGrowth < -100) {
    errors.revGrowth = 'Revenue decline cannot exceed -100%.';
  } else if (revGrowth !== undefined && revGrowth > 100) {
    warnings.revGrowth = 'Monthly growth above 100% is exceptionally rare and may skew long-term projections.';
  }

  if (expGrowth !== undefined && expGrowth < -100) {
    errors.expGrowth = 'Expense reduction cannot exceed -100%.';
  } else if (expGrowth !== undefined && expGrowth > 100) {
    warnings.expGrowth = 'Expense growth above 100% per month will rapidly deplete cash.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
