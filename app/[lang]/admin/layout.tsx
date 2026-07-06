'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  Settings, 
  LogOut,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Artikel Berita', href: '/admin/articles', icon: FileText },
    { name: 'Kategori & Tags', href: '/admin/categories-tags', icon: Tags },
    { name: 'Traffic Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Security Logs', href: '/admin/security', icon: ShieldAlert },
    { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-white font-black uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            TV ADMIN
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                  isActive 
                    ? "bg-red-600 text-white" 
                    : "hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              window.location.href = '/login/admin';
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Logout Master
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8">
        {children}
      </main>
    </div>
  );
}
