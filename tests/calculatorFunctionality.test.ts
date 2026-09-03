import { describe, it, expect } from 'vitest';
import {
  calculateRunway,
  formatCurrency,
  formatRunway,
  getMonthOffsetDate
} from '../lib/runwayCalculator';
import {
  calculateCashRunway,
  calculateBurnRate,
  calculateRunwayExtension,
  generateRunwayCsv
} from '../lib/financialTools';
import {
  calculateHiringRunway,
  calculateDefaultAlive,
  calculateSafeRunway
} from '../lib/advancedFinancialTools';
import {
  calculateCrosswind,
  calculateRunwaySlope,
  calculateRunwayNumber,
  calculateRunwayLengthPerformance,
  calculateRunwayInUse
} from '../lib/aviationCalculator';
import {
  calculateRvrVisibility,
  calculateContaminatedRunway
} from '../lib/advancedAviationTools';

describe('Excellence Audit: Financial Calculation Engines', () => {
  describe('calculateRunway edge cases', () => {
    it('handles zero cash balance correctly', () => {
      const res = calculateRunway({
        cashBalance: 0,
        monthlyRevenue: 10_000,
        monthlyExpenses: 20_000
      });
      expect(res.runwayMonths).toBe(0);
      expect(res.runwayStatus).toBe('zero-cash');
    });

    it('handles profitable / sustainable operations (revenue > expenses)', () => {
      const res = calculateRunway({
        cashBalance: 100_000,
        monthlyRevenue: 30_000,
        monthlyExpenses: 20_000
      });
      expect(res.isProfitable).toBe(true);
      expect(res.runwayMonths).toBe('infinite');
      expect(res.runwayStatus).toBe('profitable');
    });

    it('handles exact break-even operations (revenue == expenses)', () => {
      const res = calculateRunway({
        cashBalance: 100_000,
        monthlyRevenue: 25_000,
        monthlyExpenses: 25_000
      });
      expect(res.isBreakEven).toBe(true);
      expect(res.runwayMonths).toBe('infinite');
    });

    it('handles high growth rate overtaking expenses (compoundDefaultAlive)', () => {
      const res = calculateRunway({
        cashBalance: 100_000,
        monthlyRevenue: 15_000,
        monthlyExpenses: 20_000,
        revenueGrowthRate: 15,
        expenseGrowthRate: 1
      });
      expect(res.monthlyProjections.length).toBeGreaterThan(0);
    });
  });

  describe('calculateCashRunway with reserve buffer', () => {
    it('accurately calculates buffer deduction and usable cash', () => {
      const res = calculateCashRunway({
        cashBalance: 500_000,
        monthlyOperatingExpenses: 50_000,
        monthlyCashInflows: 20_000,
        emergencyBufferPercent: 25
      });
      expect(res.netMonthlyBurn).toBe(30_000);
      expect(res.emergencyBufferAmount).toBe(125_000);
      expect(res.usableCashBalance).toBe(375_000);
      expect(res.netRunwayMonths).toBe(16.7);
      expect(res.usableRunwayMonths).toBe(12.5);
    });
  });

  describe('calculateBurnRate SaaS efficiency metrics', () => {
    it('computes annual net burn and burn multiple with correct rating', () => {
      const res = calculateBurnRate({
        cashBalance: 300_000,
        grossMonthlyExpenses: 50_000,
        monthlyRevenue: 20_000,
        netNewARR: 240_000
      });
      expect(res.grossBurnRate).toBe(50_000);
      expect(res.netBurnRate).toBe(30_000);
      expect(res.annualizedNetBurn).toBe(360_000);
      expect(res.burnMultiple).toBe(1.5);
      expect(res.burnMultipleRating).toBe('Good');
    });
  });

  describe('calculateHiringRunway headcount burn engine', () => {
    it('models multiple hires with overhead multiplier', () => {
      const res = calculateHiringRunway({
        cashBalance: 300_000,
        monthlyRevenue: 10_000,
        currentMonthlyExpenses: 30_000,
        hires: [
          { id: '1', title: 'Eng', count: 2, annualSalary: 120_000, benefitsMultiplier: 1.25 }
        ]
      });
      // 2 * 120,000 * 1.25 = 300,000 annual -> 25,000 monthly
      expect(res.addedMonthlyBurn).toBe(25_000);
      expect(res.newGrossExpenses).toBe(55_000);
      expect(res.newNetBurn).toBe(45_000);
      expect(res.runwayReductionMonths).toBeGreaterThan(0);
    });
  });

  describe('calculateDefaultAlive Paul Graham model', () => {
    it('identifies default alive startup accurately', () => {
      const res = calculateDefaultAlive({
        cashBalance: 200_000,
        monthlyRevenue: 20_000,
        monthlyExpenses: 25_000,
        monthlyRevenueGrowthRate: 10,
        monthlyExpenseGrowthRate: 1
      });
      expect(res.isDefaultAlive).toBe(true);
      expect(res.crossoverMonth).toBeLessThanOrEqual(5);
    });
  });

  describe('calculateSafeRunway dilution engine', () => {
    it('calculates founder dilution and required buffer capital', () => {
      const res = calculateSafeRunway({
        currentCash: 50_000,
        monthlyNetBurn: 25_000,
        targetRunwayMonths: 18,
        valuationCap: 4_000_000
      });
      expect(res.capitalNeededForTarget).toBe(400_000);
      expect(res.recommendedRaiseAmount).toBe(460_000);
      expect(res.founderDilutionPercent).toBeGreaterThan(0);
      expect(res.founderOwnershipRemainingPercent).toBeLessThan(100);
    });
  });
});

