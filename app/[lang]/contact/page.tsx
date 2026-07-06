'use client';

import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Globe, 
  FileText, 
  ChevronRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const socialLinks = [
    { name: 'Github', icon: Github, url: 'https://github.com/dextryayers', color: 'text-slate-900 dark:text-white', bg: 'bg-slate-100 dark:bg-slate-800' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/hanifabdurrohim', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Portfolio', icon: Globe, url: 'https://haniipp.space', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Resume', icon: FileText, url: 'https://haniplabs.com', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pt-32 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">
          <Link href="/" className="hover:text-red-600">HOME</Link>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-900 dark:text-slate-200 uppercase">Hubungi Redaksi</span>
        </nav>

        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-[0.85] mb-8">
            Hubungi <br/> <span className="text-red-600">Hanif Abdurrohim.</span>
          </h1>
          <p className="text-lg font-bold text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed uppercase tracking-wide">
            Kami terbuka untuk kolaborasi, konsultasi teknologi, dan masukan mengenai konten TeknoVarta. Kami akan merespons dalam waktu kurang dari 24 jam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Info Blocks */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="p-4 bg-red-600 text-white rounded-2xl w-fit mb-8">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Support</h3>
                <p className="text-xl font-black text-slate-900 dark:text-white mb-6">support@rumahtechno.cc</p>
                <a href="mailto:support@rumahtechno.cc" className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                  Kirim Email <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="p-4 bg-emerald-500 text-white rounded-2xl w-fit mb-8">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">WhatsApp Direct</h3>
                <p className="text-xl font-black text-slate-900 dark:text-white mb-6">+62 858-1073-2566</p>
                <a href="https://wa.me/6285810732566" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 hover:translate-x-1 transition-transform">
                  Chat Sekarang <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.1246105073205!2d112.77908377471978!3d-7.226624992779361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9b4bee01d8d%3A0xb75fd93f49f82bd1!2sJl.%20Kalilom%20Lor%20Indah%20Gg.%20Pacar%2C%20Tanah%20Kali%20Kedinding%2C%20Kec.%20Kenjeran%2C%20Surabaya%2C%20Jawa%20Timur%2060129!5e0!3m2!1sid!2sid!4v1776845973821!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale dark:invert contrast-125 rounded-[3.5rem]"
              ></iframe>
            </div>

            <div className="flex items-start gap-4 p-8 bg-slate-950 rounded-[3rem] text-white">
              <MapPin className="h-6 w-6 text-red-600 shrink-0" />
              <div>
                 <h4 className="text-xs font-black uppercase tracking-widest mb-2">Alamat Redaksi</h4>
                 <p className="text-sm font-bold text-slate-400">Jl. Kalilom Lor Indah Gg. Pacar, Tanah Kali Kedinding, Kec. Kenjeran, Surabaya, Jawa Timur 60129</p>
              </div>
            </div>
          </div>

          {/* Social Links Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10 border-l-4 border-red-600 pl-6">Digital Presence</h3>
                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <Link 
                      key={social.name}
                      href={social.url} 
                      target="_blank"
                      className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${social.bg} ${social.color}`}>
                          <social.icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{social.name}</span>
                      </div>
                      <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

               {/* Custom Author Pitch */}
               <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg">
                      <span className="text-2xl font-black text-red-600">HA</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mb-2">Hanif Abdurrohim</h4>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-6">CEO & Editor-in-Chief</p>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed mb-8">
                      Mari bangun masa depan digital Indonesia bersama TeknoVarta. Hubungi saya langsung untuk kemitraan strategis.
                    </p>
                    <Link 
                      href="https://haniipp.space" 
                      className="block w-full bg-slate-950 hover:bg-red-600 text-white rounded-2xl py-4 font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg active:scale-95"
                    >
                      EXPLORE MY WORK
                    </Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button({ children, className, asChild = false }: { children: React.ReactNode, className?: string, asChild?: boolean }) {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp className={`inline-flex items-center justify-center p-4 transition-all ${className}`}>
      {children}
    </Comp>
  );
}
