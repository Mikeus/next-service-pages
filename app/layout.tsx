import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getSiteUrl, siteConfig } from '@/lib/config';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.businessName,
    template: siteConfig.seo.titleTemplate,
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>{children}</body>
    </html>
  );
}
