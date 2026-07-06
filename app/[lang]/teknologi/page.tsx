import { Metadata } from 'next';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import Link from 'next/link';
import { ChevronRight, Cpu, Smartphone, Globe, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pusat Berita Teknologi Indonesia',
  description: 'Update perkembangan teknologi dunia dan Indonesia. Gadget, AI, Cyber Security, dan Startup.',
};

export default function TeknologiIndex() {
  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 border-b-4 border-slate-900 dark:border-slate-800 pb-8">
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">
             TEKNOLOGI <span className="text-red-600">HUB</span>
           </h1>
           <p className="text-slate-500 font-bold uppercase tracking-widest mt-2">Exploration of the Digital Frontier</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {CATEGORIES.map(cat => (
             <Link key={cat.id} href={`/teknologi/${cat.id}`} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:border-red-600 transition-all shadow-sm">
                <div className="h-14 w-14 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                   {cat.id === 'hp' ? <Smartphone /> : cat.id === 'cyber' ? <ShieldCheck /> : <Cpu />}
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-3">{cat.name}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">{cat.description}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest">
                   Buka Kategori <ChevronRight className="h-3 w-3" />
                </div>
             </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
