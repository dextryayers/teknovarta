'use client';

import { useState, useEffect } from 'react';
import { Facebook, Twitter, MessageCircle, Send, Link as LinkIcon, Check, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Swal from 'sweetalert2';

interface SocialShareProps {
  path: string;
  title: string;
  horizontal?: boolean;
}

export default function SocialShare({ path, title, horizontal = true }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  
  useEffect(() => {
    // Only access window in the browser
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const timer = setTimeout(() => setFullUrl(`${origin}${path}`), 0);
      return () => clearTimeout(timer);
    }
  }, [path]);

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      Swal.fire({
        icon: 'success',
        title: 'Link berhasil disalin!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareData = {
    title: title,
    text: title,
    url: fullUrl,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Native share failed:', err);
      }
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-2",
      !horizontal && "flex-col"
    )}>
      <a 
        href={shareLinks.facebook} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
        title="Share to Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      
      <a 
        href={shareLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm"
        title="Share to Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>

      <a 
        href={shareLinks.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
        title="Share to WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </a>

      <a 
        href={shareLinks.telegram} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all shadow-sm"
        title="Share to Telegram"
      >
        <Send className="h-4 w-4" />
      </a>

      <button 
        onClick={copyToClipboard}
        className={cn(
          "p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all shadow-sm",
          copied ? "text-green-500 border-green-200 bg-green-50" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100"
        )}
        title="Copy Link"
      >
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>

      {typeof navigator !== 'undefined' && (navigator as any).share && (
        <button 
          onClick={handleNativeShare}
          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-all shadow-sm"
          title="Saluran Lain"
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
