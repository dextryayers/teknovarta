import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taxonomy Engine',
};

export default function TaxonomyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
