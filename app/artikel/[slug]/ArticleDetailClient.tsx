'use client';

import { ARTICLES } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar, Eye, ShieldCheck, ChevronRight, MessageCircle, Clock, Bookmark, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatNumber } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import SocialShare from '@/components/SocialShare';
import WhatsAppShareButton from '@/components/WhatsAppShareButton';
import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function ArticleDetailClient({ slug }: { slug: string }) {
  const article = ARTICLES.find(a => a.slug === slug);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#0a66c2] origin-left z-[60] shadow-[0_0_15px_rgba(10,102,194,0.5)]"
        style={{ scaleX }}
      />
      
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <nav className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-8 border-b border-slate-100 pb-4">
          <Link href="/" className="hover:text-red-600 transition-colors">HOME</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <Link href={`/teknologi/${article.category}`} className="hover:text-red-600 transition-colors uppercase">{article.category}</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-900 dark:text-slate-200 line-clamp-1 font-bold">DETAIL</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8">
            <div className="mb-6">
              <span className="text-red-600 font-bold text-xs uppercase tracking-widest">{article.category}</span>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mt-2 mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-900 dark:text-slate-200">{article.author}</span>
                <span className="opacity-30">|</span>
                <span>{article.date}</span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {formatNumber(article.views)} Pembaca</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8 border-y border-slate-100 dark:border-slate-800 py-3">
              <span className="text-[10px] font-bold text-slate-400 mr-2 uppercase tracking-wider">SHARE:</span>
              <SocialShare path={`/artikel/${article.slug}`} title={article.title} />
              <WhatsAppShareButton title={article.title} path={`/artikel/${article.slug}`} />
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={`${article.image}&w=1200`}
                alt={article.title}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-slate
                prose-p:leading-relaxed prose-p:text-slate-800 dark:prose-p:text-slate-300
                prose-headings:font-bold prose-headings:text-slate-950 dark:prose-headings:text-white
                prose-strong:font-bold
                prose-img:rounded-xl prose-img:shadow-md
                mb-20"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="p-10 rounded-[32px] bg-slate-950 text-white mb-24 relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full"></div>
               <div className="flex items-start gap-8 relative z-10">
                  <div className="h-20 w-20 bg-slate-800 rounded-[24px] flex items-center justify-center border border-white/5 shadow-xl shrink-0 group-hover:scale-105 transition-transform">
                     <User className="h-10 w-10 text-blue-400" />
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h4 className="text-2xl font-black uppercase tracking-tight italic mb-1">{article.author}</h4>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Senior Technology Editor & Security Specialist</p>
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed font-medium">Berpengalaman lebih dari 8 tahun dalam meliput tren teknologi global, pengembangan perangkat lunak, dan isu keamanan siber nasional.</p>
                     <div className="flex gap-4 pt-2">
                        <Link href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors"><FacebookIcon className="h-4 w-4" /></Link>
                        <Link href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-400 transition-colors"><TwitterIcon className="h-4 w-4" /></Link>
                     </div>
                  </div>
               </div>
            </div>

            <section className="mb-24 px-4 md:px-0">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
                  BERITA <span className="text-[#0a66c2]">TERKAIT</span>
                </h3>
                <Link href={`/teknologi/${article.category}`} className="text-[10px] font-black text-slate-400 hover:text-[#0a66c2] transition-all flex items-center gap-2 uppercase tracking-widest">
                  Lihat Semua <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} />
                ))}
              </div>
            </section>
          </main>

          <aside className="lg:col-span-4 space-y-10">
            <div className="sticky top-24 space-y-10">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-950 text-white px-5 py-3 flex justify-between items-center">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider">BERITA TERPOPULER</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {ARTICLES.filter(a => a.id !== article.id).slice(0, 5).map((rel, idx) => (
                    <Link key={rel.id} href={`/artikel/${rel.slug}`} className="flex gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800 group transition-all">
                       <span className="text-2xl font-black text-slate-200 dark:text-slate-700 italic group-hover:text-red-600">
                          {idx + 1}
                       </span>
                       <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200 leading-snug line-clamp-2">
                          {rel.title}
                       </h4>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  PILIHAN REDAKSI <div className="h-0.5 flex-1 bg-slate-200"></div>
                </h3>
                <div className="space-y-6">
                  {ARTICLES.slice(5, 8).map(rel => (
                    <Link key={rel.id} href={`/artikel/${rel.slug}`} className="flex gap-4 group">
                      <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden">
                        <Image src={rel.image} alt={rel.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-bold text-xs leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] w-[90%] md:w-fit md:hidden">
         <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-full h-16 px-6 flex items-center justify-between md:justify-center gap-6 shadow-2xl scale-in-center">
            <Link href="/" className="text-white opacity-60 hover:opacity-100 transition-opacity">
               <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="w-px h-6 bg-white/10"></div>
            <button className="text-white opacity-60 hover:opacity-100 transition-opacity">
               <MessageCircle className="h-6 w-6" />
            </button>
            <div className="w-px h-6 bg-white/10"></div>
            <button className="h-10 w-10 bg-[#0a66c2] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
               <Share2Icon className="h-5 w-5" />
            </button>
         </div>
      </div>
    </div>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
  );
}

function Share2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
  );
}
