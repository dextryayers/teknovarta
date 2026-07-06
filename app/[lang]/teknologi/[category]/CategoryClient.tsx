'use client';

import { useParams } from 'next/navigation';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, TrendingUp, User, Eye, Smartphone, Laptop, Cpu, ShieldCheck, Code2, Zap } from 'lucide-react';
import { formatNumber, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const getCategoryTheme = (id: string) => {
  switch (id) {
    case 'hp':
      return {
        icon: Smartphone,
        gradient: 'from-blue-600 to-indigo-600',
        bg: 'bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-600',
        badge: 'bg-blue-600 text-white hover:bg-blue-700'
      };
    case 'laptop':
      return {
        icon: Laptop,
        gradient: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-500',
        text: 'text-emerald-500',
        border: 'border-emerald-500',
        badge: 'bg-emerald-500 text-white hover:bg-emerald-600'
      };
    case 'pc':
      return {
        icon: Cpu,
        gradient: 'from-purple-600 to-fuchsia-600',
        bg: 'bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-600',
        badge: 'bg-purple-600 text-white hover:bg-purple-700'
      };
    case 'cyber':
      return {
        icon: ShieldCheck,
        gradient: 'from-red-600 to-rose-600',
        bg: 'bg-red-600',
        text: 'text-red-600',
        border: 'border-red-600',
        badge: 'bg-red-600 text-white hover:bg-red-700'
      };
    case 'webdev':
      return {
        icon: Code2,
        gradient: 'from-sky-500 to-blue-600',
        bg: 'bg-sky-500',
        text: 'text-sky-500',
        border: 'border-sky-500',
        badge: 'bg-sky-500 text-white hover:bg-sky-600'
      };
    default:
      return {
        icon: Zap,
        gradient: 'from-slate-700 to-slate-900',
        bg: 'bg-slate-800',
        text: 'text-slate-800',
        border: 'border-slate-800',
        badge: 'bg-slate-800 text-white hover:bg-slate-900'
      };
  }
};

export default function CategoryClient({ categoryId }: { categoryId: string }) {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // 6 for a nice 2-col grid
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const category = CATEGORIES.find(c => c.id === categoryId);
  if (!category) return notFound();

  const theme = getCategoryTheme(categoryId);
  const Icon = theme.icon;

  const categoryArticles = ARTICLES.filter(a => a.category === categoryId);
  const featuredInCat = categoryArticles[0];
  const otherArticles = categoryArticles.slice(1);
  const visibleArticles = otherArticles.slice(0, visibleCount);
  const trendingCat = [...categoryArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!mounted) return null;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-20 pt-24 md:pt-32">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8"
        >
          <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1.5"><Home className="h-3.5 w-3.5" /> BERANDA</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-500">TEKNOLOGI</span>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className={cn("text-slate-900 dark:text-slate-100", theme.text)}>{category.name}</span>
        </motion.nav>

        {/* Dynamic Category Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className={cn(
            "relative mb-16 rounded-[3rem] overflow-hidden p-10 md:p-16 text-white shadow-2xl",
            "bg-gradient-to-br", theme.gradient
          )}
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <Icon className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10 transform -rotate-12 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">KATEGORI</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/80 max-w-2xl leading-relaxed">
              {category.description || `Berita dan artikel terkini seputar ${category.name}. Dapatkan ulasan mendalam, panduan, dan informasi terbaru.`}
            </p>
          </div>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Stream */}
          <main className="lg:col-span-8">
            
            {/* Spotlight Headline (Hero Article) */}
            {featuredInCat && (
               <motion.section 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="mb-12 group cursor-pointer border-b border-slate-200 dark:border-slate-800 pb-12"
               >
                 <Link href={`/artikel/${featuredInCat.slug}`} className="block">
                   <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 mb-8 shadow-xl">
                      <Image 
                        src={featuredInCat.image}
                        alt={featuredInCat.title} 
                        fill 
                        priority
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8 w-full">
                         <Badge className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-none mb-4", theme.badge)}>
                           BERITA UTAMA
                         </Badge>
                         <h2 className="text-3xl md:text-5xl font-black text-white leading-tight group-hover:text-slate-200 transition-colors max-w-3xl">
                           {featuredInCat.title}
                         </h2>
                      </div>
                   </div>
                   
                   <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 font-medium leading-relaxed">
                     {featuredInCat.excerpt}
                   </p>
                   <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300"><User className="h-4 w-4" /> {featuredInCat.author}</span>
                      <span>•</span>
                      <span>{featuredInCat.date}</span>
                   </div>
                 </Link>
               </motion.section>
            )}

            {/* List Indeks Berita - Grid 2 Kolom di Desktop */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-4 mb-8">
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase flex items-center gap-3">
                    <span className={cn("w-3 h-8 block rounded-full", theme.bg)}></span>
                    Indeks Berita
                 </h3>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">{categoryArticles.length} Berita</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {visibleArticles.map((article, idx) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ArticleCard article={article} layout="vertical" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {visibleCount < otherArticles.length && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLoadMore}
                className={cn(
                  "w-full mt-12 py-5 bg-white dark:bg-slate-900 border-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm",
                  "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300",
                  `hover:${theme.border} hover:${theme.text}`
                )}
              >
                 Muat Lebih Banyak Berita
              </motion.button>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
               
               {/* Trending in Category - Glassmorphism style */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/20 dark:shadow-none"
               >
                  <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-6">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg text-white", theme.bg)}>
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        Terpopuler
                     </h3>
                  </div>
                  <div className="space-y-4">
                     {trendingCat.map((article, idx) => (
                        <Link key={article.id} href={`/artikel/${article.slug}`} className="flex gap-5 group items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                           <div className={cn("shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-white transition-colors", `group-hover:${theme.bg}`)}>
                              {idx + 1}
                           </div>
                           <div className="flex flex-col min-w-0 pt-1">
                              <h4 className={cn("font-bold text-sm text-slate-800 dark:text-slate-200 leading-snug transition-colors line-clamp-2", `group-hover:${theme.text}`)}>
                                 {article.title}
                              </h4>
                              <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                 <span className={theme.text}>{category.name}</span>
                                 <span>•</span>
                                 <span>{formatNumber(article.views)} Views</span>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               </motion.div>
               
               {/* Newsletter Widget - Modern Design */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="bg-[#050b14] p-10 rounded-[2rem] text-center relative overflow-hidden"
               >
                  <div className={cn("absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-20 -mr-20 -mt-20 pointer-events-none", theme.bg)}></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                      <Zap className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">Newsletter</h3>
                    <p className="text-xs text-slate-400 mb-8 font-medium leading-relaxed">Dapatkan update eksklusif teknologi {category.name} langsung di inbox Anda.</p>
                    <div className="flex flex-col gap-3">
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-slate-500"
                        />
                        <button className={cn("h-12 w-full rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95", theme.badge)}>
                          Berlangganan
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
