import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { getSiteUrl, siteConfig } from '@/lib/config';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const businessName = siteConfig.businessName;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: businessName,
    template: '%s | ' + businessName,
  },
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    title: siteConfig.businessName,
    description: siteConfig.seo.defaultDescription,
    images: [{ url: siteConfig.seo.ogImage }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>{children}</body>
    </html>
  );
}
