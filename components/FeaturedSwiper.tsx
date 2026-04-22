'use client';

import { Article } from '@/lib/articles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface FeaturedSwiperProps {
  articles: Article[];
}

export default function FeaturedSwiper({ articles }: FeaturedSwiperProps) {
  return (
    <div className="w-full rounded-[32px] overflow-hidden shadow-2xl shadow-blue-500/10 mb-20 bg-slate-900 border border-white/5">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[500px] md:h-[650px]"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <div className="relative w-full h-full group">
              <Image
                src={`${article.image}&w=1600`}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                priority
                sizes="100vw"
                referrerPolicy="no-referrer"
              />
              {/* Complex Overlay for Elegance */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.6)_40%,transparent_100%)] flex flex-col justify-end p-6 md:p-20">
                <div className="container mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge className="bg-red-600 border-none uppercase tracking-[0.3em] text-[10px] font-black px-5 py-2.5 shadow-2xl shrink-0">BERITA UNGGULAN</Badge>
                    <div className="h-px bg-white/20 flex-1 hidden md:block"></div>
                  </div>
                  
                  <Link href={`/artikel/${article.slug}`}>
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-8 line-clamp-2 hover:text-blue-400 transition-colors leading-[1.0] tracking-tighter italic">
                      {article.title}
                    </h2>
                  </Link>
                  
                  <p className="text-slate-300 line-clamp-2 max-w-3xl mb-12 hidden md:block text-xl leading-relaxed font-medium opacity-90">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-[11px] font-black uppercase tracking-[0.2em] border-t border-white/10 pt-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">H</div>
                      <span className="text-white">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="text-blue-500">KATEGORI:</span>
                      <span className="text-slate-200">{article.category.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="text-blue-500">DITERBITKAN:</span>
                      <span className="text-slate-200">{article.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
