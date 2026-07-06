'use client';

import { usePathname, useParams } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const params = useParams();
  const lang = (params?.lang as string) || 'id';
  
  // Strip the lang prefix to match the routes universally
  const strippedPathname = pathname.replace(new RegExp(`^/${lang}`), '') || '/';
  
  // Hide footer on specific routes
  const hideFooterRoutes = ['/ai-chat', '/login/admin'];
  
  if (hideFooterRoutes.includes(strippedPathname) || strippedPathname.startsWith('/spesifikasi-hp') || strippedPathname.startsWith('/admin') || strippedPathname.startsWith('/kurs-dunia')) {
    return null;
  }

  return <Footer />;
}
