'use client';

import { PHONE_SPECS } from '@/lib/phone-specs';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Smartphone, Zap, Clock, Star, Filter, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function PhoneSpecsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const brands = ['All', ...Array.from(new Set(PHONE_SPECS.map(p => p.brand)))];

  const filteredPhones = PHONE_SPECS.filter(phone => {
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || phone.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  if (!mounted) return null;

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen pt-24 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Link href="/" className="hover:text-red-600 transition-colors uppercase">HOME</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-900 dark:text-slate-200 font-bold uppercase">DATABASE SPEK HP</span>
        </nav>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Spesifikasi Smartphone Lengkap <span className="text-red-600">Terupdate</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base font-medium leading-relaxed">
            Database spesifikasi smartphone terlengkap 2023-2026. Cari dan bandingkan detail chipset, kamera, baterai, dan harga terbaru secara akurat sesuai standar jurnalisme teknologi.
          </p>
        </div>

        {/* Featured Slider - Latest 2026 Releases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {PHONE_SPECS.filter(p => p.releasedYear === 2026).slice(0, 3).map((phone, idx) => (
             <Link key={phone.id} href={`/spesifikasi-hp/${phone.slug}`} className="group relative h-64 bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
                <Image 
                  src={phone.image} 
                  alt={phone.name} 
                  fill 
                  className="object-contain p-12 opacity-50 group-hover:opacity-80 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-8 flex flex-col justify-end">
                   <div className="flex gap-2 mb-4">
                      <Badge className="bg-red-600 rounded-none font-black text-[7px] uppercase tracking-widest">{phone.brand}</Badge>
                      <Badge variant="outline" className="text-white border-white/20 rounded-none font-black text-[7px] uppercase tracking-widest">NEW 2026</Badge>
                   </div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-2">{phone.name}</h3>
                   <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>{phone.specs.platform.chipset.split(' (')[0].toUpperCase()}</span>
                      <span className="h-1 w-1 rounded-full bg-red-600"></span>
                      <span>{phone.specs.battery.type.split('mAh')[0]} mAh</span>
                   </div>
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                   <ArrowRight className="h-6 w-6 text-white" />
                </div>
             </Link>
           ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 shadow-sm mb-12 flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari Tipe HP (Contoh: Samsung S26)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none h-12 pl-12 pr-4 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={cn(
                  "px-6 h-12 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap",
                  selectedBrand === brand 
                    ? "bg-slate-950 dark:bg-red-600 text-white border-transparent" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-red-600"
                )}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Display */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {selectedBrand === 'All' ? 'SEMUA TIPE' : selectedBrand.toUpperCase()} HP
            </h2>
            <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPhones.map((phone, idx) => (
                <motion.div
                  key={phone.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  <Link href={`/spesifikasi-hp/${phone.slug}`} className="block h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[3/4] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
                      <Image 
                        src={phone.image} 
                        alt={phone.name} 
                        fill 
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <Badge className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded-none font-bold text-[7px] tracking-widest uppercase border-none">
                        {phone.brand}
                      </Badge>
                    </div>
                    
                    <div className="p-4 flex flex-col items-center text-center">
                      <h3 className="text-sm font-black text-slate-950 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-tight h-10 flex items-center justify-center uppercase tracking-tighter">
                        {phone.name}
                      </h3>
                      <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-3"></div>
                      <div className="space-y-1">
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{phone.specs.platform.chipset.split(' (')[0]}</div>
                        <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
                          <span>{phone.specs.memory.internal.split(' ')[0]} RAM</span>
                          <span className="opacity-30">•</span>
                          <span>{phone.specs.battery.type.split('mAh')[0]} mAh</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {filteredPhones.length === 0 && (
          <div className="py-40 text-center">
            <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Data Tidak Ditemukan</h3>
            <p className="text-slate-500 mt-2">Coba kata kunci lain atau pilih brand yang tersedia.</p>
          </div>
        )}

      </div>
    </div>
  );
}
