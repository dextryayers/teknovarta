'use client';

import { Share2, Send, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CardShareProps {
  url: string;
  title: string;
}

export default function CardShare({ url, title }: CardShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const fullUrl = url.startsWith('http') ? url : `https://artikel.haniplabs.com${url}`;
  
  const shareLinks = [
    { 
      name: 'WA', 
      icon: Send, 
      color: 'bg-[#25D366]', 
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + fullUrl)}` 
    },
    { 
      name: 'FB', 
      icon: Facebook, 
      color: 'bg-[#1877F2]', 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}` 
    },
    { 
      name: 'TW', 
      icon: Twitter, 
      color: 'bg-[#1DA1F2]', 
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}` 
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 2000);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center transition-all",
          isOpen ? "bg-red-600 text-white" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-600"
        )}
      >
        <Share2 className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 fade-in duration-300">
           {shareLinks.map((link) => (
             <a 
               key={link.name}
               href={link.href}
               target="_blank"
               rel="noopener noreferrer"
               className={cn("h-9 w-9 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg", link.color)}
               onClick={(e) => e.stopPropagation()}
             >
                <link.icon className="h-4 w-4 fill-current" />
             </a>
           ))}
           <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1"></div>
           <button 
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               copyToClipboard();
             }}
             className={cn(
               "h-9 w-9 rounded-xl flex items-center justify-center transition-all active:scale-95",
               copied ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
             )}
           >
              {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
           </button>
           <div className="absolute -bottom-1.5 right-3 w-3 h-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-b border-slate-200/50 dark:border-white/10 rotate-45 -z-10"></div>
        </div>
      )}
    </div>
  );
}
