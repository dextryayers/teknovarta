import { VIDEOS } from '@/lib/videos';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Play, Eye, Clock, User, Share2, Facebook, Twitter, MessageCircle, ChevronRight, Bookmark, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import VideoCard from '@/components/VideoCard';
import { Metadata } from 'next';

interface VideoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = VIDEOS.find(v => v.slug === slug);

  if (!video) return {};

  return {
    title: video.title,
    description: `Tonton video ${video.title} di TeknoVarta.`,
    openGraph: {
      title: video.title,
      description: `Tonton video ${video.title} di TeknoVarta.`,
      type: 'video.other',
      images: [{ url: video.thumbnail }]
    }
  };
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { slug } = await params;
  const video = VIDEOS.find(v => v.slug === slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = VIDEOS.filter(v => v.category === video.category && v.id !== video.id).slice(0, 3);
  const upNextVideos = VIDEOS.filter(v => v.id !== video.id).slice(0, 5);

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-8">
           <Link 
             href="/watch/video" 
             className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors"
           >
             <ArrowLeft className="h-3 w-3" /> Kembali ke Video
           </Link>
           <nav className="hidden md:flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
             <Link href="/" className="hover:text-red-600">Home</Link>
             <ChevronRight className="h-3 w-3" />
             <Link href="/watch/video" className="hover:text-red-600">Video</Link>
             <ChevronRight className="h-3 w-3" />
             <span className="text-slate-700 dark:text-slate-300 line-clamp-1">{video.category.replace('-', ' ')}</span>
           </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* MAIN PLAYER AREA */}
          <main className="lg:col-span-8">
            <div className="bg-black aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 relative group">
              <iframe 
                src={video.videoUrl} 
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                 <div className="space-y-4 flex-1">
                    <Badge className="bg-red-600 rounded-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest">{video.category.replace('-', ' ')}</Badge>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter italic">
                      {video.title}
                    </h1>
                 </div>
                 <div className="flex items-center gap-3 shrink-0">
                    <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-red-600 transition-all text-slate-600 dark:text-slate-400">
                       <Bookmark className="h-5 w-5" />
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-950 transition-all shadow-xl shadow-blue-100 dark:shadow-none">
                       <Share2 className="h-4 w-4" /> Share
                    </button>
                 </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-widest text-slate-500">
                 <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-red-600">
                       <User className="h-4 w-4" />
                    </div>
                    <span className="text-slate-900 dark:text-slate-100">{video.author}</span>
                 </div>
                 <div className="flex items-center gap-2"><Eye className="h-4 w-4" /> {formatNumber(video.views)} Ditonton</div>
                 <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {video.date}</div>
              </div>

              {/* Tag Section */}
              <div className="flex flex-wrap gap-2 py-4">
                {video.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md text-[9px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors">
                    #{tag.replace(' ', '')}
                  </span>
                ))}
              </div>

              {/* Description Placeholder */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                 <p className="mb-4">Informasi video &quot;{video.title}&quot;:</p>
                 <p>TeknoVarta membawakan tutorial dan wawasan mendalam mengenai perkembangan teknologi terkini. Video ini secara khusus membahas topik {video.category.replace('-', ' ')} dengan detail yang mudah dipahami baik untuk pemula maupun profesional paka teknologi.</p>
                 <p className="mt-4">Tim redaksi kami terus memperbarui koleksi video dengan konten yang relevan dan akurat. Pastikan Anda berlangganan kanal kami untuk mendapatkan update otomatis.</p>
              </div>
            </div>

            {/* Related Content Below */}
            <div className="mt-16">
               <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-4 uppercase tracking-[0.2em] italic after:content-[''] after:flex-1 after:h-[1px] after:bg-slate-200 dark:after:bg-slate-800">
                 Video Terkait
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedVideos.map(v => (
                    <VideoCard key={v.id} video={v} />
                  ))}
               </div>
            </div>

            {/* Comments Placeholder */}
            <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-3xl flex flex-col items-center text-center">
               <div className="h-16 w-16 bg-red-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-red-600 mb-6">
                 <MessageCircle className="h-8 w-8" />
               </div>
               <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white italic tracking-tighter">DISKUSI VIDEO</h3>
               <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 text-sm">Bagikan pemikiran atau pertanyaan Anda mengenai video ini pada kolom komentar kami.</p>
               <button className="px-12 py-5 bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-slate-950 transition-all shadow-xl shadow-red-100 dark:shadow-none">
                 PAPAN KOMENTAR
               </button>
            </div>
          </main>

          {/* SIDEBAR: Up Next */}
          <aside className="lg:col-span-4 space-y-12">
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
                <h3 className="text-[12px] font-black text-slate-800 dark:text-white mb-8 uppercase tracking-[0.3em] flex items-center gap-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-slate-200 dark:after:bg-slate-800 italic">
                   BERIKUTNYA
                </h3>
                <div className="space-y-8">
                  {upNextVideos.map(v => (
                    <Link key={v.id} href={`/watch/video/${v.slug}`} className="group flex gap-4 cursor-pointer">
                       <div className="relative h-20 w-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <Image src={v.thumbnail} alt={v.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                             <Play className="h-6 w-6 text-white fill-current" />
                          </div>
                          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-[8px] font-bold text-white px-1.5 py-0.5 rounded">
                            {v.duration}
                          </div>
                       </div>
                       <div className="flex flex-col justify-center min-w-0">
                         <span className="text-[8px] font-black text-red-600 uppercase tracking-widest mb-1">{v.category.replace('-', ' ')}</span>
                         <h4 className="font-bold text-[13px] text-slate-700 dark:text-slate-200 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 uppercase tracking-tighter">
                           {v.title}
                         </h4>
                         <div className="flex items-center gap-3 text-[8px] font-black text-slate-400 mt-2 uppercase tracking-widest">
                            <span>{formatNumber(v.views)} Views</span>
                         </div>
                       </div>
                    </Link>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase text-slate-500 hover:bg-red-600 hover:text-white transition-all rounded-xl tracking-widest">
                   LIHAT INDEKS VIDEO
                </button>
             </div>

             {/* AD SPOT SIDEBAR */}
             <div className="bg-slate-100 dark:bg-slate-800 aspect-square rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">ADVERTISEMENT</div>
                <h4 className="text-xl font-black text-slate-400 dark:text-slate-500 italic uppercase">Your Brand Here</h4>
                <p className="text-xs text-slate-400 font-medium">Jangkau audiens teknologi terbesar di Indonesia.</p>
                <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">INFO IKLAN</button>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
