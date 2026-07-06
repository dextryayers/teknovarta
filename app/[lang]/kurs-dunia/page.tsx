'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Activity, DollarSign, Bitcoin, LineChart, TrendingUp, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

// Dynamically import chart to avoid SSR issues with canvas/window
const LightweightChart = dynamic(() => import('@/components/LightweightChart'), { ssr: false });

type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
};

// Mock data for inflation chart (Time series)
const MOCK_CHART_DATA = [
  { time: '2023-01-01', value: 6.4 },
  { time: '2023-02-01', value: 6.0 },
  { time: '2023-03-01', value: 5.0 },
  { time: '2023-04-01', value: 4.9 },
  { time: '2023-05-01', value: 4.0 },
  { time: '2023-06-01', value: 3.0 },
  { time: '2023-07-01', value: 3.2 },
  { time: '2023-08-01', value: 3.7 },
  { time: '2023-09-01', value: 3.7 },
  { time: '2023-10-01', value: 3.2 },
  { time: '2023-11-01', value: 3.1 },
  { time: '2023-12-01', value: 3.4 },
  { time: '2024-01-01', value: 3.1 },
  { time: '2024-02-01', value: 3.2 },
  { time: '2024-03-01', value: 3.5 },
  { time: '2024-04-01', value: 3.4 },
  { time: '2024-05-01', value: 3.3 },
  { time: '2026-06-01', value: 2.9 },
];

