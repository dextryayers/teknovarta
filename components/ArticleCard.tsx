'use client';

import { Article } from '@/lib/articles';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ArrowRight, User, Share2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import SocialShare from './SocialShare';
import { motion } from 'motion/react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  layout?: 'vertical' | 'horizontal' | 'compact';
}

export default function ArticleCard({ article, featured = false, layout = 'vertical' }: ArticleCardProps) {
  if (featured) {
    return (
      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="group relative overflow-hidden rounded-xl bg-slate-950 aspect-[16/9] md:aspect-[21/9] shadow-2xl transition-all duration-500"
      >
        <Image
          src={`${article.image}&w=1400`}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          priority
          sizes="(max-width: 768px) 100vw, 1400px"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
          <Badge className="bg-red-600 text-white w-fit mb-4 rounded-none px-3 py-1 font-bold uppercase tracking-widest border-none text-[8px]">{article.category}</Badge>
          <Link href={`/artikel/${article.slug}`}>
            <h2 className="font-sans text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 line-clamp-2 hover:text-red-500 transition-all tracking-tight leading-[1.1]" id="article-card-featured-title">
              {article.title}
            </h2>
          </Link>
          <div className="flex items-center gap-4 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
             <span className="text-white hover:text-red-500 transition-colors cursor-pointer">BY {article.author}</span>
             <span className="opacity-40">•</span>
             <span>{article.date}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <motion.div 
        className="group flex gap-4 items-start py-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
      >
        <div className="relative w-28 h-20 md:w-48 md:h-28 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={`${article.image}&w=800`}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 320px"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <Link href={`/artikel/${article.slug}`}>
            <h3 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-base md:text-lg group-hover:text-red-600 transition-colors leading-tight mb-2 line-clamp-2" id="article-card-horizontal-title">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 hidden sm:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
             <span className="text-red-600">{article.category}</span>
             <span className="opacity-40">•</span>
             <span>{article.date}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (layout === 'compact') {
    return (
      <div className="group flex gap-4 items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
        <div className="flex-1 min-w-0">
          <Link href={`/artikel/${article.slug}`}>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </Link>
          <div className="flex items-center gap-2 mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-red-600">{article.category}</span>
            <span className="opacity-40">•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col bg-white dark:bg-slate-950 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-none"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <Image
          src={`${article.image}&w=800`}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 400px"
          referrerPolicy="no-referrer"
        />
        <Badge className="absolute top-4 left-4 bg-red-600 text-white rounded-none border-none text-[8px] font-bold uppercase tracking-widest shadow-lg">
          {article.category}
        </Badge>
      </div>
      <div className="pt-6 flex-1 flex flex-col">
        <Link href={`/artikel/${article.slug}`}>
          <h3 className="font-sans font-extrabold text-slate-950 dark:text-slate-100 text-lg leading-tight line-clamp-2 hover:text-red-600 transition-colors mb-3" id="article-card-vertical-title">
            {article.title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
             <span className="text-slate-950 dark:text-slate-200">{article.author}</span>
             <span className="opacity-40">•</span>
             <span>{article.date}</span>
          </div>
          <Link href="/contact" className="text-[9px] font-black text-red-600 hover:text-white hover:bg-red-600 transition-all uppercase tracking-widest border border-red-600/20 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/10 active:scale-90">
            Tanya Admin
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
