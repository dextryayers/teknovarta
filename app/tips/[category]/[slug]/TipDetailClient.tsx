'use client';

import { TIPS_DATA } from '@/lib/tips-data';
import { 
  ChevronRight, 
  ChevronLeft, 
  Hammer, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Cpu, 
  HardDrive,
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TipDetailClient({ slug, category }: { slug: string, category: string }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tip = TIPS_DATA.find(t => t.slug === slug && t.categorySlug === category);

  if (!tip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Panduan Tidak Ditemukan</h1>
          <p className="text-slate-500 mb-8 font-bold">Maaf, konten tips yang Anda cari tidak tersedia atau telah dipindahkan.</p>
          <Button onClick={() => router.push('/tips')} className="w-full bg-red-600 hover:bg-slate-950 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-600/20">
            KEMBALI KE INDEKS TIPS
          </Button>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pt-32 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">
          <Link href="/tips" className="hover:text-red-600">ALL TIPS</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <Link href={`/tips?category=${tip.categorySlug}`} className="hover:text-red-600 uppercase">{tip.category}</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-900 dark:text-slate-200">{tip.title.toUpperCase()}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4rem] p-8 md:p-16 shadow-sm overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-blue-600 to-emerald-600"></div>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Badge className="bg-red-600 rounded-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5">{tip.category}</Badge>
                <Badge variant="outline" className="rounded-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 border-slate-200 uppercase">DIFFICULTY: {tip.difficulty}</Badge>
              </div>

              <h1 className="text-4xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
                {tip.title}
              </h1>

              <p className="text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-12 border-l-4 border-slate-200 dark:border-slate-800 pl-8 italic">
                "{tip.description}"
              </p>

              {tip.toolsNeeded && (
                <div className="mb-16 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <Hammer className="h-4 w-4" /> Persiapan Peralatan (Toolkit)
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {tip.toolsNeeded.map((tool, i) => (
                      <span key={i} className="px-5 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-16">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100 dark:border-slate-800 pb-4">Instruksi Langkah Demi Langkah</h2>
                {tip.steps.map((step, idx) => (
                   <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-8 group"
                   >
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950 dark:bg-red-600 text-white flex items-center justify-center text-sm font-black shadow-2xl shadow-red-600/20 group-hover:scale-110 transition-transform">
                          {idx + 1}
                        </div>
                        {idx < tip.steps.length - 1 && (
                          <div className="w-1 flex-1 bg-slate-100 dark:bg-slate-800 my-4 rounded-full"></div>
                        )}
                     </div>
                     <div className="flex-1 pb-4">
                        <h3 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mb-3 group-hover:text-red-600 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-base font-semibold text-slate-600 dark:text-slate-400 leading-loose antialiased">
                          {step.description}
                        </p>
                     </div>
                   </motion.div>
                ))}
              </div>

              {tip.warning && (
                <div className="mt-20 p-10 bg-red-600 rounded-[2.5rem] text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>
                   <div className="flex items-center gap-4 mb-6">
                      <AlertTriangle className="h-8 w-8" />
                      <h4 className="text-sm font-black uppercase tracking-[0.2em]">Peringatan Keamanan Teknisi</h4>
                   </div>
                   <p className="text-base font-bold text-red-50 leading-loose antialiased italic">
                     {tip.warning}
                   </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar Recommendation Area */}
          <div className="lg:col-span-4 space-y-12">
             <div className="sticky top-32 space-y-12">
                <div className="bg-slate-950 p-8 rounded-[3rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full"></div>
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 border-l-4 border-blue-600 pl-6">Hacks Terkait Lainnya</h3>
                   <div className="space-y-8">
                     {TIPS_DATA.filter(t => t.categorySlug === tip.categorySlug && t.id !== tip.id).slice(0, 4).map((t) => (
                       <Link key={t.id} href={`/tips/${t.categorySlug}/${t.slug}`} className="flex items-center gap-6 group/item">
                          <div className="h-14 w-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-3 overflow-hidden shrink-0 group-hover/item:border-blue-500/50 transition-colors">
                            <t.icon className="h-6 w-6 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-[11px] font-black uppercase leading-tight hover:text-blue-400 transition-colors">{t.title}</h4>
                            <span className="text-[8px] font-bold text-slate-500 uppercase mt-2 block">{t.difficulty}</span>
                          </div>
                       </Link>
                     ))}
                   </div>
                   <Link href="/tips" className="mt-12 flex items-center justify-center gap-2 p-5 bg-white/5 hover:bg-slate-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group/btn">
                      LIHAT DATABASE TIPS <ArrowLeft className="h-4 w-4 mr-2" />
                   </Link>
                </div>

                <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-[3rem] bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center gap-4 aspect-square shadow-sm">
                   <Lightbulb className="h-10 w-10 text-yellow-400 mb-2" />
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-2">QUICK TIP</div>
                   <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">
                     "Selalu gunakan Toolkit yang pas agar baut tidak slek (dol) saat membongkar perangkat elektronik presisi."
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
