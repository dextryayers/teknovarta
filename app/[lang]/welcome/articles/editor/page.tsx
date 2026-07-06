'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Globe, 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Settings,
  ChevronRight,
  Sparkles,
  Link as LinkIcon,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Swal from 'sweetalert2';

export default function ArticleEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isSyncSlug, setIsSyncSlug] = useState(true);

  // Auto-generate slug from title
  useEffect(() => {
    if (isSyncSlug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setSlug(generatedSlug);
    }
  }, [title, isSyncSlug]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Cover image uploaded',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    setIsLoading(true);
    // Simulation
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: 'Draft Tersimpan!',
        text: 'Artikel Anda telah diperbarui di database.',
        icon: 'success',
        background: '#020617',
        color: '#fff',
        confirmButtonColor: '#dc2626'
      });
    }, 1500);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-32">
      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-5">
           <Link href="/welcome/articles">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:scale-110 transition-all">
                 <ArrowLeft className="h-5 w-5" />
              </Button>
           </Link>
           <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Post <span className="text-red-600">Architect</span></h1>
              <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                 <span>Articles</span> <ChevronRight className="h-3 w-3" /> <span>{id ? 'Edit Article' : 'New Creation'}</span>
              </nav>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest bg-white dark:bg-slate-900 gap-3">
              <Eye className="h-4 w-4" /> Live Preview
           </Button>
           <Button onClick={handleSave} disabled={isLoading} className="bg-red-600 hover:bg-red-700 h-14 px-10 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-red-600/20">
              <Save className="h-4 w-4 mr-3" /> {isLoading ? 'Processing...' : 'Sync to Database'}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Main Content Area */}
         <div className="lg:col-span-8 space-y-10">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Main Headline</label>
                  <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-20 px-8 rounded-3xl text-2xl font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Enter article title here..."
                  />
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Permalink Slug</label>
                     <button 
                       onClick={() => setIsSyncSlug(!isSyncSlug)}
                       className={cn("text-[9px] font-bold uppercase tracking-widest flex items-center gap-2", isSyncSlug ? "text-emerald-600" : "text-amber-500")}
                     >
                        {isSyncSlug ? <Sparkles className="h-3 w-3" /> : <LinkIcon className="h-3 w-3" />} 
                        {isSyncSlug ? 'Auto Sync Active' : 'Manual Editing'}
                     </button>
                  </div>
                  <div className="relative group">
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">teknovarta.com/</span>
                     <input 
                       value={slug}
                       readOnly={isSyncSlug}
                       onChange={(e) => setSlug(e.target.value)}
                       className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-14 pl-[110px] pr-8 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-red-600/10 outline-none transition-all disabled:opacity-50"
                     />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Editorial Content</label>
                  <textarea 
                    rows={20}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] text-base font-serif leading-relaxed text-slate-800 dark:text-slate-200 focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Start writing your news story or tech review..."
                  ></textarea>
               </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
               <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <Globe className="h-5 w-5 text-blue-500" /> SEO Metadata Engine
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Title</label>
                     <input className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-12 px-5 rounded-xl text-xs font-bold focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Keywords</label>
                     <input className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-12 px-5 rounded-xl text-xs font-bold focus:border-blue-500 outline-none transition-all" />
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description (Snippet)</label>
                  <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 rounded-xl text-xs font-bold focus:border-blue-500 outline-none transition-all"></textarea>
               </div>
            </div>
         </div>

         {/* Sidebar Controls */}
         <div className="lg:col-span-4 space-y-8">
            {/* Status Panel */}
            <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Visibility</h3>
                  <div className={cn(
                    "h-2 w-2 rounded-full animate-pulse",
                    isPublished ? "bg-emerald-500" : "bg-amber-500"
                  )}></div>
               </div>
               
               <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setIsPublished(true)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all",
                      isPublished ? "bg-emerald-600 border-emerald-500 text-white" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                    )}
                  >
                     <span className="text-[10px] font-black uppercase tracking-widest">Public Post</span>
                     <CheckCircle2 className={cn("h-5 w-5", isPublished ? "opacity-100" : "opacity-20")} />
                  </button>
                  <button 
                    onClick={() => setIsPublished(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all",
                      !isPublished ? "bg-amber-600 border-amber-500 text-white" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                    )}
                  >
                     <span className="text-[10px] font-black uppercase tracking-widest">Save as Draft</span>
                     <Clock className={cn("h-5 w-5", !isPublished ? "opacity-100" : "opacity-20")} />
                  </button>
               </div>

               <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                     <Calendar className="h-4 w-4 text-slate-500" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Schedule Publication</span>
                  </div>
                  <input type="datetime-local" className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-red-600 transition-colors" />
               </div>
            </div>

            {/* Media Panel */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Cover Asset</h3>
               <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-950 group">
                  {imageUrl ? (
                    <>
                       <img src={imageUrl} className="w-full h-full object-cover" alt="" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" variant="outline" className="text-[9px] font-black uppercase bg-white dark:bg-slate-900">Change Image</Button>
                       </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 opacity-30">
                       <ImageIcon className="h-10 w-10" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-center px-6">PNG, JPG or WEBP<br/>Max 2MB</p>
                    </div>
                  )}
                  <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
               </div>
            </div>

            {/* Taxonomies */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Classification</h3>
                  <select className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-12 px-4 rounded-xl text-xs font-bold outline-none focus:border-red-600">
                     <option>Select Category</option>
                     <option>Gadget</option>
                     <option>Computing</option>
                  </select>
               </div>
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Authorship</h3>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                     <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-xs">M</div>
                     <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Master Admin</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
