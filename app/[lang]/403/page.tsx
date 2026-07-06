'use client';

import { ShieldAlert, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SARCASTIC_QUOTES = [
  "Wow, kamu jago ya ngetik payload. Sayangnya, sistem ini lebih jago nangkep kamu.",
  "Mencoba membobol? Mungkin energi kamu lebih berguna buat nulis artikel yang bener.",
  "Error 403: Kamu tidak punya akses. Tapi kamu punya keberanian yang sia-sia.",
  "Belajar hacking dari tutorial 5 menit ya? Coba lagi lain kali di tempat lain.",
  "Database kami aman, tapi rasa penasaran kamu kayaknya perlu diobati.",
  "Jangan dipaksa, yang bukan milikmu memang tidak akan pernah terbuka.",
  "Cita-cita jadi hacker, kenyataan cuma kena blokir sistem middleware.",
  "Payload kamu lucu, kayak badut yang lagi nyari pintu belakang."
];

export default function ForbiddenPage() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = SARCASTIC_QUOTES[Math.floor(Math.random() * SARCASTIC_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl w-full space-y-10 animate-in fade-in zoom-in duration-700">
        
        {/* Error Image */}
        <div className="relative group">
           <div className="absolute inset-0 bg-red-600 opacity-20 blur-[100px] rounded-full group-hover:opacity-40 transition-opacity"></div>
           <img 
             src="/images/403.jpeg" 
             alt="403 Forbidden" 
             className="w-full aspect-video object-cover rounded-[3rem] border-4 border-red-600/50 shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/5483248/pexels-photo-5483248.jpeg?auto=compress&cs=tinysrgb&w=1000";
             }}
           />
           <div className="absolute -top-6 -right-6 h-20 w-20 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-2xl z-20 shadow-xl border-4 border-black">
              403
           </div>
        </div>

        <div className="space-y-4 relative z-10">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            AKSES <span className="text-red-600 underline decoration-4">DITOLAK</span>
          </h1>
          <div className="bg-red-600/10 border border-red-600/30 p-6 rounded-3xl">
             <p className="text-red-500 font-bold text-lg italic leading-relaxed">
               "{quote}"
             </p>
          </div>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">
            IP Anda telah dicatat oleh Firewall TeknoVarta.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
           <Link href="/">
              <Button className="bg-white text-black hover:bg-slate-200 h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3">
                 <Home className="h-4 w-4" /> Kembali ke Rumah
              </Button>
           </Link>
           <Button 
             variant="outline" 
             onClick={() => window.location.reload()}
             className="border-slate-800 text-slate-400 hover:text-white h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3"
           >
              <RefreshCcw className="h-4 w-4" /> Coba Lagi (Nasib)
           </Button>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_20px_#dc2626]"></div>
    </div>
  );
}
