import { Metadata } from 'next';
import { CATEGORIES } from '@/lib/articles';
import CategoryClient from './CategoryClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = CATEGORIES.find(c => c.id === categoryId);

  if (!category) return { title: 'Kategori Tidak Ditemukan' };

  return {
    title: `Berita ${category.name} Terkini`,
    description: category.description || `Kumpulan berita dan artikel teknologi terbaru seputar ${category.name}.`,
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params;
  const category = CATEGORIES.find(c => c.id === categoryId);

  if (!category) return notFound();

  return <CategoryClient categoryId={categoryId} />;
}
