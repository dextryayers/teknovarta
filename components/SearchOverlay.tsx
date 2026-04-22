'use client';

import { useState, useEffect, useRef } from 'react';
import { ARTICLES, Article } from '@/lib/articles';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { animate } from 'animejs';

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });
    }

    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.trim().length <= 1) {
      setResults([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  useEffect(() => {
    if (query.trim().length <= 1) return;

    const timer = setTimeout(() => {
      const filtered = ARTICLES.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Search Content */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        <div className="p-4 border-b dark:border-slate-800 flex items-center gap-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input 
            autoFocus
            type="text"
            placeholder="Cari berita, gadget, tutorial..."
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
            value={query}
            onChange={handleQueryChange}
          />
          {isSearching ? (
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          ) : (
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="h-5 w-5 text-slate-500" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 dark:bg-slate-950">
          {query.trim().length <= 1 && (
            <div className="py-12 text-center flex flex-col items-center gap-3">
              <Search className="h-12 w-12 text-slate-100 dark:text-slate-900" />
              <p className="text-slate-400 font-medium">Ketik minimal 2 karakter untuk mencari</p>
            </div>
          )}

          {query.trim().length > 1 && results.length === 0 && !isSearching && (
            <div className="py-12 text-center text-slate-400">
              Tidak ada hasil ditemukan untuk &quot;{query}&quot;
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Hasil Pencarian</p>
              {results.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/artikel/${article.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group"
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase">{article.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] text-slate-400 font-medium">{article.date}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {results.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900 p-3 text-center border-t dark:border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gunakan panah atau mouse untuk memilih</p>
          </div>
        )}
      </div>
    </div>
  );
}
