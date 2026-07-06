'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCcw, 
  ArrowLeft, 
  Cpu, 
  Code, 
  ShieldCheck, 
  Smartphone,
  Laptop,
  Zap,
  Github,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { generateAiResponse } from './actions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const RECOMMENDATIONS = [
  { id: 1, text: "Rekomendasi PC budget pelajar 5-7 jutaan", icon: Cpu, category: "Hardware", color: "from-blue-600 to-cyan-500" },
  { id: 2, text: "Cara mengatasi HP yang masuk ke air", icon: Smartphone, category: "Service", color: "from-red-600 to-orange-500" },
  { id: 3, text: "Tutorial belajar Next.js 15 untuk pemula", icon: Code, category: "Web Dev", color: "from-indigo-600 to-purple-500" },
  { id: 4, text: "Langkah aman terhindar dari link phishing", icon: ShieldCheck, category: "Security", color: "from-emerald-600 to-teal-500" },
  { id: 5, text: "Laptop terbaik untuk coding di bawah 10jt", icon: Laptop, category: "Gadget", color: "from-amber-600 to-yellow-500" },
];

function Typewriter({ text, onComplete }: { text: string, onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 5); // Typing speed
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <div className="whitespace-pre-wrap">{displayText}</div>;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya TeknoVarta Intelligence. Saya siap membantu riset teknologi Anda dengan presisi tinggi. Bagaimana saya bisa membantu Anda hari ini?',
      isTyping: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const finalInput = overrideInput || input;
    
    if (!finalInput.trim() || isLoading) return;

    const userMessage = finalInput.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await generateAiResponse(messages, userMessage);
      
      if (result.success) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: result.content,
          isTyping: true 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: result.content,
          isTyping: false 
        }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Terjadi kesalahan sistem saat menghubungi server AI. Harap pastikan koneksi internet Anda stabil.',
        isTyping: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
     setMessages([{ 
       role: 'assistant', 
       content: 'Sesi telah direset. Saya siap membantu riset baru Anda.',
       isTyping: false
     }]);
  };

  return (
    <div className="relative bg-[#f8f9fa] dark:bg-slate-950 min-h-screen pt-24 pb-12 transition-colors overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 dark:bg-red-600/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <Link 
                href="/" 
                className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Kembali ke Portal
              </Link>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase"
            >
              TANYA <span className="text-red-600">MAS AI</span>
            </motion.h1>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-blue-500" /> Advanced Technological Research Assistant
            </p>
          </div>
          <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <button 
               onClick={clearChat}
               className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-all hover:shadow-lg active:scale-95"
             >
                <RefreshCcw className="h-3 w-3" /> Reset Session
             </button>
          </motion.div>
        </div>

        {/* Chat Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[75vh]">
          {/* Sidebar Recommendations (Desktop Only) */}
          <div className="hidden lg:col-span-3 space-y-6">
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[32px] shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-l-2 border-red-600 pl-4">Suggested Research</h3>
                <div className="space-y-4">
                   {RECOMMENDATIONS.map((rec) => (
                      <button
                        key={rec.id}
                        onClick={() => handleSubmit(undefined, rec.text)}
                        className="w-full group text-left p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                      >
                         <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white mb-3 shadow-lg", rec.color)}>
                            <rec.icon className="h-4 w-4" />
                         </div>
                         <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-red-600 transition-colors uppercase tracking-tight">{rec.text}</p>
                      </button>
                   ))}
                </div>
             </div>
             
             {/* Developer Bio Card */}
             <div className="bg-slate-900 dark:bg-white p-6 rounded-[32px] text-white dark:text-slate-900 border border-white/5 shadow-2xl">
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 text-red-500">Developer Identity</h4>
                <p className="text-md font-black leading-tight mb-2">Hanif Abdurrohim</p>
                <p className="text-[9px] uppercase tracking-widest font-bold opacity-60 mb-6">CEO & Editor-in-Chief</p>
                <div className="flex gap-2">
                   <Link href="https://github.com/dextryayers" target="_blank" className="p-2 bg-white/10 dark:bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Github className="h-3 w-3" /></Link>
                   <Link href="https://haniipp.space" target="_blank" className="p-2 bg-white/10 dark:bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Globe className="h-3 w-3" /></Link>
                </div>
             </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-9 flex flex-col h-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-white/5 rounded-[48px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-red-500/5 pointer-events-none"></div>

            {/* Mobile & Desktop Main Recommendations */}
            <div className="p-4 md:p-8 bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800 relative z-20">
               <div className="flex items-center gap-3 mb-4 px-2">
                  <Sparkles className="h-3 w-3 text-red-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Parameter Riset Populer</span>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-2">
                  {RECOMMENDATIONS.map((rec) => (
                     <button
                      key={rec.id}
                      onClick={() => handleSubmit(undefined, rec.text)}
                      className="flex-shrink-0 flex flex-col gap-3 p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl hover:border-red-600 dark:hover:border-red-600 hover:shadow-xl dark:hover:bg-red-900/5 transition-all text-left w-[200px] group active:scale-95 shadow-sm"
                     >
                        <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md", rec.color)}>
                           <rec.icon className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{rec.category}</p>
                           <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight uppercase tracking-tight">{rec.text}</p>
                        </div>
                     </button>
                  ))}
               </div>
            </div>

            {/* Messages Display */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 md:p-14 space-y-10 scroll-smooth no-scrollbar relative z-10"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300, delay: 0.1 }}
                    className={cn(
                      "flex gap-4 md:gap-8 max-w-[95%] md:max-w-[85%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 md:h-14 md:w-14 shrink-0 rounded-[18px] md:rounded-[24px] flex items-center justify-center border shadow-2xl transition-transform hover:rotate-3",
                      msg.role === 'user' 
                        ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white" 
                        : "bg-red-600 border-red-400 text-white"
                    )}>
                      {msg.role === 'user' ? <User className="h-5 w-5 md:h-7 md:w-7" /> : <Bot className="h-5 w-5 md:h-7 md:w-7" />}
                    </div>
                    <div className={cn(
                      "group relative p-6 md:p-8 rounded-[32px] md:rounded-[40px] text-sm md:text-[15px] leading-relaxed shadow-xl",
                      msg.role === 'user'
                        ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-tr-none hover:shadow-blue-500/10 transition-shadow"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 text-slate-800 dark:text-slate-100 rounded-tl-none font-medium"
                    )}>
                      {msg.role === 'assistant' && msg.isTyping ? (
                        <Typewriter text={msg.content} onComplete={() => {
                          setMessages(prev => {
                            const newMsgs = [...prev];
                            newMsgs[idx] = { ...newMsgs[idx], isTyping: false };
                            return newMsgs;
                          });
                        }} />
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      )}
                      
                      {/* Subtitle / Role indicator */}
                      <span className={cn(
                        "absolute -bottom-6 text-[8px] font-black uppercase tracking-widest opacity-30",
                        msg.role === 'user' ? "right-4" : "left-4"
                      )}>
                        {msg.role === 'user' ? "Authorized User" : "TeknoVarta AI Intel"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 md:gap-8 mr-auto max-w-[90%] md:max-w-[85%]"
                >
                  <div className="h-10 w-10 md:h-14 md:w-14 shrink-0 rounded-[18px] md:rounded-[24px] bg-red-600 border border-red-400 text-white flex items-center justify-center shadow-xl">
                    <RefreshCcw className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] rounded-tl-none bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                      <div className="flex gap-1.5">
                         <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                         <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                         <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce"></span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.2em] italic animate-pulse">Berpikir Dengan Otak....</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Dashboard */}
            <div className="p-6 md:p-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-t border-slate-100 dark:border-white/5 relative z-10">
              <form onSubmit={handleSubmit} className="relative flex gap-4 max-w-5xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-[24px] blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inisiasi parameter riset teknologi..."
                  className="relative flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-[20px] h-16 md:h-20 pl-8 md:pl-10 pr-20 md:pr-24 text-[13px] md:text-[15px] font-bold focus:ring-4 focus:ring-red-500/5 focus:border-red-600 outline-none dark:text-white transition-all shadow-2xl placeholder:opacity-40"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "absolute right-3 top-3 md:right-4 md:top-4 h-10 w-10 md:h-12 md:w-12 text-white rounded-xl md:rounded-2xl flex items-center justify-center transition-all shadow-2xl active:scale-90",
                    isLoading || !input.trim() ? "bg-slate-300 dark:bg-slate-800" : "bg-red-600 hover:bg-slate-950"
                  )}
                >
                  {isLoading ? <RefreshCcw className="h-5 w-5 animate-spin" /> : <Zap className="h-5 w-6 fill-current" />}
                </button>
              </form>
              <div className="mt-6 flex justify-between items-center px-4">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-40">
                    Analytical Research Environment v2.5
                 </p>
                 <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-80 decoration-red-600 underline-offset-4 underline italic">
                    Developed by Hanif Abdurrohim
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
