'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
    label: "WEB DEVELOPMENT",
    caption: "Professional Coding Environment"
  },
  {
    url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    label: "PHONE TECHNICIAN",
    caption: "Expert Smartphone Repair"
  },
  {
    url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
    label: "HIGH-END LAPTOPS",
    caption: "Future of Portable Computing"
  },
  {
    url: "https://images.unsplash.com/photo-1587202376732-817926363a94?auto=format&fit=crop&q=80&w=800",
    label: "PC MASTER RACE",
    caption: "Maximum Hardware Performance"
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    label: "SOFTWARE ENGINEERING",
    caption: "Full-Stack Innovation"
  },
  {
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    label: "TECH SUPPORT",
    caption: "Reliable Hardware Analysis"
  },
];

export default function TechGallery() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-10 md:py-20">
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-black text-white tracking-tighter italic uppercase">
              TEKNOVARTA <span className="text-[#0a66c2]">IN THE FIELD</span>
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">
              Dibalik Layar Inovasi Teknologi Global
            </p>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            LIVE GALLERY
          </div>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="flex gap-4 md:gap-6 w-max animate-marquee whitespace-nowrap">
        {/* First set */}
        {[...IMAGES, ...IMAGES].map((img, i) => (
          <div 
            key={i} 
            className="group relative w-64 md:w-96 aspect-[16/10] rounded-2xl md:rounded-[32px] overflow-hidden"
          >
            <Image 
              src={img.url} 
              alt={img.label} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 block">
                {img.label}
              </span>
              <h4 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter leading-tight italic">
                {img.caption}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
