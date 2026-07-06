'use client';

import { useState } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  MoreVertical, 
  Copy, 
  Trash2, 
  ExternalLink,
  UploadCloud,
  FileText,
  Calendar,
  Grid,
  List as ListIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Swal from 'sweetalert2';

export default function MediaLibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Link copied to clipboard',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Media <span className="text-red-600">Vault</span></h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Central repository for all tech imagery and assets</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest bg-white dark:bg-slate-900 gap-3">
              <UploadCloud className="h-4 w-4" /> Bulk Upload
           </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
         <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group flex-1 min-w-[300px]">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                 placeholder="Search by filename..." 
                 className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-12 pl-12 pr-4 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-red-600/5 transition-all"
               />
            </div>
            <div className="bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex">
               <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-slate-800 text-red-600 shadow-inner' : 'text-slate-400'}`}>
                  <Grid className="h-4 w-4" />
               </button>
               <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 dark:bg-slate-800 text-red-600 shadow-inner' : 'text-slate-400'}`}>
                  <ListIcon className="h-4 w-4" />
               </button>
            </div>
         </div>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Storage: <span className="text-slate-900 dark:text-white">12.4 MB</span> / 1 GB
         </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
           {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
             <div key={i} className="group relative aspect-square bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <img 
                  src={`https://picsum.photos/400/400?random=${i}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
                   <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate w-full mb-4">samsung-s25-ultra-blue.jpg</p>
                   <div className="flex items-center gap-2">
                      <Button onClick={() => copyToClipboard('/uploads/img.jpg')} size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 text-white hover:bg-white hover:text-slate-950">
                         <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 text-white hover:bg-red-600 hover:text-white">
                         <Trash2 className="h-4 w-4" />
                      </Button>
                   </div>
                </div>
                <div className="absolute top-3 left-3">
                   <Badge className="bg-slate-950/50 backdrop-blur-md text-[8px] font-black uppercase tracking-widest py-0">1200x800</Badge>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Preview</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Filename</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                 {[1, 2, 3, 4].map((i) => (
                   <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-4">
                         <div className="h-12 w-16 bg-slate-100 rounded-lg overflow-hidden">
                            <img src={`https://picsum.photos/100/100?random=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt="" />
                         </div>
                      </td>
                      <td className="px-8 py-4">
                         <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">tech-header-v2.png</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Uploaded on 23 Apr 2026</p>
                      </td>
                      <td className="px-8 py-4"><span className="text-[10px] font-black text-slate-500 uppercase">image/png</span></td>
                      <td className="px-8 py-4"><span className="text-[10px] font-black text-slate-500 uppercase">245 KB</span></td>
                      <td className="px-8 py-4 text-right">
                         <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100"><Copy className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
