'use client';

import { useParams } from 'next/navigation';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, TrendingUp, User, Eye, ArrowRight, Zap, Target } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const category = CATEGORIES.find(c => c.id === categoryId);
  if (!category) return notFound();

  const categoryArticles = ARTICLES.filter(a => a.category === categoryId);
  const featuredInCat = categoryArticles[0];
  const otherArticles = categoryArticles.slice(1);
  const trendingCat = [...categoryArticles].sort((a, b) => b.views - a.views).slice(0, 6);

  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500 pb-20">
      {/* Premium Category Hero */}
      <div className="relative pt-16 pb-32 md:pt-24 md:pb-48 bg-slate-950 text-white overflow-hidden">
        {/* Animated Background Decor */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full animate-pulse"></div>
           <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-400/20 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.3em] text-slate-500 mb-10"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5"><Home className="h-3.5 w-3.5" /> HOME</Link>
            <ChevronRight className="h-3 w-3 opacity-30" />
            <span className="text-blue-500">CATEGORY HUB</span>
            <ChevronRight className="h-3 w-3 opacity-30" />
            <span className="text-white italic">{category.name}</span>
          </motion.nav>

          <div className="max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-6xl md:text-9xl font-black tracking-tighter uppercase italic mb-8 leading-none italic"
            >
              {category.name}<span className="text-[#0a66c2]">{"///"}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-2xl max-w-3xl font-medium leading-[1.3] italic uppercase tracking-tight"
            >
              Explorasi mendalam seputar <span className="text-white underline decoration-[#0a66c2] decoration-4 underline-offset-8">{category.name}</span>. Dari ulasan eksklusif hingga panduan teknis yang presisi.
            </motion.p>
          </div>
        </div>
        
        {/* Bottom Stripe Decor */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 -mt-16 md:-mt-24 relative z-20">
          
          {/* Main Content Stream */}
          <main className="lg:col-span-8 space-y-20">
            
            {/* Spotlight Card - Premium Feel */}
            {featuredInCat && (
               <motion.section 
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="group relative"
               >
                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[42px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000"></div>
                 <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800 bg-slate-900">
                    <Image 
                      src={`${featuredInCat.image}&w=1600`} 
                      alt={featuredInCat.title} 
                      fill 
                      priority
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-8 left-8">
                       <Badge className="bg-[#0a66c2] px-6 py-2 rounded-full font-black text-[10px] tracking-[0.2em] shadow-2xl italic uppercase">TOP SPOTLIGHT</Badge>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10">
                       <Link href={`/artikel/${featuredInCat.slug}`}>
                          <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-[0.95] mb-6 group-hover:text-blue-400 transition-colors italic uppercase tracking-tighter">
                            {featuredInCat.title}
                          </h2>
                       </Link>
                       <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pt-6 border-t border-white/10">
                          <span className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-blue-500" /> {featuredInCat.author}</span>
                          <span className="flex items-center gap-2">VIEWS {formatNumber(featuredInCat.views)}</span>
                       </div>
                    </div>
                 </div>
               </motion.section>
            )}

            {/* List Indeks */}
            <div className="space-y-16">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                 <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic">THE <span className="text-blue-600">COLLECTION</span></h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{categoryArticles.length} BERITA DITEMUKAN</span>
              </div>
              <div className="grid grid-cols-1 gap-12">
                {otherArticles.map((article, idx) => (
                   <motion.div
                     key={article.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx % 3 * 0.1 }}
                     viewport={{ once: true, margin: "-100px" }}
                   >
                     <ArticleCard article={article} layout="horizontal" />
                   </motion.div>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-8 bg-slate-950 dark:bg-slate-900 text-white rounded-[32px] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#0a66c2] transition-all shadow-2xl"
            >
               LOAD MORE STORIES FROM {category.name}
            </motion.button>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            <div className="sticky top-32 space-y-16">
               {/* Trending in Category */}
               <div className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <TrendingUp className="h-32 w-32 rotate-12" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white mb-12 uppercase tracking-tighter italic flex items-center gap-3">
                     <TrendingUp className="h-6 w-6 text-red-500" />
                     HOT CHARTS
                  </h3>
                  <div className="space-y-10">
                     {trendingCat.map((article, idx) => (
                        <Link key={article.id} href={`/artikel/${article.slug}`} className="flex gap-6 group">
                           <div className="relative pt-1 shrink-0">
                             <span className="text-4xl font-black text-slate-200 dark:text-slate-800 leading-none italic group-hover:text-[#0a66c2] transition-colors tabular-nums">
                                {String(idx + 1).padStart(2, '0')}
                             </span>
                           </div>
                           <div className="flex flex-col min-w-0 py-1">
                              <h4 className="font-black text-xs md:text-sm text-slate-900 dark:text-slate-200 leading-[1.25] group-hover:text-[#0a66c2] transition-colors line-clamp-2 uppercase tracking-tight italic">
                                 {article.title}
                              </h4>
                              <div className="mt-2 flex items-center gap-3 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                 <span>{article.date}</span>
                                 <span className="text-blue-500">{formatNumber(article.views)} VIEWS</span>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>

               {/* Related Topics / Navigation */}
               <div className="p-10 bg-slate-950 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700"></div>
                  <h3 className="text-xs font-black text-blue-500 mb-10 uppercase tracking-[0.4em] flex items-center gap-2 italic">
                    <Target className="h-4 w-4" /> EXPLORE TOPICS
                  </h3>
                  <div className="space-y-4">
                     {["Panduan {cat}", "Berita Terbaru {cat}", "Tips & Trik", "Eksplorasi {cat}", "Arsip {cat}"].map(topic => {
                        const replacedTopic = topic.replace("{cat}", category.name);
                        return (
                           <Link key={topic} href="#" className="flex justify-between items-center py-4 border-b border-white/5 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-all group/link">
                              {replacedTopic} 
                              <div className="h-8 w-8 bg-white/5 rounded-xl flex items-center justify-center group-hover/link:bg-blue-600 transition-all">
                                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                              </div>
                           </Link>
                        );
                     })}
                  </div>
               </div>

               {/* Newsletter Widget */}
               <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-[40px] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                     <Zap className="h-24 w-24 rotate-45" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-80 italic">DAILY HUB</h4>
                  <h3 className="text-2xl font-black mb-8 italic uppercase leading-none tracking-tighter">Stay updated in {category.name}</h3>
                  <div className="relative group/input">
                      <input 
                        type="email" 
                        placeholder="EMAIL ADDRESS" 
                        className="w-full bg-white/10 border border-white/20 rounded-2xl h-14 px-6 text-[10px] font-black placeholder:text-blue-100 focus:outline-none focus:bg-white focus:text-slate-900 transition-all tracking-[0.2em]"
                      />
                      <button className="absolute right-1.5 top-1.5 h-11 w-11 bg-white text-blue-600 rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-xl">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                   </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
