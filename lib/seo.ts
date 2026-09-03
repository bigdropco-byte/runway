/**
 * Technical SEO, Metadata, and Schema.org JSON-LD Generators
 */

import { Metadata } from 'next';
import { NicheData } from './niches';

export const SITE_URL = 'https://runwaycalculator.dev';
export const SITE_NAME = 'Runway Calculator';

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Runway Calculator – Calculate Your Cash Runway',
      template: '%s | Runway Calculator'
    },
    description: 'Calculate your business runway in minutes. Estimate monthly burn, cash runway, break-even point, and when your cash could run out with our free runway calculator.',
    keywords: [
      'runway calculator',
      'startup runway calculator',
      'cash runway calculator',
      'business runway calculator',
      'startup burn rate calculator',
      'cash burn calculator',
      'company runway calculator',
      'financial runway calculator',
      'how to calculate runway',
      'how many months of runway do I have',
      'startup cash runway'
    ],
    authors: [{ name: 'Runway Calculator Team' }],
    creator: 'Runway Calculator',
    publisher: 'Runway Calculator',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: 'Runway Calculator – Calculate Your Cash Runway',
      description: 'Accurate financial runway calculator. Track gross vs net burn, cash trajectory projections, and scenario planning. 100% private in-browser tool.',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Runway Calculator – Visual Cash Flow and Burn Rate Forecasting'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Runway Calculator – Calculate Your Cash Runway',
      description: 'Accurately calculate how many months of cash runway your startup or business has left. Free, instant, and private.',
      images: [`${SITE_URL}/og-image.png`]
    },
    alternates: {
      canonical: SITE_URL
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
    }
  };
}

export function getNicheMetadata(niche: NicheData): Metadata {
  const url = `${SITE_URL}/tools/${niche.slug}`;
  return {
    title: niche.title,
    description: niche.metaDescription,
    keywords: [
      `${niche.name.toLowerCase()} runway calculator`,
      `runway calculator for ${niche.name.toLowerCase()}`,
      `calculate runway ${niche.name.toLowerCase()}`,
      `cash burn ${niche.name.toLowerCase()}`,
      'runway calculator',
      'burn rate'
    ],
    openGraph: {
      type: 'article',
      url,
      title: niche.title,
      description: niche.metaDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${niche.title} – Runway Calculator`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: niche.title,
      description: niche.metaDescription,
      images: [`${SITE_URL}/og-image.png`]
    },
    alternates: {
      canonical: url
    }
  };
}

/**
 * Generate Schema.org WebApplication / SoftwareApplication JSON-LD
 */
export function getWebApplicationSchema(customUrl: string = SITE_URL, customName: string = SITE_NAME) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: customName,
    url: customUrl,
    description: 'Calculate cash runway, gross burn, net burn, and cash depletion dates with interactive scenario modeling and real-time projections.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2.0.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Runway Calculator',
      url: SITE_URL
    }
  };
}

/**
 * Generate Schema.org BreadcrumbList JSON-LD
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate Schema.org FAQPage JSON-LD
 */
export function getFaqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Schema.org ImageObject JSON-LD
 */
export function getImageObjectSchema(image: {
  url: string;
  name: string;
  description: string;
  width?: number;
  height?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: image.url,
    url: image.url,
    name: image.name,
    description: image.description,
    width: image.width || 1024,
    height: image.height || 682
  };
}

