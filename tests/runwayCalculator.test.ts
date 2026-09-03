import { describe, it, expect } from 'vitest';
import {
  calculateRunway,
  calculateScenarios,
  formatCurrency,
  formatRunway,
  RunwayInputs
} from '../lib/runwayCalculator';

describe('Runway Calculator Core Engine', () => {
  const fixedBaseDate = new Date(2026, 0, 1); // Jan 1, 2026

  it('calculates static runway correctly: $100k cash / $20k net burn = 5.0 months', () => {
    const inputs: RunwayInputs = {
      cashBalance: 100_000,
      monthlyRevenue: 0,
      monthlyExpenses: 20_000
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(result.grossBurn).toBe(20_000);
    expect(result.netBurn).toBe(20_000);
    expect(result.runwayMonths).toBe(5.0);
    expect(result.runwayMonthsFormatted).toBe('5.0 months');
    expect(result.isBreakEven).toBe(false);
    expect(result.isProfitable).toBe(false);
  });

  it('calculates static runway with revenue: $100k cash, $20k rev, $30k exp = 10.0 months', () => {
    const inputs: RunwayInputs = {
      cashBalance: 100_000,
      monthlyRevenue: 20_000,
      monthlyExpenses: 30_000 // net burn = 10k
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(result.grossBurn).toBe(30_000);
    expect(result.netBurn).toBe(10_000);
    expect(result.runwayMonths).toBe(10.0);
    expect(result.runwayMonthsFormatted).toBe('10.0 months');
  });

  it('handles break-even state: revenue equals expenses', () => {
    const inputs: RunwayInputs = {
      cashBalance: 50_000,
      monthlyRevenue: 15_000,
      monthlyExpenses: 15_000
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(result.netBurn).toBe(0);
    expect(result.runwayMonths).toBe('infinite');
    expect(result.isBreakEven).toBe(true);
    expect(result.isProfitable).toBe(false);
    expect(result.runwayStatus).toBe('profitable');
  });

  it('handles profitable state: revenue exceeds expenses', () => {
    const inputs: RunwayInputs = {
      cashBalance: 50_000,
      monthlyRevenue: 25_000,
      monthlyExpenses: 15_000
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(result.netBurn).toBe(-10_000);
    expect(result.netCashFlow).toBe(10_000);
    expect(result.runwayMonths).toBe('infinite');
    expect(result.isProfitable).toBe(true);
    expect(result.runwayMonthsFormatted).toBe('Sustainable / Infinite');
  });

  it('handles zero cash balance gracefully', () => {
    const inputs: RunwayInputs = {
      cashBalance: 0,
      monthlyRevenue: 5_000,
      monthlyExpenses: 10_000
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(result.runwayMonths).toBe(0);
    expect(result.runwayStatus).toBe('zero-cash');
    expect(result.runwayMonthsFormatted).toBe('0 months');
  });

  it('handles zero expenses gracefully', () => {
    const inputs: RunwayInputs = {
      cashBalance: 50_000,
      monthlyRevenue: 2_000,
      monthlyExpenses: 0
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(result.runwayMonths).toBe('infinite');
    expect(result.runwayStatus).toBe('zero-burn');
  });

  it('accurately interpolates fractional month with one-time expense', () => {
    const inputs: RunwayInputs = {
      cashBalance: 100_000,
      monthlyRevenue: 20_000,
      monthlyExpenses: 35_000, // Net burn: 15k
      revenueGrowthRate: 5,
      expenseGrowthRate: 2,
      oneTimeExpense: 10_000,
      oneTimeExpenseMonth: 1
    };
    const result = calculateRunway(inputs, fixedBaseDate);
    expect(typeof result.runwayMonths).toBe('number');
    // Runway should be between 5 and 9 months with growth and one-time expense
    if (typeof result.runwayMonths === 'number') {
      expect(result.runwayMonths).toBeGreaterThan(5);
      expect(result.runwayMonths).toBeLessThan(10);
    }
  });

  it('calculates scenario variations properly', () => {
    const inputs: RunwayInputs = {
      cashBalance: 100_000,
      monthlyRevenue: 20_000,
      monthlyExpenses: 35_000 // Net burn: 15k, base runway = 6.7 months
    };
    const baseResult = calculateRunway(inputs, fixedBaseDate);
    const scenarios = calculateScenarios(inputs, baseResult, fixedBaseDate);

    expect(scenarios.expenseReductions).toHaveLength(3);
    expect(scenarios.revenueIncreases).toHaveLength(3);
    expect(scenarios.fundingAdditions).toHaveLength(3);

    // Reducing expenses by 20%: expenses become 28k, net burn 8k -> runway = 12.5 mo
    const exp20 = scenarios.expenseReductions.find(s => s.id === 'exp-20');
    expect(exp20).toBeDefined();
    if (exp20 && typeof exp20.newRunwayMonths === 'number' && typeof baseResult.runwayMonths === 'number') {
      expect(exp20.newRunwayMonths).toBeGreaterThan(baseResult.runwayMonths);
      expect(exp20.deltaMonths).toBeGreaterThan(0);
    }

    // Adding $100k funding: cash becomes 200k, net burn 15k -> runway doubles
    const fund100 = scenarios.fundingAdditions.find(s => s.id === 'fund-100000');
    expect(fund100).toBeDefined();
    if (fund100 && typeof fund100.newRunwayMonths === 'number' && typeof baseResult.runwayMonths === 'number') {
      expect(fund100.newRunwayMonths).toBeGreaterThan(baseResult.runwayMonths);
    }
  });

  it('formats currency and runway strings nicely', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(1500000, true)).toBe('$1.5M');
    expect(formatCurrency(25000, true)).toBe('$25k');
    expect(formatRunway('infinite')).toBe('Sustainable / Infinite');
    expect(formatRunway(0)).toBe('0 months');
    expect(formatRunway(8.4)).toBe('8.4 months');
  });
});
