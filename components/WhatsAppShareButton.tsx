'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppShareButtonProps {
  title: string;
  path: string;
}

export default function WhatsAppShareButton({ title, path }: WhatsAppShareButtonProps) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const fullUrl = `${origin}${path}`;
      const timer = setTimeout(() => {
        setShareUrl(`https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(fullUrl)}`);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [title, path]);

  return (
    <a 
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-100 dark:shadow-none hover:scale-[1.01] active:scale-[0.98]"
    >
      <MessageCircle className="h-5 w-5" />
      Share ke WhatsApp
    </a>
  );
}
