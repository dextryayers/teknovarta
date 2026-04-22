'use client';

import { ARTICLES, CATEGORIES } from '@/lib/articles';
import { VIDEOS } from '@/lib/videos';
import ArticleCard from '@/components/ArticleCard';
import VideoCard from '@/components/VideoCard';
import TechGallery from '@/components/TechGallery';
import ArticleMarquee from '@/components/ArticleMarquee';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Zap, Clock, User, Eye, ChevronRight, Bookmark, Play, Filter, Cpu } from 'lucide-react';
import { formatNumber, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import ArticleSlider from '@/components/ArticleSlider';

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
  
  const [mounted, setMounted] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('SEMUA');

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  const filteredArticles = filterCategory === 'SEMUA' 
    ? ARTICLES.slice(0, 10) 
    : ARTICLES.filter(a => a.category.toUpperCase() === filterCategory).slice(0, 10);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* 1. Header Ad Space */}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-[150px] bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded flex items-center justify-center italic text-slate-400 font-black text-sm tracking-[0.5em] uppercase">
          SPACE IKLAN(950X150)
        </div>
      </div>

      {/* 2. Headline Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Headline */}
          <div className="lg:col-span-8">
            <ArticleSlider articles={headlineFeatured} featured />
            
            {/* Sub Headlines - Auto Sliding */}
            <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                LATEST HEADLINES
              </p>
              <ArticleMarquee articles={headlineSide} speed="slow" className="py-2" />
            </div>
          </div>

          {/* Right Sidebar: Populer */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-950 p-4 text-white font-black text-sm tracking-widest uppercase italic flex items-center justify-between">
                <span>POPULER</span>
                <TrendingUp className="h-4 w-4 text-red-600" />
              </div>
              <div className="p-4 space-y-4">
                {popularArticles.map((article, idx) => (
                  <div key={article.id} className="group flex gap-4 items-start pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-800 group-hover:text-red-600 transition-colors italic">0{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 items-center mb-1">
                        <Badge className="bg-blue-600 text-[7px] p-0 px-1.5 h-4 font-bold border-none">{article.category}</Badge>
                      </div>
                      <Link href={`/artikel/${article.slug}`}>
                        <h4 className="font-bold text-[13px] text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                      </Link>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Shortcut in Sidebar */}
            <div className="mt-8 bg-red-600 p-6 rounded-xl text-white">
              <h3 className="font-black text-xs uppercase tracking-widest mb-4">Newsletter</h3>
              <p className="text-xs font-medium mb-4 opacity-90 leading-tight">Dapatkan ringkasan berita teknologi terbaik setiap hari.</p>
              <div className="space-y-3">
                <input type="email" placeholder="Email Anda" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-xs text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30" />
                <Button className="w-full bg-white text-red-600 hover:bg-slate-950 hover:text-white font-black uppercase tracking-widest text-[10px] h-10">
                  DAFTAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section: Kabar Tekno (Grid) */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase">
            GADGET NEWS <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse"></div>
          </h2>
          <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>
        <ArticleSlider articles={gadgetArticles} />

        {/* 3.1. Sub-Section: Workshop Teknisi (Repair Tips & Troubleshooting) */}
        <div className="mt-20 flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="h-24 w-24 text-red-600 rotate-12" />
            </div>
            <Badge className="bg-red-600 text-white rounded-none border-none mb-6 font-black uppercase tracking-widest text-[8px]">PRO TIPS</Badge>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-6 leading-none">Workshop <br/><span className="text-red-600">Teknisi HP.</span></h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Panduan mendalam cara memperbaiki HP, diagnosa kerusakan IC, hingga teknik reballing profesional oleh Hanif Abdurrohim.
            </p>
            <Link 
              href="/kategori/hp"
              className={cn(buttonVariants({ variant: "outline" }), "w-full border-red-600/20 text-red-600 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[9px] h-12 rounded-xl transition-all")}
            >
               LIHAT SEMUA PANDUAN
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
      <section className="w-full bg-slate-900 py-24 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-blue-500 tracking-[0.4em] uppercase mb-2">Dev Logic</span>
              <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase">
                DUNIA DEVELOPER <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
              </h2>
            </div>
            <div className="h-0.5 flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="p-8 bg-blue-600 rounded-3xl text-white h-full flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-2">
                <div>
                  <Cpu className="h-12 w-12 mb-6" />
                  <h3 className="text-3xl font-black leading-[0.9] italic uppercase mb-6 tracking-tighter">Masa Depan <br/> Web Dev <br/> Ada di Sini.</h3>
                  <p className="text-sm font-medium opacity-80 leading-relaxed mb-8">Kumpulan artikel teknis, tips framework, dan wawasan coding terbaru oleh Hanif Abdurrohim.</p>
                </div>
                <Link href="/kategori/webdev" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Eksplorasi Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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
              <p className="text-red-500 font-black text-xs uppercase tracking-[0.3em] mb-4">Varta Watch</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter italic">
                Lensa <span className="text-red-600 underline underline-offset-8">Visual News.</span>
              </h2>
            </div>
            <Link href="/watch/video" className="text-xs font-black text-white uppercase tracking-widest border-b-2 border-red-600 pb-2 hover:text-red-600 transition-colors">
              Lihat Semua Video
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
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter flex items-center gap-4 shrink-0 uppercase">
            ANALISIS MENDALAM <div className="h-3 w-3 rounded-full bg-slate-400 animate-pulse"></div>
          </h2>
          <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <ArticleSlider articles={reviewArticles} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviewArticles.slice(0, 4).map((article) => (
                <div key={article.id} className="space-y-4 pb-8 border-b border-slate-100 dark:border-slate-800 mb-8 last:mb-0 last:border-0 last:pb-0 group">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image src={`${article.image}&w=800`} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
                    <Badge className="absolute top-4 left-4 bg-orange-600 border-none font-black text-[10px] uppercase">Review</Badge>
                  </div>
                  <Link href={`/artikel/${article.slug}`}>
                    <h3 className="text-2xl font-black leading-tight group-hover:text-red-600 transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 line-clamp-3 font-medium">{article.excerpt}</p>
                  <Link href={`/artikel/${article.slug}`} className="text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                    BACA SELENGKAPNYA <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-4 w-4 text-red-600" />
                <h3 className="font-black text-xs uppercase tracking-widest">Pilihan Editor</h3>
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

      {/* 7. Final Footer Banner */}
      <div className="container mx-auto px-4 py-20 pb-40">
        <div className="relative w-full h-[300px] bg-red-700 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90"></div>
          <Zap className="h-32 w-32 text-white/10 absolute -top-16 -left-16" />
          <TrendingUp className="h-32 w-32 text-white/10 absolute -bottom-16 -right-16" />
          
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter italic mb-6 relative z-10">
            Masa Depan <span className="underline italic">Ada di Sini.</span>
          </h2>
          <p className="text-red-100 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 relative z-10 max-w-lg leading-loose">
            Bergabunglah dengan ribuan pembaca setia Teknovarta dan dapatkan pembaruan teknologi paling akurat setiap hari.
          </p>
          <div className="flex gap-4 relative z-10">
             <Button className="bg-white text-red-600 hover:bg-slate-950 hover:text-white font-black uppercase tracking-widest text-[10px] px-10 h-14 rounded-full shadow-2xl transition-all">
               LANGGANAN SEKARANG
             </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
