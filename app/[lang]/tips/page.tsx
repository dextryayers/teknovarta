'use client';

import { TIPS_DATA } from '@/lib/tips-data';
import { 
  ShieldCheck, 
  Smartphone, 
  HardDrive, 
  Cpu, 
  ChevronRight, 
  ArrowRight,
  ArrowUpRight,
  Zap,
  Hammer,
  Lock,
  Wrench,
  Laptop
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

function TipsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const categories = [
    { id: 'all', name: 'SEMUA TIPS', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { id: 'perawatan-hp', name: 'PERAWATAN HP', icon: Smartphone, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'laptop', name: 'LAPTOP', icon: Laptop, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'pc', name: 'PC BUILD', icon: Cpu, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'mengamankan', name: 'MENGAMANKAN', icon: Lock, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  const filteredTips = activeTab === 'all' 
    ? TIPS_DATA 
    : TIPS_DATA.filter(tip => tip.categorySlug === activeTab);

  return (
    <div className="container mx-auto px-4 lg:px-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-16 border-b border-slate-200 dark:border-slate-800 pb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "px-6 py-4 rounded-2xl flex items-center gap-3 transition-all active:scale-95",
              activeTab === cat.id 
                ? "bg-slate-950 dark:bg-red-600 text-white shadow-xl shadow-red-600/20" 
                : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 border border-slate-100 dark:border-slate-800"
            )}
          >
            <cat.icon className={cn("h-4 w-4", activeTab === cat.id ? "text-white" : cat.color)} />
            <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTips.map((tip) => (
            <motion.div
              key={tip.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all"
            >
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                    <tip.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-[7px] font-black uppercase tracking-[0.2em] py-1 border-slate-200">{tip.difficulty}</Badge>
                </div>

                <div className="space-y-4 mb-10">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">{tip.category}</span>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-[1.1] group-hover:text-red-600 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-black uppercase">TP</div>
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-black uppercase">HB</div>
                  </div>
                  <Link href={`/tips/${tip.categorySlug}/${tip.slug}`} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-950 dark:text-white group-hover:text-red-600">
                    BACA PANDUAN <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTips.length === 0 && (
        <div className="py-32 text-center">
           <Wrench className="h-20 w-20 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
           <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Dalam Pengembangan.</h3>
           <p className="text-slate-500 font-bold mt-2">Segera hadir tips & hacks menarik lainnya.</p>
        </div>
      )}
    </div>
  );
}

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pt-32 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">
          <Link href="/" className="hover:text-red-600 uppercase">HOME</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-900 dark:text-slate-200">TEKNOVARTA HACKS DATABASE</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-[0.85] mb-8">
            Database <br/> <span className="text-red-600">Teknisi Digital.</span>
          </h1>
          <p className="text-lg font-bold text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Kumpulan panduan teknis mendalam untuk perawatan gadget, rakit PC, hingga keamanan siber. Ditulis secara rinci dan presisi sesuai standar TeknoVarta.
          </p>
        </div>

        <Suspense fallback={
          <div className="py-32 text-center">
            <Zap className="h-12 w-12 text-red-600 animate-pulse mx-auto mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Tips Database...</p>
          </div>
        }>
          <TipsContent />
        </Suspense>

        {/* CTA Section */}
        <div className="mt-32 p-12 md:p-20 bg-slate-950 rounded-[4rem] text-white relative overflow-hidden text-center">
           <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full"></div>
           <Wrench className="h-16 w-16 text-red-600 mx-auto mb-8 animate-pulse" />
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
             Bunya Tips <br/> Sendiri?
           </h2>
           <p className="text-slate-400 font-bold mb-12 max-w-xl mx-auto uppercase text-xs tracking-widest">
             Jika Anda ahli teknisi atau pakar cyber security, kirimkan tips Anda ke redaksi kami untuk dipublikasikan.
           </p>
           <Link href="/tentang">
              <button className="px-12 py-5 bg-red-600 hover:bg-white hover:text-slate-950 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-red-600/20 active:scale-95">
                HUBUNGI REDAKSI
              </button>
           </Link>
        </div>
      </div>
    </div>
  );
}
