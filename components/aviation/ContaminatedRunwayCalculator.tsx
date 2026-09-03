'use client';

import React, { useState } from 'react';
import { CloudRain, AlertTriangle, ShieldAlert, ShieldCheck, Info } from 'lucide-react';
import { calculateContaminatedRunway, ContaminatedRunwayInputs, RunwayConditionCode } from '@/lib/advancedAviationTools';

export default function ContaminatedRunwayCalculator() {
  const [inputs, setInputs] = useState<ContaminatedRunwayInputs>({
    baseDryLandingDistanceFeet: 2200,
    runwayConditionCode: 5,
    reverseThrustInoperative: false
  });

  const res = calculateContaminatedRunway(inputs);

  const codes: { code: RunwayConditionCode; label: string; desc: string }[] = [
    { code: 6, label: 'RWYCC 6 (Dry)', desc: 'Dry clean surface' },
    { code: 5, label: 'RWYCC 5 (Wet)', desc: 'Water ≤ 3mm / frost' },
    { code: 4, label: 'RWYCC 4 (Cold Snow)', desc: 'Compacted snow ≤ -15°C' },
    { code: 3, label: 'RWYCC 3 (Slippery Wet)', desc: 'Compacted snow > -15°C' },
    { code: 2, label: 'RWYCC 2 (Standing Water / Slush)', desc: 'Depth > 3mm (Severe hydroplaning)' },
    { code: 1, label: 'RWYCC 1 (Ice)', desc: 'Ice / wet ice' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <CloudRain className="w-4 h-4 mr-1.5 text-indigo-600" />
            FAA TALPA / RCAM Runway Surface Condition
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              POH Unfactored Dry Landing Distance (Feet)
            </label>
            <input
              type="number"
              min="500"
              step="100"
              value={inputs.baseDryLandingDistanceFeet}
              onChange={(e) => setInputs({ ...inputs, baseDryLandingDistanceFeet: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Reported Runway Condition Code (RWYCC)
            </label>
            <div className="space-y-1.5">
              {codes.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setInputs({ ...inputs, runwayConditionCode: c.code })}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    inputs.runwayConditionCode === c.code
                      ? 'bg-indigo-50/70 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inputs.reverseThrustInoperative}
                onChange={(e) => setInputs({ ...inputs, reverseThrustInoperative: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Thrust Reversers Inoperative (MEL dispatch penalty)</span>
            </label>
          </div>
        </div>

        {/* Right Column: Visual Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Required Runway Length (With 15% Buffer)
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-amber-400">
                {res.totalRequiredRunwayFeet.toLocaleString()} ft
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Factored ground roll: <strong>{res.factoredLandingDistanceFeet.toLocaleString()} ft</strong> (Multiplier: {res.landingDistanceMultiplier}x) + {res.faaSafetyBufferDistanceFeet.toLocaleString()} ft FAA safety buffer.
            </p>

            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Reported Braking Action:</span>
              <strong className="text-white font-bold">{res.brakingActionReport}</strong>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start space-x-2.5 ${
              res.hydroplaningRisk === 'Severe / Extreme'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : res.hydroplaningRisk === 'Moderate'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {res.hydroplaningRisk === 'None' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="font-bold block mb-0.5">
                Hydroplaning Hazard: {res.hydroplaningRisk}
              </strong>
              <span>{res.operationalGuidance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
