'use client';

import React, { useState } from 'react';
import { Mountain, TrendingUp, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { calculateRunwaySlope, RunwaySlopeInputs } from '@/lib/aviationCalculator';

export default function RunwaySlopeCalculator() {
  const [inputs, setInputs] = useState<RunwaySlopeInputs>({
    runwayLengthFeet: 5000,
    threshold1ElevationFeet: 1200,
    threshold2ElevationFeet: 1260
  });

  const res = calculateRunwaySlope(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Mountain className="w-4 h-4 mr-1.5 text-indigo-600" />
            Runway Elevation &amp; Length Inputs
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Runway Physical Length (Feet)
            </label>
            <input
              type="number"
              min="500"
              step="500"
              value={inputs.runwayLengthFeet}
              onChange={(e) => setInputs({ ...inputs, runwayLengthFeet: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 5000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Departure Threshold Elev (ft)
              </label>
              <input
                type="number"
                step="10"
                value={inputs.threshold1ElevationFeet}
                onChange={(e) => setInputs({ ...inputs, threshold1ElevationFeet: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 1200"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Opposite Threshold Elev (ft)
              </label>
              <input
                type="number"
                step="10"
                value={inputs.threshold2ElevationFeet}
                onChange={(e) => setInputs({ ...inputs, threshold2ElevationFeet: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. 1260"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-900 block font-semibold">ICAO Annex 14 Standard:</strong>
            <p>
              The longitudinal slope along any runway code number 3 or 4 should not exceed 1.0% to 1.25%, and never exceed 2.0% for any runway code.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Runway Gradient &amp; Slope
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {res.slopePercent}% {res.slopeDirection}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Elevation difference of <strong>{res.elevationDifferenceFeet} feet</strong> across a {inputs.runwayLengthFeet.toLocaleString()} ft runway.
            </p>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">ICAO 2% Compliance:</span>
              <span className={`font-bold ${res.icaoMaxCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                {res.icaoMaxCompliant ? 'Compliant (≤ 2.0%)' : 'Exceeds Standard (> 2.0%)'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">Takeoff Ground Roll Impact:</span>
              <p className="text-slate-600">{res.takeoffPerformanceEffect}</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">Landing Rollout Impact:</span>
              <p className="text-slate-600">{res.landingPerformanceEffect}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
