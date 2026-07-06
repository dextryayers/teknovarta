'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Rocket, Shield, Cpu, Github, Globe, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="mb-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0a66c2] transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" /> Kembali ke Portal
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-black text-slate-950 dark:text-white tracking-tighter italic uppercase leading-[0.8] mb-6">
                MASA DEPAN <br />
                <span className="text-[#0a66c2]">TEKNOLOGI.</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                TeknoVarta adalah portal media independen yang didedikasikan untuk mengeksplorasi batas-batas inovasi digital dan dampaknya terhadap masyarakat global.
              </p>
            </div>
            <div className="md:text-right">
              <Badge className="bg-slate-950 text-white rounded-none border-none px-6 py-2 font-black uppercase tracking-widest text-[10px] mb-4">EST. 2026</Badge>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Jakarta, Indonesia</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-[#0a66c2]">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Visi Inovasi</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Menjadi mercusuar informasi teknologi paling akurat di Asia Tenggara, memberikan wawasan yang mendalam dan analisis yang kritis terhadap setiap perkembangan digital.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Integritas Jurnalistik</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Setiap berita kami diverifikasi oleh pakar di bidangnya. Kami mengutamakan fakta di atas sensasi demi literasi digital Indonesia yang lebih baik.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border border-slate-100 dark:border-slate-800 rounded-[40px] -z-10"></div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Star className="h-32 w-32 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
              </div>
              <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Misi Kami</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="h-5 w-5 rounded-full bg-blue-500 shrink-0 mt-1 flex items-center justify-center text-white text-[8px] font-black">01</div>
                  <p className="text-sm font-bold uppercase tracking-wide">Mendukung ekosistem startup lokal.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-5 w-5 rounded-full bg-red-600 shrink-0 mt-1 flex items-center justify-center text-white text-[8px] font-black">02</div>
                  <p className="text-sm font-bold uppercase tracking-wide">Edukasi siber untuk masyarakat awam.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-5 w-5 rounded-full bg-slate-950 shrink-0 mt-1 flex items-center justify-center text-white text-[8px] font-black">03</div>
                  <p className="text-sm font-bold uppercase tracking-wide">Eksplorasi hardware & future tech.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">Otak di Balik <span className="text-[#0a66c2]">Mesin.</span></h2>
            <div className="h-1 w-20 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-16 bg-slate-950 rounded-[40px] overflow-hidden p-8 md:p-16 text-white relative">
            <div className="absolute top-10 right-10 opacity-20">
              <Cpu className="h-40 w-40 text-blue-500 animate-pulse" />
            </div>
            
            <div className="relative w-full max-w-sm aspect-square md:w-[400px] shrink-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5">
              <Image 
                src="/images/developer.jpeg" 
                alt="Hanif Abdurrohim" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1 space-y-8 relative z-10">
              <div>
                <Badge className="bg-blue-600 text-white rounded-none border-none mb-4 font-black uppercase tracking-widest text-[9px]">Lead Developer & Editor</Badge>
                <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Hanif Abdurrohim</h3>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mt-2">Full-Stack Architect & Tech Visionary</p>
              </div>
              
              <p className="text-lg md:text-xl text-slate-400 italic font-medium leading-relaxed">
                "Teknologi bukan hanya tentang kode dan sirkuit, tapi tentang bagaimana kita mendefinisikan kembali batasan kemanusiaan melalui inovasi."
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com/dextryayers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants(), "bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white px-8 h-12 rounded-full transition-all")}
                >
                  <Github className="mr-2 h-4 w-4" /> GITHUB
                </a>
                <a 
                  href="https://haniip.space" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "border-white/20 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-950 px-8 h-12 rounded-full transition-all bg-transparent")}
                >
                  <Globe className="mr-2 h-4 w-4" /> PORTFOLIO
                </a>
                <a 
                  href="https://haniplabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "border-white/20 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-950 px-8 h-12 rounded-full transition-all bg-transparent")}
                >
                  <Globe className="mr-2 h-4 w-4" /> RESUME
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Mini Section */}
        <div className="py-20 border-t border-slate-100 dark:border-slate-800">
           <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12">BUILT WITH ADVANCED STACK</p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-black italic tracking-tighter">NEXT.JS 15</span>
              <span className="text-2xl font-black italic tracking-tighter">TAILWIND 4</span>
              <span className="text-2xl font-black italic tracking-tighter">TYPESCRIPT</span>
              <span className="text-2xl font-black italic tracking-tighter">GEMINI AI</span>
              <span className="text-2xl font-black italic tracking-tighter">SWIPER.JS</span>
           </div>
        </div>
      </div>
    </main>
  );
}
