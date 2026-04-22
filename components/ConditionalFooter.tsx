'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on AI Chat page
  const hideFooterRoutes = ['/ai-chat'];
  
  if (hideFooterRoutes.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
