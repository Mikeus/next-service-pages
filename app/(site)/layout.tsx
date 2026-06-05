import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Local service business website powered by Next Service Pages.',
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
