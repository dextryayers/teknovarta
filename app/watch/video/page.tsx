'use client';

import { VIDEOS, VIDEO_CATEGORIES } from '@/lib/videos';
import VideoCard from '@/components/VideoCard';
import Link from 'next/link';
import { Play, TrendingUp, Zap, ChevronRight, Search, Target, Layout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { formatNumber, cn } from '@/lib/utils';

export default function VideoPortalPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  const filteredVideos = activeCategory === 'all' 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === activeCategory);

  const trendingVideos = [...VIDEOS].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500 pb-20">
      {/* Video Hero Header - Premium Upgrade */}
      <div className="relative pt-24 pb-48 bg-slate-950 text-white overflow-hidden">
        {/* Animated Background Decor */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/20 blur-[130px] rounded-full animate-pulse"></div>
           <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-10"
          >
             <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
             <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] italic">TEKNOVARTA STUDIOS</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-5xl md:text-8xl font-black text-white leading-[0.9] mb-12 tracking-tighter uppercase italic"
          >
            PRECISION <br/> <span className="text-[#0a66c2]">MOTION</span> INSIGHTS
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg md:text-2xl font-medium mb-16 leading-relaxed italic uppercase tracking-tighter"
          >
            Visualisasi teknologi masa depan melalui ulasan, tutorial, dan dokumentasi eksklusif.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-2xl mx-auto p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH KNOWLEDGE..." 
                className="w-full bg-transparent border-none py-6 pl-16 pr-8 text-white placeholder:text-slate-600 focus:outline-none text-[12px] font-black uppercase tracking-widest"
              />
            </div>
            <button className="whitespace-nowrap px-10 py-5 bg-red-600 text-white font-black rounded-[24px] hover:bg-white hover:text-slate-900 transition-all shadow-2xl flex items-center gap-4 text-[11px] tracking-widest uppercase">
               INITIALIZE <Target className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-20">
            {/* Category Filter - Sleek Upgrade */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-6">
               <button 
                 onClick={() => setActiveCategory('all')}
                 className={cn(
                   "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                   activeCategory === 'all' 
                   ? "bg-slate-950 text-white border-slate-950 shadow-2xl" 
                   : "bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-800 hover:border-blue-600"
                 )}
               >
                 ALL FEEDS
               </button>
               {VIDEO_CATEGORIES.map(cat => (
                 <button 
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={cn(
                     "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                     activeCategory === cat.id 
                     ? "bg-red-600 text-white border-red-600 shadow-2xl" 
                     : "bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-800 hover:border-red-600"
                   )}
                 >
                   {cat.name.toUpperCase()}
                 </button>
               ))}
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8">
                <h2 className="font-display text-4xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic">
                   THE <span className="text-red-500">MOTION</span> STREAM
                </h2>
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <Layout className="h-4 w-4" />
                   <span>COUNT: {filteredVideos.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {filteredVideos.map((video, idx) => (
                 <motion.div
                   key={video.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx % 2 * 0.1 }}
                   viewport={{ once: true }}
                 >
                   <VideoCard video={video} />
                 </motion.div>
               ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="py-32 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                 <div className="h-20 w-20 bg-slate-200 dark:bg-slate-800 rounded-[28px] flex items-center justify-center mx-auto mb-8">
                   <Play className="h-8 w-8 text-slate-400" />
                 </div>
                 <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] italic">NO BROADCAST DATA FOUND</p>
              </div>
            )}
            
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-8 bg-slate-950 dark:bg-slate-900 text-white rounded-[32px] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-red-600 transition-all shadow-2xl"
            >
               EXPLORE ARCHIVES
            </motion.button>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-16">
             {/* POPULAR - High Visual Impact */}
             <div className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <TrendingUp className="h-32 w-32" />
                </div>
                <div className="flex items-center justify-between mb-12">
                   <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic">HOT CHARTS</h3>
                   <span className="px-3 py-1 bg-red-600 text-white rounded-[10px] text-[8px] font-black animate-pulse">LIVE</span>
                </div>
                <div className="space-y-10 text-[11px] font-black uppercase tracking-widest italic">
                  {trendingVideos.map((video, idx) => (
                    <Link key={video.id} href={`/watch/video/${video.slug}`} className="flex gap-6 group">
                       <span className="text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-red-500 transition-colors leading-none italic w-8 shrink-0 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                       </span>
                       <div className="flex flex-col min-w-0 py-1">
                          <h4 className="text-xs md:text-sm text-slate-900 dark:text-slate-200 leading-[1.25] group-hover:text-red-600 transition-colors line-clamp-2 uppercase tracking-tighter italic">
                             {video.title}
                          </h4>
                          <div className="mt-2 flex items-center justify-between text-[8px] font-black text-slate-400 group-hover:text-slate-600 transition-colors">
                             <span>{video.category.replace('-', ' ')}</span>
                             <span className="text-red-500">{formatNumber(video.views)} VIEWS</span>
                          </div>
                       </div>
                    </Link>
                  ))}
                </div>
             </div>

             {/* SERVICE PROMO */}
             <div className="bg-gradient-to-br from-red-600 to-slate-950 p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                   <Zap className="h-32 w-32" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-80 italic">TEKNOVARTA SUPPORT</h4>
                <h3 className="text-3xl font-black mb-8 italic uppercase leading-none tracking-tighter">HYPER-SERVICE<br/>HARDWARE LAB</h3>
                <p className="text-[10px] text-red-100 mb-10 font-bold leading-loose uppercase tracking-wide italic">Solusi restorasi hardware, optimasi software, dan maintenance profesional untuk ekosistem kerja digital Anda.</p>
                <button className="w-full py-5 bg-white text-red-600 text-[10px] font-black uppercase tracking-widest rounded-[20px] hover:bg-slate-900 hover:text-white transition-all shadow-xl">
                   CONNECT WITH TECHNICIAN
                </button>
             </div>

             {/* TAGS CLOUD */}
             <div className="px-2">
                <h3 className="text-[10px] font-black text-slate-950 dark:text-slate-100 mb-10 uppercase tracking-[0.4em] flex items-center gap-4">
                   TAGS <div className="h-px flex-1 bg-slate-900/10"></div>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                   {['TUTORIAL', 'UNBOXING', 'REVIEW', 'SERVICE', 'GAMING', 'BUDGET', 'CODING', 'SETUP'].map(tag => (
                      <Link 
                        key={tag}
                        href="#"
                        className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-red-600 text-[9px] font-black text-slate-500 hover:text-red-600 rounded-full transition-all uppercase tracking-widest"
                      >
                        {tag}
                      </Link>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
