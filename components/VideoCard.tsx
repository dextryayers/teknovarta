'use client';

import { Video } from '@/lib/videos';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Eye, User, ArrowRight } from 'lucide-react';
import { formatNumber, cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  video: Video;
  layout?: 'vertical' | 'horizontal';
}

export default function VideoCard({ video, layout = 'vertical' }: VideoCardProps) {
  if (layout === 'horizontal') {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className="group flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-red-600 transition-all duration-500 shadow-sm hover:shadow-2xl"
      >
        <div className="relative w-full md:w-80 aspect-video flex-shrink-0 rounded-[24px] overflow-hidden shadow-lg">
          <Image 
            src={video.thumbnail}
            alt={video.title} 
            fill 
            sizes="(max-width: 768px) 192px, 320px"
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all flex items-center justify-center">
            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-500 shadow-2xl">
               <Play className="h-7 w-7 fill-current" />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
            {video.duration}
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-4 italic">
            MOD: {video.category.replace('-', ' ').toUpperCase()}
          </span>
          <Link href={`/watch/video/${video.slug}`}>
            <h3 className="font-display text-lg md:text-2xl font-black text-slate-950 dark:text-white leading-[1.1] mb-6 group-hover:text-red-500 transition-colors line-clamp-2 uppercase italic tracking-tighter">
              {video.title}
            </h3>
          </Link>
          <div className="flex items-center gap-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-auto">
             <span className="flex items-center gap-2"><Eye className="h-3.5 w-3.5" /> {formatNumber(video.views)}</span>
             <span className="flex items-center gap-2 italic">{video.date}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-red-600 transition-all duration-700 shadow-sm hover:shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden m-4 md:m-5 rounded-[32px] shadow-sm">
        <Image 
          src={video.thumbnail}
          alt={video.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
           <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_50px_rgba(220,38,38,0.8)]">
              <Play className="h-8 w-8 fill-current ml-1" />
           </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md text-white text-[9px] border border-white/10 font-black px-4 py-2 rounded-2xl z-10 uppercase tracking-[0.2em] shadow-2xl">
          {video.duration}
        </div>
        <div className="absolute top-4 left-4">
           <Badge className="bg-red-600 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl italic border-none">
             {video.category.replace('-', ' ')}
           </Badge>
        </div>
      </div>
      <div className="px-8 pb-10 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">
          <span className="text-red-600 italic">{video.date}</span>
          <span className="h-1 w-1 rounded-full bg-slate-200"></span>
          <span className="flex items-center gap-2"><Eye className="h-3.5 w-3.5" /> {formatNumber(video.views)}</span>
        </div>
        <Link href={`/watch/video/${video.slug}`}>
          <h3 className="font-display font-black text-slate-950 dark:text-slate-100 text-2xl mb-8 line-clamp-2 group-hover:text-red-600 transition-colors leading-[1.05] tracking-tighter italic uppercase">
            {video.title}
          </h3>
        </Link>
        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-red-600">
                <User className="h-4 w-4" />
             </div>
             <span className="text-[10px] font-black text-slate-950 dark:text-white uppercase tracking-widest italic">{video.author}</span>
          </div>
          <Link href={`/watch/video/${video.slug}`} className="h-12 w-12 bg-slate-950 text-white rounded-[20px] flex items-center justify-center hover:bg-red-600 transition-all shadow-xl">
             <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
