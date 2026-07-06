'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, MessageSquare, Accessibility, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Volume2, Type } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function FloatingWidget() {
  const { t, lang } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  
  // Accessibility States
  const [isA11yPanelOpen, setIsA11yPanelOpen] = useState(false);
  const [isHoverToSpeak, setIsHoverToSpeak] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeFont, setActiveFont] = useState('default');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonts
  const fonts = [
    { id: 'default', name: 'Default', family: '' },
    { id: 'serif', name: 'Serif', family: 'var(--font-serif), serif' },
    { id: 'mono', name: 'Mono', family: 'ui-monospace, monospace' },
    { id: 'comic', name: 'Comic', family: '"Comic Sans MS", cursive, sans-serif' },
    { id: 'arial', name: 'Arial', family: 'Arial, Helvetica, sans-serif' }
  ];

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    const newZoom = direction === 'in' ? Math.min(zoomLevel + 10, 150) : Math.max(zoomLevel - 10, 90);
    setZoomLevel(newZoom);
    // @ts-ignore - document.body.style.zoom is non-standard but works across most major browsers for quick UI scaling
    document.body.style.zoom = `${newZoom}%`;
  };

  const changeFont = (fontFamily: string, id: string) => {
    setActiveFont(id);
    if (fontFamily === '') {
      document.documentElement.style.removeProperty('--font-sans');
    } else {
      document.documentElement.style.setProperty('--font-sans', fontFamily);
    }
  };

  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (!isHoverToSpeak) return;
    
    const target = e.target as HTMLElement;
    const validTags = ['A', 'BUTTON', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL', 'STRONG', 'B', 'I', 'EM'];
    
    if (validTags.includes(target.tagName) || (target.childNodes.length === 1 && target.childNodes[0].nodeType === Node.TEXT_NODE)) {
      const text = target.innerText || target.textContent;
      if (text && text.trim().length > 0 && text.trim().length < 500) {
        
        // Debounce to improve cursor tracking and avoid rapid stuttering
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        const oldOutline = target.style.outline;
        const oldBg = target.style.backgroundColor;
        
        timeoutRef.current = setTimeout(() => {
          window.speechSynthesis.cancel(); 
          
          const utterance = new SpeechSynthesisUtterance(text.trim());
          utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';
          utterance.rate = 0.85; // Very friendly and slow for seniors
          utterance.pitch = 1;
          
          target.style.outline = '3px solid #ef4444'; // Thick red outline
          target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; // Slight red tint
          target.style.borderRadius = '4px';
          
          const cleanup = () => {
             target.style.outline = oldOutline;
             target.style.backgroundColor = oldBg;
          };

          utterance.onend = cleanup;
          utterance.onerror = cleanup;
          
          target.addEventListener('mouseout', () => {
            cleanup();
            window.speechSynthesis.cancel();
          }, { once: true });

          window.speechSynthesis.speak(utterance);
        }, 300); // 300ms hover delay to confirm intention
        
        e.stopPropagation();
      }
    }
  }, [isHoverToSpeak, lang]);

  useEffect(() => {
    if (isHoverToSpeak) {
      document.addEventListener('mouseover', handleMouseOver);
      const utterance = new SpeechSynthesisUtterance(lang === 'en' ? "Cursor reader activated. Point to text to listen." : "Pembaca kursor diaktifkan. Arahkan kursor ke teks untuk mendengarkan.");
      utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';
      window.speechSynthesis.speak(utterance);
    } else {
      document.removeEventListener('mouseover', handleMouseOver);
      window.speechSynthesis.cancel();
    }
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHoverToSpeak, handleMouseOver, lang]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFeedback = () => {
    alert(lang === 'en' ? 'Feedback feature coming soon!' : 'Fitur masukan akan segera hadir!');
  };

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[88px]'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => {
           setIsOpen(!isOpen);
           if (isOpen) setIsA11yPanelOpen(false); // Close panel if sidebar is closed
        }}
        className="h-16 w-6 bg-[#1a1a1a] border border-white/10 border-r-0 rounded-l-xl flex items-center justify-center hover:bg-[#252525] transition-colors shadow-[-4px_0_15px_rgba(0,0,0,0.2)] text-slate-400 hover:text-white group"
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Accessibility Flyout Panel */}
      <div className={`absolute right-[100px] top-1/2 -translate-y-1/2 w-64 bg-[#101010]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 transition-all duration-300 origin-right ${isA11yPanelOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
          <Accessibility className="h-4 w-4 text-red-500" />
          {lang === 'en' ? 'Accessibility Center' : 'Pusat Aksesibilitas'}
        </h3>
        
        {/* Zoom Controls */}
        <div className="mb-5">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1"><ZoomIn className="h-3 w-3" /> Zoom Layar</p>
          <div className="flex items-center justify-between bg-black/50 rounded-lg p-1 border border-white/5">
            <button onClick={() => handleZoom('out')} className="p-2 hover:bg-white/10 rounded-md text-white transition-colors"><ZoomOut className="h-4 w-4" /></button>
            <span className="text-white font-black text-xs">{zoomLevel}%</span>
            <button onClick={() => handleZoom('in')} className="p-2 hover:bg-white/10 rounded-md text-white transition-colors"><ZoomIn className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Font Controls */}
        <div className="mb-5">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1"><Type className="h-3 w-3" /> Jenis Font</p>
          <div className="grid grid-cols-5 gap-1 bg-black/50 rounded-lg p-1 border border-white/5">
            {fonts.map(font => (
              <button 
                key={font.id}
                onClick={() => changeFont(font.family, font.id)}
                className={`p-2 rounded-md text-xs font-bold transition-all ${activeFont === font.id ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                title={font.name}
              >
                Ag
              </button>
            ))}
          </div>
        </div>

        {/* TTS Toggle */}
        <div>
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1"><Volume2 className="h-3 w-3" /> Suara Pembaca (TTS)</p>
           <button 
             onClick={() => setIsHoverToSpeak(!isHoverToSpeak)}
             className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all ${isHoverToSpeak ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-black/50 text-slate-300 border border-white/5 hover:bg-white/10'}`}
           >
             <Volume2 className={`h-4 w-4 ${isHoverToSpeak ? 'animate-pulse' : ''}`} />
             {isHoverToSpeak ? (lang === 'en' ? 'Reading Mode ON' : 'Mode Suara AKTIF') : (lang === 'en' ? 'Turn ON Voice' : 'AKTIFKAN Suara')}
           </button>
        </div>
      </div>

      {/* Main Widget Container */}
      <div className="flex flex-col gap-2 p-2 bg-[#101010]/90 backdrop-blur-md border border-white/10 rounded-l-2xl shadow-2xl relative z-10">
        <button 
          onClick={handleRefresh}
          className="w-[72px] h-[72px] bg-[#1a1a1a] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-[#252525] transition-colors shadow-inner group"
        >
          <RefreshCw className="h-6 w-6 text-slate-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-slate-300 group-hover:text-white">{t.widget?.refresh || (lang === 'en' ? 'Refresh' : 'Menyegarkan')}</span>
        </button>

        <button 
          onClick={handleFeedback}
          className="w-[72px] h-[72px] bg-[#1a1a1a] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-[#252525] transition-colors shadow-inner group"
        >
          <MessageSquare className="h-6 w-6 text-slate-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-slate-300 group-hover:text-white">{t.widget?.feedback || (lang === 'en' ? 'Feedback' : 'Masukan')}</span>
        </button>

        <button 
          onClick={() => setIsA11yPanelOpen(!isA11yPanelOpen)}
          className={`w-[72px] h-[80px] bg-[#1a1a1a] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-[#252525] transition-all shadow-inner group ${isA11yPanelOpen || isHoverToSpeak ? 'ring-2 ring-red-500 bg-red-500/10' : ''}`}
        >
          <Accessibility className={`h-8 w-8 transition-colors ${isA11yPanelOpen || isHoverToSpeak ? 'text-red-500' : 'text-slate-300 group-hover:text-white'}`} strokeWidth={1.5} />
          <span className={`text-[9px] font-medium text-center leading-tight ${isA11yPanelOpen || isHoverToSpeak ? 'text-red-500' : 'text-slate-300 group-hover:text-white'}`}>
            {t.widget?.accessibility || (lang === 'en' ? 'Accessibility' : 'Aksesibilitas')}
          </span>
        </button>
      </div>
    </div>
  );
}
