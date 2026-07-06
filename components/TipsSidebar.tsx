'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  ShieldCheck, 
  Smartphone, 
  HardDrive, 
  Laptop,
  Cpu,
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function TipsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-10 h-16 bg-red-600 hover:bg-slate-950 text-white rounded-r-2xl shadow-2xl transition-colors border-y border-r border-red-500/20",
          isOpen ? "translate-x-0" : "-translate-x-0"
        )}
        whileHover={{ width: 44 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </motion.button>

      {/* Sidebar Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="ml-2 w-[320px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-slate-800 p-8 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-[#e60000] p-3 rounded-full text-white shadow-md shadow-red-600/20 flex-shrink-0">
                  <Lightbulb className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1e293b] dark:text-white tracking-wide mb-1" style={{ fontFamily: 'Georgia, serif' }}>TIPS & TRIK</h3>
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.15em]">TEKNOVARTA HACKS</span>
                </div>
              </div>

              <div className="space-y-6">
                <Link 
                  href="/tips?category=perawatan-hp" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-5 px-2 hover:opacity-70 transition-opacity group"
                >
                  <Smartphone className="h-5 w-5 text-[#4f46e5]" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-[#334155] dark:text-slate-300 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>PERAWATAN HP</span>
                </Link>
                <Link 
                  href="/tips?category=laptop" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-5 px-2 hover:opacity-70 transition-opacity group"
                >
                  <Laptop className="h-5 w-5 text-[#2563eb]" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-[#334155] dark:text-slate-300 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>LAPTOP HACKS</span>
                </Link>
                <Link 
                  href="/tips?category=pc" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-5 px-2 hover:opacity-70 transition-opacity group"
                >
                  <Cpu className="h-5 w-5 text-[#059669]" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-[#334155] dark:text-slate-300 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>PC BUILDING</span>
                </Link>
                <Link 
                  href="/tips?category=mengamankan" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-5 px-2 hover:opacity-70 transition-opacity group"
                >
                  <ShieldCheck className="h-5 w-5 text-[#dc2626]" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-[#334155] dark:text-slate-300 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>MENGAMANKAN</span>
                </Link>
              </div>

              <Link 
                href="/tips" 
                onClick={() => setIsOpen(false)}
                className="mt-10 flex items-center justify-between px-6 py-4 bg-[#050b14] rounded-full text-white group hover:bg-[#0f172a] transition-colors shadow-lg shadow-black/10"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">LIHAT SEMUA TIPS</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
