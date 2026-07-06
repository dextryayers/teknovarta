import { Metadata } from 'next';
import { ARTICLES } from '@/lib/articles';
import ArticleDetailClient from './ArticleDetailClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} - TeknoVarta`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    alternates: {
      canonical: `/artikel/${article.slug}`,
    },
  };
}

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) return null;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://artikel.haniplabs.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Berita & Artikel",
        "item": "https://artikel.haniplabs.com/artikel"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://artikel.haniplabs.com/artikel/${article.slug}`
      }
    ]
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.image],
    "datePublished": article.date,
    "dateModified": article.date,
    "author": [{
      "@type": "Person",
      "name": article.author,
      "url": "https://artikel.haniplabs.com/redaksi"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "TeknoVarta",
      "logo": {
        "@type": "ImageObject",
        "url": "https://artikel.haniplabs.com/images/favicon.ico"
      }
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={jsonLdData} />
      <ArticleDetailClient slug={slug} />
    </>
  );
}
