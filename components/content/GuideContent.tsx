import React from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Flame, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign,
  AlertTriangle,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { ALL_NICHES } from '@/lib/niches';

export default function GuideContent() {
  return (
    <article className="space-y-16 text-slate-700 leading-relaxed max-w-4xl mx-auto pt-8">
      {/* What is a Runway Calculator? */}
      <section id="how-it-works" className="space-y-4 scroll-mt-20">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
          <Calculator className="w-3.5 h-3.5" />
          <span>Core Concepts</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What Is a Runway Calculator?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          A <strong>runway calculator</strong> is an essential financial forecasting tool used by founders, business owners, and CFOs to determine exactly how many months a business can survive before running out of liquid cash. It answers the fundamental entrepreneurial question: <em>“If our revenue and expenses remain on their current trajectory, when does our bank balance hit zero?”</em>
        </p>
        <p className="text-sm sm:text-base text-slate-600">
          Unlike complex accounting software that looks backward at historical profit and loss (P&amp;L), a cash runway calculator projects forward-looking liquidity. It accounts for your current liquid bank deposits, monthly incoming cash, and total monthly outlays to model your cash exhaustion date.
        </p>
      </section>

      {/* The Runway Formula */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          The Cash Runway Formula
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          At its foundation, calculating cash runway relies on an elegant and direct formula:
        </p>

        <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md my-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Standard Cash Runway Equation
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
            Runway (Months) = Available Cash Balance ÷ Net Monthly Burn
          </div>
          <div className="text-xs text-slate-400 border-t border-slate-800 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Where <strong>Net Monthly Burn</strong> = Monthly Expenses − Monthly Cash Revenue</span>
            <span className="text-emerald-400 font-medium">If Net Burn $\le$ 0 $\rightarrow$ Runway is Infinite</span>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          If your business produces more cash revenue each month than it spends on expenses, your net monthly burn is negative. This indicates you are <strong>cash-flow positive</strong> or <strong>default alive</strong>, meaning your cash balance grows each month rather than depleting.
        </p>
      </section>

      {/* Gross Burn vs Net Burn */}
      <section id="runway-guide" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Understanding Burn Rate: Gross Burn vs. Net Burn
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          One of the most dangerous mistakes first-time founders make is conflating <strong>Gross Burn</strong> with <strong>Net Burn</strong>. Using the wrong burn figure can cause you to dramatically underestimate or overestimate your survival window:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-base">
              <Flame className="w-5 h-5 text-amber-600" />
              <h3>Gross Burn Rate</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Gross Burn</strong> is the total absolute amount of cash leaving your bank account every month. It encompasses all payroll, employer taxes, cloud hosting, software licenses, office leases, inventory purchases, and legal retainers.
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-amber-200/80 font-mono text-xs text-slate-800 font-semibold">
              Gross Burn = Total Monthly Operating Costs
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-800 font-bold text-base">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3>Net Burn Rate</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Net Burn</strong> is the true net rate at which your cash balance shrinks each month. It factors in incoming customer cash receipts and recurring revenue that offset your gross expenses.
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-indigo-200/80 font-mono text-xs text-slate-800 font-semibold">
              Net Burn = Gross Expenses − Monthly Cash Receipts
            </div>
          </div>
        </div>
      </section>

      {/* What is a Good Startup Runway? */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What Is a Good Startup Runway? Industry Benchmarks
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          There is no single universal runway number that fits every company. Optimal runway targets vary significantly depending on your funding model, business stage, and macroeconomic environment:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Stage / Business Model</th>
                <th className="py-3.5 px-4">Recommended Runway</th>
                <th className="py-3.5 px-4">Primary Strategic Objective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Pre-Seed / Ideation</td>
                <td className="py-3.5 px-4 text-indigo-600 font-bold">12–18 months</td>
                <td className="py-3.5 px-4">Build MVP, validate customer demand, secure early alpha pilots.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Seed Stage (VC-Backed)</td>
                <td className="py-3.5 px-4 text-indigo-600 font-bold">18–24 months</td>
                <td className="py-3.5 px-4">Prove Product-Market Fit (PMF), reach $1M+ ARR, build repeatability.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Series A &amp; Beyond</td>
                <td className="py-3.5 px-4 text-indigo-600 font-bold">18–30 months</td>
                <td className="py-3.5 px-4">Scale go-to-market channels, expand executive team, withstand funding downturns.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Bootstrapped / Indie SaaS</td>
                <td className="py-3.5 px-4 text-emerald-600 font-bold">6–12 months</td>
                <td className="py-3.5 px-4">Reach Default Alive status where subscription expansion outpaces costs.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Agencies &amp; Consultancies</td>
                <td className="py-3.5 px-4 text-indigo-600 font-bold">3–6 months</td>
                <td className="py-3.5 px-4">Maintain operating buffer to cushion against client retainer churn and invoice lag.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Freelancers &amp; Solos</td>
                <td className="py-3.5 px-4 text-indigo-600 font-bold">6–9 months</td>
                <td className="py-3.5 px-4">Weather client droughts and cover quarterly self-employment taxes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Realistic Worked Example */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Runway Calculator Example: Step-by-Step Walkthrough
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Let’s examine a realistic scenario for an early-stage SaaS startup evaluating their survival window:
        </p>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Starting Cash</span>
              <span className="text-lg font-bold text-slate-900">$150,000</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Monthly Revenue</span>
              <span className="text-lg font-bold text-slate-900">$20,000</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Monthly Expenses</span>
              <span className="text-lg font-bold text-slate-900">$35,000</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-slate-600">
            <p>
              <strong>Step 1: Calculate Net Monthly Burn</strong><br />
              Net Burn = Monthly Expenses ($35,000) − Monthly Revenue ($20,000) = <strong className="text-slate-900">$15,000 / month</strong>.
            </p>
            <p>
              <strong>Step 2: Apply the Runway Equation</strong><br />
              Runway = Starting Cash ($150,000) ÷ Net Burn ($15,000/mo) = <strong className="text-indigo-600 font-bold">10.0 months</strong>.
            </p>
            <p>
              <strong>Step 3: Account for 5% Monthly Revenue Growth</strong><br />
              If monthly revenue expands at 5% per month while expenses stay flat at $35,000, monthly net burn shrinks every month:
              Month 1: $15,000 burn; Month 5: $10,670 burn; Month 10: $4,900 burn. Due to compounding revenue, the actual runway expands from <strong>10.0 months to 13.8 months</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 6 Tactical Ways to Extend Runway */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          6 Proven Strategies to Extend Your Business Runway
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          When runway drops below 6 months, founders must take decisive action to preserve optionality and prevent insolvency. Here are 6 battle-tested strategies:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <h4>Offer Annual Prepaid Discounts</h4>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Incentivize customers with 15–20% discounts for paying annually upfront. This immediately accelerates future cash receipts into non-dilutive working capital today.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <h4>Audit SaaS Subscriptions &amp; Cloud Tiers</h4>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Review company credit card statements. Eliminate idle SaaS seats, downgrade redundant enterprise packages, and request startup cloud hosting credits.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <h4>Freeze Non-Revenue Headcount</h4>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Payroll accounts for the majority of startup burn. Pause all speculative administrative hiring and align open roles strictly with direct customer revenue generation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <h4>Shorten Payment Terms (Net-15 / Net-30)</h4>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              If client contracts are Net-60 or Net-90, negotiate shorter payment windows or offer early payment incentives (e.g. 2% discount for payment within 10 days).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <h4>Secure Non-Dilutive Capital or Grants</h4>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Explore government R&amp;D tax credits (such as the US federal R&amp;D payroll tax credit of up to $500k), SBIR grants, or revenue-based financing lines.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">6</span>
              <h4>Initiate Bridge Financing Early</h4>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Do not wait until you have 60 days of cash left to approach existing angel investors. Pitch an insider bridge round or convertible note while you have 6+ months of runway.
            </p>
          </div>
        </div>
      </section>

      {/* Programmatic SEO Cross-Links Section */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Tailored Runway Calculators by Industry
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore dedicated calculators pre-configured with industry-specific burn benchmarks, cash cycles, and worked examples:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ALL_NICHES.map((niche) => (
            <Link
              key={niche.slug}
              href={`/tools/${niche.slug}`}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {niche.name}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {niche.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {niche.metaDescription}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Calculate {niche.name} Runway</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
