'use client';

import { PHONE_SPECS } from '@/lib/phone-specs';
import { generatePhoneAISummary } from '@/lib/phone-ai-summary';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Cpu, Battery, Camera, Monitor, Layers, Wifi, 
  Bluetooth, HardDrive, Calendar, Share2, 
  CheckCircle2, XCircle, Info, ChevronRight,
  ShieldCheck, AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function PhoneDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const phone = PHONE_SPECS.find(p => p.slug === slug);

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm max-w-md w-full">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h1 className="text-2xl font-black mb-2 uppercase tracking-tight">Data Tidak Ditemukan</h1>
          <p className="text-slate-500 text-sm mb-6">Spesifikasi untuk tipe HP ini belum tercatat dalam pangkalan data redaksi kami.</p>
          <Button onClick={() => router.push('/spesifikasi-hp')} className="bg-red-600 hover:bg-slate-950 w-full rounded-none">
            KEMBALI KE INDEKS
          </Button>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  const aiSummary = generatePhoneAISummary(phone);

  const specCategories = [
    { title: "NETWORK", icon: Wifi, data: phone.specs.network },
    { title: "LAUNCH", icon: Calendar, data: phone.specs.launch },
    { title: "BODY", icon: Layers, data: phone.specs.body },
    { title: "DISPLAY", icon: Monitor, data: phone.specs.display },
    { title: "PLATFORM", icon: Cpu, data: phone.specs.platform },
    { title: "MEMORY", icon: HardDrive, data: phone.specs.memory },
    { title: "MAIN CAMERA", icon: Camera, data: phone.specs.mainCamera },
    { title: "SELFIE CAMERA", icon: Camera, data: phone.specs.selfieCamera },
    { title: "COMMS", icon: Bluetooth, data: phone.specs.comms },
    { title: "BATTERY", icon: Battery, data: phone.specs.battery },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb News Style */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="hover:text-red-600 transition-colors">HOME</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/spesifikasi-hp" className="hover:text-red-600 transition-colors">DATABASE SPESIFIKASI</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-red-600">{phone.brand}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-200">{phone.name}</span>
        </nav>

        {/* Headline Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-slate-900 dark:bg-red-600 text-white hover:bg-red-700 rounded-none border-none font-bold text-xs uppercase tracking-widest px-3 py-1">
              REVIEW SPEK
            </Badge>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="h-3 w-3" /> Dirilis {phone.releasedYear}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white uppercase tracking-tight leading-[1.1] mb-6">
            Spesifikasi Lengkap & Review Singkat {phone.name}
          </h1>
          <div className="flex items-center justify-between border-y border-slate-200 dark:border-slate-800 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center font-black">
                TV
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Redaksi TeknoVarta</p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase">Tech Specification Database</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-none border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </header>

        {/* Main Article Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <article className="lg:col-span-8">
            
            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 mb-10 flex items-center justify-center relative group"
            >
               <Image 
                 src={phone.image} 
                 alt={phone.name} 
                 width={400}
                 height={500}
                 className="object-contain max-h-[500px] transition-transform duration-500 group-hover:scale-105" 
                 referrerPolicy="no-referrer"
                 priority
               />
               <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                  OFFICIAL RENDER
               </div>
            </motion.div>

            {/* AI Summary Section (Blog Review Format) */}
            <section className="mb-16 prose prose-lg prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-black uppercase tracking-tight border-l-4 border-red-600 pl-4 mb-6">Analisis TeknoVarta</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-lg md:text-xl">
                {aiSummary.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                {/* Pros */}
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-6">
                  <h3 className="text-emerald-800 dark:text-emerald-400 font-black uppercase tracking-widest text-sm flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5" /> Keunggulan Utama
                  </h3>
                  <ul className="space-y-3">
                    {aiSummary.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-emerald-900 dark:text-emerald-100">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 p-6">
                  <h3 className="text-red-800 dark:text-red-400 font-black uppercase tracking-widest text-sm flex items-center gap-2 mb-4">
                    <XCircle className="h-5 w-5" /> Catatan Kekurangan
                  </h3>
                  <ul className="space-y-3">
                    {aiSummary.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-red-900 dark:text-red-100">
                        <span className="text-red-500 font-bold mt-0.5">•</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 p-6 my-8 not-prose">
                <h3 className="text-blue-800 dark:text-blue-400 font-black uppercase tracking-widest text-sm flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5" /> Rekomendasi Target Pengguna
                </h3>
                <p className="text-blue-900 dark:text-blue-100 text-sm leading-relaxed">
                  {aiSummary.recommendation}
                </p>
              </div>
            </section>

            {/* GSMArena Style Detailed Specification Tables */}
            <section className="mb-16">
              <h2 className="text-2xl font-black uppercase tracking-tight border-b-2 border-slate-900 dark:border-white pb-3 mb-8">
                Tabel Spesifikasi Teknis
              </h2>

              <div className="space-y-0 border-t border-slate-200 dark:border-slate-800">
                {specCategories.map((category, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <div className="md:w-48 p-4 shrink-0 border-r border-slate-100 dark:border-slate-800/50 flex items-center gap-3">
                      <category.icon className="h-5 w-5 text-red-600 hidden md:block" />
                      <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">{category.title}</h3>
                    </div>
                    
                    <div className="flex-1 w-full">
                      {Object.entries(category.data).map(([key, value], i) => {
                        if (!value) return null;
                        return (
                          <div key={i} className="flex flex-col sm:flex-row border-b last:border-0 border-slate-100 dark:border-slate-800/50">
                            <div className="sm:w-1/4 px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="sm:w-3/4 px-4 py-3 text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-serif whitespace-pre-wrap">
                              {value as string}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </article>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Quick Spec Highlights */}
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Sorotan Utama</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                    <Monitor className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Layar</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{phone.specs.display.size.split(',')[0]}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                    <Camera className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kamera</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{phone.specs.mainCamera.modules.split(',')[0]}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                    <Cpu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chipset</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{phone.specs.platform.chipset.split('(')[0]}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                    <Battery className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Baterai</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{phone.specs.battery.type.split(',')[0]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Phones Widget */}
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="bg-red-600 px-6 py-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Seri Lain dari {phone.brand}</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {PHONE_SPECS.filter(p => p.brand === phone.brand && p.id !== phone.id).slice(0, 5).map(p => (
                  <Link key={p.id} href={`/spesifikasi-hp/${p.slug}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                    <div className="h-14 w-14 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-1 shrink-0 flex items-center justify-center">
                      <Image src={p.image} alt={p.name} width={40} height={40} className="object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors uppercase tracking-wide leading-tight">{p.name}</h4>
                      <p className="text-[10px] font-medium text-slate-500 uppercase mt-1">{p.releasedYear}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Banner Space */}
            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Iklan</span>
              <p className="text-sm font-semibold text-slate-500 italic">Space Iklan Tersedia</p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
