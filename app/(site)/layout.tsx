import type { ReactNode } from 'react';

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return children;
}
