import { MetadataRoute } from 'next';
import { ALL_NICHES } from '@/lib/niches';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [
    // Core Homepage
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    // Directories
    {
      url: `${SITE_URL}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/aviation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },

    // Dedicated High-Volume Financial Calculators
    {
      url: `${SITE_URL}/tools/startup-runway-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tools/cash-runway-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tools/burn-rate-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tools/runway-calculator-excel`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tools/runway-extension-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/tools/hiring-runway-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tools/default-alive-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tools/safe-dilution-runway-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },

    // Dedicated Aviation Runway Calculators
    {
      url: `${SITE_URL}/aviation/crosswind-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/aviation/runway-slope-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/aviation/runway-number-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/aviation/runway-length-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/aviation/runway-visual-range-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/aviation/contaminated-runway-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  // Programmatic 10 Niche Pages
  for (const niche of ALL_NICHES) {
    routes.push({
      url: `${SITE_URL}/tools/${niche.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    });
  }

  return routes;
}
