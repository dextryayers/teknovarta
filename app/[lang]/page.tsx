'use client';

import { ARTICLES, CATEGORIES } from '@/lib/articles';
import { VIDEOS } from '@/lib/videos';
import ArticleCard from '@/components/ArticleCard';
import VideoCard from '@/components/VideoCard';
import TechGallery from '@/components/TechGallery';
import ArticleMarquee from '@/components/ArticleMarquee';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Zap, Clock, User, Eye, ChevronRight, Bookmark, Play, Filter, Cpu, Target } from 'lucide-react';
import { formatNumber, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import ArticleSlider from '@/components/ArticleSlider';
import MarketBoard from '@/components/MarketBoard';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const headlineFeatured = ARTICLES.filter(a => a.featured).slice(0, 5);
  const headlineMain = headlineFeatured[0] || ARTICLES[0];
  const headlineSide = ARTICLES.filter(a => !a.featured).slice(0, 10);
  const gadgetArticles = ARTICLES.filter(a => a.category === 'hp');
  const securityArticles = ARTICLES.filter(a => a.category === 'cyber');
  const startupArticles = ARTICLES.filter(a => a.category === 'pc');
  const reviewArticles = ARTICLES.filter(a => a.category === 'laptop');
  const webDevArticles = ARTICLES.filter(a => a.category === 'webdev');
  const repairArticles = ARTICLES.filter(a => a.category === 'hp' && a.id >= 60);
  const popularArticles = [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 10);
  
  const { t, lang } = useTranslation();
  
  const [mounted, setMounted] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('SEMUA');
  const [visibleNewsCount, setVisibleNewsCount] = useState(15);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  const filteredArticles = filterCategory === 'SEMUA' 
    ? ARTICLES.slice(0, 10) 
    : ARTICLES.filter(a => a.category.toUpperCase() === filterCategory).slice(0, 10);

  const handleLoadMoreNews = () => {
    setVisibleNewsCount(prev => prev + 10);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* 1. Header Ad Space */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4 py-8"
      >
        <div className="w-full h-[120px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex items-center justify-center italic text-slate-400 font-black text-xs tracking-[0.5em] uppercase shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-red-500/30 transition-all duration-500">
          {t.home.ad_space}
        </div>
      </motion.div>

      {/* 2. Headline Section */}
      <div className="container mx-auto px-4 py-8 relative">
        {/* Ambient glow behind headline */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <ArticleSlider articles={headlineFeatured} featured />
            
            {/* Sub Headlines - Auto Sliding */}
            <div className="mt-12 border-t border-slate-200/50 dark:border-slate-800/50 pt-8 relative">
              <div className="absolute -top-[1px] left-0 w-32 h-[2px] bg-gradient-to-r from-red-600 to-transparent"></div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                </span>
                {t.home.latest_headlines}
              </p>
              <ArticleMarquee articles={headlineSide} speed="slow" className="py-2" />
            </div>

            {/* Live Market Board */}
            <div className="mt-12">
              <MarketBoard />
            </div>
          </motion.div>

          {/* Right Sidebar: Populer */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
              <div className="bg-gradient-to-r from-slate-950 to-slate-800 p-5 text-white font-black text-xs tracking-[0.2em] uppercase italic flex items-center justify-between border-b border-white/10">
                <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-red-500" /> {t.home.popular}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
              </div>
              <div className="p-5 space-y-4">
                {popularArticles.map((article, idx) => (
                  <div key={article.id} className="group flex gap-4 items-start pb-4 border-b border-slate-100 dark:border-slate-800/50 last:border-0 last:pb-0 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 p-3 rounded-xl transition-all duration-300">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-700 dark:to-slate-800 group-hover:from-red-500 group-hover:to-red-700 transition-all duration-500 italic">0{idx + 1}</span>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex gap-2 items-center mb-2">
                        <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[8px] px-2 py-0.5 font-black uppercase tracking-widest border-none">{article.category}</Badge>
                      </div>
                      <Link href={`/${lang}/artikel/${article.slug}`}>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                      </Link>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-2 tracking-widest">{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Shortcut in Sidebar */}
            <div className="mt-8 bg-red-600 p-6 rounded-xl text-white">
              <h3 className="font-black text-xs uppercase tracking-widest mb-4">{t.home.newsletter.title}</h3>
              <p className="text-xs font-medium mb-4 opacity-90 leading-tight">{t.home.newsletter.desc}</p>
              <div className="space-y-3">
                <input type="email" placeholder={t.home.newsletter.placeholder} className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-xs text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30" />
                <Button className="w-full bg-white text-red-600 hover:bg-slate-950 hover:text-white font-black uppercase tracking-widest text-[10px] h-10">
                  {t.home.newsletter.button}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Section: Kabar Tekno (Grid) */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 to-blue-500/10 blur-[150px] rounded-full pointer-events-none -z-10 -translate-y-1/2"></div>
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase drop-shadow-sm">
            {t.home.gadget_news} <div className="h-4 w-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.7)]"></div>
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>
        <ArticleSlider articles={gadgetArticles} />

        {/* 3.1. Sub-Section: Workshop Teknisi (Repair Tips & Troubleshooting) */}
        <div className="mt-20 flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="h-24 w-24 text-red-600 rotate-12" />
            </div>
            <Badge className="bg-red-600 text-white rounded-none border-none mb-6 font-black uppercase tracking-widest text-[8px]">{t.home.workshop.tag}</Badge>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-6 leading-none">{t.home.workshop.title.split('.')[0]}<br/><span className="text-red-600">.</span></h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              {t.home.workshop.desc}
            </p>
            <Link 
              href="/kategori/hp"
              className={cn(buttonVariants({ variant: "outline" }), "w-full border-red-600/20 text-red-600 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[9px] h-12 rounded-xl transition-all")}
            >
               {t.home.workshop.button}
            </Link>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {repairArticles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Mid Page Ad Space */}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-[150px] bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded flex items-center justify-center italic text-slate-400 font-black text-sm tracking-[0.5em] uppercase">
          SPACE IKLAN(950X150)
        </div>
      </div>

      {/* 4. Section: Cyber Security & Analytics (Split Layout) */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Security Focus */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase">
                KEAMANAN SIBER <div className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"></div>
              </h2>
              <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <ArticleSlider articles={securityArticles} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityArticles.slice(0, 2).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Right: Ads Space Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-widest flex items-center gap-2">
              ADS SPACE <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
            </h3>
            <div className="w-full aspect-square bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded flex items-center justify-center italic text-slate-400 font-black text-sm tracking-[0.2em] uppercase p-8 text-center leading-relaxed">
              IKLAN<br/>390X312
            </div>
            <div className="w-full aspect-square bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded flex items-center justify-center italic text-slate-400 font-black text-sm tracking-[0.2em] uppercase p-8 text-center leading-relaxed">
              IKLAN<br/>390X312
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Dunia Developer (Web Dev Special) */}
      <section className="w-full bg-slate-950 py-32 mb-16 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-6 mb-20">
            <div className="flex flex-col">
              <span className="text-xs font-black text-blue-500 tracking-[0.5em] uppercase mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4" /> {t.home.dev_world.tag}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase drop-shadow-lg">
                {t.home.dev_world.title}
              </h2>
            </div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="lg:col-span-4"
            >
              <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2rem] text-white h-full flex flex-col justify-between group cursor-pointer shadow-2xl shadow-blue-900/50 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                  <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md mb-8 border border-white/20">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black leading-[0.9] italic uppercase mb-6 tracking-tighter">{t.home.dev_world.subtitle}</h3>
                  <p className="text-sm font-medium text-blue-100 leading-relaxed mb-8">{t.home.dev_world.desc}</p>
                </div>
                <Link href="/kategori/webdev" className="relative z-10 flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all w-fit bg-white text-blue-900 px-6 py-3 rounded-full hover:bg-slate-100">
                  {t.home.dev_world.button} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <div className="lg:col-span-8">
              <ArticleSlider articles={webDevArticles} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-slate-950 py-24 my-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <p className="text-red-500 font-black text-xs uppercase tracking-[0.3em] mb-4">{t.home.varta_watch.tag}</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter italic">
                {t.home.varta_watch.title.split(' ')[0]} <span className="text-red-600 underline underline-offset-8">{t.home.varta_watch.title.split(' ').slice(1).join(' ')}</span>
              </h2>
            </div>
            <Link href={`/${lang}/watch/video`} className="text-xs font-black text-white uppercase tracking-widest border-b-2 border-red-600 pb-2 hover:text-red-600 transition-colors">
              {t.home.varta_watch.button}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {VIDEOS.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section: Tech Analysis & Review (Topic Special) */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">{t.home.analysis.title}</span> <div className="h-3 w-3 rounded-full bg-slate-400 animate-pulse"></div>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-400/50 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <ArticleSlider articles={reviewArticles} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviewArticles.slice(0, 4).map((article) => (
                <div key={article.id} className="space-y-4 pb-8 border-b border-slate-100 dark:border-slate-800 mb-8 last:mb-0 last:border-0 last:pb-0 group">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
                    <Badge className="absolute top-4 left-4 bg-orange-600 border-none font-black text-[10px] uppercase">{t.components.article.review}</Badge>
                  </div>
                  <Link href={`/${lang}/artikel/${article.slug}`}>
                    <h3 className="text-2xl font-black leading-tight group-hover:text-red-600 transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 line-clamp-3 font-medium">{article.excerpt}</p>
                  <Link href={`/${lang}/artikel/${article.slug}`} className="text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                    {t.home.analysis.read_more} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-4 w-4 text-red-600" />
                <h3 className="font-black text-xs uppercase tracking-widest">{t.home.analysis.editor_picks}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['SEMUA', 'hp', 'cyber', 'pc', 'laptop', 'webdev'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setFilterCategory(cat.toUpperCase())}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterCategory === cat.toUpperCase() ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} layout="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Gallery - Auto Sliding */}
      <TechGallery />

      {/* 7. Professional News Indeks (Detik/Kompas/Tribun Style) */}
      <section className="bg-white/40 dark:bg-slate-950/40 backdrop-blur-3xl pt-20 pb-32 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Column: Indeks Berita */}
            <div className="lg:col-span-8">
              <div className="mb-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 relative">
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-red-600"></div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                   {t.home.news_index.title}
                </h2>
                <div className="flex gap-4">
                   <Link href={`/${lang}/news`} className="text-xs font-bold text-red-600 hover:underline uppercase">{t.home.news_index.view_all}</Link>
                </div>
              </div>

              {/* Date/Category Filter Strip */}
              <div className="flex overflow-x-auto gap-2 pb-6 mb-8 scrollbar-hide">
                 {['SEMUA', 'HP', 'LAPTOP', 'PC', 'CYBER', 'WEBDEV'].map(cat => (
                   <button 
                     key={cat} 
                     onClick={() => setFilterCategory(cat)}
                     className={`whitespace-nowrap px-6 py-2 text-[11px] font-bold uppercase transition-all border ${filterCategory === cat ? 'bg-red-600 border-red-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-red-600'}`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>

              <div className="space-y-1">
                {[...ARTICLES]
                  .filter(a => filterCategory === 'SEMUA' || a.category.toUpperCase() === filterCategory)
                  .sort((a, b) => b.id - a.id)
                  .slice(0, visibleNewsCount)
                  .map((article, idx) => (
                  <article 
                    key={article.id}
                    className="flex flex-col sm:flex-row gap-6 py-8 border-b border-slate-100 dark:border-slate-800 last:border-0 group"
                  >
                    <div className="relative w-full sm:w-[260px] md:w-[320px] aspect-[16/9] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image 
                        src={article.image}
                        alt={article.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">{article.category}</span>
                         <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                         <span className="text-[10px] font-medium text-slate-400">{article.date}</span>
                      </div>
                      <Link href={`/${lang}/artikel/${article.slug}`}>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                         <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                            <Eye className="h-3.5 w-3.5" /> {formatNumber(article.views)}
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                            <User className="h-3.5 w-3.5" /> {article.author}
                         </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {visibleNewsCount < ARTICLES.length && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={handleLoadMoreNews}
                    className="px-10 py-4 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg active:scale-95"
                  >
                    {t.home.news_index.load_more}
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Column: Populer & Terhangat */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                
                {/* Populer Section (Tribun/Detik Style Numbers) */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 border border-slate-100 dark:border-slate-800">
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 border-b-4 border-red-600 w-fit pb-2 uppercase italic tracking-tighter">
                     {t.home.trending.most_popular}
                   </h3>
                   <div className="space-y-8">
                     {popularArticles.slice(0, 5).map((article, idx) => (
                       <Link key={article.id} href={`/${lang}/artikel/${article.slug}`} className="flex gap-6 group">
                          <span className="text-4xl font-black text-slate-200 dark:text-slate-800 leading-none group-hover:text-red-600 transition-colors italic">
                            {idx + 1}
                          </span>
                          <div className="space-y-2 flex-1">
                             <h4 className="text-[13px] font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                               {article.title}
                             </h4>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase">
                                {article.category}
                             </div>
                          </div>
                       </Link>
                     ))}
                   </div>
                </div>

                {/* Trending Tags Strip */}
                <div>
                   <h3 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">{t.home.trending.hot_topics}</h3>
                   <div className="flex flex-wrap gap-2">
                     {['#SamsungS26', '#iPhone18', '#GeforceRTX', '#AIIndonesia', '#Windows13', '#CyberSecurity', '#Web3', '#M5Pro'].map(tag => (
                       <Link key={tag} href="#" className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 hover:border-red-600 transition-all">
                         {tag}
                       </Link>
                     ))}
                   </div>
                </div>

                {/* Ads Placeholder */}
                <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase italic">
                   Space Iklan (300x300)
                </div>

                {/* Social Connect */}
                <div className="p-8 bg-red-600 text-white rounded-xl">
                   <h4 className="text-xs font-bold uppercase tracking-widest mb-4">{t.home.social.title}</h4>
                   <p className="text-xs mb-6 opacity-90 leading-relaxed">{t.home.social.desc}</p>
                   <div className="grid grid-cols-2 gap-3">
                      {['FACEBOOK', 'X (TWITTER)', 'INSTAGRAM', 'YOUTUBE'].map(social => (
                        <button key={social} className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[8px] font-bold tracking-widest rounded transition-all">
                          {social}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NVIDIA Style Hero Section */}
      <section className="bg-black border-y border-white/5 relative overflow-hidden flex items-stretch py-8 md:py-0">
        {/* Geometric Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-50" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 0l34.64 20v40L40 80 5.36 60V20z\' fill-opacity=\'0\' stroke=\'%23ffffff\' stroke-opacity=\'0.06\' stroke-width=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: '80px 80px'
        }}></div>
        
        <div className="container mx-auto px-4 lg:px-12 flex flex-col md:flex-row items-center justify-between min-h-[500px] relative z-10">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl py-12 text-left z-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-10 tracking-tight">
              Membangun Masa Depan Melalui Teknologi
            </h2>
            <div className="flex flex-col gap-6">
              <Link href="https://linkedin.com/in/hanifabdurrohim" target="_blank" className="text-white hover:text-[#76b900] transition-colors flex items-center gap-4 text-lg font-medium group w-fit">
                <svg className="w-6 h-6 text-[#76b900] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                linkedin.com/in/hanifabdurrohim
              </Link>
              <Link href="https://github.com/dextryayers" target="_blank" className="text-white hover:text-[#76b900] transition-colors flex items-center gap-4 text-lg font-medium group w-fit">
                <svg className="w-6 h-6 text-[#76b900] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                github.com/dextryayers
              </Link>
            </div>
            
            <div className="mt-12">
              <Link href="https://linkedin.com/in/hanifabdurrohim" target="_blank" className="inline-flex bg-[#76b900] text-black font-bold px-8 py-3.5 rounded-[3px] hover:bg-[#88d300] transition-colors shadow-lg shadow-[#76b900]/30 text-sm tracking-wide">
                Connect With Me
              </Link>
            </div>
          </div>

          {/* Right Content - Hexagon Image & Flare */}
          <div className="flex-1 w-full min-h-[400px] flex items-center justify-center md:justify-end lg:pr-12 relative z-10 mt-10 md:mt-0">
            {/* Bright top flare matching NVIDIA */}
            <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-white blur-[110px] rounded-full pointer-events-none opacity-90 mix-blend-screen z-0"></div>
            
            <div className="relative z-10 p-[4px] bg-[#76b900] shadow-[0_0_120px_rgba(118,185,0,0.5)]" style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}>
              <div className="w-[300px] h-[260px] md:w-[450px] md:h-[390px] relative overflow-hidden bg-black" style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
              }}>
                <Image 
                  src="/images/fotoku.png" 
                  alt="Hanif Abdurrohim" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final Footer Banner */}
      <div className="container mx-auto px-4 py-20 pb-40">
        <div className="relative w-full h-[350px] bg-slate-900 dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-2xl group border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-blue-600/20 opacity-90 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute inset-0 backdrop-blur-[100px]"></div>
          
          <Zap className="h-64 w-64 text-red-600/10 absolute -top-16 -left-16 group-hover:rotate-12 transition-transform duration-700" />
          <TrendingUp className="h-64 w-64 text-blue-600/10 absolute -bottom-16 -right-16 group-hover:-rotate-12 transition-transform duration-700" />
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic mb-6 relative z-10">
            {t.home.footer_banner.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">{t.home.footer_banner.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-slate-300 font-bold uppercase tracking-[0.3em] text-[10px] mb-10 relative z-10 max-w-lg leading-loose">
            {t.home.footer_banner.desc}
          </p>
          <div className="flex gap-4 relative z-10">
             <Button className="bg-white text-slate-900 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[10px] px-10 h-14 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 transition-all duration-300">
               {t.home.footer_banner.button}
             </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
