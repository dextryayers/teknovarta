'use client';

import { VIDEOS, VIDEO_CATEGORIES, Video } from '@/lib/videos';
import VideoCard from '@/components/VideoCard';
import Link from 'next/link';
import { Play, TrendingUp, ChevronRight, Eye, Clock, User, Share2, MessageCircle, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { formatNumber, cn } from '@/lib/utils';
import Image from 'next/image';

export default function VideoPortalClient() {
  const [mounted, setMounted] = useState(false);
  
  // Sort all videos by views for trending
  const trendingVideos = [...VIDEOS].sort((a, b) => b.views - a.views).slice(0, 10);
  
  const [currentVideo, setCurrentVideo] = useState<Video>(trendingVideos[0]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-20">
      {/* Top Header / Portal Branding */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white">
                 <Play className="h-5 w-5 fill-white ml-0.5" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white leading-none">TEKNOVARTA <span className="text-red-600">VIDEO</span></h1>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">Portal Jurnalisme Visual</p>
              </div>
           </div>
           
           <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
             <Link href="/" className="hover:text-red-600 transition-colors">Beranda Utama</Link>
             <Link href="/watch/video" className="text-red-600">Video Terbaru</Link>
             <Link href="#" className="hover:text-red-600 transition-colors">Trending</Link>
             <Link href="#" className="hover:text-red-600 transition-colors">Program Khusus</Link>
           </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        
        {/* Main Hero Section (Playback Area) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Video Player */}
          <div className="lg:col-span-8">
             <div className="bg-black aspect-video rounded-xl overflow-hidden shadow-lg mb-6 relative">
                <iframe 
                  src={`${currentVideo.videoUrl}&autoplay=0`} 
                  title={currentVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
             </div>
             
             <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                   <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 font-bold uppercase text-[10px] tracking-widest border-none">
                          {currentVideo.category.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {currentVideo.date}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                        {currentVideo.title}
                      </h2>
                   </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                         <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-red-600">
                            <User className="h-4 w-4" />
                         </div>
                         <span className="font-bold text-slate-900 dark:text-slate-200">{currentVideo.author}</span>
                      </div>
                      <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                      <div className="flex items-center gap-1.5"><Eye className="h-4 w-4 text-slate-400" /> {formatNumber(currentVideo.views)} ditonton</div>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px] uppercase tracking-widest rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                         <Share2 className="h-4 w-4" /> Bagikan
                      </button>
                   </div>
                </div>
             </div>
             
             {/* AI Summary Block */}
             <div className="mt-6 bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center gap-2 mb-3">
                   <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                   <h3 className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Ringkasan AI</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap">
                   {currentVideo.aiSummary}
                </p>
             </div>
          </div>

          {/* Up Next / Trending Sidebar */}
          <div className="lg:col-span-4">
             <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col h-[calc(100vh-200px)] lg:h-[600px] sticky top-24">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                   <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-red-600" /> Terpopuler Saat Ini
                   </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                   {trendingVideos.map((video, idx) => {
                     const isPlaying = currentVideo.id === video.id;
                     return (
                       <button 
                         key={video.id} 
                         onClick={() => setCurrentVideo(video)}
                         className={cn(
                           "w-full text-left flex gap-4 p-3 rounded-xl transition-colors group",
                           isPlaying 
                             ? "bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30" 
                             : "hover:bg-slate-50 dark:hover:bg-slate-800"
                         )}
                       >
                         <div className="relative w-28 aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                            <Image 
                              src={video.thumbnail} 
                              alt={video.title} 
                              fill 
                              sizes="112px"
                              className="object-cover" 
                            />
                            {isPlaying ? (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                 <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> Diputar
                                 </span>
                              </div>
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                   <Play className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                                </div>
                                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  {video.duration}
                                </div>
                              </>
                            )}
                         </div>
                         <div className="flex flex-col justify-center min-w-0 py-0.5">
                           <h4 className={cn(
                             "font-semibold text-sm leading-snug line-clamp-2 mb-1",
                             isPlaying ? "text-red-600" : "text-slate-800 dark:text-slate-200 group-hover:text-red-600"
                           )}>
                             {video.title}
                           </h4>
                           <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                              <span>{video.category.replace('-', ' ')}</span>
                              <span>•</span>
                              <span>{formatNumber(video.views)} view</span>
                           </div>
                         </div>
                       </button>
                     );
                   })}
                </div>
             </div>
          </div>
        </div>

        {/* Ad Banner Placeholder */}
        <div className="w-full h-24 bg-slate-200 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-16">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Advertisement Space</span>
        </div>

        {/* Categorized Feed Sections */}
        <div className="space-y-16">
           {VIDEO_CATEGORIES.map(category => {
             const catVideos = VIDEOS.filter(v => v.category === category.id).slice(0, 4);
             if (catVideos.length === 0) return null;
             
             return (
               <section key={category.id} className="relative">
                 {/* Section Header */}
                 <div className="flex items-center justify-between border-b-2 border-slate-900 dark:border-slate-700 pb-3 mb-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                       <span className="w-2 h-6 bg-red-600 block"></span>
                       {category.name}
                    </h3>
                    <Link href={`/watch/video?cat=${category.id}`} className="text-xs font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-1 transition-colors">
                       Lihat Semua <ChevronRight className="h-4 w-4" />
                    </Link>
                 </div>
                 
                 {/* Video Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {catVideos.map(video => (
                      <VideoCard key={video.id} video={video} layout="vertical" />
                    ))}
                 </div>
               </section>
             );
           })}
        </div>
      </div>
    </div>
  );
}
