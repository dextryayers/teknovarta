import { MetadataRoute } from 'next';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import { PHONE_SPECS } from '@/lib/phone-specs';
import { TIPS_DATA } from '@/lib/tips-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artikel.haniplabs.com';

  // Article Sitemap Entries
  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/artikel/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Phone Specs Sitemap Entries
  const phoneEntries: MetadataRoute.Sitemap = PHONE_SPECS.map((phone) => ({
    url: `${baseUrl}/spesifikasi-hp/${phone.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tips & Tricks Sitemap Entries
  const tipsEntries: MetadataRoute.Sitemap = TIPS_DATA.map((tip) => ({
    url: `${baseUrl}/tips/${tip.categorySlug}/${tip.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category Sitemap Entries
  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${baseUrl}${category.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/spesifikasi-hp`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryEntries,
    ...articleEntries,
    ...phoneEntries,
    ...tipsEntries,
  ];
}
