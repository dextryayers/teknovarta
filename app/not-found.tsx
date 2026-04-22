'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, Globe, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [ip, setIp] = useState<string>('Detecting...');

  useEffect(() => {
    // Fetch Public IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('Unable to detect'));
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/404.webp" 
          alt="404 Page Not Found - TeknoVarta" 
          fill
          className="object-cover opacity-40 grayscale"
          priority
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.src = 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1000&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-4xl text-center"
      >
        <div className="space-y-6 mb-12">
           <div className="flex items-center justify-center gap-3 text-red-500 mb-6">
              <ShieldAlert className="h-8 w-8" />
              <span className="text-xs font-black uppercase tracking-[0.6em]">Security Alert: Restricted Access</span>
           </div>
           <h1 className="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tighter italic leading-none">404 <br/> <span className="text-red-600">LOST.</span></h1>
        </div>

        <div className="space-y-12">
           <p className="text-xl md:text-2xl font-bold text-slate-300 uppercase tracking-wide max-w-2xl mx-auto leading-relaxed">
             Sistem TeknoVarta mendeteksi Anda mencoba mengakses koordinat yang tidak terdaftar.
           </p>

           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* User IP Tracker Box - Premium Style */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] flex items-center gap-8 shadow-2xl min-w-[300px]">
                 <div className="h-14 w-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                    <Globe className="h-8 w-8" />
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 font-mono">AUTHORIZED IP</p>
                    <p className="text-2xl font-black text-white font-mono tracking-tight">{ip}</p>
                 </div>
              </div>

              <Link href="/" className="group h-32 px-12 bg-white text-slate-950 rounded-[2.5rem] flex items-center gap-6 transition-all hover:bg-red-600 hover:text-white shadow-2xl active:scale-95">
                 <ArrowLeft className="h-8 w-8 group-hover:-translate-x-4 transition-all duration-500" />
                 <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Return Protocol</p>
                    <p className="text-2xl font-black uppercase tracking-tighter">BERANDA</p>
                 </div>
              </Link>
           </div>

           <div className="pt-20 flex items-center justify-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-[0.8em]">
              <Zap className="h-4 w-4" /> TEKNOVARTA EMERGENCY PROTOCOL <Zap className="h-4 w-4" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
