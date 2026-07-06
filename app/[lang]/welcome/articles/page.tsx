import { db } from '@/postgres/db';
import { articles, categories, users } from '@/drizle/schema';
import { desc, eq, ilike, or } from 'drizzle-orm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manajemen Artikel',
};

import { 
  Plus, Edit, Trash2, Eye, 
  Search, Filter, MoreHorizontal,
  Calendar, User as UserIcon,
  CheckCircle2, Clock, FileText,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function AdminArticles({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = (searchParams.q as string) || '';
  
  let allArticles: any[] = [];
  try {
    allArticles = await db.select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      isPublished: articles.isPublished,
      createdAt: articles.createdAt,
      categoryName: categories.name,
      authorName: users.displayName,
      coverImage: articles.coverImage,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(
      query ? or(ilike(articles.title, `%${query}%`), ilike(articles.slug, `%${query}%`)) : undefined
    )
    .orderBy(desc(articles.createdAt));
  } catch (err) {
    console.error("DB Error:", err);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Content <span className="text-red-600">Database</span></h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Manage all news, reviews, and editorial posts</p>
        </div>
        <Link href="/welcome/articles/editor">
          <Button className="bg-red-600 hover:bg-red-700 h-14 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-red-600/20">
            <Plus className="h-4 w-4 mr-3" /> Create New Article
          </Button>
        </Link>
      </div>

      {/* Toolbar & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
           <div className="relative group min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
              <input 
                type="text" 
                defaultValue={query}
                placeholder="Search articles title or slug..." 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-12 pl-12 pr-4 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
              />
           </div>
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest gap-2 bg-white dark:bg-slate-900">
              <Filter className="h-4 w-4" /> Filters
           </Button>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
           Showing {allArticles.length} matching articles
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Article Information</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Author</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 grayscale opacity-30">
                       <FileText className="h-16 w-16" />
                       <p className="text-sm font-black uppercase tracking-widest">No articles found in repository</p>
                    </div>
                  </td>
                </tr>
              ) : (
                allArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 max-w-md">
                         <div className="h-14 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                            {article.coverImage ? (
                               <img src={article.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                            ) : (
                               <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <FileText className="h-6 w-6" />
                               </div>
                            )}
                         </div>
                         <div className="overflow-hidden">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate group-hover:text-red-600 transition-colors">
                               {article.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1.5">
                               <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">/{article.slug}</span>
                               <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                  <Calendar className="h-3 w-3" /> {new Date(article.createdAt).toLocaleDateString('en-GB')}
                               </span>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <Badge variant="outline" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest px-3 py-1">
                          {article.categoryName || 'General'}
                       </Badge>
                    </td>
                    <td className="px-8 py-6">
                       {article.isPublished ? (
                          <button className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800/50 hover:bg-emerald-100 transition-colors">
                             <CheckCircle2 className="h-3.5 w-3.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest">Published</span>
                          </button>
                       ) : (
                          <button className="flex items-center gap-2 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-800/50 hover:bg-amber-100 transition-colors">
                             <Clock className="h-3.5 w-3.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest">In Draft</span>
                          </button>
                       )}
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-black text-[10px] border border-slate-200 dark:border-slate-700">
                             {article.authorName?.[0] || 'M'}
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider block leading-none">{article.authorName || 'Master'}</span>
                             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Author</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/articles/preview/${article.slug}`}>
                             <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-blue-600/10">
                                <Eye className="h-4 w-4" />
                             </Button>
                          </Link>
                          <Link href={`/welcome/articles/editor?id=${article.id}`}>
                             <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-amber-500/10">
                                <Edit className="h-4 w-4" />
                             </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-red-600/10">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="px-8 py-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing {allArticles.length} of {allArticles.length} entries</p>
           <div className="flex items-center gap-2">
              <Button disabled variant="outline" size="sm" className="rounded-lg h-10 w-10 p-0"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="rounded-lg h-10 px-4 font-black text-[10px] bg-red-600 text-white border-red-600">1</Button>
              <Button disabled variant="outline" size="sm" className="rounded-lg h-10 w-10 p-0"><ChevronRight className="h-4 w-4" /></Button>
           </div>
        </div>
      </div>
    </div>
  );
}
