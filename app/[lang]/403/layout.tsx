import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Akses Ditolak',
  description: 'Firewall TeknoVarta - Akses Dilarang.',
};

export default function ForbiddenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
