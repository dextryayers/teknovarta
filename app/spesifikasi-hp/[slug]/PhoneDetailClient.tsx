'use client';

import { PHONE_SPECS } from '@/lib/phone-specs';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Cpu, 
  Battery, 
  Smartphone, 
  Camera, 
  Monitor, 
  Layers, 
  Wifi, 
  Bluetooth, 
  MapPin, 
  HardDrive,
  Calendar,
  Weight,
  Maximize2,
  ArrowLeft,
  Share2,
  Bookmark,
  Youtube,
  Zap,
  ShieldCheck,
  ArrowRight,
  ChevronRight
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
        <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">HP Tidak Ditemukan</h1>
          <p className="text-slate-500 mb-8">Maaf, data spesifikasi untuk perangkat ini belum tersedia di database kami.</p>
          <Button onClick={() => router.push('/spesifikasi-hp')} className="bg-red-600 hover:bg-slate-950">
            KEMBALI KE INDEKS
          </Button>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  const specCategories = [
    { title: "NETWORK", icon: Wifi, data: phone.specs.network, color: "text-blue-600" },
    { title: "LAUNCH", icon: Calendar, data: phone.specs.launch, color: "text-green-600" },
    { title: "BODY", icon: Layers, data: phone.specs.body, color: "text-orange-600" },
    { title: "DISPLAY", icon: Monitor, data: phone.specs.display, color: "text-purple-600" },
    { title: "PLATFORM", icon: Cpu, data: phone.specs.platform, color: "text-red-600" },
    { title: "MEMORY", icon: HardDrive, data: phone.specs.memory, color: "text-pink-600" },
    { title: "MAIN CAMERA", icon: Camera, data: phone.specs.mainCamera, color: "text-indigo-600" },
    { title: "SELFIE CAMERA", icon: Camera, data: phone.specs.selfieCamera, color: "text-teal-600" },
    { title: "SOUND", icon: Smartphone, data: phone.specs.sound, color: "text-yellow-600" },
    { title: "COMMS", icon: Bluetooth, data: phone.specs.comms, color: "text-cyan-600" },
    { title: "FEATURES", icon: Zap, data: phone.specs.features, color: "text-amber-600" },
    { title: "BATTERY", icon: Battery, data: phone.specs.battery, color: "text-emerald-600" },
    { title: "MISC", icon: MapPin, data: phone.specs.misc, color: "text-slate-600" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pb-20 transition-colors duration-500">
      {/* Premium Header Container */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
            <Link href="/" className="hover:text-red-600">HOME</Link>
            <ChevronRight className="h-3 w-3 opacity-30" />
            <Link href="/spesifikasi-hp" className="hover:text-red-600">SPEK HP</Link>
            <ChevronRight className="h-3 w-3 opacity-30" />
            <span className="text-slate-900 dark:text-slate-200">{phone.name.toUpperCase()}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Gallery Section */}
            <div className="w-full lg:w-1/3 shrink-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[3/4] bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-12 flex items-center justify-center shadow-2xl shadow-slate-200/50 dark:shadow-none"
              >
                 <Image 
                   src={phone.image} 
                   alt={phone.name} 
                   fill 
                   className="object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]" 
                   referrerPolicy="no-referrer"
                   priority
                 />
                 <button className="absolute bottom-6 right-6 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl hover:scale-110 transition-transform">
                    <Maximize2 className="h-5 w-5 text-slate-900 dark:text-white" />
                 </button>
              </motion.div>
            </div>

            {/* Title & Quick Summary Section */}
            <div className="flex-1 space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-red-600 dark:bg-red-700 rounded-none border-none font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 shadow-lg shadow-red-600/20">
                    {phone.brand}
                  </Badge>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{phone.type}</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-[0.85] mb-8">
                  {phone.name}
                </h1>
              </div>

              {/* Functional Icons Grid (GSMArena Summary) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-1 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                  <Monitor className="h-6 w-6 text-purple-600" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">DISPLAY</span>
                  <span className="text-xs font-bold font-mono tracking-tighter leading-tight line-clamp-2">{phone.specs.display.size.split(',')[0]}</span>
                </div>
                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                  <Camera className="h-6 w-6 text-indigo-600" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">CAMERA</span>
                  <span className="text-xs font-bold font-mono tracking-tighter leading-tight line-clamp-2">{phone.specs.mainCamera.modules.split(',')[0]}</span>
                </div>
                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                  <Cpu className="h-6 w-6 text-red-600" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">CHIPSET</span>
                  <span className="text-xs font-bold font-mono tracking-tighter leading-tight line-clamp-2">{phone.specs.platform.chipset.split('(')[0]}</span>
                </div>
                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                  <Battery className="h-6 w-6 text-emerald-600" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">BATTERY</span>
                  <span className="text-xs font-bold font-mono tracking-tighter leading-tight line-clamp-2">{phone.specs.battery.type.split('mAh')[0]} mAh</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#0a66c2] hover:bg-slate-950 px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                  <Share2 className="mr-3 h-4 w-4" /> BAGIKAN SPEK
                </Button>
                <Button variant="outline" className="px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-all">
                  <Bookmark className="mr-3 h-4 w-4" /> SIMPAN DATABASE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GSMArena Style Detailed Specification Tables */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-20">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic border-b-8 border-red-600 pb-4 inline-block transform -skew-x-12">
              Full <span className="text-red-600">Specifications.</span>
            </h2>

            <div className="space-y-12">
              {specCategories.map((category, idx) => (
                <div key={idx} className="group scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <category.icon className={cn("h-5 w-5", category.color)} />
                    <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-[0.3em] font-mono">{category.title}</h3>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {Object.entries(category.data).map(([key, value], i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-10 border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <div className="md:col-span-3 px-8 py-6 bg-slate-50/50 dark:bg-slate-800/20 text-[10px] font-black text-red-600 uppercase tracking-widest border-r border-slate-100 dark:border-slate-800">
                          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </div>
                        <div className="md:col-span-7 px-8 py-6 text-sm font-semibold text-slate-800 dark:text-slate-300 leading-relaxed antialiased whitespace-pre-wrap lowercase first-letter:uppercase">
                          {value as string}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] relative overflow-hidden shadow-sm">
                <ShieldCheck className="h-20 w-20 text-blue-600/5 absolute -right-4 -bottom-4 rotate-12" />
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4" /> Disclaimer TeknoVarta
                </h4>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic leading-[2] antialiased">
                  Informasi "Smartphone Specification" yang kami sajikan dirangkum secara mendalam dari berbagai sumber akurat termasuk GSMArena dan Database Internal Hanif Abdurrohim. Kami berupaya menjaga akurasi 100%, namun spesifikasi dapat berubah sewaktu-waktu tergantung wilayah pemasaran dan update software produsen. Harap verifikasi kembali sebelum melakukan pembelian.
                </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-12">
              <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-5 blur-[80px] rounded-full group-hover:opacity-10 transition-opacity"></div>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10 border-l-4 border-red-600 pl-6">Unit Terkait</h3>
                <div className="space-y-8">
                  {PHONE_SPECS.filter(p => p.brand === phone.brand && p.id !== phone.id).slice(0, 5).map(p => (
                    <Link key={p.id} href={`/spesifikasi-hp/${p.slug}`} className="flex items-center gap-6 group/item">
                       <div className="h-20 w-20 bg-white/5 rounded-[1.5rem] border border-white/10 flex items-center justify-center p-4 group-hover/item:border-red-600/50 transition-all overflow-hidden shrink-0">
                         <Image src={p.image} alt={p.name} width={50} height={50} className="object-contain group-hover/item:scale-110 transition-transform" />
                       </div>
                       <div className="flex-1 border-b border-white/5 pb-4">
                         <h4 className="text-sm font-black text-white group-hover/item:text-red-500 transition-colors uppercase tracking-widest">{p.name}</h4>
                         <p className="text-[8px] font-black text-slate-500 uppercase mt-2">{p.brand} Flagship</p>
                       </div>
                    </Link>
                  ))}
                </div>
                <Link href="/spesifikasi-hp" className="mt-12 flex items-center justify-center gap-2 p-5 bg-white/5 hover:bg-red-600 text-[10px] font-black text-white uppercase tracking-widest transition-all rounded-2xl group/btn">
                  KE DATABASE INDEKS <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] aspect-[4/5] bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center gap-4">
                <div className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em] mb-4">ADVERTISEMENT</div>
                <div className="w-24 h-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-slate-400 dark:text-slate-600 font-bold text-sm tracking-widest italic antialiased px-8 leading-loose">
                  SPACE TERSEDIA<br/>300 X 600<br/>REDAKSI@TEKNOVARTA.COM
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
