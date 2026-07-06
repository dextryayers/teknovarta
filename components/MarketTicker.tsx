'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isCurrency: boolean;
};

const INITIAL_MARKET_DATA: MarketItem[] = [
  { symbol: 'USD/IDR', name: 'US Dollar', price: 15650, change: 12.5, isCurrency: true },
  { symbol: 'EUR/IDR', name: 'Euro', price: 16950, change: -5.2, isCurrency: true },
  { symbol: 'SGD/IDR', name: 'Sing Dlr', price: 11620, change: 8.4, isCurrency: true },
  { symbol: 'NVDA', name: 'NVIDIA', price: 852.45, change: 12.30, isCurrency: false },
  { symbol: 'AAPL', name: 'Apple Inc', price: 178.25, change: -1.20, isCurrency: false },
  { symbol: 'MSFT', name: 'Microsoft', price: 420.55, change: 2.15, isCurrency: false },
  { symbol: 'GOOGL', name: 'Alphabet', price: 142.65, change: 0.85, isCurrency: false },
  { symbol: 'TSLA', name: 'Tesla', price: 175.22, change: -3.40, isCurrency: false },
  { symbol: 'BTC/USD', name: 'Bitcoin', price: 68450.00, change: 1250.00, isCurrency: true },
  { symbol: 'GOTO', name: 'GoTo Gojek', price: 75.00, change: 1.00, isCurrency: false },
  { symbol: 'BBCA', name: 'Bank BCA', price: 9800.00, change: 50.00, isCurrency: false },
];

export default function MarketTicker() {
  const [items, setItems] = useState<MarketItem[]>(INITIAL_MARKET_DATA);

  useEffect(() => {
    // Simulate real-time market fluctuations every 2 seconds
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => {
        // Only update some items randomly each tick for realistic feel
        if (Math.random() > 0.4) return item;
        
        const isIdr = item.symbol.includes('IDR') || ['GOTO', 'BBCA'].includes(item.symbol);
        // Smaller fluctuations for currencies, slightly larger for stocks/crypto
        const volatility = isIdr ? 0.0005 : 0.002;
        const fluctuationPercent = (Math.random() - 0.5) * volatility; 
        const priceChange = item.price * fluctuationPercent;
        
        // Round properly depending on type
        const newPrice = isIdr ? Math.round(item.price + priceChange) : (item.price + priceChange);
        
        return {
          ...item,
          price: newPrice,
          change: item.change + priceChange
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number, symbol: string) => {
    const isIdr = symbol.includes('IDR') || ['GOTO', 'BBCA'].includes(symbol);
    if (isIdr) {
      return `Rp ${price.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;
    }
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (change: number, price: number, symbol: string) => {
    const isIdr = symbol.includes('IDR') || ['GOTO', 'BBCA'].includes(symbol);
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    // Calculate percentage change
    const oldPrice = price - change;
    const percent = oldPrice !== 0 ? (change / oldPrice) * 100 : 0;
    
    if (isIdr) {
      return `${sign}${Math.round(change)} (${sign}${percent.toFixed(2)}%)`;
    }
    return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;
  };

  return (
    <div className="w-full bg-slate-950 dark:bg-slate-950 text-white border border-slate-800 rounded-xl overflow-hidden relative flex items-center h-12 shadow-sm font-sans">
      {/* Label Kiri */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 bg-slate-950 border-r border-slate-800 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.5)]">
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE MARKET
        </span>
      </div>
      
      {/* Marquee Animation */}
      <div className="flex whitespace-nowrap animate-marquee items-center pl-[160px]">
        {/* Duplicate array members to create infinite scroll effect without gap */}
        {[...items, ...items, ...items].map((item, idx) => {
          const isPositive = item.change >= 0;
          return (
            <div key={`${item.symbol}-${idx}`} className="flex items-center gap-3 px-6 border-r border-slate-800/50 hover:bg-slate-900 transition-colors cursor-default">
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-300">{item.symbol}</span>
                <span className="text-[9px] text-slate-500 truncate max-w-[80px]">{item.name}</span>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className={cn(
                  "text-xs font-mono font-bold tracking-tight transition-colors duration-300",
                  isPositive ? "text-slate-100" : "text-slate-100"
                )}>
                  {formatPrice(item.price, item.symbol)}
                </span>
                <span className={cn(
                  "text-[9px] font-mono font-bold flex items-center gap-0.5",
                  isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                  {formatChange(item.change, item.price, item.symbol)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Gradient mask untuk memperhalus ujung kanan sebelum tombol */}
      <div className="absolute right-[100px] md:right-[120px] top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
      
      {/* Tombol "Lebih Lengkap" di sebelah kanan */}
      <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center bg-slate-950 border-l border-slate-800 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.5)]">
        <a 
          href="/kurs-dunia" 
          className="flex items-center justify-center h-full px-4 md:px-6 text-[10px] font-black uppercase tracking-widest text-white hover:text-red-500 hover:bg-slate-900 transition-colors"
        >
          Lebih Lengkap &rarr;
        </a>
      </div>
    </div>
  );
}
