/**
 * Aviation Runway Calculation Engine
 * 
 * Implements standard FAA/ICAO aeronautical calculations for:
 * 1. Runway Crosswind & Headwind/Tailwind components
 * 2. Runway Slope & Gradient (%)
 * 3. Runway Designation Number & Reciprocal runway
 * 4. Runway Takeoff/Landing Length & Density Altitude adjustment
 */

/* ============================================================
   1. RUNWAY CROSSWIND & HEADWIND CALCULATOR
   ============================================================ */
export interface CrosswindInputs {
  runwayHeading: number; // Magnetic heading (0-360)
  windDirection: number; // Magnetic direction wind is coming from (0-360)
  windSpeedKnots: number; // Wind speed in knots
  windGustKnots?: number; // Optional gust speed in knots
}

export interface CrosswindResults {
  crosswindKnots: number;
  crosswindDirection: 'Left' | 'Right' | 'None';
  headwindKnots: number; // Positive = headwind, Negative = tailwind
  isTailwind: boolean;
  angleDegrees: number;
  gustCrosswindKnots?: number;
  gustHeadwindKnots?: number;
  safetyAdvisory: {
    level: 'safe' | 'caution' | 'danger';
    message: string;
  };
}

export function calculateCrosswind(inputs: CrosswindInputs): CrosswindResults {
  const rwy = ((inputs.runwayHeading % 360) + 360) % 360;
  const windDir = ((inputs.windDirection % 360) + 360) % 360;
  const speed = Math.max(0, inputs.windSpeedKnots || 0);
  const gust = inputs.windGustKnots ? Math.max(speed, inputs.windGustKnots) : undefined;

  // Angular difference between wind direction and runway heading
  let diff = (windDir - rwy + 360) % 360;
  if (diff > 180) diff -= 360; // range -180 to +180

  const rad = (diff * Math.PI) / 180;

  // Crosswind = Speed * |sin(angle)|
  const crosswindKnots = Math.round(Math.abs(speed * Math.sin(rad)) * 10) / 10;
  // Headwind = Speed * cos(angle) (positive = headwind, negative = tailwind)
  const rawHeadwind = Math.round(speed * Math.cos(rad) * 10) / 10;
  const headwindKnots = Math.abs(rawHeadwind);
  const isTailwind = rawHeadwind < 0;

  const crosswindDirection = diff > 0 ? 'Right' : diff < 0 ? 'Left' : 'None';

  let gustCrosswindKnots: number | undefined;
  let gustHeadwindKnots: number | undefined;
  if (gust) {
    gustCrosswindKnots = Math.round(Math.abs(gust * Math.sin(rad)) * 10) / 10;
    gustHeadwindKnots = Math.round(Math.abs(gust * Math.cos(rad)) * 10) / 10;
  }

  // Safety advisory checks
  let level: 'safe' | 'caution' | 'danger' = 'safe';
  let message = '';

  const maxCheckWind = gustCrosswindKnots || crosswindKnots;

  if (isTailwind && headwindKnots > 10) {
    level = 'danger';
    message = `Excessive tailwind (${headwindKnots} kts). Landing or taking off with >10 kts tailwind violates most aircraft operating limitations. Consider the reciprocal runway.`;
  } else if (maxCheckWind > 20) {
    level = 'danger';
    message = `Severe crosswind component (${maxCheckWind} kts). Exceeds maximum demonstrated crosswind for most single-engine training and light twin aircraft.`;
  } else if (maxCheckWind > 15) {
    level = 'caution';
    message = `Significant crosswind component (${maxCheckWind} kts). Approach maximum demonstrated limits for light aircraft (e.g. Cessna 172 is 15 kts). High pilot workload.`;
  } else if (isTailwind) {
    level = 'caution';
    message = `Tailwind component of ${headwindKnots} kts. Increases ground roll distance by approximately 10% for every 2 knots of tailwind.`;
  } else {
    level = 'safe';
    message = `Normal wind conditions. Crosswind is within standard light aircraft capabilities.`;
  }

  return {
    crosswindKnots,
    crosswindDirection,
    headwindKnots,
    isTailwind,
    angleDegrees: Math.abs(Math.round(diff)),
    gustCrosswindKnots,
    gustHeadwindKnots,
    safetyAdvisory: { level, message }
  };
}

/* ============================================================
   2. RUNWAY SLOPE & GRADIENT CALCULATOR
   ============================================================ */
export interface RunwaySlopeInputs {
  runwayLengthFeet: number;
  threshold1ElevationFeet: number; // Starting threshold elevation
  threshold2ElevationFeet: number; // Ending threshold elevation
}

export interface RunwaySlopeResults {
  elevationDifferenceFeet: number;
  slopePercent: number;
  slopeDirection: 'Uphill' | 'Downhill' | 'Flat';
  takeoffPerformanceEffect: string;
  landingPerformanceEffect: string;
  icaoMaxCompliant: boolean; // FAA/ICAO typically max 2% slope
}

