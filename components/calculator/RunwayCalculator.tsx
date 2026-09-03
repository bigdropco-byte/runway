'use client';

import React, { useState } from 'react';
import CalculatorInputs from './CalculatorInputs';
import CalculatorResults from './CalculatorResults';
import ProjectionChart from './ProjectionChart';
import ScenarioCalculator from './ScenarioCalculator';
import CalculatorMethodology from './CalculatorMethodology';
import { RunwayInputs, calculateRunway } from '@/lib/runwayCalculator';

interface RunwayCalculatorProps {
  initialInputs?: RunwayInputs;
  headline?: string;
  subheadline?: string;
}

const DEFAULT_INPUTS: RunwayInputs = {
  cashBalance: 100_000,
  monthlyRevenue: 20_000,
  monthlyExpenses: 35_000,
  revenueGrowthRate: 5,
  expenseGrowthRate: 2,
  oneTimeExpense: 0,
  oneTimeExpenseMonth: 1,
  additionalFunding: 0,
  additionalFundingMonth: 1
};

export default function RunwayCalculator({
  initialInputs = DEFAULT_INPUTS,
  headline,
  subheadline
}: RunwayCalculatorProps) {
  const [inputs, setInputs] = useState<RunwayInputs>(initialInputs);

  // Compute live metrics
  const metrics = calculateRunway(inputs);

  const handleApplyScenario = (updated: Partial<RunwayInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handlePresetSelect = (preset: RunwayInputs) => {
    setInputs(preset);
  };

  return (
    <section id="calculator" className="space-y-8 scroll-mt-20">
      {/* Two Column Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <CalculatorInputs
            inputs={inputs}
            onChange={setInputs}
            onPresetSelect={handlePresetSelect}
          />
        </div>

        {/* Right Column: Visual Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          <CalculatorResults
            metrics={metrics}
            startingCash={inputs.cashBalance}
          />
        </div>
      </div>

      {/* Projection Chart */}
      <ProjectionChart
        projections={metrics.monthlyProjections}
        startingCash={inputs.cashBalance}
        runwayMonths={metrics.runwayMonths}
      />

      {/* Scenario "What If?" Calculator */}
      <ScenarioCalculator
        inputs={inputs}
        baseMetrics={metrics}
        onApplyScenario={handleApplyScenario}
      />

      {/* Methodology Section */}
      <CalculatorMethodology />
    </section>
  );
}
