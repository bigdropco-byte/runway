/**
 * Advanced Aviation Runway Calculation Engine
 * 
 * 1. Runway Visual Range (RVR) to Visibility Converter (FAA AIM 7-1-10)
 * 2. Contaminated Runway Landing Distance Calculator (FAA TALPA / RCAM Matrix)
 */

/* ============================================================
   1. RUNWAY VISUAL RANGE (RVR) CONVERTER
   ============================================================ */
export interface RvrInputs {
  rvrFeet: number; // e.g. 2400 ft
}

export interface RvrResults {
  rvrFeet: number;
  rvrMeters: number;
  statuteMilesFormatted: string;
  statuteMilesDecimal: number;
  approachCategoryEligible: 'CAT I' | 'CAT II' | 'CAT IIIa' | 'CAT IIIb' | 'Below Minimums';
  instrumentApproachSuitability: string;
}

// FAA AIM Table 7-1-10 RVR to Visibility Conversion
const RVR_TABLE: { minRvr: number; smText: string; smDecimal: number; cat: RvrResults['approachCategoryEligible'] }[] = [
  { minRvr: 6000, smText: '1 1/4 SM', smDecimal: 1.25, cat: 'CAT I' },
  { minRvr: 5000, smText: '1 SM', smDecimal: 1.0, cat: 'CAT I' },
  { minRvr: 4500, smText: '7/8 SM', smDecimal: 0.875, cat: 'CAT I' },
  { minRvr: 4000, smText: '3/4 SM', smDecimal: 0.75, cat: 'CAT I' },
  { minRvr: 3000, smText: '5/8 SM', smDecimal: 0.625, cat: 'CAT I' },
  { minRvr: 2400, smText: '1/2 SM', smDecimal: 0.5, cat: 'CAT I' },
  { minRvr: 1800, smText: '3/8 SM (or 1/2 SM with FD/AP/HUD)', smDecimal: 0.375, cat: 'CAT I' },
  { minRvr: 1600, smText: '1/4 SM', smDecimal: 0.25, cat: 'CAT II' },
  { minRvr: 1200, smText: '1/4 SM', smDecimal: 0.25, cat: 'CAT II' },
  { minRvr: 1000, smText: '1/8 SM', smDecimal: 0.125, cat: 'CAT II' },
  { minRvr: 700, smText: '1/8 SM', smDecimal: 0.125, cat: 'CAT IIIa' },
  { minRvr: 500, smText: '1/16 SM', smDecimal: 0.0625, cat: 'CAT IIIa' },
  { minRvr: 300, smText: '1/16 SM', smDecimal: 0.0625, cat: 'CAT IIIb' },
  { minRvr: 0, smText: '< 1/16 SM', smDecimal: 0.03, cat: 'CAT IIIb' }
];

export function calculateRvrVisibility(inputs: RvrInputs): RvrResults {
  const feet = Math.max(0, inputs.rvrFeet || 0);
  const meters = Math.round(feet * 0.3048);

  let match = RVR_TABLE[RVR_TABLE.length - 1];
  for (const row of RVR_TABLE) {
    if (feet >= row.minRvr) {
      match = row;
      break;
    }
  }

  let suitability = '';
  if (feet >= 2400) {
    suitability = 'Standard Category I (CAT I) precision ILS minimums authorized.';
  } else if (feet >= 1800) {
    suitability = 'Special authorization CAT I with Flight Director, Autopilot, or HUD.';
  } else if (feet >= 1000) {
    suitability = 'Category II (CAT II) precision approach authorized (requires dual crew, radar altimeter, autoland/HUD).';
  } else if (feet >= 600) {
    suitability = 'Category IIIa (CAT IIIa) precision approach authorized (fail-passive/fail-operational autoland).';
  } else if (feet >= 300) {
    suitability = 'Category IIIb (CAT IIIb) rollout control required.';
  } else {
    suitability = 'Below CAT IIIb minimums (CAT IIIc zero-zero visibility required).';
  }

  return {
    rvrFeet: feet,
    rvrMeters: meters,
    statuteMilesFormatted: match.smText,
    statuteMilesDecimal: match.smDecimal,
    approachCategoryEligible: match.cat,
    instrumentApproachSuitability: suitability
  };
}

/* ============================================================
   2. CONTAMINATED RUNWAY LANDING DISTANCE CALCULATOR (TALPA / RCAM)
   ============================================================ */
export type RunwayConditionCode = 6 | 5 | 4 | 3 | 2 | 1 | 0;

