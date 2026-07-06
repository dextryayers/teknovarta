import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Master Access Portal for TeknoVarta Admin.',
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