export default function KursDuniaPage() {
  const [activeTab, setActiveTab] = useState<'saham' | 'forex' | 'crypto'>('saham');
  const [data, setData] = useState<{ [key: string]: MarketItem[] }>({
    saham: [],
    forex: [],
    crypto: []
  });
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    async function fetchAll() {
      try {
        const [stocksRes, cryptoRes, forexRes] = await Promise.all([
          fetch('/api/market/stocks'),
          fetch('/api/market/crypto'),
          fetch('/api/market/forex')
        ]);
        
        const stocks = await stocksRes.json();
        const crypto = await cryptoRes.json();
        const forex = await forexRes.json();
        
        setData({
          saham: Array.isArray(stocks) ? stocks : [],
          crypto: Array.isArray(crypto) ? crypto : [],
          forex: Array.isArray(forex) ? forex : [],
        });
      } catch (err) {
        console.error('Failed to fetch market data', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAll();
    const interval = setInterval(fetchAll, 30000); // refresh every 30s for more "live" feel
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price > 1000) return price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const renderBoard = (items: MarketItem[]) => {
    if (loading) {
      return (
        <div className="space-y-2 p-0">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-16 bg-white/40 dark:bg-slate-800/40 animate-pulse rounded-xl border border-white/50 dark:border-slate-700/50" />
          ))}
        </div>
      );
    }

    return (
      <div className="w-full text-sm rounded-2xl overflow-hidden bg-white/70 dark:bg-[#131722]/70 backdrop-blur-3xl border border-white dark:border-[#2a2e39]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        {/* Table Header */}
        <div className="flex items-center text-slate-400 dark:text-[#787b86] font-black py-4 px-6 border-b border-white dark:border-[#2a2e39]/80 text-[10px] uppercase tracking-widest bg-slate-50/50 dark:bg-[#0f121a]/80">
          <div className="flex-1 min-w-[120px]">Aset Global</div>
          <div className="w-[130px] text-right">Live Price</div>
          <div className="w-[110px] text-right">24H Chg</div>
          <div className="w-[110px] text-right">Ubah %</div>
        </div>
        
        {/* Table Body */}
        <div className="flex flex-col">
          {items.map((item, idx) => {
            const isPositive = item.change >= 0;
            const colorClass = isPositive ? 'text-[#089981]' : 'text-[#f23645]';
            const bgGlowClass = isPositive ? 'group-hover:bg-[#089981]/5' : 'group-hover:bg-[#f23645]/5';
            
            const categorySlug = activeTab === 'forex' ? 'kurs' : activeTab;
            let symbolSlug = item.symbol;
            if (activeTab === 'forex') symbolSlug = symbolSlug.replace('USD/', '');
            else if (activeTab === 'crypto') symbolSlug = symbolSlug.replace('USD', ''); 
            
            return (
              <Link
                href={`/kurs-dunia/${categorySlug}/${encodeURIComponent(symbolSlug)}`}
                key={idx} 
                className={cn("group flex items-center py-4 px-6 bg-transparent transition-all duration-300 border-b border-white dark:border-[#2a2e39]/50 last:border-none cursor-pointer", bgGlowClass)}
              >
                {/* Symbol and Name */}
                <div className="flex-1 flex flex-col min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 dark:text-white font-black tracking-wide text-base group-hover:scale-105 transition-transform duration-300 origin-left">{item.symbol}</span>
                  </div>
                  <span className="text-slate-500 dark:text-[#787b86] text-xs font-medium truncate max-w-[180px] mt-0.5">{item.name}</span>
                </div>

                {/* Last Price with live indicator */}
                <div className="w-[130px] flex items-center justify-end gap-2 text-slate-900 dark:text-white font-mono font-bold text-[15px] group-hover:-translate-y-0.5 transition-transform duration-300">
                  <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isPositive ? "bg-[#089981]" : "bg-[#f23645]")} />
                  {formatPrice(item.price)}
                </div>

                {/* Absolute Change */}
                <div className={cn("w-[110px] text-right font-mono font-bold text-sm", colorClass)}>
                  {isPositive ? '+' : ''}{item.change.toFixed(2)}
                </div>
                
                {/* Percent Change Bubble */}
                <div className="w-[110px] flex justify-end">
                  <div className={cn("px-2.5 py-1 rounded-lg font-mono font-bold text-xs flex items-center gap-1", isPositive ? "bg-[#089981]/10 text-[#089981]" : "bg-[#f23645]/10 text-[#f23645]")}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(item.percentChange).toFixed(2)}%
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-white pt-32 pb-24 font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Absolute Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0a66c2]/5 dark:bg-[#0a66c2]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-[#089981]/5 dark:bg-[#089981]/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Bento Header Section */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-white/80 dark:border-slate-800 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            <p className="text-[#0a66c2] dark:text-[#38bdf8] font-black text-xs uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0a66c2] dark:bg-[#38bdf8] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
              Live Matrix
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">
              Data. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a66c2] to-[#38bdf8]">Eksak.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl text-base font-medium leading-relaxed">
              Infrastruktur pasar berkecepatan tinggi yang memantau 600+ instrumen global dari Saham, Mata Uang, hingga Kripto secara simultan.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 text-white border border-slate-700/50 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <BarChart2 className="w-48 h-48" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Total Aset Dilacak</p>
              <h2 className="text-6xl font-black tracking-tighter">600<span className="text-[#38bdf8]">+</span></h2>
            </div>
            <div className="mt-8 flex gap-2">
               <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold backdrop-blur-md border border-white/5 text-white">Saham</span>
               <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold backdrop-blur-md border border-white/5 text-white">Forex</span>
               <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold backdrop-blur-md border border-white/5 text-white">Kripto</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-8">
            
            {/* Floating Pill Tabs */}
            <div className="flex overflow-x-auto gap-3 pb-6 mb-6 scrollbar-hide">
               {[
                 { id: 'saham', label: 'Bursa Saham', icon: Activity },
                 { id: 'forex', label: 'Pasar Valas', icon: DollarSign },
                 { id: 'crypto', label: 'Kripto Aset', icon: Bitcoin }
               ].map(tab => {
                 const Icon = tab.icon;
                 const isActive = activeTab === tab.id;
                 return (
                   <button 
                     key={tab.id} 
                     onClick={() => setActiveTab(tab.id as any)}
                     className={cn(
                       "whitespace-nowrap px-6 py-3.5 text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 rounded-full border shadow-sm",
                       isActive 
                         ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg scale-105" 
                         : "bg-white/60 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-white/80 dark:border-slate-800 backdrop-blur-md"
                     )}
                   >
                     <Icon className={cn("w-4 h-4", isActive ? "text-[#38bdf8] dark:text-[#0a66c2]" : "")} />
                     {tab.label}
                   </button>
                 );
               })}
            </div>

            {/* Board */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderBoard(data[activeTab])}
            </motion.div>
            
          </div>

          {/* Sidebar / Bento Widgets */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Chart Widget */}
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/80 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
              <div className="p-6 border-b border-white dark:border-slate-800 flex items-center justify-between bg-white/40 dark:bg-slate-800/20">
                <div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#38bdf8]" />
                    Inflasi AS
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Data Bulanan (YoY)</p>
                </div>
                <div className="px-3 py-1 bg-slate-900 dark:bg-white rounded-lg">
                  <span className="text-white dark:text-slate-900 font-black text-lg">2.9%</span>
                </div>
              </div>
              <div className="p-4 h-[250px]">
                <LightweightChart 
                  data={MOCK_CHART_DATA} 
                  colors={{
                    backgroundColor: 'transparent',
                    lineColor: isDark ? '#38bdf8' : '#0a66c2',
                    textColor: isDark ? '#64748b' : '#94a3b8',
                    areaTopColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(10, 102, 194, 0.15)',
                    areaBottomColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Market Status Widget */}
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/80 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
              <h3 className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] mb-6">Status Mesin Bursa</h3>
              <div className="space-y-5">
                {[
                  { market: 'Wall Street (US)', status: 'OPEN', color: 'text-[#089981]', dot: 'bg-[#089981]' },
                  { market: 'IHSG (ID)', status: 'CLOSED', color: 'text-[#f23645]', dot: 'bg-[#f23645]' },
                  { market: 'Crypto Network', status: '24/7', color: 'text-[#089981]', dot: 'bg-[#089981]' },
                  { market: 'Forex Global', status: 'ACTIVE', color: 'text-[#089981]', dot: 'bg-[#089981]' }
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-default">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{m.market}</span>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                      <span className={cn("w-1.5 h-1.5 rounded-full", m.dot, m.status !== 'CLOSED' && "animate-pulse")}></span>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", m.color)}>{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </main>
  );
}