export interface ContaminatedRunwayInputs {
  baseDryLandingDistanceFeet: number; // Unfactored dry landing distance from POH
  runwayConditionCode: RunwayConditionCode;
  reverseThrustInoperative?: boolean;
}

export interface ContaminatedRunwayResults {
  runwayConditionCode: RunwayConditionCode;
  surfaceConditionDescription: string;
  brakingActionReport: 'Good' | 'Good to Medium' | 'Medium' | 'Medium to Poor' | 'Poor' | 'Nil';
  landingDistanceMultiplier: number;
  factoredLandingDistanceFeet: number;
  faaSafetyBufferDistanceFeet: number; // 15% operational margin
  totalRequiredRunwayFeet: number;
  hydroplaningRisk: 'None' | 'Low' | 'Moderate' | 'Severe / Extreme';
  operationalGuidance: string;
}

const TALPA_RCAM_MATRIX: Record<RunwayConditionCode, {
  surface: string;
  braking: ContaminatedRunwayResults['brakingActionReport'];
  multiplier: number;
  hydroplaning: ContaminatedRunwayResults['hydroplaningRisk'];
  guidance: string;
}> = {
  6: {
    surface: 'Dry Runway',
    braking: 'Good',
    multiplier: 1.0,
    hydroplaning: 'None',
    guidance: 'Standard dry runway braking performance. Standard 15% safety margin recommended.'
  },
  5: {
    surface: 'Frost, Wet (≤ 3mm water depth), or Dry Snow at ≤ -15°C',
    braking: 'Good',
    multiplier: 1.35,
    hydroplaning: 'Low',
    guidance: 'Wet runway requires at least 35% increased landing distance over dry unfactored distance.'
  },
  4: {
    surface: 'Compacted Snow at outside air temperature ≤ -15°C',
    braking: 'Good to Medium',
    multiplier: 1.55,
    hydroplaning: 'Low',
    guidance: 'Cold compacted snow provides moderate wheel braking. Extend approach spacing.'
  },
  3: {
    surface: 'Slippery Wet, Wet Snow, or Compacted Snow at > -15°C',
    braking: 'Medium',
    multiplier: 1.80,
    hydroplaning: 'Moderate',
    guidance: 'Significant braking reduction. Directional control and crosswind limits become critical.'
  },
  2: {
    surface: 'Standing Water (> 3mm depth) or Slush (> 3mm depth)',
    braking: 'Medium to Poor',
    multiplier: 2.20,
    hydroplaning: 'Severe / Extreme',
    guidance: 'Dynamic hydroplaning hazard. Touchdown firmly on centerline and avoid heavy initial braking.'
  },
  1: {
    surface: 'Ice or Wet Ice',
    braking: 'Poor',
    multiplier: 2.75,
    hydroplaning: 'Severe / Extreme',
    guidance: 'Extremely degraded friction. Maximum reverse thrust required. Divert if crosswind > 10 kts.'
  },
  0: {
    surface: 'Wet Ice over Water or Active Freezing Rain',
    braking: 'Nil',
    multiplier: 3.50,
    hydroplaning: 'Severe / Extreme',
    guidance: 'Nil braking action. Operations are prohibited under standard airline and FAA dispatch rules.'
  }
};

export function calculateContaminatedRunway(inputs: ContaminatedRunwayInputs): ContaminatedRunwayResults {
  const baseDist = Math.max(100, inputs.baseDryLandingDistanceFeet || 1500);
  const code = inputs.runwayConditionCode in TALPA_RCAM_MATRIX ? inputs.runwayConditionCode : 6;
  const entry = TALPA_RCAM_MATRIX[code];

  let multiplier = entry.multiplier;
  if (inputs.reverseThrustInoperative && code <= 3) {
    multiplier += 0.25; // Additional penalty if thrust reversers inop on slippery runway
  }

  const factoredLandingDistanceFeet = Math.round(baseDist * multiplier);
  const faaSafetyBufferDistanceFeet = Math.round(factoredLandingDistanceFeet * 0.15); // +15% safety factor
  const totalRequiredRunwayFeet = factoredLandingDistanceFeet + faaSafetyBufferDistanceFeet;

  return {
    runwayConditionCode: code,
    surfaceConditionDescription: entry.surface,
    brakingActionReport: entry.braking,
    landingDistanceMultiplier: Number(multiplier.toFixed(2)),
    factoredLandingDistanceFeet,
    faaSafetyBufferDistanceFeet,
    totalRequiredRunwayFeet,
    hydroplaningRisk: entry.hydroplaning,
    operationalGuidance: entry.guidance
  };
}
