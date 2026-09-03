/**
 * Rich programmatic SEO niche configurations
 * 
 * Provides genuinely differentiated, in-depth data for 10+ niche verticals.
 * Each niche features custom benchmark standards, default financial models,
 * worked calculation examples, unique burn drivers, and niche FAQs.
 */

import { RunwayInputs } from './runwayCalculator';

export interface NicheFaq {
  question: string;
  answer: string;
}

export interface NicheData {
  slug: string; // e.g. "runway-calculator-for-startups"
  id: string;   // e.g. "startups"
  name: string; // e.g. "Startups"
  title: string; // Page Title
  metaDescription: string;
  h1: string;
  badge: string;
  intro: string;
  recommendedRunwayMonths: string;
  targetBenchmarkText: string;
  defaultInputs: RunwayInputs;
  keyBurnDrivers: { title: string; description: string }[];
  extensionStrategies: { title: string; description: string }[];
  workedExample: {
    scenarioTitle: string;
    cash: number;
    revenue: number;
    expenses: number;
    explanation: string;
  };
  faqs: NicheFaq[];
  relatedNicheSlugs: string[];
}

export const NICHES: Record<string, NicheData> = {
  'runway-calculator-for-startups': {
    slug: 'runway-calculator-for-startups',
    id: 'startups',
    name: 'Startups',
    title: 'Startup Runway Calculator – Calculate Cash Runway & Burn Rate',
    metaDescription: 'Free startup runway calculator. Calculate your venture runway in months, forecast cash depletion dates, model hiring burn, and prepare for your next fundraise.',
    h1: 'Startup Runway Calculator',
    badge: 'Venture & Early Stage',
    intro: 'Venture-backed and early-stage startups operate in high-growth, cash-negative environments. Accurate runway calculations prevent premature fundraising fire drills and give founders clear visibility into when they must reach milestone metrics or close their next round.',
    recommendedRunwayMonths: '18–24 months',
    targetBenchmarkText: 'In cautious venture capital climates, early-stage startups should maintain 18 to 24 months of runway after raising. It typically takes 4 to 6 months to run an institutional fundraise, leaving 12 to 18 months of heads-down product iteration and customer acquisition before you must hit the road again.',
    defaultInputs: {
      cashBalance: 750_000,
      monthlyRevenue: 15_000,
      monthlyExpenses: 65_000,
      revenueGrowthRate: 8,
      expenseGrowthRate: 3,
      oneTimeExpense: 20_000,
      oneTimeExpenseMonth: 3
    },
    keyBurnDrivers: [
      {
        title: 'Engineering & Product Payroll',
        description: 'Salaries, health benefits, payroll taxes, and recruiting commissions typically comprise 70–85% of total operating expenses for early tech startups.'
      },
      {
        title: 'Cloud Infrastructure & AI APIs',
        description: 'Compute clusters, vector databases, LLM inference API costs, and third-party SaaS tooling that scale aggressively with user adoption.'
      },
      {
        title: 'Customer Acquisition Costs (CAC)',
        description: 'Paid search, outbound sales tooling, demo SDRs, and channel experimentation before achieving predictable unit economics.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Institute a Dynamic Hiring Freeze',
        description: 'Defer non-essential general and administrative (G&A) hires and align every new headcount strictly with revenue generation.'
      },
      {
        title: 'Incentivize Annual Upfront Contracts',
        description: 'Offer enterprise prospects a 15–20% discount for paying 12 months upfront, transforming receivables into instant non-dilutive working capital.'
      },
      {
        title: 'Audit Software Tooling & Cloud Tiers',
        description: 'Prune unused seat licenses, renegotiate AWS/GCP startup credits, and eliminate redundant developer tooling to shave 5–15% off gross burn.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Seed-Stage AI Developer Tool',
      cash: 750_000,
      revenue: 15_000,
      expenses: 65_000,
      explanation: 'With $750,000 in bank deposits and $65,000 monthly expenses offset by $15,000 monthly recurring revenue, net monthly burn is $50,000. Without growth, runway is exactly 15.0 months ($750,000 ÷ $50,000). Factoring in 8% monthly revenue growth against modest 3% expense creep extends true runway to 16.8 months.'
    },
    faqs: [
      {
        question: 'When should a startup founder start preparing for the next fundraising round?',
        answer: 'You should initiate institutional fundraising when you have 6 to 9 months of runway remaining. If negotiations take 4 to 5 months, closing at the 3-month mark prevents investor leverage from forcing disadvantageous down-rounds or punitive term sheets.'
      },
      {
        question: 'What is the difference between startup Gross Burn and Net Burn?',
        answer: 'Gross Burn is the total absolute cash paid out each month (payroll, rent, software). Net Burn is Gross Burn minus total monthly cash collections. Runway is always calculated using Net Burn.'
      },
      {
        question: 'How do convertible notes and SAFE injections affect runway?',
        answer: 'SAFE or convertible note proceeds immediately increase your cash balance without altering operating expenses, directly expanding your runway runway divisor.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-saas', 'runway-calculator-for-founders', 'runway-calculator-for-bootstrapped']
  },

  'runway-calculator-for-saas': {
    slug: 'runway-calculator-for-saas',
    id: 'saas',
    name: 'SaaS Companies',
    title: 'SaaS Runway Calculator – Calculate Cash Runway with MRR & Churn',
    metaDescription: 'Accurate SaaS runway calculator. Model MRR expansion, monthly churn, gross margins, and subscription burn to calculate exact cash runway.',
    h1: 'SaaS Runway Calculator',
    badge: 'Subscription & Cloud',
    intro: 'Software-as-a-Service businesses enjoy recurring revenue compounding, but high upfront customer acquisition costs and deferred revenue timing make cash flow management unique. Use this calculator to model your subscription burn and cash exhaustion date.',
    recommendedRunwayMonths: '14–18 months',
    targetBenchmarkText: 'Healthy SaaS companies targeting Series A or profitability typically target 14 to 18 months of runway. With net revenue retention (NRR) above 100%, growing subscription revenue gradually offsets fixed server and payroll costs, expanding runway organically month over month.',
    defaultInputs: {
      cashBalance: 400_000,
      monthlyRevenue: 32_000,
      monthlyExpenses: 60_000,
      revenueGrowthRate: 6,
      expenseGrowthRate: 2
    },
    keyBurnDrivers: [
      {
        title: 'Customer Acquisition Payback Period',
        description: 'Sales and marketing spend required to acquire a customer before subscription cash payback is completed (often 12–18 months).'
      },
      {
        title: 'Hosting & Scalable Infrastructure',
        description: 'Multi-tenant database clusters, cloud monitoring, and third-party communications APIs that grow alongside active user seats.'
      },
      {
        title: 'Customer Success & Support',
        description: 'Onboarding specialists and support engineers required to maintain low churn and high net revenue retention.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Shift Monthly Accounts to Annual Subscriptions',
        description: 'Encourage customer migration to annual prepaid billing by offering 2 months free; upfront cash collections immediately lengthen your runway.'
      },
      {
        title: 'Focus on Low-CAC Organic & Product-Led Growth',
        description: 'Double down on documentation SEO, viral referral loops, and freemium conversion rather than expensive Google/LinkedIn paid ads.'
      },
      {
        title: 'Tackle Gross Logo & Revenue Churn',
        description: 'Every retained customer saves the cash burn required to replace them. Implement proactive customer health scoring.'
      }
    ],
    workedExample: {
      scenarioTitle: 'B2B Workflow Automation SaaS',
      cash: 400_000,
      revenue: 32_000,
      expenses: 60_000,
      explanation: 'A SaaS with $400k cash, $32k MRR, and $60k operating expenses faces a net burn of $28,000/month. At static burn, runway is 14.3 months. With 6% month-over-month MRR growth against 2% expense expansion, the company hits cash-flow break-even in month 16 before running out of money.'
    },
    faqs: [
      {
        question: 'How does Net Revenue Retention (NRR) impact SaaS runway?',
        answer: 'High NRR (>110%) means your existing customer base expands over time, providing compound cash growth even if new customer acquisition slows down.'
      },
      {
        question: 'Should SaaS runway be calculated using ARR or MRR?',
        answer: 'Runway must always be calculated on a monthly cash basis using MRR cash collections and real monthly cash outflows, not recognized GAAP revenue or annualized run-rate (ARR).'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-startups', 'runway-calculator-for-bootstrapped', 'runway-calculator-for-ecommerce']
  },

  'runway-calculator-for-small-business': {
    slug: 'runway-calculator-for-small-business',
    id: 'small-business',
    name: 'Small Businesses',
    title: 'Small Business Runway Calculator – Cash Flow & Operating Reserves',
    metaDescription: 'Calculate how many months your small business can survive without new sales. Track cash buffer, overhead burn, and working capital reserve.',
    h1: 'Small Business Runway Calculator',
    badge: 'Main Street & SMB',
    intro: 'For small business owners, operating reserves are your financial oxygen mask. Whether facing economic downturns, seasonal slow months, or delayed client invoices, knowing your exact runway lets you make proactive decisions instead of reacting in panic.',
    recommendedRunwayMonths: '3–6 months',
    targetBenchmarkText: 'Most commercial lenders and financial advisors recommend small businesses maintain 3 to 6 months of operating expenses in liquid cash reserves. This buffer cushions against supply chain shocks, key employee departures, or emergency equipment replacement.',
    defaultInputs: {
      cashBalance: 85_000,
      monthlyRevenue: 28_000,
      monthlyExpenses: 36_000,
      revenueGrowthRate: 2,
      expenseGrowthRate: 1
    },
    keyBurnDrivers: [
      {
        title: 'Commercial Lease & Facilities',
        description: 'Fixed brick-and-mortar rent, property utilities, maintenance contracts, and local municipal fees.'
      },
      {
        title: 'Core Staff Payroll & Overtime',
        description: 'W-2 hourly and salaried personnel, employer insurance contributions, and state unemployment taxes.'
      },
      {
        title: 'Inventory Replenishment & Vendor Terms',
        description: 'Wholesale purchases required ahead of peak sales cycles that temporarily lock up liquid bank balances.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Negotiate Flexible Supplier Payment Terms',
        description: 'Request Net-60 or Net-90 terms from reliable vendors to keep cash in your account longer.'
      },
      {
        title: 'Accelerate Accounts Receivable Collections',
        description: 'Send automated invoice reminders, impose late payment fees, or offer a 2% discount for 10-day payment (2/10 Net 30).'
      },
      {
        title: 'Establish a Pre-Emptive Business Line of Credit',
        description: 'Apply for a revolving credit line while your financial ratios are strong, securing standby liquidity before you need it.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Local Commercial HVAC Contractor',
      cash: 85_000,
      revenue: 28_000,
      expenses: 36_000,
      explanation: 'With $85,000 in bank deposits, $28,000 average off-season revenue, and $36,000 monthly overhead, the business experiences a net monthly deficit of $8,000. Runway is 10.6 months ($85,000 ÷ $8,000), confirming ample liquidity to comfortably bridge until peak seasonal summer demand.'
    },
    faqs: [
      {
        question: 'How much cash reserve should a small business keep in the bank?',
        answer: 'A minimum of 3 months of basic operating expenses (payroll, rent, utilities, minimum debt service) is the baseline safety net. High-volatility businesses should target 6 months.'
      },
      {
        question: 'What should I do if my small business runway drops below 2 months?',
        answer: 'Immediately pause discretionary capital expenditures, contact your top clients to expedite receivables, negotiate vendor term extensions, and tap credit lines.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-freelancers', 'runway-calculator-for-agencies', 'runway-calculator-for-consulting']
  },

  'runway-calculator-for-freelancers': {
    slug: 'runway-calculator-for-freelancers',
    id: 'freelancers',
    name: 'Freelancers & Solopreneurs',
    title: 'Freelancer Runway Calculator – Emergency Fund & Personal Runway',
    metaDescription: 'Calculate how long your savings will last between freelance clients. Factor in variable contractor income, estimated taxes, and living expenses.',
    h1: 'Freelancer Runway Calculator',
    badge: 'Solopreneurs & Contractors',
    intro: 'Freelance income is notoriously irregular — feasts and famines are part of the lifestyle. Calculating your financial runway provides peace of mind, helps you avoid taking low-ball panic projects, and ensures your self-employment taxes are covered.',
    recommendedRunwayMonths: '6–9 months',
    targetBenchmarkText: 'Because independent contractors lack unemployment benefits and paid sick leave, keeping 6 to 9 months of combined personal living expenses and business overhead in liquid savings provides the freedom to decline toxic clients and weather dry spells.',
    defaultInputs: {
      cashBalance: 24_000,
      monthlyRevenue: 5_500,
      monthlyExpenses: 4_200,
      revenueGrowthRate: 0,
      expenseGrowthRate: 0
    },
    keyBurnDrivers: [
      {
        title: 'Personal Living Essentials',
        description: 'Rent/mortgage, groceries, healthcare premiums, and family necessities that cannot be cut.'
      },
      {
        title: 'Quarterly Estimated Taxes & Self-Employment Tax',
        description: 'FICA and federal/state income taxes (typically 25–35% of net earnings) that must be set aside regularly.'
      },
      {
        title: 'Professional Software & Equipment Subscriptions',
        description: 'Creative Cloud, hosting, accounting tools, specialized hardware leases, and co-working memberships.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Package Work into Monthly Retainers',
        description: 'Transition one-off project clients into ongoing advisory or maintenance retainers to establish a predictable revenue floor.'
      },
      {
        title: 'Require 50% Deposits Upfront',
        description: 'Never start client work without a 50% upfront deposit to eliminate non-payment risk and protect cash flow.'
      },
      {
        title: 'Keep a Dedicated Tax Escrow Account',
        description: 'Immediately sweep 30% of every client deposit into a separate high-yield savings account so tax deadlines never eat your runway.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Independent Senior UX Designer',
      cash: 24_000,
      revenue: 5_500,
      expenses: 4_200,
      explanation: 'With $24,000 cash, average client retainer revenue of $5,500, and $4,200 monthly expenses, net cash flow is +$1,300/month. The freelancer is sustainable. If a major client cancels and revenue drops to $2,000/month, net burn becomes $2,200/month, leaving 10.9 months of runway to replace that client.'
    },
    faqs: [
      {
        question: 'Should freelancers include personal expenses in their runway calculation?',
        answer: 'Yes. For solo operators, your personal living costs are your primary business overhead. Your runway calculation should combine baseline personal expenses, health insurance, and professional subscriptions.'
      },
      {
        question: 'How do late-paying clients impact freelancer runway?',
        answer: 'A client paying on Net-60 terms instead of upon delivery can create a temporary cash crunch. Calculate your runway assuming zero cash arrives from overdue invoices.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-consulting', 'runway-calculator-for-agencies', 'runway-calculator-for-bootstrapped']
  },

  'runway-calculator-for-agencies': {
    slug: 'runway-calculator-for-agencies',
    id: 'agencies',
    name: 'Agencies & Studios',
    title: 'Agency Runway Calculator – Retainer Burn, Bench Payroll & Cash Flow',
    metaDescription: 'Free agency runway calculator. Manage retainer churn, unbilled bench payroll, scope delays, and cash reserves for digital, creative, and marketing agencies.',
    h1: 'Agency Runway Calculator',
    badge: 'Marketing, Dev & Creative',
    intro: 'Service agencies walk a tightrope between payroll obligations and client payment schedules. When a major account pauses or scope creep stalls a project milestone, knowing your cash runway ensures you never miss payroll.',
    recommendedRunwayMonths: '3–6 months',
    targetBenchmarkText: 'Top-performing creative and technical agencies typically hold 3 to 6 months of total payroll and overhead in reserve. Because agency payroll represents 50–70% of revenue, even a single client termination can rapidly turn profitable operations cash-negative.',
    defaultInputs: {
      cashBalance: 160_000,
      monthlyRevenue: 65_000,
      monthlyExpenses: 80_000,
      revenueGrowthRate: 3,
      expenseGrowthRate: 1
    },
    keyBurnDrivers: [
      {
        title: 'Full-Time Bench Capacity',
        description: 'Salaried designers, engineers, and strategists between client billable engagements.'
      },
      {
        title: 'Delayed Scope Approvals & Receivables',
        description: 'Unbilled work and Net-60 enterprise accounts receivable that trap cash in unpaid invoices.'
      },
      {
        title: 'Specialized Contractor Sourcing',
        description: 'Freelance surge capacity hired for peak deliverable sprints before client payments clear.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Replace Milestone Billing with Weekly Sprints',
        description: 'Bill clients on weekly or bi-weekly sprint cycles rather than subjective project sign-off milestones.'
      },
      {
        title: 'Maintain a 20% Flexible Contractor Mix',
        description: 'Use specialized contractors for surge capacity rather than hiring full-time staff, keeping fixed overhead low.'
      },
      {
        title: 'Mandate 30-Day Contract Notice Periods',
        description: 'Ensure client contracts require 30 to 60 days written notice to pause or terminate retainer services.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Digital Performance Marketing Agency',
      cash: 160_000,
      revenue: 65_000,
      expenses: 80_000,
      explanation: 'With $160,000 cash, $65,000 in monthly retainer revenue, and $80,000 in monthly agency payroll and tooling, net burn is $15,000/month. The agency has 10.7 months of runway ($160,000 ÷ $15,000) to land new retainer clients or reduce contractor expenses.'
    },
    faqs: [
      {
        question: 'How should an agency handle unbilled client work in runway calculations?',
        answer: 'Never count unbilled work or pending contracts as cash. Only count cleared funds in your bank accounts to avoid overestimating your runway.'
      },
      {
        question: 'What is a healthy bench percentage for agency profitability?',
        answer: 'Most sustainable agencies aim for 75–85% billable team utilization, keeping unbilled bench time below 15–25% of total capacity.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-consulting', 'runway-calculator-for-small-business', 'runway-calculator-for-freelancers']
  },

  'runway-calculator-for-nonprofits': {
    slug: 'runway-calculator-for-nonprofits',
    id: 'nonprofits',
    name: 'Nonprofits & Charities',
    title: 'Nonprofit Runway Calculator – Operating Reserves & Grant Cycles',
    metaDescription: 'Free nonprofit runway calculator. Track unrestricted cash reserves, donor seasonality, grant disbursal timing, and mission operating runway.',
    h1: 'Nonprofit Runway Calculator',
    badge: '501(c)(3) & NGOs',
    intro: 'Nonprofits face strict fiscal responsibility guidelines and donor scrutiny. Grant disbursements often arrive in lump sums separated by months of steady program expenditures. Calculate your unrestricted operating reserves and safeguard your mission.',
    recommendedRunwayMonths: '6–12 months',
    targetBenchmarkText: 'The Nonprofit Finance Fund and charity watchdogs recommend 6 to 12 months of operating reserves. Holding less than 3 months places critical community programs at severe risk if an annual foundation grant is delayed or denied.',
    defaultInputs: {
      cashBalance: 220_000,
      monthlyRevenue: 18_000,
      monthlyExpenses: 32_000,
      revenueGrowthRate: 2,
      expenseGrowthRate: 1,
      oneTimeExpense: 15_000,
      oneTimeExpenseMonth: 4
    },
    keyBurnDrivers: [
      {
        title: 'Direct Program Operations',
        description: 'Community service delivery, essential educational materials, field personnel, and facility leases.'
      },
      {
        title: 'Grant Compliance & Administrative Staff',
        description: 'Auditing, non-profit tax reporting, grant application management, and regulatory compliance.'
      },
      {
        title: 'Seasonal Donor Fatigue',
        description: 'Lulls in charitable contributions during spring and summer following peak Q4 year-end giving campaigns.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Build a Monthly Recurring Donor Circle',
        description: 'Convert one-time holiday donors into $25/mo or $50/mo sustainers to establish predictable monthly operating cash.'
      },
      {
        title: 'Negotiate Multi-Year Grant Commitments',
        description: 'Request 3-year recurring grant commitments from foundation partners rather than annual re-application cycles.'
      },
      {
        title: 'Segregate Restricted from Unrestricted Funds',
        description: 'Run your runway calculator strictly on unrestricted funds to ensure legal compliance with donor intent.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Youth Literacy Foundation',
      cash: 220_000,
      revenue: 18_000,
      expenses: 32_000,
      explanation: 'With $220,000 in unrestricted liquid reserves, $18,000 monthly average donor revenue, and $32,000 monthly program and overhead costs, net monthly burn is $14,000. Runway is 15.7 months, comfortably providing time to secure the next major foundation grant cycle.'
    },
    faqs: [
      {
        question: 'Can restricted endowment funds be counted in nonprofit runway?',
        answer: 'No. Only liquid, unrestricted operating cash should be used in runway calculations. Restricted funds legally earmarked for specific capital projects cannot cover general payroll or utility bills.'
      },
      {
        question: 'Why do nonprofits struggle with Q2 and Q3 cash flow?',
        answer: 'Over 30% of individual charitable giving occurs in December. Nonprofits that fail to budget this windfall over the subsequent 11 months frequently experience runway emergencies in July and August.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-small-business', 'runway-calculator-for-bootstrapped', 'runway-calculator-for-founders']
  },

  'runway-calculator-for-founders': {
    slug: 'runway-calculator-for-founders',
    id: 'founders',
    name: 'Founders & Co-Founders',
    title: 'Founder Runway Calculator – Personal & Pre-Seed Company Survival',
    metaDescription: 'Personal and startup runway calculator for founders. Calculate how long you can bootstrap before raising capital or returning to employment.',
    h1: 'Founder Runway Calculator',
    badge: 'Ideation & Pre-Seed',
    intro: 'Before raising institutional venture capital or reaching ramen profitability, a founder’s true runway is often tied to their personal bank account. Track your combined personal and business burn to know exactly how long you have to find product-market fit.',
    recommendedRunwayMonths: '12–18 months',
    targetBenchmarkText: 'Full-time founders should ideally have 12 to 18 months of living expenses and prototype capital secured before quitting their primary job. Developing an MVP, conducting customer discovery, and securing initial traction almost always takes twice as long as optimistic timelines predict.',
    defaultInputs: {
      cashBalance: 60_000,
      monthlyRevenue: 2_500,
      monthlyExpenses: 6_500,
      revenueGrowthRate: 10,
      expenseGrowthRate: 2
    },
    keyBurnDrivers: [
      {
        title: 'Founder Personal Living Expenses',
        description: 'Mortgage/rent, groceries, health insurance, and debt service while drawing zero or nominal founder salary.'
      },
      {
        title: 'MVP Hosting, Domains & API Services',
        description: 'Server instances, third-party authentication, LLM keys, and development tool licenses.'
      },
      {
        title: 'Legal Incorporation & Patent Filings',
        description: 'Delaware C-Corp incorporation, IP assignment, founder equity vesting agreements, and trademark searches.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Preserve Advisory / Consulting Hours',
        description: 'Dedicate 10 hours per week to high-rate consulting to cover personal baseline expenses while building your product.'
      },
      {
        title: 'Leverage Startup Accelerator Perks',
        description: 'Apply for AWS Activate, Google Cloud for Startups, and HubSpot credits to secure up to $100k+ in free tooling.'
      },
      {
        title: 'Validate Demand with Pre-Orders',
        description: 'Sell founding member lifetime deals or annual pre-orders before writing complex production code.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Solo Technical Founder Building Dev Tool',
      cash: 60_000,
      revenue: 2_500,
      expenses: 6_500,
      explanation: 'With $60,000 in founder savings, $2,500 monthly beta subscription revenue, and $6,500 in combined living and server expenses, net burn is $4,000/month. The founder has 15.0 months of runway ($60,000 ÷ $4,000) to iterate and reach product-market fit.'
    },
    faqs: [
      {
        question: 'What is ramen profitable for a startup founder?',
        answer: 'Ramen profitability means your startup revenue covers just enough of the founder’s bare-minimum living expenses (food, rent) so you no longer rely on external capital to survive.'
      },
      {
        question: 'Should founders take a salary while bootstrapping?',
        answer: 'If you have sufficient savings, deferring founder salary preserves company cash. However, taking a modest subsistence salary prevents personal financial panic and burnout.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-startups', 'runway-calculator-for-bootstrapped', 'runway-calculator-for-freelancers']
  },

  'runway-calculator-for-ecommerce': {
    slug: 'runway-calculator-for-ecommerce',
    id: 'ecommerce',
    name: 'E-commerce & DTC Brands',
    title: 'E-commerce Runway Calculator – Inventory Cash Flow & Ad Burn Rate',
    metaDescription: 'Free e-commerce runway calculator. Model inventory lead times, ROAS fluctuations, supplier deposits, and working capital cash runway.',
    h1: 'E-commerce Runway Calculator',
    badge: 'DTC & Retail',
    intro: 'E-commerce cash flow is dominated by the working capital cash conversion cycle. You pay manufacturers months before products arrive at your fulfillment warehouse. Calculate your runway to avoid getting caught between supplier deposits and slow sales.',
    recommendedRunwayMonths: '4–8 months',
    targetBenchmarkText: 'DTC brands and e-commerce retailers should target 4 to 8 months of operating runway, factoring in planned seasonal inventory purchase orders. Cash reserves must withstand supplier MOQ deposits and potential supply chain transit delays.',
    defaultInputs: {
      cashBalance: 140_000,
      monthlyRevenue: 45_000,
      monthlyExpenses: 58_000,
      revenueGrowthRate: 5,
      expenseGrowthRate: 2,
      oneTimeExpense: 25_000,
      oneTimeExpenseMonth: 3
    },
    keyBurnDrivers: [
      {
        title: 'Upfront Inventory Production Orders',
        description: '30% deposit upon PO placement and 70% balance prior to ocean freight dispatch.'
      },
      {
        title: 'Paid Media Advertising (Meta, Google, TikTok)',
        description: 'Customer acquisition ad spend that fluctuates with CPM seasonality and iOS attribution shifts.'
      },
      {
        title: 'Warehousing, 3PL & Fulfillment Fees',
        description: 'Pick-and-pack rates, dimensional weight carrier surcharges, and long-term storage fees.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Negotiate Supplier Terms After 3 Good Orders',
        description: 'Request 30-day post-delivery terms with trusted manufacturing partners to shorten the cash conversion cycle.'
      },
      {
        title: 'Liquidate Stagnant Slow-Moving SKUs',
        description: 'Run flash sales or bundle dead inventory to immediately liberate cash trapped on warehouse shelves.'
      },
      {
        title: 'Leverage Revenue-Based Working Capital',
        description: 'Fund seasonal inventory surges with specialized non-dilutive e-commerce inventory lines rather than draining operating reserves.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Direct-to-Consumer Apparel Brand',
      cash: 140_000,
      revenue: 45_000,
      expenses: 58_000,
      explanation: 'With $140,000 cash, $45,000 revenue, and $58,000 operating expenses, net monthly burn is $13,000. Without upcoming POs, runway is 10.8 months. However, an upcoming $25,000 inventory production deposit in month 3 reduces practical runway to 8.8 months.'
    },
    faqs: [
      {
        question: 'Why does a profitable e-commerce brand run out of cash?',
        answer: 'Rapidly growing brands experience the cash conversion trap: revenue is booked on paper, but cash is drained upfront to buy higher volumes of inventory for the next quarter.'
      },
      {
        question: 'How do return rates affect e-commerce runway?',
        answer: 'High return rates (especially in apparel, often 20–30%) delay net cash collection and incur reverse logistics fees, silently inflating your net monthly burn.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-small-business', 'runway-calculator-for-saas', 'runway-calculator-for-bootstrapped']
  },

  'runway-calculator-for-consulting': {
    slug: 'runway-calculator-for-consulting',
    id: 'consulting',
    name: 'Consulting Practices',
    title: 'Consulting Runway Calculator – Partner Draw, Utilization & Cash Buffer',
    metaDescription: 'Free runway calculator for consulting firms and advisory practices. Track partner draws, billable utilization, client invoice payment lag, and cash reserves.',
    h1: 'Consulting Runway Calculator',
    badge: 'Professional Services',
    intro: 'Consulting firms generate healthy gross margins, but lengthy enterprise procurement and Net-60 or Net-90 invoice settlement can starve a firm of liquid cash. Calculate your firm’s operating runway to manage partner draws safely.',
    recommendedRunwayMonths: '4–6 months',
    targetBenchmarkText: 'Management and technology consulting practices typically maintain 4 to 6 months of fixed operating expenses and baseline staff payroll in reserve. This protects the firm when large enterprise client approvals stall during fiscal year transitions.',
    defaultInputs: {
      cashBalance: 110_000,
      monthlyRevenue: 38_000,
      monthlyExpenses: 46_000,
      revenueGrowthRate: 2,
      expenseGrowthRate: 1
    },
    keyBurnDrivers: [
      {
        title: 'Core Consultant Salaries & Subcontractors',
        description: 'Fixed monthly payroll for staff consultants and specialized subject-matter contractors.'
      },
      {
        title: 'Extended Enterprise Payment Cycles',
        description: 'Invoices held by client accounts payable departments for 60 to 90 days after delivery.'
      },
      {
        title: 'Business Development & RFP Proposal Costs',
        description: 'Unbilled senior partner hours dedicated to pitching enterprise proposals and client relationship management.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Structure Value-Based Retainers with Monthly Auto-Pay',
        description: 'Require corporate clients to authorize ACH or credit card auto-pay on the 1st of each month.'
      },
      {
        title: 'Tether Partner Bonus Draws to Actual Cash Collections',
        description: 'Distribute profit bonuses only when client funds have cleared into bank deposits, not on accrual billing.'
      },
      {
        title: 'Charge Mobilization Fees on Advisory Engagements',
        description: 'Collect a 20–25% mobilization fee upon contract signature to cover consultant allocation costs upfront.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Specialized Cloud Architecture Consultancy',
      cash: 110_000,
      revenue: 38_000,
      expenses: 46_000,
      explanation: 'With $110,000 cash, $38,000 in monthly client billing, and $46,000 in consultant payroll and overhead, net burn is $8,000/month. The firm has 13.8 months of runway ($110,000 ÷ $8,000), providing stability while negotiating new enterprise master service agreements (MSAs).'
    },
    faqs: [
      {
        question: 'How does client concentration risk impact consulting runway?',
        answer: 'If one client represents over 30% of your consulting revenue, calculate a worst-case scenario where that client leaves to see if your cash reserves survive.'
      },
      {
        question: 'Should partner distributions be counted as monthly expenses?',
        answer: 'Yes, any guaranteed base partner draw required for living expenses must be included in monthly expenses. Only discretionary year-end profit sharing should be excluded.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-agencies', 'runway-calculator-for-freelancers', 'runway-calculator-for-small-business']
  },

  'runway-calculator-for-bootstrapped': {
    slug: 'runway-calculator-for-bootstrapped',
    id: 'bootstrapped',
    name: 'Bootstrapped Businesses',
    title: 'Bootstrapped Runway Calculator – Self-Funded Cash Flow & Profit Path',
    metaDescription: 'Calculate runway for bootstrapped and self-funded companies. Model revenue reinvestment, lean operating burn, and the timeline to sustainable profitability.',
    h1: 'Bootstrapped Runway Calculator',
    badge: 'Self-Funded & Indie',
    intro: 'Bootstrapped businesses don’t have a venture capital safety net to bail them out. Every dollar spent comes from customer revenue or founder savings. Use this calculator to model your path to default-alive profitability.',
    recommendedRunwayMonths: '6–12 months',
    targetBenchmarkText: 'Self-funded companies should aim for 6 to 12 months of operating cash reserve. Bootstrappers prioritize being default-alive — growing organic revenue faster than expenses so runway naturally expands toward infinity.',
    defaultInputs: {
      cashBalance: 95_000,
      monthlyRevenue: 18_000,
      monthlyExpenses: 24_000,
      revenueGrowthRate: 6,
      expenseGrowthRate: 1
    },
    keyBurnDrivers: [
      {
        title: 'Lean Infrastructure & Third-Party SaaS',
        description: 'Hosting, domain renewals, payment processing fees (Stripe/PayPal), and customer support software.'
      },
      {
        title: 'Contract Engineering & Design Sprints',
        description: 'Targeted hourly freelance support for features outside the core founder’s primary skillset.'
      },
      {
        title: 'Tax Reserve & Compliance Overhead',
        description: 'Corporate annual franchise fees, local business taxes, and CPA preparation fees.'
      }
    ],
    extensionStrategies: [
      {
        title: 'Optimize Unit Economics Before Scaling',
        description: 'Refuse to spend on paid ads until organic churn is minimal and customer lifetime value (LTV) is proven.'
      },
      {
        title: 'Offer Lifetime or Multi-Year Founding Memberships',
        description: 'Inject quick non-dilutive capital by offering early power users an attractive discounted multi-year bundle.'
      },
      {
        title: 'Automate Customer Support Workflows',
        description: 'Build thorough self-serve documentation and AI triage workflows to keep headcount lean as customer volume scales.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Self-Funded Developer Productivity App',
      cash: 95_000,
      revenue: 18_000,
      expenses: 24_000,
      explanation: 'With $95,000 cash, $18,000 revenue, and $24,000 expenses, initial net burn is $6,000/month (static runway: 15.8 months). With steady 6% monthly revenue growth against only 1% expense growth, the company becomes fully break-even in month 6 with over $65,000 in cash still in the bank, achieving permanent sustainability.'
    },
    faqs: [
      {
        question: 'What does "Default Alive" mean for a bootstrapped company?',
        answer: 'Coined by Paul Graham, a company is Default Alive if its existing cash reserves are sufficient to reach profitability based on its current revenue growth and expense trajectory.'
      },
      {
        question: 'Should a bootstrapped business reinvest 100% of profit into growth?',
        answer: 'No. Maintain at least 3 to 6 months of operating expenses in reserve before reinvesting excess profits into aggressive hiring or marketing experiments.'
      }
    ],
    relatedNicheSlugs: ['runway-calculator-for-saas', 'runway-calculator-for-founders', 'runway-calculator-for-startups']
  }
};

export const ALL_NICHES = Object.values(NICHES);

export function getNicheBySlug(slug: string): NicheData | undefined {
  return NICHES[slug];
}
