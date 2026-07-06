'use client';

import { Video } from '@/lib/videos';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Eye, Clock } from 'lucide-react';
import { formatNumber, cn } from '@/lib/utils';
import { motion } from 'motion/react';
import CardShare from './CardShare';

interface VideoCardProps {
  video: Video;
  layout?: 'vertical' | 'horizontal' | 'compact';
  onClick?: () => void;
}

export default function VideoCard({ video, layout = 'vertical', onClick }: VideoCardProps) {
  const videoUrl = `/watch/video/${video.slug}`;
  const content = (
    <>
      {layout === 'compact' && (
        <div className="group flex gap-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors duration-200">
          <div className="relative w-32 aspect-video flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <Image 
              src={video.thumbnail}
              alt={video.title} 
              fill 
              sizes="128px"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
               <Play className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
            </div>
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-[10px] font-bold text-red-600 uppercase mb-1">
              {video.category.replace('-', ' ')}
            </span>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
              {video.title}
            </h4>
            <div className="flex items-center justify-between mt-2">
               <span className="text-[10px] text-slate-500">{formatNumber(video.views)} x ditonton</span>
               <CardShare url={videoUrl} title={video.title} />
            </div>
          </div>
        </div>
      )}

      {layout === 'horizontal' && (
        <div className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-900 p-0 rounded-none border-b border-slate-100 dark:border-slate-800 pb-6 mb-6 transition-colors">
          <div className="relative w-full md:w-64 aspect-video flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <Image 
              src={video.thumbnail}
              alt={video.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300">
                 <Play className="h-5 w-5 fill-white ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">
              {video.duration}
            </div>
          </div>
          <div className="flex flex-col justify-start flex-1 min-w-0 py-1">
            <span className="text-[11px] font-bold text-red-600 uppercase mb-2">
              {video.category.replace('-', ' ')}
            </span>
            <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center justify-between mt-auto">
               <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {video.date}</span>
                  <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {formatNumber(video.views)}</span>
               </div>
               <CardShare url={videoUrl} title={video.title} />
            </div>
          </div>
        </div>
      )}

      {layout === 'vertical' && (
        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-none h-full transition-colors">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 mb-4">
            <Image 
              src={video.thumbnail}
              alt={video.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
               <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300">
                  <Play className="h-6 w-6 fill-white ml-1" />
               </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">
              {video.duration}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-2">
              <span className="text-red-600 font-bold uppercase">{video.category.replace('-', ' ')}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <span>{video.date}</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-3 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
              {video.title}
            </h3>
            <div className="mt-auto flex items-center justify-between">
               <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                  <Eye className="h-3.5 w-3.5" /> {formatNumber(video.views)} ditonton
               </div>
               <CardShare url={videoUrl} title={video.title} />
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {content}
      </div>
    );
  }

  return (
    <Link href={videoUrl}>
      {content}
    </Link>
  );
}
