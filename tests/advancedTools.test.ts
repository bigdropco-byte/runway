import { describe, it, expect } from 'vitest';
import {
  calculateHiringRunway,
  calculateDefaultAlive,
  calculateSafeRunway
} from '../lib/advancedFinancialTools';
import {
  calculateRvrVisibility,
  calculateContaminatedRunway
} from '../lib/advancedAviationTools';

describe('Advanced Financial Tools', () => {
  it('calculates hiring runway reduction correctly', () => {
    const res = calculateHiringRunway({
      cashBalance: 300_000,
      monthlyRevenue: 10_000,
      currentMonthlyExpenses: 30_000, // Net burn 20k -> 15.0 mo
      hires: [
        {
          id: '1',
          title: 'Senior Engineer',
          count: 2,
          annualSalary: 120_000,
          benefitsMultiplier: 1.25 // $150k loaded per engineer = $300k/yr = $25k/mo
        }
      ]
    });

    expect(res.baselineRunwayMonths).toBe(15.0);
    expect(res.addedMonthlyBurn).toBe(25_000);
    expect(res.newNetBurn).toBe(45_000);
    expect(res.newRunwayMonths).toBe(6.7);
    expect(res.runwayReductionMonths).toBe(8.3);
  });

  it('determines Default Alive status when revenue growth overtakes burn', () => {
    const res = calculateDefaultAlive({
      cashBalance: 150_000,
      monthlyRevenue: 20_000,
      monthlyExpenses: 35_000,
      monthlyRevenueGrowthRate: 8,
      monthlyExpenseGrowthRate: 1
    });

    expect(res.isDefaultAlive).toBe(true);
    expect(res.statusHeadline).toContain('Default Alive');
    expect(res.crossoverMonth).toBeGreaterThan(1);
    expect(res.lowestCashTrough).toBeGreaterThan(0);
  });

  it('determines Default Dead status when cash runs out before break-even', () => {
    const res = calculateDefaultAlive({
      cashBalance: 50_000,
      monthlyRevenue: 5_000,
      monthlyExpenses: 40_000,
      monthlyRevenueGrowthRate: 3, // Growth too slow to catch $35k deficit
      monthlyExpenseGrowthRate: 0
    });

    expect(res.isDefaultAlive).toBe(false);
    expect(res.statusHeadline).toBe('Default Dead');
    expect(res.depletionMonth).toBeLessThan(10);
  });

  it('calculates SAFE raise amount and founder equity dilution', () => {
    const res = calculateSafeRunway({
      currentCash: 100_000,
      monthlyNetBurn: 20_000,
      targetRunwayMonths: 18, // Total cash needed: 360k -> Capital needed: 260k
      valuationCap: 5_000_000
    });

    expect(res.currentRunwayMonths).toBe(5.0);
    expect(res.capitalNeededForTarget).toBe(260_000);
    expect(res.recommendedRaiseAmount).toBe(299_000); // 260k * 1.15
    expect(res.founderDilutionPercent).toBe(5.98); // 299k / 5M * 100
    expect(res.founderOwnershipRemainingPercent).toBe(94.02);
  });
});

describe('Advanced Aviation Tools', () => {
  it('converts RVR to Statute Miles and Approach Category minimums', () => {
    const cat1 = calculateRvrVisibility({ rvrFeet: 2400 });
    expect(cat1.statuteMilesFormatted).toBe('1/2 SM');
    expect(cat1.approachCategoryEligible).toBe('CAT I');

    const cat2 = calculateRvrVisibility({ rvrFeet: 1200 });
    expect(cat2.statuteMilesFormatted).toBe('1/4 SM');
    expect(cat2.approachCategoryEligible).toBe('CAT II');

    const cat3 = calculateRvrVisibility({ rvrFeet: 600 });
    expect(cat3.approachCategoryEligible).toBe('CAT IIIa');
  });

  it('calculates contaminated runway landing distance factors with TALPA matrix', () => {
    // Dry runway (Code 6)
    const dry = calculateContaminatedRunway({
      baseDryLandingDistanceFeet: 2000,
      runwayConditionCode: 6
    });
    expect(dry.factoredLandingDistanceFeet).toBe(2000);
    expect(dry.totalRequiredRunwayFeet).toBe(2300); // 2000 + 15%

    // Wet runway (Code 5)
    const wet = calculateContaminatedRunway({
      baseDryLandingDistanceFeet: 2000,
      runwayConditionCode: 5
    });
    expect(wet.landingDistanceMultiplier).toBe(1.35);
    expect(wet.factoredLandingDistanceFeet).toBe(2700);

    // Standing water / Slush (Code 2)
    const slush = calculateContaminatedRunway({
      baseDryLandingDistanceFeet: 2000,
      runwayConditionCode: 2
    });
    expect(slush.landingDistanceMultiplier).toBe(2.2);
    expect(slush.hydroplaningRisk).toBe('Severe / Extreme');
  });
});
