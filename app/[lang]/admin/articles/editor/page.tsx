'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Save, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ArticleEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [aiSummary, setAiSummary] = useState('');

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
      } else {
        alert('Upload gagal');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat upload gambar');
    }
  }

  async function generateAiSummary() {
    if (!content || content.length < 50) {
      alert('Tulis konten artikel minimal 50 karakter terlebih dahulu agar AI dapat merangkum.');
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, title }),
      });
      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      } else {
        alert('Gagal menghasilkan rangkuman AI');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan koneksi ke AI');
    } finally {
      setIsAiLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to Server Action
    alert('Fungsi simpan belum diimplementasikan dengan koneksi DB.');
    setIsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link href="/admin/articles">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Editor Artikel</h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Tulis Berita Baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Artikel</label>
            <input 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-lg font-bold focus:border-red-600 outline-none transition-colors"
              placeholder="Contoh: Fitur Rahasia Samsung S25 Ultra"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cover Image</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden group">
              {imageUrl ? (
                <img src={imageUrl} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
              ) : null}
              <ImageIcon className="h-10 w-10 text-slate-400 mb-4 relative z-10" />
              <p className="text-sm font-semibold text-slate-500 relative z-10 mb-4">Klik atau Drop gambar di sini</p>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
            </div>
            {imageUrl && <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-2">✓ Gambar berhasil diunggah: {imageUrl}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ringkasan AI (Otomatis)</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={generateAiSummary}
                disabled={isAiLoading || !content}
                className="h-7 text-[9px] font-black uppercase tracking-widest border-purple-200 dark:border-purple-900 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                {isAiLoading ? <Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1.5" />}
                Generate with AI
              </Button>
            </div>
            <textarea 
              value={aiSummary}
              onChange={(e) => setAiSummary(e.target.value)}
              rows={3}
              className="w-full bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/50 rounded-lg px-4 py-3 text-sm font-medium focus:border-purple-500 outline-none transition-colors italic"
              placeholder="Klik 'Generate with AI' untuk merangkum konten secara otomatis..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Konten (HTML/Markdown)</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-4 text-sm font-medium focus:border-red-600 outline-none transition-colors font-mono"
              placeholder="Tulis konten artikel di sini..."
            ></textarea>
          </div>

        </div>

        <div className="flex items-center gap-4 justify-end">
          <Button type="button" variant="outline" className="font-bold uppercase tracking-widest text-[10px] px-6">
            Simpan Draft
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700 font-bold uppercase tracking-widest text-[10px] px-8">
            <Save className="h-4 w-4 mr-2" /> {isLoading ? 'Menyimpan...' : 'Publish Artikel'}
          </Button>
        </div>
      </form>
    </div>
  );
}
