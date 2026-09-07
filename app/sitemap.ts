import { MetadataRoute } from 'next';
import { ALL_NICHES } from '@/lib/niches';
import { SITE_URL } from '@/lib/seo';
import { SUPPORTED_LOCALES } from '@/i18n/config';

export const dynamic = 'force-static';

const SUBPATHS: { path: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/tools', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/aviation', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' },
  // Financial Calculators
  { path: '/tools/startup-runway-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/cash-runway-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/burn-rate-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/runway-calculator-excel', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/hiring-runway-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/default-alive-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/safe-dilution-runway-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools/runway-extension-calculator', priority: 0.9, changeFrequency: 'weekly' },
  // Aviation Calculators
  { path: '/aviation/crosswind-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/runway-in-use-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/runway-wind-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/runway-slope-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/runway-number-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/runway-length-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/runway-visual-range-calculator', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/aviation/contaminated-runway-calculator', priority: 0.9, changeFrequency: 'weekly' }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    const code = locale.code;

    // Add standard subpaths
    for (const sub of SUBPATHS) {
      entries.push({
        url: `${SITE_URL}/${code}${sub.path}/`,
        lastModified: currentDate,
        changeFrequency: sub.changeFrequency,
        priority: code === 'en' ? sub.priority : Number((sub.priority * 0.95).toFixed(2))
      });
    }

    // Add 10 programmatic niche calculators
    for (const niche of ALL_NICHES) {
      entries.push({
        url: `${SITE_URL}/${code}/tools/${niche.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: code === 'en' ? 0.75 : 0.7
      });
    }
  }

  return entries;
}
