'use client';

import { PHONE_SPECS } from '@/lib/phone-specs';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, TrendingUp, Flame } from 'lucide-react';
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

  // GSMArena style brand listing with counts
  const brandCounts = PHONE_SPECS.reduce((acc, phone) => {
    acc[phone.brand] = (acc[phone.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const brands = Object.keys(brandCounts).sort();

  const filteredPhones = PHONE_SPECS.filter(phone => {
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || phone.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Mock Top 10 by daily interest
  const top10Phones = [...PHONE_SPECS].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 10);

  if (!mounted) return null;

  return (
    <div className="bg-[#f3f4f6] dark:bg-[#0b1120] min-h-screen pt-24 md:pt-28 pb-20 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumbs - Ultra Modern */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-800/50"
        >
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-600 dark:text-slate-300">Phone Database</span>
          {selectedBrand !== 'All' && (
            <>
              <ChevronRight className="h-3 w-3 opacity-30" />
              <span className="text-red-600 dark:text-red-500">{selectedBrand}</span>
            </>
          )}
        </motion.nav>

        {/* MOBILE BRAND FILTER */}
        <div className="lg:hidden mb-6">
           <select 
             value={selectedBrand}
             onChange={(e) => setSelectedBrand(e.target.value)}
             className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 h-12 px-4 text-sm rounded-xl outline-none text-slate-800 dark:text-slate-200 shadow-sm font-bold focus:ring-2 focus:ring-red-600 transition-all appearance-none"
           >
              <option value="All">All Brands ({PHONE_SPECS.length})</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand} ({brandCounts[brand]})</option>
              ))}
           </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* LEFT SIDEBAR - BRANDS */}
          <aside className="hidden lg:block w-48 shrink-0">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-none rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden sticky top-28"
            >
               <div className="bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3">
                 <h3 className="text-xs font-black text-white uppercase tracking-widest">Brand Index</h3>
               </div>
               
               {/* Custom Scrollbar Area */}
               <div className="flex flex-col text-[13px] font-semibold text-slate-600 dark:text-slate-400 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full pb-2">
                  <button 
                    onClick={() => setSelectedBrand('All')}
                    className={cn(
                      "flex justify-between px-4 py-2.5 transition-all text-left mx-2 mt-2 rounded-xl",
                      selectedBrand === 'All' 
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <span>All Brands</span>
                    <span className="text-slate-400 text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">{PHONE_SPECS.length}</span>
                  </button>
                  {brands.map(brand => (
                    <button 
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={cn(
                        "flex justify-between items-center px-4 py-2 transition-all text-left mx-2 mb-1 rounded-xl",
                        selectedBrand === brand 
                          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" 
                          : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      <span className="truncate pr-2">{brand}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-md shrink-0",
                        selectedBrand === brand ? "bg-red-100 dark:bg-red-900/50 text-red-600" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      )}>{brandCounts[brand]}</span>
                    </button>
                  ))}
               </div>
            </motion.div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            
            {/* SEARCH BAR (Ultra Modern) */}
            <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-none rounded-2xl mb-6 flex items-center border border-slate-200/50 dark:border-slate-800/50 p-2"
            >
              <div className="relative w-full">
                <input 
                  type="text"
                  placeholder="Search over 12,000+ devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-transparent h-12 pl-5 pr-14 text-sm focus:border-red-600/50 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all rounded-xl text-slate-800 dark:text-slate-200 font-medium placeholder:text-slate-400"
                />
                <button className="absolute right-1 top-1 h-10 w-12 flex items-center justify-center bg-gradient-to-br from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/20 transition-all active:scale-95">
                   <Search className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* PHONES GRID */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl shadow-slate-200/20 dark:shadow-none rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden min-h-[60vh]"
            >
              <div className="bg-white/50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center backdrop-blur-md">
                 <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1.5 h-4 bg-red-600 rounded-full block"></span>
                   {searchQuery ? 'Search Results' : (selectedBrand === 'All' ? 'Latest Devices' : `${selectedBrand} Phones`)}
                 </h2>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">{filteredPhones.length} devices</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-10 gap-x-6">
                  <AnimatePresence>
                    {filteredPhones.map((phone, idx) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx > 20 ? 0 : idx * 0.02 }}
                        key={phone.id}
                      >
                        <Link href={`/spesifikasi-hp/${phone.slug}`} className="group flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50">
                          <div className="h-32 w-full relative mb-5 flex items-center justify-center">
                            <Image 
                                src={phone.image} 
                                alt={phone.name} 
                                fill 
                                className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
                                referrerPolicy="no-referrer"
                            />
                          </div>
                          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {phone.name}
                          </h3>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredPhones.length === 0 && (
                  <div className="py-24 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 mt-4">
                    <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                    <p className="font-bold text-lg text-slate-500">No devices found</p>
                    <p className="text-xs font-medium mt-1">Try searching for another model or brand</p>
                  </div>
                )}
              </div>
            </motion.div>
          </main>

          {/* RIGHT SIDEBAR - WIDGETS */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
             {/* Top 10 Widget - Ultra Modern */}
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl shadow-slate-200/20 dark:shadow-none rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
             >
               <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                 <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg">
                   <Flame className="h-4 w-4 text-red-600 dark:text-red-500" />
                 </div>
                 <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Trending Top 10</h3>
               </div>
               <div className="flex flex-col p-2">
                 {top10Phones.map((phone, idx) => (
                   <Link key={phone.id} href={`/spesifikasi-hp/${phone.slug}`} className="flex items-center justify-between px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl group transition-all">
                     <div className="flex items-center gap-3 min-w-0">
                        <span className={cn(
                          "flex items-center justify-center text-[10px] font-black w-6 h-6 rounded-md",
                          idx < 3 ? "bg-red-600 text-white shadow-md shadow-red-600/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                        )}>
                          {idx + 1}
                        </span>
                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {phone.name}
                        </span>
                     </div>
                     <div className="text-[10px] font-black text-slate-400 flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        {250 - (idx * 15)}K
                     </div>
                   </Link>
                 ))}
               </div>
             </motion.div>

             {/* Phone Finder Widget */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 shadow-xl rounded-2xl overflow-hidden p-6 text-center relative"
             >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 blur-3xl rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="mx-auto bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-black mb-1">Advanced Finder</h3>
                  <p className="text-[10px] font-medium text-slate-400 mb-6">Filter by specs, price, and features</p>
                  <button className="px-4 py-3 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl w-full hover:bg-slate-100 transition-colors shadow-lg active:scale-95 border border-transparent">
                    Launch Finder
                  </button>
                </div>
             </motion.div>
          </aside>

        </div>
      </div>
    </div>
  );
}
