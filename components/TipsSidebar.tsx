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
            className="ml-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-800 p-6 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-600 p-2 rounded-xl text-white">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Tips & Trik</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TEKNOVARTA HACKS</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link 
                  href="/tips?category=perawatan-hp" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group"
                >
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-red-600 uppercase">Perawatan HP</span>
                </Link>
                <Link 
                  href="/tips?category=laptop" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group"
                >
                  <Laptop className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-red-600 uppercase">Laptop Hacks</span>
                </Link>
                <Link 
                  href="/tips?category=pc" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group"
                >
                  <Cpu className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-red-600 uppercase">PC Building</span>
                </Link>
                <Link 
                  href="/tips?category=mengamankan" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group"
                >
                  <ShieldCheck className="h-5 w-5 text-red-600" />
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-red-600 uppercase">Mengamankan</span>
                </Link>
              </div>

              <Link 
                href="/tips" 
                onClick={() => setIsOpen(false)}
                className="mt-8 flex items-center justify-between p-4 bg-slate-950 dark:bg-slate-800 rounded-2xl text-white group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Lihat Semua Tips</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
