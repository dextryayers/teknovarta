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
  BarChart3,
  Image as ImageIcon,
  User,
  ExternalLink,
  Search,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DashboardClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/welcome', icon: LayoutDashboard },
    { name: 'Articles', href: '/welcome/articles', icon: FileText },
    { name: 'Categories & Tags', href: '/welcome/categories-tags', icon: Tags },
    { name: 'Media Library', href: '/welcome/media', icon: ImageIcon },
    { name: 'Analytics', href: '/welcome/analytics', icon: BarChart3 },
    { name: 'Security', href: '/welcome/security', icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      {/* Subtle Progress Bar for UX */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-red-600/20 z-[9999]">
         <div className="h-full bg-red-600 w-1/3 animate-progress shadow-[0_0_10px_#dc2626]"></div>
      </div>
      
      {/* Sidebar - Modern Dark Style */}
      <aside className="w-72 bg-slate-950 border-r border-white/5 flex flex-col shrink-0 z-50">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center font-black text-white text-xs">TV</div>
             <span className="text-white font-black uppercase tracking-widest text-sm">TeknoVarta Master</span>
          </div>
        </div>
        
        <div className="flex-1 py-8 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Main Menu</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group",
                      isActive 
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">System</p>
            <nav className="space-y-1">
              <Link href="/welcome/settings" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                <Settings className="h-5 w-5 shrink-0" /> Settings
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl">
             <div className="h-10 w-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-red-500" />
             </div>
             <div className="overflow-hidden">
                <p className="text-xs font-black text-white truncate">Master Admin</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase truncate">Super User</p>
             </div>
          </div>
          <button 
            onClick={() => {
              document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              window.location.href = '/login/admin';
            }}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-xs font-black bg-white/5 text-slate-400 hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Glassmorphism */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-10 flex items-center justify-between shrink-0 z-40">
           <div className="flex items-center gap-6 flex-1">
              <div className="relative w-full max-w-md group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Quick search commands..." 
                   className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-11 pl-11 pr-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-600/10 outline-none transition-all"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button variant="ghost" className="rounded-xl font-bold text-xs uppercase tracking-widest gap-2">
                  <ExternalLink className="h-4 w-4" /> Live Site
                </Button>
              </Link>
              <Link href="/welcome/articles/editor">
                <Button className="bg-red-600 hover:bg-red-700 rounded-xl px-6 font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/20">
                  <Plus className="h-4 w-4 mr-2" /> New Post
                </Button>
              </Link>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fa] dark:bg-slate-950 p-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
