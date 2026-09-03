import { describe, it, expect } from 'vitest';
import {
  calculateCashRunway,
  calculateBurnRate,
  calculateRunwayExtension,
  generateRunwayCsv
} from '../lib/financialTools';
import {
  calculateCrosswind,
  calculateRunwaySlope,
  calculateRunwayNumber,
  calculateRunwayLengthPerformance,
  calculateRunwayInUse
} from '../lib/aviationCalculator';

describe('New Financial Tools Engine', () => {
  it('calculates cash runway with emergency buffer', () => {
    const res = calculateCashRunway({
      cashBalance: 100_000,
      monthlyOperatingExpenses: 25_000,
      monthlyCashInflows: 10_000,
      emergencyBufferPercent: 20
    });
    expect(res.netMonthlyBurn).toBe(15_000);
    expect(res.emergencyBufferAmount).toBe(20_000);
    expect(res.usableCashBalance).toBe(80_000);
    expect(res.netRunwayMonths).toBe(6.7);
    expect(res.usableRunwayMonths).toBe(5.3);
  });

  it('calculates burn rate and burn multiple', () => {
    const res = calculateBurnRate({
      cashBalance: 200_000,
      grossMonthlyExpenses: 30_000,
      monthlyRevenue: 10_000,
      netNewARR: 160_000
    });
    expect(res.grossBurnRate).toBe(30_000);
    expect(res.netBurnRate).toBe(20_000);
    expect(res.annualizedNetBurn).toBe(240_000);
    // Burn multiple = 240,000 / 160,000 = 1.5
    expect(res.burnMultiple).toBe(1.5);
    expect(res.burnMultipleRating).toBe('Good');
  });

  it('solves runway extension reverse targets', () => {
    const res = calculateRunwayExtension({
      currentCash: 100_000,
      monthlyRevenue: 10_000,
      monthlyExpenses: 20_000, // Net burn: 10k, Current runway: 10 mo
      targetRunwayMonths: 20 // Target: 20 mo -> Allowed burn: 5k/mo
    });
    expect(res.currentRunwayMonths).toBe(10.0);
    expect(res.targetNetBurnAllowed).toBe(5_000);
    expect(res.requiredMonthlyExpenseReduction).toBe(5_000);
    expect(res.requiredMonthlyRevenueIncrease).toBe(5_000);
    expect(res.requiredCapitalInfusion).toBe(100_000);
  });

  it('generates valid CSV runway model string', () => {
    const csv = generateRunwayCsv(100_000, 20_000, 30_000, 5, 2, 12);
    expect(csv).toContain('Runway Calculator Financial Model');
    expect(csv).toContain('Month 1,100000');
    expect(csv).toContain('Month 12');
  });
});

describe('Aviation Runway Engine', () => {
  it('calculates crosswind and headwind accurately', () => {
    // Runway 09 (090 deg), Wind 120 at 20 kts
    // Angle = 30 deg. Crosswind = 20 * sin(30) = 10 kts. Headwind = 20 * cos(30) = 17.3 kts.
    const res = calculateCrosswind({
      runwayHeading: 90,
      windDirection: 120,
      windSpeedKnots: 20
    });
    expect(res.angleDegrees).toBe(30);
    expect(res.crosswindKnots).toBe(10.0);
    expect(res.crosswindDirection).toBe('Right');
    expect(res.headwindKnots).toBe(17.3);
    expect(res.isTailwind).toBe(false);
  });

  it('calculates runway slope percentage and performance effects', () => {
    // 5,000 ft runway, elevation 1000 ft to 1050 ft = +50 ft = 1.0% uphill
    const res = calculateRunwaySlope({
      runwayLengthFeet: 5000,
      threshold1ElevationFeet: 1000,
      threshold2ElevationFeet: 1050
    });
    expect(res.slopePercent).toBe(1.0);
    expect(res.slopeDirection).toBe('Uphill');
    expect(res.icaoMaxCompliant).toBe(true);
  });

  it('calculates runway number designations and reciprocals', () => {
    // Heading 088 -> Runway 09, Reciprocal 268 -> Runway 27
    const res = calculateRunwayNumber({
      magneticHeading: 88,
      parallelDesignation: 'L'
    });
    expect(res.runwayNumber).toBe('09L');
    expect(res.reciprocalRunwayNumber).toBe('27R');

    // Heading 358 -> Runway 36
    const res36 = calculateRunwayNumber({ magneticHeading: 358 });
    expect(res36.runwayNumber).toBe('36');
    expect(res36.reciprocalRunwayNumber).toBe('18');
  });

  it('calculates density altitude and takeoff distance penalty', () => {
    const res = calculateRunwayLengthPerformance({
      airportElevationFeet: 5000,
      temperatureCelsius: 25,
      altimeterSettingInHg: 29.92,
      baselineTakeoffDistanceFeet: 1000
    });
    expect(res.pressureAltitudeFeet).toBe(5000);
    expect(res.densityAltitudeFeet).toBeGreaterThan(5000);
    expect(res.adjustedTakeoffDistanceFeet).toBeGreaterThan(1000);
    expect(res.safetyMarginDistanceFeet).toBeGreaterThan(res.adjustedTakeoffDistanceFeet);
  });

  it('selects the active runway in use maximizing headwind', () => {
    // Airport has Runway 09/27 (90°/270°) and Runway 18/36 (180°/360°)
    // Wind is from 260° at 15 knots
    const res = calculateRunwayInUse({
      windDirection: 260,
      windSpeedKnots: 15,
      runwayHeadings: [90, 180]
    });

    // Runway 27 (270°) should be the active runway in use
    expect(res.activeRunway.heading).toBe(270);
    expect(res.activeRunway.isTailwind).toBe(false);
    expect(res.activeRunway.headwindKnots).toBeGreaterThan(14);
    expect(res.activeRunway.crosswindKnots).toBeLessThan(3);
  });
});
