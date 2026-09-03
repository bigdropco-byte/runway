import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Plane } from 'lucide-react';

interface RelatedToolItem {
  name: string;
  url: string;
  description: string;
  category: 'financial' | 'aviation';
}

const ALL_TOOLS: RelatedToolItem[] = [
  // Financial Tools
  {
    name: 'Cash Runway Calculator',
    url: '/tools/cash-runway-calculator',
    description: 'Calculate cash survival months with customizable emergency reserve buffers.',
    category: 'financial'
  },
  {
    name: 'Startup Runway Calculator',
    url: '/tools/startup-runway-calculator',
    description: 'Model venture capital burn, fundraising timing, and milestone runway.',
    category: 'financial'
  },
  {
    name: 'Burn Rate Calculator',
    url: '/tools/burn-rate-calculator',
    description: 'Measure gross burn, net burn, and SaaS capital efficiency Burn Multiple.',
    category: 'financial'
  },
  {
    name: 'Hiring Runway Calculator',
    url: '/tools/hiring-runway-calculator',
    description: 'Model headcount salary additions and benefits overhead on runway months.',
    category: 'financial'
  },
  {
    name: 'Default Alive vs Dead Calculator',
    url: '/tools/default-alive-calculator',
    description: 'Paul Graham framework: test if revenue growth reaches profitability before cash runs out.',
    category: 'financial'
  },
  {
    name: 'SAFE & Dilution Calculator',
    url: '/tools/safe-dilution-runway-calculator',
    description: 'Calculate how much SAFE capital to raise and resulting founder equity dilution.',
    category: 'financial'
  },
  {
    name: 'Runway Calculator Excel Model',
    url: '/tools/runway-calculator-excel',
    description: 'Build & download a custom 24-month financial runway model spreadsheet.',
    category: 'financial'
  },
  {
    name: 'Runway Extension Solver',
    url: '/tools/runway-extension-calculator',
    description: 'Determine exact expense cuts or sales needed to reach your runway goal.',
    category: 'financial'
  },

  // Aviation Tools
  {
    name: 'Runway Crosswind Calculator',
    url: '/aviation/crosswind-calculator',
    description: 'Calculate exact crosswind and headwind/tailwind components with compass visual.',
    category: 'aviation'
  },
  {
    name: 'Runway Slope Calculator',
    url: '/aviation/runway-slope-calculator',
    description: 'Determine runway gradient percentage and takeoff/landing rollout impact.',
    category: 'aviation'
  },
  {
    name: 'Runway Number Calculator',
    url: '/aviation/runway-number-calculator',
    description: 'Convert magnetic headings to official FAA/ICAO runway numbers and reciprocals.',
    category: 'aviation'
  },
  {
    name: 'Runway Length & Takeoff Calculator',
    url: '/aviation/runway-length-calculator',
    description: 'Compute density altitude and required ground roll safety distance.',
    category: 'aviation'
  },
  {
    name: 'Runway Visual Range (RVR) Calculator',
    url: '/aviation/runway-visual-range-calculator',
    description: 'Convert RVR in feet/meters to statute miles and CAT I/II/III approach minimums.',
    category: 'aviation'
  },
  {
    name: 'Contaminated Runway Calculator',
    url: '/aviation/contaminated-runway-calculator',
    description: 'FAA TALPA / RCAM landing distance adjustments for wet, slush, and icy runways.',
    category: 'aviation'
  },
  {
    name: 'Runway in Use Calculator',
    url: '/aviation/runway-in-use-calculator',
    description: 'Determine active airport runway in use based on surface wind direction and velocity.',
    category: 'aviation'
  },
  {
    name: 'Runway Wind Calculator',
    url: '/aviation/runway-wind-calculator',
    description: 'Calculate headwind, crosswind, and tailwind components with wind gust factoring.',
    category: 'aviation'
  }
];

interface RelatedToolsProps {
  currentUrl: string;
  category?: 'financial' | 'aviation';
  limit?: number;
}

export default function RelatedTools({ currentUrl, category, limit = 4 }: RelatedToolsProps) {
  let filtered = ALL_TOOLS.filter((t) => t.url !== currentUrl);
  if (category) {
    filtered = filtered.filter((t) => t.category === category);
  }
  const items = filtered.slice(0, limit);

  return (
    <section className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            {category === 'aviation' ? (
              <Plane className="w-4 h-4 mr-2 text-indigo-600" />
            ) : (
              <Calculator className="w-4 h-4 mr-2 text-indigo-600" />
            )}
            Related {category === 'aviation' ? 'Aviation' : 'Financial'} Calculators
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore more precision calculators to streamline your planning.
          </p>
        </div>
        <Link
          href={category === 'aviation' ? '/aviation' : '/tools'}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center self-start sm:self-auto"
        >
          <span>View All Tools</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((tool) => (
          <Link
            key={tool.url}
            href={tool.url}
            className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-xs transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
              <span>Open Calculator</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