describe('Excellence Audit: Aviation Calculation Engines', () => {
  describe('calculateCrosswind precision trigonometry', () => {
    it('calculates direct 90-degree crosswind correctly', () => {
      // Runway 36 (360°), wind from 090° at 20 knots
      const res = calculateCrosswind({
        runwayHeading: 360,
        windDirection: 90,
        windSpeedKnots: 20
      });
      expect(res.crosswindKnots).toBe(20);
      expect(res.headwindKnots).toBe(0);
      expect(res.crosswindDirection).toBe('Right');
      expect(res.isTailwind).toBe(false);
    });

    it('detects tailwind conditions accurately', () => {
      // Runway 36 (360°), wind from 180° at 15 knots
      const res = calculateCrosswind({
        runwayHeading: 360,
        windDirection: 180,
        windSpeedKnots: 15
      });
      expect(res.isTailwind).toBe(true);
      expect(res.headwindKnots).toBe(15);
      expect(res.safetyAdvisory.level).toBe('danger');
    });
  });

  describe('calculateRunwayInUse selection engine', () => {
    it('correctly picks runway into the wind', () => {
      const res = calculateRunwayInUse({
        windDirection: 180,
        windSpeedKnots: 20,
        runwayHeadings: [90, 180] // has 09/27 and 18/36
      });
      expect(res.activeRunway.heading).toBe(180);
      expect(res.activeRunway.runwayName).toContain('18');
      expect(res.activeRunway.headwindKnots).toBe(20);
      expect(res.activeRunway.isTailwind).toBe(false);
    });
  });

  describe('calculateRunwaySlope ICAO gradient', () => {
    it('calculates slope percentage and uphill/downhill gradient', () => {
      const res = calculateRunwaySlope({
        runwayLengthFeet: 10_000,
        threshold1ElevationFeet: 500,
        threshold2ElevationFeet: 600
      });
      expect(res.elevationDifferenceFeet).toBe(100);
      expect(res.slopePercent).toBe(1);
      expect(res.slopeDirection).toBe('Uphill');
      expect(res.icaoMaxCompliant).toBe(true);
    });
  });

  describe('calculateRunwayNumber FAA designations', () => {
    it('handles reciprocal numbers and parallel suffixes', () => {
      const res = calculateRunwayNumber({
        magneticHeading: 274,
        parallelDesignation: 'R'
      });
      expect(res.runwayNumber).toBe('27R');
      expect(res.reciprocalRunwayNumber).toBe('09L');
    });
  });

  describe('calculateRvrVisibility FAA AIM conversions', () => {
    it('maps RVR 2400 to 1/2 SM Category I standard', () => {
      const res = calculateRvrVisibility({ rvrFeet: 2400 });
      expect(res.statuteMilesFormatted).toBe('1/2 SM');
      expect(res.approachCategoryEligible).toBe('CAT I');
      expect(res.rvrMeters).toBe(732);
    });
  });

  describe('calculateContaminatedRunway TALPA RCAM', () => {
    it('applies friction multiplier and safety buffer', () => {
      const res = calculateContaminatedRunway({
        baseDryLandingDistanceFeet: 2000,
        runwayConditionCode: 3, // Slippery wet / compacted snow
        reverseThrustInoperative: true
      });
      expect(res.factoredLandingDistanceFeet).toBeGreaterThan(2000);
      expect(res.totalRequiredRunwayFeet).toBeGreaterThan(res.factoredLandingDistanceFeet);
      expect(res.landingDistanceMultiplier).toBeGreaterThan(1);
    });
  });
});
