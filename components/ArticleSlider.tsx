'use client';

import { Article } from '@/lib/articles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Badge } from './ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ArticleSliderProps {
  articles: Article[];
  featured?: boolean;
}

export default function ArticleSlider({ articles, featured = false }: ArticleSliderProps) {
  if (featured) {
    return (
      <div className="relative group rounded-xl overflow-hidden shadow-2xl bg-slate-950">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet bg-white/50 !w-2 !h-2 !transition-all',
            bulletActiveClass: '!bg-red-600 !w-8 !rounded-full',
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          loop={true}
          className="aspect-[16/9] md:aspect-[21/9] w-full"
        >
          {articles.map((article, idx) => (
            <SwiperSlide key={article.id}>
              <div className="relative w-full h-full">
                <Image
                  src={`${article.image}&w=1400`}
                  alt={`${article.title} - TeknoVarta Featured News`}
                  fill
                  className="object-cover opacity-70"
                  priority={idx === 0}
                  sizes="100vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge className="bg-red-600 text-white w-fit mb-4 rounded-none px-4 py-1.5 font-black uppercase tracking-[0.2em] border-none text-[9px]">
                      {article.category}
                    </Badge>
                    <Link href={`/artikel/${article.slug}`}>
                      <h2 className="text-3xl md:text-5xl lg:text-7xl font-sans font-black text-white mb-6 line-clamp-2 hover:text-red-500 transition-all tracking-tighter leading-[0.9] italic uppercase">
                        {article.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-6 text-slate-300 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-red-600" />
                        <span>BY {article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-red-600" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-red-600 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-red-600 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block">
          <ChevronRight className="h-6 w-6" />
        </button>

        <style jsx global>{`
          .swiper-pagination-bullets {
            bottom: 30px !important;
            text-align: right !important;
            padding-right: 50px;
          }
          @media (max-width: 768px) {
            .swiper-pagination-bullets {
              bottom: 10px !important;
              padding-right: 20px;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: `.prev-${articles[0]?.id}`,
          nextEl: `.next-${articles[0]?.id}`,
        }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
        className="w-full"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <div className="group/card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden h-full flex flex-col hover:border-red-600 transition-colors duration-500 shadow-sm">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`${article.image}&w=800`}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <Badge className="absolute top-3 left-3 bg-red-600 text-white rounded-none border-none text-[8px] font-black uppercase tracking-widest">
                  {article.category}
                </Badge>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <Link href={`/artikel/${article.slug}`}>
                  <h3 className="font-sans font-black text-slate-950 dark:text-slate-100 text-lg leading-tight line-clamp-2 hover:text-red-600 transition-colors mb-4 italic uppercase tracking-tighter">
                    {article.title}
                  </h3>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <span>{article.date}</span>
                   </div>
                   <div className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1 group/btn">
                      READ <ChevronRight className="h-2 w-2 group-hover/btn:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Categories Navigation */}
      <div className="absolute -top-16 right-0 flex gap-2">
         <button className={`prev-${articles[0]?.id} p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-red-600 hover:text-white transition-all text-slate-400`}>
            <ChevronLeft className="h-4 w-4" />
         </button>
         <button className={`next-${articles[0]?.id} p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-red-600 hover:text-white transition-all text-slate-400`}>
            <ChevronRight className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
}
