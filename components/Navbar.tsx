'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/articles';
import { Menu, Search, X, Zap, Clock, Facebook, Twitter, Instagram, ArrowRight, ChevronRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import SearchOverlay from './SearchOverlay';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial date
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('id-ID', options).toUpperCase());
    };
    
    updateDate();
    
    // Check for date change every hour to ensure it follows the next day
    const dateInterval = setInterval(updateDate, 3600000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(dateInterval);
    };
  }, []);

  return (
    <header className="fixed top-0 z-[100] w-full">
      {/* Top Utility Bar - More minimal and refined */}
      <div className={cn(
        "bg-slate-950 text-white transition-all duration-500 overflow-hidden border-b border-white/5",
        scrolled ? "h-0 opacity-0" : "h-9 md:h-10 opacity-100"
      )}>
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[#0a66c2]">
                <Clock className="h-3 w-3" />
                <span className="italic">{currentDate || 'MEMUAT...'}</span>
             </div>
             <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-4 opacity-50">
                <Link href="/tentang" className="hover:text-white transition-colors">TENTANG</Link>
                <Link href="/tentang" className="hover:text-white transition-colors">REDAKSI</Link>
                <Link href="/tentang" className="hover:text-white transition-colors">IKLAN</Link>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-red-600/10 rounded-full border border-red-600/20 text-red-500">
                <span className="w-1 h-1 rounded-full bg-red-600 animate-ping"></span>
                <span className="text-[8px] italic">LIVE UPDATES</span>
             </div>
             <div className="flex items-center gap-3">
                <Link href="/tentang" className="hover:text-[#0a66c2] transition-colors"><Facebook className="h-3 w-3" /></Link>
                <Link href="/tentang" className="hover:text-[#0a66c2] transition-colors"><Twitter className="h-3 w-3" /></Link>
                <Link href="/tentang" className="hover:text-[#0a66c2] transition-colors"><Instagram className="h-3 w-3" /></Link>
             </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Refined heights and spacing */}
      <nav className={cn(
        "transition-all duration-500 border-b",
        scrolled 
          ? "h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-white/10 dark:border-slate-800/50 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-none" 
          : "h-20 md:h-24 bg-white dark:bg-slate-950 border-transparent shadow-sm"
      )}>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Left: Mobile Toggle & Desktop Nav Starts */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Center/Left: Logo */}
          <div className={cn(
            "flex items-center gap-8 transition-all duration-500",
            scrolled ? "translate-x-0" : "lg:translate-x-0"
          )}>
            <Link href="/" className="flex flex-col items-center group relative z-[101]">
              <div className="flex items-baseline">
                <span className={cn(
                  "font-display font-black tracking-tighter text-[#0a66c2] transition-all duration-500",
                  scrolled ? "text-xl md:text-2xl" : "text-3xl md:text-5xl"
                )}>
                  TEKNOVARTA
                </span>
                <span className="text-red-600 font-black text-3xl">.</span>
              </div>
              <motion.span 
                animate={{ opacity: scrolled ? 0 : 0.6, y: scrolled ? -2 : 0, display: scrolled ? 'none' : 'block' }}
                className="text-[9px] font-black text-slate-400 tracking-[0.3em] uppercase -mt-1"
              >
                Berita Teknologi Ala Gen Z
              </motion.span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link 
                href="/" 
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                  pathname === '/' 
                    ? "text-[#0a66c2] bg-blue-50/50 dark:bg-blue-950/20" 
                    : "text-slate-500 hover:text-[#0a66c2] hover:bg-slate-50 dark:hover:bg-slate-900/50"
                )}
              >
                BERANDA
              </Link>
              <Link 
                href="/spesifikasi-hp" 
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                  pathname === '/spesifikasi-hp' 
                    ? "text-[#0a66c2] bg-blue-50/50 dark:bg-blue-950/20" 
                    : "text-slate-500 hover:text-[#0a66c2] hover:bg-slate-50 dark:hover:bg-slate-900/50"
                )}
              >
                SPEK HP
              </Link>
              {CATEGORIES.slice(0, 6).map((cat) => (
                 <Link 
                   key={cat.id} 
                   href={cat.path} 
                   className={cn(
                     "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                     pathname === cat.path 
                       ? "text-[#0a66c2] bg-blue-50/50 dark:bg-blue-950/20" 
                       : "text-slate-500 hover:text-[#0a66c2] hover:bg-slate-50 dark:hover:bg-slate-900/50"
                   )}
                 >
                   {cat.name}
                 </Link>
              ))}
              <Link 
                href="/watch/video" 
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                  pathname === '/watch/video' 
                    ? "text-red-600 bg-red-50/50 dark:bg-red-950/20" 
                    : "text-slate-500 hover:text-[#0a66c2] hover:bg-slate-50 dark:hover:bg-slate-900/50"
                )}
              >
                VIDEO
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
             <Link 
               href="/ai-chat" 
               className={cn(
                 "hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black transition-all border",
                 pathname === '/ai-chat'
                   ? "bg-[#0a66c2] border-[#0a66c2] text-white shadow-lg shadow-blue-500/20"
                   : "bg-slate-950 dark:bg-slate-900 border-slate-900 dark:border-slate-800 text-white hover:bg-[#0a66c2] hover:border-[#0a66c2]"
               )}
             >
               <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
               <span className="uppercase tracking-[0.1em]">TANYA AI</span>
             </Link>

             <div className="hidden md:block h-6 w-px bg-slate-200 dark:border-slate-800 mx-1"></div>

             <button 
               onClick={() => setShowSearch(true)}
               className="p-2 text-slate-500 hover:text-[#0a66c2] hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all"
               title="Search (Ctrl+K)"
             >
                <Search className="h-5 w-5" />
             </button>

             <ThemeToggle />

             <Link href="/tentang" className="hidden sm:block">
               <button className="px-5 py-2.5 bg-[#0a66c2] hover:bg-slate-950 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-95">
                 TENTANG
               </button>
             </Link>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - More fluid and structured */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 w-full h-[100dvh] bg-white dark:bg-slate-950 z-[110] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b dark:border-slate-800">
               <span className="text-xl font-black italic text-[#0a66c2] tracking-tighter">NAVIGASI.</span>
               <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl">
                 <X className="h-6 w-6" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-10">
               <div className="space-y-6">
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-3xl font-black italic uppercase tracking-tighter">BERANDA</span>
                    <ArrowRight className="h-6 w-6 text-slate-300 group-hover:text-[#0a66c2]" />
                  </Link>
                  
                  <Separator className="opacity-50" />

                  <Link 
                    href="/watch/video" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-3xl font-black italic uppercase tracking-tighter text-red-600">VIDEO</span>
                    <Play className="h-6 w-6 text-red-200 fill-red-200" />
                  </Link>

                  <Link 
                    href="/spesifikasi-hp" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-3xl font-black italic uppercase tracking-tighter text-[#0a66c2]">SPEK HP</span>
                    <ChevronRight className="h-6 w-6 text-slate-300" />
                  </Link>
                  
                  {CATEGORIES.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={cat.path} 
                      onClick={() => setIsOpen(false)}
                      className="flex justify-between items-center group"
                    >
                      <span className="text-3xl font-black italic uppercase tracking-tighter">{cat.name}</span>
                      <ChevronRight className="h-6 w-6 text-slate-300" />
                    </Link>
                  ))}

                  <Link 
                    href="/ai-chat" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center p-6 bg-slate-950 dark:bg-blue-600 rounded-[30px] text-white overflow-hidden relative group"
                  >
                    <div className="relative z-10">
                      <span className="text-2xl font-black italic tracking-tighter block uppercase">TANYA AI</span>
                      <span className="text-[10px] font-black text-blue-400 dark:text-white/60 tracking-widest block mt-1 uppercase">SMART ASSISTANT</span>
                    </div>
                    <Zap className="h-10 w-10 text-yellow-400 fill-yellow-400 relative z-10" />
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </Link>
               </div>
            </div>

            <div className="p-8 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
               <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                     <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PUBLIKASI</h4>
                     <Link href="/tentang" className="block text-[11px] font-black uppercase italic hover:text-[#0a66c2]">Redaksi</Link>
                     <Link href="/tentang" className="block text-[11px] font-black uppercase italic hover:text-[#0a66c2]">Kebijakan</Link>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">IKUTI KAMI</h4>
                     <div className="flex gap-4">
                        <Link href="/tentang" className="h-9 w-9 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm"><Facebook className="h-4 w-4" /></Link>
                        <Link href="/tentang" className="h-9 w-9 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm"><Twitter className="h-4 w-4" /></Link>
                        <Link href="/tentang" className="h-9 w-9 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm"><Instagram className="h-4 w-4" /></Link>
                     </div>
                  </div>
               </div>
               <div className="text-center">
                  <p className="text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">© 2026 TEKNOVARTA STUDIO</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </header>
  );
}
