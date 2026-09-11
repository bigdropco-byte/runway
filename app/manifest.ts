import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Runway Calculator',
    short_name: 'RunwayCalc',
    description: 'Calculate cash runway, gross burn, net burn, and financial projections.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48 32x32 16x16',
        type: 'image/x-icon'
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      },
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
