'use client';

import { Article } from '@/lib/articles';
import ArticleCard from './ArticleCard';
import { cn } from '@/lib/utils';

interface ArticleMarqueeProps {
  articles: Article[];
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  pauseOnHover?: boolean;
  layout?: 'default' | 'compact' | 'featured' | 'horizontal' | 'vertical';
}

export default function ArticleMarquee({ 
  articles, 
  className, 
  speed = 'medium',
  pauseOnHover = true,
  layout = 'default'
}: ArticleMarqueeProps) {
  const duration = speed === 'fast' ? '40s' : speed === 'medium' ? '80s' : '150s';

  return (
    <div className={cn("relative w-full overflow-hidden py-4", className)}>
      <div 
        className={cn(
          "flex gap-6 w-max animate-article-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: duration }}
      >
        {/* Render twice for infinite loop */}
        {[...articles, ...articles].map((article, idx) => (
          <div key={`${article.id}-${idx}`} className={cn(
            "shrink-0",
            layout === 'compact' ? "w-64 md:w-80" : "w-72 md:w-96"
          )}>
            <ArticleCard 
              article={article} 
              layout={layout === 'horizontal' || layout === 'compact' ? layout : 'vertical'} 
              featured={layout === 'featured'}
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes article-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-article-marquee {
          animation: article-marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
