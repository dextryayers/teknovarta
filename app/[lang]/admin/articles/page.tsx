import Link from 'next/link';
import { db } from '@/postgres/db';
import { articles, categories } from '@/drizle/schema';
import { desc, eq } from 'drizzle-orm';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function AdminArticles() {
  // Fetch articles from db safely. If no DB is connected yet, this will fail.
  // We'll wrap in try-catch so the UI doesn't crash entirely if DB is missing.
  let allArticles: any[] = [];
  try {
    allArticles = await db.select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      isPublished: articles.isPublished,
      createdAt: articles.createdAt,
      categoryName: categories.name,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .orderBy(desc(articles.createdAt));
  } catch (err) {
    console.error("DB Connection Error:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Manajemen Artikel</h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Kelola konten berita teknologi</p>
        </div>
        <Link href="/admin/articles/editor">
          <Button className="bg-red-600 hover:bg-red-700 font-bold uppercase tracking-widest text-[10px] rounded-lg">
            <Plus className="h-4 w-4 mr-2" /> Tulis Baru
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-slate-500 bg-slate-50 dark:bg-slate-950 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-black">Judul Artikel</th>
                <th className="px-6 py-4 font-black">Kategori</th>
                <th className="px-6 py-4 font-black">Status</th>
                <th className="px-6 py-4 font-black">Tanggal</th>
                <th className="px-6 py-4 font-black text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {allArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-semibold italic text-xs">
                    Belum ada artikel yang dipublikasikan atau ditulis.
                  </td>
                </tr>
              ) : (
                allArticles.map((article) => (
                  <tr key={article.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {article.title}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest">
                        {article.categoryName || 'Uncategorized'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {article.isPublished ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-widest">Published</span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded uppercase tracking-widest">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {new Date(article.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/articles/editor?id=${article.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
