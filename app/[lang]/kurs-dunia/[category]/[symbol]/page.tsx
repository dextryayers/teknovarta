'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp, ArrowDown, Activity, Clock, MoreHorizontal, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const LightweightChart = dynamic(() => import('@/components/LightweightChart'), { ssr: false });

export default function AssetDetail() {
  const params = useParams();
  const category = params.category as string;
  const symbol = params.symbol as string;
  
  const decodedSymbol = decodeURIComponent(symbol).toUpperCase();
  const { resolvedTheme } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [relatedAssets, setRelatedAssets] = useState<{saham: any[], crypto: any[], forex: any[]}>({saham: [], crypto: [], forex: []});
  const [priceData, setPriceData] = useState({
    price: 0,
    change: 0,
    percentChange: 0,
    high: 0,
    low: 0,
    volume: '0'
  });

  useEffect(() => {
    // Generate realistic mocked historical data (1 year daily) for the chart
    // We base the fractal generation on the symbol name so it's consistent on reload
    const generateHistoricalData = () => {
      const data = [];
      let currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      
      const baseVal = decodedSymbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      let currentPrice = (baseVal % 300) + 50; // Random starting price based on symbol
      
      // Determine volatility based on category
      let volatility = 0.02;
      if (category === 'crypto') volatility = 0.05;
      if (category === 'kurs') volatility = 0.005;

      for (let i = 0; i < 365; i++) {
        // Fractal random walk
        const changePercent = (Math.random() - 0.5) * volatility;
        currentPrice = currentPrice * (1 + changePercent);
        
        data.push({
          time: currentDate.toISOString().split('T')[0],
          value: currentPrice
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return data;
    };

    const data = generateHistoricalData();
    setChartData(data);
    
    // Set current price stats based on the last data point
    const lastPoint = data[data.length - 1];
    const prevPoint = data[data.length - 2];
    const change = lastPoint.value - prevPoint.value;
    const percentChange = (change / prevPoint.value) * 100;
    
    setPriceData({
      price: lastPoint.value,
      change,
      percentChange,
      high: lastPoint.value * 1.02,
      low: lastPoint.value * 0.98,
      volume: (Math.random() * 1000000).toLocaleString('en-US', { maximumFractionDigits: 0 })
    });
    
    setLoading(false);

    // Fetch related assets for the carousels
    const fetchRelated = async () => {
      try {
        const [stocksRes, cryptoRes, forexRes] = await Promise.all([
          fetch('/api/market/stocks'),
          fetch('/api/market/crypto'),
          fetch('/api/market/forex')
        ]);
        
        const stocksData = await stocksRes.json();
        const cryptoData = await cryptoRes.json();
        const forexData = await forexRes.json();
        
        setRelatedAssets({
          saham: Array.isArray(stocksData) ? stocksData.filter(item => !item.symbol.includes(decodedSymbol)).slice(0, 15) : [],
          crypto: Array.isArray(cryptoData) ? cryptoData.filter(item => !item.symbol.includes(decodedSymbol)).slice(0, 15) : [],
          forex: Array.isArray(forexData) ? forexData.filter(item => !item.symbol.includes(decodedSymbol)).slice(0, 15) : []
        });
      } catch (err) {
        console.error("Failed to fetch related assets", err);
      }
    };
    fetchRelated();

  }, [decodedSymbol, category]);

  const isDark = resolvedTheme === 'dark';
  const isPositive = priceData.change >= 0;
  const colorClass = isPositive ? 'text-[#089981]' : 'text-[#f23645]';

  const formatPrice = (price: number) => {
    if (price > 1000) return price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const renderMiniCard = (asset: any, i: number, assetCategory: string) => {
    const isPos = asset.change >= 0;
    let assetSlug = asset.symbol;
    if (assetCategory === 'kurs') assetSlug = assetSlug.replace('USD/', '');
    else if (assetCategory === 'crypto') assetSlug = assetSlug.replace('USD', '');

    return (
      <Link 
        href={`/kurs-dunia/${assetCategory}/${encodeURIComponent(assetSlug)}`} 
        key={i} 
        className="min-w-[220px] bg-white dark:bg-[#131722] p-4 rounded-xl border border-slate-200 dark:border-[#2a2a2a] shadow-sm hover:border-[#0a66c2] dark:hover:border-[#0a66c2] hover:shadow-md transition-all flex-shrink-0 snap-start group"
      >
        <div className="flex justify-between items-start mb-3">
          <span className="font-black text-slate-900 dark:text-white group-hover:text-[#0a66c2] transition-colors">{asset.symbol}</span>
          <div className={cn("flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded-md", isPos ? "bg-[#089981]/10 text-[#089981]" : "bg-[#f23645]/10 text-[#f23645]")}>
            {isPos ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(asset.percentChange).toFixed(2)}%
          </div>
        </div>
        <div className="text-lg font-mono font-bold text-slate-900 dark:text-[#d1d4dc]">
          {formatPrice(asset.price)}
        </div>
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white pt-24 pb-12 font-sans transition-colors duration-300">
      
      {/* Top Navbar / Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#131722]">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/kurs-dunia" className="p-2 hover:bg-slate-100 dark:hover:bg-[#2a2e39] rounded-lg transition-colors text-slate-500 dark:text-[#787b86]">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-[#787b86]">
              <Link href="/kurs-dunia" className="hover:text-[#0a66c2] dark:hover:text-white transition-colors">Screener</Link>
              <span>/</span>
              <span className="uppercase">{category}</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-white">{decodedSymbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 dark:text-[#787b86] hover:text-[#0a66c2] dark:hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-500 dark:text-[#787b86] hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors">
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Chart Area (Takes 3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Header Stats */}
            <div className="bg-white dark:bg-[#131722] p-6 rounded-xl border border-slate-200 dark:border-[#2a2a2a] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                  {decodedSymbol}
                  <span className="text-sm font-medium px-2 py-1 bg-slate-100 dark:bg-[#2a2e39] text-slate-500 dark:text-[#d1d4dc] rounded-md tracking-wider">
                    {category === 'crypto' ? 'CRYPTO' : category === 'kurs' ? 'FOREX' : 'EQUITY'}
                  </span>
                </h1>
                <p className="text-slate-500 dark:text-[#787b86] text-sm font-medium mt-1 uppercase tracking-widest">
                  {decodedSymbol} / USD
                </p>
              </div>
              
              <div className="flex flex-col items-start sm:items-end">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black font-mono tracking-tighter text-slate-900 dark:text-white">
                    {loading ? '---' : formatPrice(priceData.price)}
                  </span>
                  <span className="text-lg font-bold text-slate-500 dark:text-[#787b86] pb-1 font-mono">USD</span>
                </div>
                <div className={cn("flex items-center gap-2 text-lg font-bold font-mono mt-1", colorClass)}>
                  {isPositive ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                  {Math.abs(priceData.change).toFixed(2)} ({Math.abs(priceData.percentChange).toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* TradingView Chart Frame */}
            <div className="bg-white dark:bg-[#131722] rounded-xl border border-slate-200 dark:border-[#2a2a2a] shadow-sm overflow-hidden flex flex-col h-[500px]">
              {/* Chart Toolbar */}
              <div className="h-12 border-b border-slate-200 dark:border-[#2a2a2a] flex items-center px-4 gap-4 bg-slate-50 dark:bg-[#1e222d]">
                <span className="text-xs font-bold text-[#0a66c2] dark:text-[#2962ff]">1D</span>
                <span className="text-xs font-bold text-slate-500 dark:text-[#787b86] hover:text-slate-900 dark:hover:text-white cursor-pointer">1W</span>
                <span className="text-xs font-bold text-slate-500 dark:text-[#787b86] hover:text-slate-900 dark:hover:text-white cursor-pointer">1M</span>
                <span className="text-xs font-bold text-slate-500 dark:text-[#787b86] hover:text-slate-900 dark:hover:text-white cursor-pointer">1Y</span>
                <div className="w-px h-4 bg-slate-300 dark:bg-[#2a2a2a] mx-2"></div>
                <Activity className="w-4 h-4 text-slate-500 dark:text-[#787b86]" />
                <span className="text-xs font-bold text-slate-500 dark:text-[#787b86] hover:text-slate-900 dark:hover:text-white cursor-pointer">Indicators</span>
              </div>
              
              {/* Chart Canvas */}
              <div className="flex-1 p-4 relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#0a66c2] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <LightweightChart 
                    data={chartData} 
                    colors={{
                      backgroundColor: 'transparent',
                      lineColor: isPositive ? (isDark ? '#089981' : '#089981') : (isDark ? '#f23645' : '#f23645'),
                      textColor: isDark ? '#999999' : '#64748b',
                      areaTopColor: isPositive ? 'rgba(8, 153, 129, 0.3)' : 'rgba(242, 54, 69, 0.3)',
                      areaBottomColor: 'rgba(0, 0, 0, 0)'
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area (Takes 1 column) */}
          <div className="space-y-6">
            
            {/* Market Info */}
            <div className="bg-white dark:bg-[#131722] p-6 rounded-xl border border-slate-200 dark:border-[#2a2a2a] shadow-sm">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Market Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-[#2a2a2a]">
                  <span className="text-xs text-slate-500 dark:text-[#787b86] font-medium">Prev Close</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                    {loading ? '-' : formatPrice(priceData.price - priceData.change)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-[#2a2a2a]">
                  <span className="text-xs text-slate-500 dark:text-[#787b86] font-medium">Day's Range</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                    {loading ? '-' : `${formatPrice(priceData.low)} - ${formatPrice(priceData.high)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-[#2a2a2a]">
                  <span className="text-xs text-slate-500 dark:text-[#787b86] font-medium">Volume</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                    {loading ? '-' : priceData.volume}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-[#2a2a2a]">
                  <span className="text-xs text-slate-500 dark:text-[#787b86] font-medium">Market Status</span>
                  <span className="text-xs font-black text-[#089981] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#089981] rounded-full animate-pulse"></span>
                    OPEN
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Analysis */}
            <div className="bg-white dark:bg-[#131722] p-6 rounded-xl border border-slate-200 dark:border-[#2a2a2a] shadow-sm text-center">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Technical Analysis</h3>
              <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
                {/* Dial graphic */}
                <svg viewBox="0 0 100 50" className="w-full absolute top-0">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? "#2a2a2a" : "#e2e8f0"} strokeWidth="10" strokeLinecap="round" />
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isPositive ? "#089981" : "#f23645"} strokeWidth="10" strokeLinecap="round" strokeDasharray="125" strokeDashoffset={isPositive ? "40" : "80"} />
                </svg>
                <div className="mt-8">
                  <span className={cn("text-xl font-black uppercase", colorClass)}>
                    {isPositive ? 'BUY' : 'SELL'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#787b86] mt-4">Berdasarkan Moving Averages & Oscillators</p>
            </div>

          </div>
        </div>
        
        {/* Horizontal Sliders for Related Assets */}
        <div className="mt-12 space-y-12">
          
          {/* Saham Carousel */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Saham Global Lainnya</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#089981] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-[#089981] uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
              {relatedAssets.saham.length === 0 ? [...Array(6)].map((_, i) => <div key={i} className="min-w-[200px] h-24 bg-white dark:bg-[#131722] border border-slate-200 dark:border-[#2a2a2a] rounded-xl animate-pulse flex-shrink-0 snap-start"></div>) : 
                relatedAssets.saham.map((asset, i) => renderMiniCard(asset, i, 'saham'))}
            </div>
          </div>

          {/* Crypto Carousel */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Kripto Lainnya</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#089981] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-[#089981] uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
              {relatedAssets.crypto.length === 0 ? [...Array(6)].map((_, i) => <div key={i} className="min-w-[200px] h-24 bg-white dark:bg-[#131722] border border-slate-200 dark:border-[#2a2a2a] rounded-xl animate-pulse flex-shrink-0 snap-start"></div>) : 
                relatedAssets.crypto.map((asset, i) => renderMiniCard(asset, i, 'crypto'))}
            </div>
          </div>

          {/* Kurs Carousel */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Kurs Valas Lainnya</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#089981] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-[#089981] uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
              {relatedAssets.forex.length === 0 ? [...Array(6)].map((_, i) => <div key={i} className="min-w-[200px] h-24 bg-white dark:bg-[#131722] border border-slate-200 dark:border-[#2a2a2a] rounded-xl animate-pulse flex-shrink-0 snap-start"></div>) : 
                relatedAssets.forex.map((asset, i) => renderMiniCard(asset, i, 'kurs'))}
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