export function calculateRunwaySlope(inputs: RunwaySlopeInputs): RunwaySlopeResults {
  const length = Math.max(100, inputs.runwayLengthFeet || 1000);
  const elev1 = inputs.threshold1ElevationFeet || 0;
  const elev2 = inputs.threshold2ElevationFeet || 0;

  const diff = elev2 - elev1;
  const slopePercent = Number(((Math.abs(diff) / length) * 100).toFixed(2));
  const slopeDirection = diff > 0 ? 'Uphill' : diff < 0 ? 'Downhill' : 'Flat';

  const icaoMaxCompliant = slopePercent <= 2.0;

  let takeoffEffect = '';
  let landingEffect = '';

  if (slopeDirection === 'Uphill') {
    takeoffEffect = `An uphill slope of ${slopePercent}% increases takeoff ground roll by approximately ${Math.round(slopePercent * 10)}% (roughly 10% per 1% uphill slope).`;
    landingEffect = `An uphill slope aids deceleration and decreases landing rollout distance.`;
  } else if (slopeDirection === 'Downhill') {
    takeoffEffect = `A downhill slope aids acceleration, decreasing takeoff ground roll slightly.`;
    landingEffect = `A downhill slope of ${slopePercent}% significantly extends landing rollout distance by roughly ${Math.round(slopePercent * 10)}%.`;
  } else {
    takeoffEffect = 'Flat runway: No slope penalty on takeoff acceleration.';
    landingEffect = 'Flat runway: No slope effect on braking distance.';
  }

  return {
    elevationDifferenceFeet: Math.abs(diff),
    slopePercent,
    slopeDirection,
    takeoffPerformanceEffect: takeoffEffect,
    landingPerformanceEffect: landingEffect,
    icaoMaxCompliant
  };
}

/* ============================================================
   3. RUNWAY NUMBER & MAGNETIC HEADING CALCULATOR
   ============================================================ */
export interface RunwayNumberInputs {
  magneticHeading: number; // 1 - 360
  parallelDesignation?: 'L' | 'C' | 'R' | 'None';
}

export interface RunwayNumberResults {
  runwayNumber: string; // e.g. "09" or "09L"
  reciprocalHeading: number; // e.g. 270
  reciprocalRunwayNumber: string; // e.g. "27" or "27R"
  exactMagneticHeading: number;
  roundedHeading: number;
}

export function calculateRunwayNumber(inputs: RunwayNumberInputs): RunwayNumberResults {
  let heading = Math.round(inputs.magneticHeading || 360);
  while (heading <= 0) heading += 360;
  while (heading > 360) heading -= 360;

  // FAA/ICAO: Divide magnetic heading by 10 and round to nearest whole number
  let rounded = Math.round(heading / 10);
  if (rounded === 0) rounded = 36; // 360 degrees = 36, not 0

  const paddedNumber = rounded < 10 ? `0${rounded}` : `${rounded}`;

  // Reciprocal heading (opposite direction = heading +/- 180)
  const reciprocalHeading = ((heading + 180 - 1) % 360) + 1;
  let recipRounded = Math.round(reciprocalHeading / 10);
  if (recipRounded === 0) recipRounded = 36;
  const paddedRecip = recipRounded < 10 ? `0${recipRounded}` : `${recipRounded}`;

  // Parallel suffix invert (L becomes R, R becomes L, C stays C)
  let suffix = '';
  let recipSuffix = '';
  if (inputs.parallelDesignation && inputs.parallelDesignation !== 'None') {
    suffix = inputs.parallelDesignation;
    if (suffix === 'L') recipSuffix = 'R';
    else if (suffix === 'R') recipSuffix = 'L';
    else if (suffix === 'C') recipSuffix = 'C';
  }

  return {
    runwayNumber: `${paddedNumber}${suffix}`,
    reciprocalHeading,
    reciprocalRunwayNumber: `${paddedRecip}${recipSuffix}`,
    exactMagneticHeading: heading,
    roundedHeading: rounded * 10
  };
}

/* ============================================================
   4. RUNWAY LENGTH & DENSITY ALTITUDE CALCULATOR
   ============================================================ */
export interface RunwayLengthInputs {
  airportElevationFeet: number;
  temperatureCelsius: number;
  altimeterSettingInHg: number; // e.g. 29.92
  baselineTakeoffDistanceFeet: number; // POH ground roll at sea level
}

export interface RunwayLengthResults {
  pressureAltitudeFeet: number;
  densityAltitudeFeet: number;
  adjustedTakeoffDistanceFeet: number;
  safetyMarginDistanceFeet: number; // +50% safety factor
  densityAltitudePenaltyPercent: number;
}

export function calculateRunwayLengthPerformance(inputs: RunwayLengthInputs): RunwayLengthResults {
  const elev = inputs.airportElevationFeet || 0;
  const tempC = inputs.temperatureCelsius || 15;
  const altSetting = inputs.altimeterSettingInHg || 29.92;
  const baseRoll = Math.max(100, inputs.baselineTakeoffDistanceFeet || 1000);

  // Pressure Altitude = Elevation + (29.92 - Altimeter) * 1000
  const pressureAlt = Math.round(elev + (29.92 - altSetting) * 1000);

  // Standard Temperature at Pressure Altitude = 15 - (2 * (PressureAlt / 1000))
  const isaTemp = 15 - 2 * (pressureAlt / 1000);

  // Density Altitude = Pressure Altitude + [120 * (OAT - ISA)]
  const densityAlt = Math.round(pressureAlt + 120 * (tempC - isaTemp));

  // Aircraft rule of thumb: Add ~10% to takeoff distance per 1,000 ft of density altitude
  const daPenaltyPct = Math.max(0, Number(((densityAlt / 1000) * 10).toFixed(1)));
  const adjustedDistance = Math.round(baseRoll * (1 + daPenaltyPct / 100));
  const safetyDistance = Math.round(adjustedDistance * 1.5); // 50% safety buffer recommended by FAA

  return {
    pressureAltitudeFeet: pressureAlt,
    densityAltitudeFeet: densityAlt,
    adjustedTakeoffDistanceFeet: adjustedDistance,
    safetyMarginDistanceFeet: safetyDistance,
    densityAltitudePenaltyPercent: daPenaltyPct
  };
}
