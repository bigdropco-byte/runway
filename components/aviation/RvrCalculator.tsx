'use client';

import React, { useState } from 'react';
import { Eye, ShieldCheck, AlertTriangle, ArrowRightLeft, Info } from 'lucide-react';
import { calculateRvrVisibility, RvrInputs } from '@/lib/advancedAviationTools';

export default function RvrCalculator() {
  const [inputs, setInputs] = useState<RvrInputs>({
    rvrFeet: 2400
  });

  const res = calculateRvrVisibility(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Eye className="w-4 h-4 mr-1.5 text-indigo-600" />
            Reported Runway Visual Range (RVR)
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                RVR Measurement: <strong className="text-indigo-600">{inputs.rvrFeet} ft</strong> ({res.rvrMeters} m)
              </label>
            </div>
            <input
              type="range"
              min="300"
              max="6000"
              step="100"
              value={inputs.rvrFeet}
              onChange={(e) => setInputs({ rvrFeet: parseInt(e.target.value, 10) || 0 })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>RVR 300 (CAT IIIb)</span>
              <span>RVR 2400 (CAT I Standard)</span>
              <span>RVR 6000 (1-1/4 SM)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[1200, 1800, 2400, 4000, 5000, 6000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setInputs({ rvrFeet: preset })}
                className={`py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all ${
                  inputs.rvrFeet === preset
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                RVR {preset}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-900 block font-semibold flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              FAA AIM Table 7-1-10 Reference:
            </strong>
            <p>
              RVR is measured by transmissometers along the runway touchdown, midpoint, and rollout zones. When reported, RVR takes precedence over prevailing ground visibility for precision approach authorization.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Conversion Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Equivalent Flight Visibility
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400">
                {res.statuteMilesFormatted}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Metric equivalent: <strong>{res.rvrMeters} meters</strong> • Decimal: <strong>{res.statuteMilesDecimal} SM</strong>
            </p>

            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Instrument Category:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-bold">
                {res.approachCategoryEligible}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 block">Approach Authorization Guidance:</span>
            <p className="text-slate-600 leading-relaxed">{res.instrumentApproachSuitability}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
