'use client';

import { useState } from 'react';
import { 
  Tags, 
  Hash, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  FolderPlus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CategoriesTagsPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Taxonomy <span className="text-red-600">Engine</span></h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Classify your content for better SEO and navigation</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <button 
             onClick={() => setActiveTab('categories')}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-500 hover:text-slate-900'}`}
           >
              Categories
           </button>
           <button 
             onClick={() => setActiveTab('tags')}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'tags' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-500 hover:text-slate-900'}`}
           >
              Tags
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Add New Sidebar */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-10">
               <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3 mb-8">
                  {activeTab === 'categories' ? <FolderPlus className="h-5 w-5 text-red-600" /> : <Hash className="h-5 w-5 text-red-600" />}
                  New {activeTab === 'categories' ? 'Category' : 'Tag'}
               </h3>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Label Name</label>
                     <input 
                       className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-12 px-5 rounded-xl text-xs font-bold outline-none focus:border-red-600 transition-all"
                       placeholder={`e.g. ${activeTab === 'categories' ? 'Gadgets' : 'Samsung'}`}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Custom Slug</label>
                     <input 
                       className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-12 px-5 rounded-xl text-xs font-bold outline-none focus:border-red-600 transition-all"
                       placeholder="e.g. gadget-news"
                     />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-red-600/20 mt-4">
                     Confirm Creation
                  </Button>
               </div>
            </div>
         </div>

         {/* List View Area */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="relative group flex-1 max-w-sm">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <input 
                       placeholder={`Search ${activeTab}...`} 
                       className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-10 pl-11 pr-4 rounded-xl text-xs font-bold outline-none focus:border-red-600 transition-all"
                     />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     {activeTab === 'categories' ? '12 Categories' : '48 Tags'} Total
                  </p>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-950/50">
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name & Path</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Posts</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {(activeTab === 'categories' ? [
                          { name: 'Smartphone', slug: 'smartphone', count: 42 },
                          { name: 'Review', slug: 'review', count: 18 },
                          { name: 'News', slug: 'news', count: 85 }
                        ] : [
                          { name: 'Samsung', slug: 'samsung', count: 32 },
                          { name: 'S25 Ultra', slug: 's25-ultra', count: 12 },
                          { name: 'iOS', slug: 'ios', count: 5 }
                        ]).map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                             <td className="px-8 py-5">
                                <div>
                                   <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.name}</p>
                                   <p className="text-[10px] font-bold text-slate-400 font-mono italic">/{item.slug}</p>
                                </div>
                             </td>
                             <td className="px-8 py-5">
                                <Badge variant="secondary" className="rounded-lg font-black text-[10px] bg-slate-100 dark:bg-slate-800">
                                   {item.count} POSTS
                                </Badge>
                             </td>
                             <td className="px-8 py-5 text-right">
                                <div className="flex justify-end items-center gap-2">
                                   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600">
                                      <Edit className="h-4 w-4" />
                                   </Button>
                                   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100">
                                      <Trash2 className="h-4 w-4" />
                                   </Button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
