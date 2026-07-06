'use client';

import { CATEGORIES } from '@/lib/articles';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t, lang } = useTranslation();
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-display font-black tracking-tighter text-red-600 italic">
                TEKNOVARTA<span className="text-slate-900 dark:text-white">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {t.footer.desc}
            </p>
            <div className="flex space-x-4 pt-4">
              {[Facebook, Twitter, Instagram, Youtube, Mail].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="h-10 w-10 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-6 pb-2 border-b-2 border-red-600 w-fit">{t.footer.more}</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.terms}</Link></li>
              <li><Link href="#" className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.privacy}</Link></li>
              <li><Link href="#" className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.cookie}</Link></li>
              <li><Link href="#" className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.accessibility}</Link></li>
              <li><Link href="#" className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.parents}</Link></li>
              <li><Link href="#" className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.advertise}</Link></li>
              <li><Link href={`/${lang}/tentang`} className="text-xs text-slate-600 hover:text-red-500 transition-all font-medium">{t.footer.links.about}</Link></li>
              <li>
                <Link href={`/${lang}/contact`} className="text-xs text-red-600 hover:text-slate-900 transition-all font-black uppercase tracking-widest">
                  {t.footer.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-6 pb-2 border-b-2 border-red-600 w-fit">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['IT Support', 'Front End', 'Back End', 'Fullstack', 'Web Dev', 'Mobile Dev', 'Repair Kit', 'Ai Chat', 'Samsung', 'Asus', 'Redmi', 'Realme', 'Xiaomi', 'Vivo', 'Oppo', 'iPhone', 'React', 'Tailwind', 'NextJs'].map((tag) => (
                <Link key={tag} href="#" className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Promo Section */}
          <div className="lg:col-span-3">
            <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl space-y-4 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.footer.promo.title}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider font-bold">
                {t.footer.promo.desc}
              </p>
              <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden italic text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                {t.footer.promo.asset}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium">
          <p>
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:text-red-500 transition-all font-bold"
          >
            {t.footer.top} <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
