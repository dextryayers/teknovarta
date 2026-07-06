import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard Master',
    template: '%s | Dashboard Master'
  },
  description: 'TeknoVarta Master Command Center.',
};

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return <DashboardClient>{children}</DashboardClient>;
}
