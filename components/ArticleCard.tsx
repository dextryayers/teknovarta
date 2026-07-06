'use client';

import { Article } from '@/lib/articles';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Eye, User, Sparkles } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import CardShare from './CardShare';
import { useTranslation } from '@/hooks/useTranslation';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  layout?: 'vertical' | 'horizontal' | 'compact';
}

export default function ArticleCard({ article, featured = false, layout = 'vertical' }: ArticleCardProps) {
  const { t, lang } = useTranslation();
  const articleUrl = `/${lang}/artikel/${article.slug}`;
  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-lg bg-black aspect-video md:aspect-[21/9] shadow-lg transition-all border border-slate-200 dark:border-slate-800">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          priority
          sizes="(max-width: 768px) 100vw, 1000px"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-red-600 hover:bg-red-700 text-white rounded font-bold uppercase tracking-widest border-none text-[9px] px-2.5 py-1">
              {article.category.replace('-', ' ')}
            </Badge>
            {article.aiSummary && (
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded font-bold uppercase tracking-widest border-none text-[9px] px-2.5 py-1 flex items-center gap-1 shadow-lg shadow-purple-500/20">
                <Sparkles className="h-2.5 w-2.5" /> {t.components.article.ai_summary}
              </Badge>
            )}
          </div>
          <div className="flex justify-between items-start">
            <Link href={articleUrl} className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 line-clamp-2 hover:text-red-400 transition-colors leading-tight" id="article-card-featured-title">
                {article.title}
              </h2>
            </Link>
            <div className="ml-4 pt-1">
               <CardShare url={articleUrl} title={article.title} />
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
             <span className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
             <span className="opacity-40">•</span>
             <span>{article.date}</span>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-slate-200 dark:border-slate-800 last:border-0">
        <div className="relative w-full sm:w-48 lg:w-56 aspect-[3/2] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 300px"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0 pt-1">
          <Link href={`/${lang}/artikel/${article.slug}`}>
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-lg md:text-xl group-hover:text-red-600 transition-colors leading-snug mb-2 line-clamp-2" id="article-card-horizontal-title">
              {article.title}
            </h3>
          </Link>
          
          {article.aiSummary ? (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-3 border-l-2 border-purple-500 relative overflow-hidden group/ai">
               <div className="flex items-center gap-1.5 text-[9px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1.5">
                  <Sparkles className="h-3 w-3" /> {t.components.article.ai_summary}
               </div>
               <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                 {article.aiSummary}
               </p>
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 font-medium">
              {article.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="text-red-600">{article.category.replace('-', ' ')}</span>
               <span className="opacity-40">•</span>
               <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Eye className="h-3 w-3" /> {formatNumber(article.views)}
              </div>
              <CardShare url={articleUrl} title={article.title} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'compact') {
    return (
      <div className="group flex gap-4 items-center py-4 border-b border-slate-200 dark:border-slate-800 last:border-0">
        <div className="flex-1 min-w-0">
          <Link href={`/${lang}/artikel/${article.slug}`}>
            <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="text-red-600">{article.category.replace('-', ' ')}</span>
              <span className="opacity-40">•</span>
              <span>{article.date}</span>
            </div>
            <CardShare url={articleUrl} title={article.title} />
          </div>
        </div>
      </div>
    );
  }

  // Vertical layout (Default)
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors hover:border-red-600/30 shadow-sm hover:shadow-md">
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-red-600 hover:bg-red-700 text-white rounded font-bold uppercase tracking-widest border-none text-[9px] px-2 py-1 shadow-sm w-fit">
            {article.category.replace('-', ' ')}
          </Badge>
          {article.aiSummary && (
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded font-bold uppercase tracking-widest border-none text-[9px] px-2 py-1 shadow-lg shadow-purple-500/20 flex items-center gap-1 w-fit">
               <Sparkles className="h-2.5 w-2.5" /> AI
            </Badge>
          )}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/${lang}/artikel/${article.slug}`}>
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-lg leading-tight line-clamp-2 hover:text-red-600 transition-colors mb-3" id="article-card-vertical-title">
            {article.title}
          </h3>
        </Link>
        
        {article.aiSummary ? (
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 mb-4 border border-purple-100 dark:border-purple-900/50 relative overflow-hidden group/ai">
             <div className="flex items-center gap-1.5 text-[9px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1.5">
                <Sparkles className="h-3 w-3" /> {t.components.article.ai_summary}
             </div>
             <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed italic">
               "{article.aiSummary}"
             </p>
          </div>
        ) : (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 font-medium">
            {article.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
             <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <Eye className="h-3.5 w-3.5" /> {formatNumber(article.views)}
            </div>
            <CardShare url={articleUrl} title={article.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
