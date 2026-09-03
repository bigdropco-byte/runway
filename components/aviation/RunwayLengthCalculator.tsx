'use client';

import React, { useState } from 'react';
import { Gauge, Plane, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { calculateRunwayLengthPerformance, RunwayLengthInputs } from '@/lib/aviationCalculator';

export default function RunwayLengthCalculator() {
  const [inputs, setInputs] = useState<RunwayLengthInputs>({
    airportElevationFeet: 4500,
    temperatureCelsius: 30,
    altimeterSettingInHg: 29.85,
    baselineTakeoffDistanceFeet: 1200
  });

  const res = calculateRunwayLengthPerformance(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Gauge className="w-4 h-4 mr-1.5 text-indigo-600" />
            Atmospheric &amp; Aircraft Performance Inputs
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Airport Elevation (Feet MSL)
              </label>
              <input
                type="number"
                step="100"
                value={inputs.airportElevationFeet}
                onChange={(e) => setInputs({ ...inputs, airportElevationFeet: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 4500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Outside Air Temp (°C)
              </label>
              <input
                type="number"
                step="1"
                value={inputs.temperatureCelsius}
                onChange={(e) => setInputs({ ...inputs, temperatureCelsius: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Altimeter Setting (inHg)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.altimeterSettingInHg}
                onChange={(e) => setInputs({ ...inputs, altimeterSettingInHg: parseFloat(e.target.value) || 29.92 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                placeholder="29.92"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                POH Sea-Level Roll (Feet)
              </label>
              <input
                type="number"
                step="50"
                value={inputs.baselineTakeoffDistanceFeet}
                onChange={(e) => setInputs({ ...inputs, baselineTakeoffDistanceFeet: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 1200"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-900 block font-semibold flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              High Density Altitude Rule of Thumb:
            </strong>
            <p>
              High temperatures and low barometric pressure reduce air density. For every 1,000 feet of density altitude above sea level, takeoff ground roll distance increases by approximately 10% for light piston aircraft.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Density Altitude &amp; Required Runway
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400">
                {res.densityAltitudeFeet.toLocaleString()} ft
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Your aircraft performs as if it were operating at an elevation of <strong>{res.densityAltitudeFeet.toLocaleString()} ft MSL</strong>.
            </p>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">Pressure Altitude:</span>
              <strong className="text-white">{res.pressureAltitudeFeet.toLocaleString()} ft</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">Calculated Ground Roll</span>
              <span className="text-2xl font-extrabold text-slate-900 block mt-0.5">
                {res.adjustedTakeoffDistanceFeet.toLocaleString()} ft
              </span>
              <span className="text-[10px] text-rose-600 font-semibold mt-0.5 block">
                +{res.densityAltitudePenaltyPercent}% over sea level
              </span>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
              <span className="text-[11px] font-semibold text-indigo-900 block">Recommended Min Runway</span>
              <span className="text-2xl font-extrabold text-indigo-950 block mt-0.5">
                {res.safetyMarginDistanceFeet.toLocaleString()} ft
              </span>
              <span className="text-[10px] text-indigo-700 mt-0.5 block">
                Includes FAA 50% safety factor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
