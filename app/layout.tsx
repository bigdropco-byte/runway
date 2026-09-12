import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getBaseMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Script from "next/script";
import CookieBanner from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  ...getBaseMetadata(),
  metadataBase: new URL("https://runwaycalculator.dev"),
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Security & Protocol Enforcement */}
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <script
          id="https-redirect"
          dangerouslySetInnerHTML={{
            __html: `if(typeof window!=='undefined'&&window.location.protocol==='http:'&&window.location.hostname!=='localhost'&&window.location.hostname!=='127.0.0.1'){window.location.replace('https://'+window.location.host+window.location.pathname+window.location.search+window.location.hash);}`,
          }}
        />

        {/* Resource Hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicons & App Icons (Google Search, Safari, Mobile & PWA optimized) */}
        <link rel="icon" href="/favicon.ico" sizes="48x48 32x32 16x16" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Google Analytics 4 (GA4) loaded with lazyOnload to avoid render blocking & unused JS */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-HT87NWEHNT"
        />
        <Script
          id="google-analytics-ga4"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HT87NWEHNT', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
