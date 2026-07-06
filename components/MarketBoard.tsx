'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
};

export default function MarketBoard() {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const [stocksRes, cryptoRes, forexRes] = await Promise.all([
          fetch('/api/market/stocks'),
          fetch('/api/market/crypto'),
          fetch('/api/market/forex')
        ]);
        
        const stocks = await stocksRes.json();
        const crypto = await cryptoRes.json();
        const forex = await forexRes.json();
        
        // Combine and take top items for the board
        const combined = [
          ...(Array.isArray(stocks) ? stocks.slice(0, 3) : []),
          ...(Array.isArray(crypto) ? crypto.slice(0, 3) : []),
          ...(Array.isArray(forex) ? forex.slice(0, 2) : [])
        ];
        
        setItems(combined);
      } catch (err) {
        console.error('Failed to fetch market data', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Format currency/numbers
  const formatPrice = (price: number) => {
    if (price > 1000) return price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  return (
    <div className="w-full bg-white dark:bg-[#1c1c1c] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2a2a2a] shadow-xl font-sans transition-colors duration-300">
      <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-[#2a2a2a]">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">{t.components.market_board.title}</h3>
      </div>
      
      <div className="p-2">
        {loading ? (
          <div className="space-y-2 p-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-12 bg-slate-100 dark:bg-[#2a2a2a] rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {items.map((item, idx) => {
              const isPositive = item.change >= 0;
              // Use TradingView colors
              const colorClass = isPositive ? 'text-[#089981]' : 'text-[#f23645]';
              const bgClass = isPositive ? 'bg-[#089981]/10' : 'bg-[#f23645]/10';

              return (
                <div 
                  key={idx} 
                  className="group flex items-center justify-between p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors border-b border-slate-100 dark:border-[#2a2a2a] last:border-0 rounded-lg cursor-pointer"
                >
                  {/* Left Side: Symbol & Name */}
                  <div className="flex flex-col flex-1 min-w-0 pr-2">
                    <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base truncate">
                      {item.symbol.replace('/USD', '')}
                    </span>
                    <span className="text-slate-500 dark:text-[#999999] text-[10px] sm:text-xs font-medium truncate max-w-[120px] sm:max-w-full">
                      {item.name}
                    </span>
                  </div>

                  {/* Right Side: Price & Changes */}
                  <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                        {formatPrice(item.price)}
                      </span>
                      <span className={cn("text-[10px] sm:text-xs font-bold flex items-center gap-0.5", colorClass)}>
                        {isPositive ? <ArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                        {Math.abs(item.change).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className={cn("px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md min-w-[65px] sm:min-w-[75px] text-center font-bold text-[11px] sm:text-xs flex items-center justify-center gap-0.5", colorClass, bgClass)}>
                      {isPositive ? <ArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 hidden sm:block" /> : <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 hidden sm:block" />}
                      {Math.abs(item.percentChange).toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-[#2a2a2a] flex justify-center bg-slate-50 dark:bg-transparent">
        <Link href={`/${lang}/kurs-dunia`} className="text-xs font-bold text-[#0a66c2] dark:text-[#0a66c2] hover:text-white hover:bg-[#0a66c2] transition-colors uppercase tracking-widest px-6 py-2 rounded-lg border border-[#0a66c2]/20 w-full text-center">
          {t.components.market_board.more}
        </Link>
      </div>
    </div>
  );
}
